import { z } from 'zod';

export const warehouseSchema = z.object({
  warehouseName: z.string().min(1, 'El nombre es obligatorio'),
  location: z.string().min(1, 'La localización es obligatoria'),
  photoUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')),
});

export type WarehouseSchema = z.infer<typeof warehouseSchema>;
