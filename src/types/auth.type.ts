import { z } from 'zod';
import { LogInSchema, RegisterSchema } from '@/schemas/auth.schema';

export interface LogInType extends z.infer<typeof LogInSchema> {}
export interface RegisterType extends z.infer<typeof RegisterSchema> {}
