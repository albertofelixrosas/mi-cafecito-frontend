import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productCategoryService } from '../../services/productCategory.service';
import type {
  FilterProductCategoriesDto,
  ProductCategory,
} from '../../models/productCategory.model';

export const useProductCategories = (filters?: FilterProductCategoriesDto) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery<ProductCategory[], Error>({
    queryKey: ['productCategories', filters], // 👈 clave estable
    queryFn: () => productCategoryService.getAllCategories(filters),
    placeholderData: keepPreviousData, // mantiene datos previos mientras carga
  });

  return {
    productCategories: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
