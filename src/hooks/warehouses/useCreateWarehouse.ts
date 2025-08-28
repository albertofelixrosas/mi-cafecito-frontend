import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateWarehouseRequest, Warehouse } from '../../models/warehouse.model';
import { warehouseService } from '../../services/warehouse.service';

export function useCreateWarehouse() {
  const queryClient = useQueryClient();

  const {
    mutate: createWarehouse,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<Warehouse, Error, CreateWarehouseRequest>({
    mutationFn: warehouseService.createWarehouse,
    onSuccess: () => {
      // Invalidar la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    },
  });

  return { createWarehouse, isPending, isError, error, isSuccess };
}
