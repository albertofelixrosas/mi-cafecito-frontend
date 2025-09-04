import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'El campo nombre no puede estar vacio'),
  lastname: z.string().min(1, 'El campo apellido no puede estar vacio'),
  role: z.string().min(1, 'El campo rol no puede estar vacio'),
});

export const updateUserSchema = createUserSchema.extend({
  createdAt: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
