import { apiService } from './api.service';
import type {
  Warehouse,
  CreateWarehouseRequest,
  UpdateWarehouseRequest,
  FilterWarehousesDto,
} from '../models/warehouse.model';

export class WarehouseService {
  async getAllWarehouses(filters?: FilterWarehousesDto): Promise<Warehouse[]> {
    return apiService.get<Warehouse[]>('/warehouses', { params: filters ?? {} });
  }

  async getWarehouseById(id: number): Promise<Warehouse> {
    return apiService.get<Warehouse>(`${'/warehouses'}/${id}`);
  }

  async createWarehouse(warehouse: CreateWarehouseRequest): Promise<Warehouse> {
    return apiService.post<Warehouse>('/warehouses', warehouse);
  }

  async updateWarehouse(warehouse: UpdateWarehouseRequest): Promise<Warehouse> {
    const { warehouseId, ...data } = warehouse;
    return apiService.patch<Warehouse>(`${'/warehouses'}/${warehouseId}`, data);
  }

  async deleteWarehouse(id: number): Promise<void> {
    return apiService.delete<void>(`${'/warehouses'}/${id}`);
  }
}

export const warehouseService = new WarehouseService();
