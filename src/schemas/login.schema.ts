import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Escriba su correo, usuario o numero telefonico'),
  password: z.string().min(1, 'La contraseña no puede estar vacio'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
