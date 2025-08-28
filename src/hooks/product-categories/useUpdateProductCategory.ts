import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProductCategoryRequest } from '../../models/productCategory.model';
import { productCategoryService } from '../../services/productCategory.service';

export function useUpdateProductCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProductCategory,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (productData: UpdateProductCategoryRequest) =>
      productCategoryService.updateCategory(productData),
    onSuccess: () => {
      // ✅ Invalida el listado completo de categorías
      queryClient.invalidateQueries({
        queryKey: ['productCategories'],
      });
    },
  });

  return { updateProductCategory, isPending, isError, error, isSuccess };
}
