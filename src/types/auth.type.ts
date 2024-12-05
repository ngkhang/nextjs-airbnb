import { z } from 'zod';
import { ResponseBase } from './common.type';
import { User } from './user.type';
import { LogInSchema, RegisterSchema } from '@/schemas/auth.schema';

/**
 * Login credentials type inferred from Zod schema
 */
export interface LogInType extends z.infer<typeof LogInSchema> {}

/**
 * Registration credentials type inferred from Zod schema
 */
export interface RegisterType extends z.infer<typeof RegisterSchema> {}

/**
 * Response type for successful login
 */
export interface LoginResponse
  extends ResponseBase<{
    user: User;
    token: string;
  }> {}

/**
 * Response type for successful registration
 */
export interface RegisterResponse extends ResponseBase<{ user: User }> {}
