/**
 * Possible user roles in the application
 */
export type UserRole = 'USER' | 'ADMIN';

/**
 * User entity interface representing user data
 */
export interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  password: string;
  phone?: string | null;
  birthday?: string | null;
  gender: boolean;
  role: UserRole;
}
