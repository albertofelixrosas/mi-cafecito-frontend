import { useQuery } from '@tanstack/react-query';
import { productCategoryService } from '../../services/productCategory.service';
import type { ProductCategory } from '../../models/productCategory.model';

export const useProductCategoryById = (id: number) => {
  return useQuery<ProductCategory, Error>({
    queryKey: ['productCategory', id],
    queryFn: () => productCategoryService.getCategoryById(id),
    enabled: !!id, // solo ejecuta si id existe
  });
};
