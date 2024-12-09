'use server';

import { cookies } from 'next/headers';
import { DecodeToken } from '@/types/common.type';

/**
 * Decode token to get payload object
 *
 * @param {string} token - The token is a jwt string
 */
export const decodeToken = async (token: string): Promise<DecodeToken> => {
  try {
    const [, payloadBase64] = token.split('.');

    if (!payloadBase64) throw new Error('Invalid token format');

    const payload = await Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(payload);
  } catch (error) {
    console.error('Token decoding error:', error);
    throw new Error('Failed to decode token');
  }
};

/**
 * Create a new session in cookie
 *
 * @param {string} key - The key of session
 * @param {string} value - The value of session
 */
export const createSession = async (key: string, value: string): Promise<void> => {
  try {
    const payload = await decodeToken(value);
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

/**
 * Get session by key name
 *
 * @param {string} key - The key of session
 */
export const getSession = async (key: string): Promise<null | { name: string; value: string }> => {
  const session = cookies().get(key);
  return session || null;
};

/**
 * Delete session by key name
 *
 * @param {string} key - The key of session
 */
export const deleteSession = async (key: string): Promise<void> => {
  try {
    await cookies().delete(key);
  } catch (error) {
    console.error('Session deletion error:', error);
    throw error;
  }
};
