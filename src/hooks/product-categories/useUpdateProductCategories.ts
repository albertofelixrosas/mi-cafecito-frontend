// hooks/useUpdateProduct.ts
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
    onSuccess: updatedCategory => {
      queryClient.invalidateQueries({
        queryKey: ['productCategories', updatedCategory.productCategoryId],
      });
    },
  });

  return { updateProductCategory, isPending, isError, error, isSuccess };
}
