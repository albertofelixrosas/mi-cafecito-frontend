// hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateProductCategoryRequest,
  ProductCategory,
} from '../../models/productCategory.model';
import { productCategoryService } from '../../services/productCategory.service';

export function useCreateProductCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: createProductCategory,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<ProductCategory, Error, CreateProductCategoryRequest>({
    mutationFn: productCategoryService.createCategory,
    onSuccess: () => {
      // Invalidar la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ['productCategories'] });
    },
  });

  return { createProductCategory, isPending, isError, error, isSuccess };
}
