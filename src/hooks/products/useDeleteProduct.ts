import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/product.service';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { deleteProduct, isPending, isError, error, isSuccess };
}
