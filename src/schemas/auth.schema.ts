import { z } from 'zod';

const basePasswordSchema = z
  .string({ message: 'This is required field' })
  .min(4, { message: 'Password must be at least 6 characters.' })
  .max(20, { message: 'Maximum number of characters in password is 50' });

export const LogInSchema = z.object({
  email: z
    .string({ message: 'This is required field' })
    .email({ message: 'Please enter a valid email address (Ex: johndoe@domain.com).' }),
  password: basePasswordSchema,
});

export const RegisterSchema = LogInSchema.extend({
  name: z
    .string({ message: 'This is required field' })
    .refine((value) => !value.match(/^[0-9]+/g), 'Your full name is not starting with number.')
    .refine((value) => value.split(/\s+/g).length >= 2, 'Enter your full name with 2 words, separated by a space.'),
  password: basePasswordSchema
    .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter')
    .refine((value) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter')
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'Password must contain at least one special character'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});
