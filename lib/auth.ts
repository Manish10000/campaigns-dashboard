import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { findUserByEmail, findUserById, createUser, type User } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const COOKIE_NAME = 'auth_token';

export interface JWTPayload {
  userId: number;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;
  
  const payload = await verifyToken(token);
  if (!payload) return null;
  
  const user = findUserById(payload.userId);
  return user || null;
}

// Credentials Authentication
export async function signUp(email: string, password: string, name?: string): Promise<{ user: User; token: string } | { error: string }> {
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already registered' };
  }
  
  const hashedPassword = await hashPassword(password);
  const user = createUser({
    email,
    password: hashedPassword,
    name,
    provider: 'credentials',
  });
  
  const token = await createToken({
    userId: user.id,
    email: user.email,
    name: user.name || undefined,
  });
  
  return { user, token };
}

export async function signIn(email: string, password: string): Promise<{ user: User; token: string } | { error: string }> {
  const user = findUserByEmail(email);
  if (!user || !user.password) {
    return { error: 'Invalid email or password' };
  }
  
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return { error: 'Invalid email or password' };
  }
  
  const token = await createToken({
    userId: user.id,
    email: user.email,
    name: user.name || undefined,
  });
  
  return { user, token };
}


