import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productCategoryService } from '../../services/productCategory.service';

export function useDeleteProductCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProductCategory,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (id: number) => productCategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productCategories'] });
    },
  });

  return { deleteProductCategory, isPending, isError, error, isSuccess };
}
