// hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateProductRequest, Product } from '../../models/product.model';
import { productService } from '../../services/product.service';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: createProduct,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<Product, Error, CreateProductRequest>({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      // Invalidar la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { createProduct, isPending, isError, error, isSuccess };
}
