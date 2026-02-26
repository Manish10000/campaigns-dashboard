'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAuth() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR<{ user: AuthUser | null }>(
    '/api/auth/me',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  const signIn = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Sign in failed');
    }

    await mutate();
    router.push('/dashboard');
    return result;
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Sign up failed');
    }

    await mutate();
    router.push('/dashboard');
    return result;
  };

  const signOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    await mutate({ user: null }, false);
    router.push('/');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    mutate,
  };
}
