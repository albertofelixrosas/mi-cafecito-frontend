import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'El campo nombre no puede estar vacio'),
  lastname: z.string().min(1, 'El campo apellido no puede estar vacio'),
  role: z.string().min(1, 'El campo rol no puede estar vacio'),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
