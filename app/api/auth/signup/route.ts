import { NextResponse } from 'next/server';
import { signUp, setAuthCookie } from '@/lib/auth';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validation.data;
    
    const result = await signUp(email, password, name);
    
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    await setAuthCookie(result.token);
    
    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        avatar: result.user.avatar,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
