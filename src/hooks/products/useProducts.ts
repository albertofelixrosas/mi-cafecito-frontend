import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import type { Product, FilterProductsDto } from '../../models/product.model';

export const useProducts = (filters?: FilterProductsDto) => {
  // Obtener lista de productos
  const {
    data: products = [],
    error,
    isLoading,
    refetch,
  } = useQuery<Product[], Error>({
    queryKey: ['products', filters], // clave de cache depende de los filtros
    queryFn: () => productService.getAllProducts(filters),
  });

  return {
    products,
    isLoading,
    error,
    refetch,
  };
};
