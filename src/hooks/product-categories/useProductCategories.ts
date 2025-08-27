import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productCategoryService } from '../../services/productCategory.service';
import type {
  FilterProductCategoriesDto,
  ProductCategory,
} from '../../models/productCategory.model';

export const useProductCategories = (filters?: FilterProductCategoriesDto) => {
  // Obtener lista de productos
  const { data, error, isLoading, isFetching, refetch } = useQuery<ProductCategory[], Error>({
    queryKey: ['productCategories', filters], // clave de cache depende de los filtros
    queryFn: () => productCategoryService.getAllCategories(filters),
    placeholderData: keepPreviousData, // 👈 mantiene datos al cambiar de página o filtros
  });

  return {
    productCategories: data ?? [], // 👈 categorias de productos
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
