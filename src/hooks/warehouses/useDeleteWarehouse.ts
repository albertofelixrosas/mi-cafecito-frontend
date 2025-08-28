import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '../../services/warehouse.service';

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteWarehouse,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (id: number) => warehouseService.deleteWarehouse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    },
  });

  return { deleteWarehouse, isPending, isError, error, isSuccess };
}
