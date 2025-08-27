import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import type { FilterProductsDto, ProductResponse } from '../../models/product.model';

export const useProducts = (filters?: FilterProductsDto) => {
  // Obtener lista de productos
  const { data, error, isLoading, refetch } = useQuery<ProductResponse, Error>({
    queryKey: ['products', filters], // clave de cache depende de los filtros
    queryFn: () => productService.getProducts(filters),
    // keepPreviousData: true, // 👈 mantiene datos al cambiar de página o filtros
  });

  return {
    products: data?.data ?? [], // 👈 productos
    pagination: {
      total: data?.total ?? 0,
      page: data?.page ?? 1,
      lastPage: data?.lastPage ?? 1,
      limit: data?.limit ?? 1,
    },
    isLoading,
    error,
    refetch,
  };
};
