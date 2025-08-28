import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateWarehouseRequest } from '../../models/warehouse.model';
import { warehouseService } from '../../services/warehouse.service';

export function useUpdateWarehouse() {
  const queryClient = useQueryClient();

  const {
    mutate: updateWarehouse,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (warehouseData: UpdateWarehouseRequest) =>
      warehouseService.updateWarehouse(warehouseData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['warehouses'],
      });
    },
  });

  return { updateWarehouse, isPending, isError, error, isSuccess };
}
