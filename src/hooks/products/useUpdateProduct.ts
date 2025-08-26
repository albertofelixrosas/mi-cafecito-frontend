// hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProductRequest } from '../../models/product.model';
import { productService } from '../../services/product.service';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (productData: UpdateProductRequest) => productService.updateProduct(productData),
    onSuccess: updatedProduct => {
      queryClient.invalidateQueries({ queryKey: ['products', updatedProduct.productId] });
    },
  });

  return { updateProduct, isPending, isError, error, isSuccess };
}
