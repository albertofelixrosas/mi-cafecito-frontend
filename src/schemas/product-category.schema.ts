import { z } from 'zod';

export const productCategorySchema = z.object({
  productCategoryName: z.string().min(1, 'El nombre de la categoría es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  photoUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')), // para permitir campo vacío
});

export type ProductCategorySchema = z.infer<typeof productCategorySchema>;
