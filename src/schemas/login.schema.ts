import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Correo inválido'),
  password: z.string().min(1, 'Mínimo 1 caracter'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
