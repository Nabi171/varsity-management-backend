import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .max(20, { message: 'password cant be more than 20 characters' }),
  needsPasswordChange: z.boolean().optional(),
  passwordChangedAt: z.date().optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export default userSchema;
