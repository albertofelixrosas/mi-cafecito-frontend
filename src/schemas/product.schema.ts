import { z } from 'zod';

export const productSchema = z.object({
  productName: z.string().min(1, 'El nombre del producto es obligatorio'),
  productCategoryId: z.number().min(1, 'Debe seleccionar una categoría'),
  unitOfMeasurement: z.string().min(1, 'La unidad de medida es obligatoria'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  photoUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  isElaborated: z.boolean(),
  isPortioned: z.boolean(),
  barCode: z.string().max(13, 'El valor maximo debe de ser de 13').optional(),
  minStock: z.number('El valor debe ser un numero').min(1, 'El valor minimo es de 1'),
});

export type ProductSchema = z.infer<typeof productSchema>;
