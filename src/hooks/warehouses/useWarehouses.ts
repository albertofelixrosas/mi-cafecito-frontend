import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { warehouseService } from '../../services/warehouse.service';
import type { FilterWarehousesDto, Warehouse } from '../../models/warehouse.model';

export const useWarehouses = (filters?: FilterWarehousesDto) => {
  // Obtener lista de almacenes
  const { data, error, isLoading, isFetching, refetch } = useQuery<Warehouse[], Error>({
    queryKey: ['warehouses', filters], // clave de cache depende de los filtros
    queryFn: () => warehouseService.getAllWarehouses(filters),
    placeholderData: keepPreviousData, // 👈 mantiene datos al cambiar de página o filtros
  });

  return {
    warehouses: data ?? [], // 👈 categorias de productos
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
