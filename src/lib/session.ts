'use server';

import { cookies } from 'next/headers';

interface DecodeTokenType {
  id: string;
  email: string;
  exp: number;
  nbf: number;
  role: 'USER' | 'ADMIN';
}

export const decodeToken = (token: string): DecodeTokenType => {
  try {
    const [, payloadBase64] = token.split('.');

    if (!payloadBase64) throw new Error('Invalid token format');

    const payload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(payload);
  } catch (error) {
    console.error('Token decoding error:', error);
    throw new Error('Failed to decode token');
  }
};

// Create session
export const createSession = async (key: string, value: string): Promise<void> => {
  try {
    const payload = decodeToken(value);
    (await cookies()).set(key, value, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(payload.exp * 1000),
    });
  } catch (error) {
    console.error('Session creation error:', error);
    throw error;
  }
};

// Get session
export const getSession = async (key: string): Promise<null | { name: string; value: string }> => {
  const session = cookies().get(key);

  if (!session) {
    return null;
  }
  return session;
};

// Delete session
export const deleteSession = async (key: string) => {
  try {
    cookies().delete(key);
  } catch (error) {
    console.error('Session deletion error:', error);
    throw error;
  }
};
