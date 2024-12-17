import { z } from 'zod';

const PasswordSchema = z
  .string({ message: 'This is required field' })
  .min(4, { message: 'Password must be at least 6 characters.' })
  .max(20, { message: 'Maximum number of characters in password is 50' })
  .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter')
  .refine((value) => /[a-z]/.test(value), 'Password must contain at least one lowercase letter')
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'Password must contain at least one special character');

export const UpdatePasswordSchema = z
  .object({
    currentPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    path: ['confirmPassword'],
    message: "Password didn't match.",
  });

export interface UpdatePassword extends z.infer<typeof UpdatePasswordSchema> {}

export const UpdateProfileSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  birthday: z.coerce.date().optional(),
  gender: z.string().optional().default('male'),
  avatar: z.string().optional(),
});

export interface UpdateProfileType extends z.infer<typeof UpdateProfileSchema> {}
