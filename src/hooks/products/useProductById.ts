// hooks/useProductById.ts
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product.service';
import type { Product } from '../../models/product.model';

export const useProductById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // solo ejecuta si id existe
  });
};
