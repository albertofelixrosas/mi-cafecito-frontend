// hooks/useProductById.ts
import { useQuery } from '@tanstack/react-query';
import { warehouseService } from '../../services/warehouse.service';
import type { Warehouse } from '../../models/warehouse.model';

export const useWarehouseById = (id: number) => {
  return useQuery<Warehouse, Error>({
    queryKey: ['warehouse', id],
    queryFn: () => warehouseService.getWarehouseById(id),
    enabled: !!id, // solo ejecuta si id existe
  });
};
