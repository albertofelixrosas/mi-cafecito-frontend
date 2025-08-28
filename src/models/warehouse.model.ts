export interface Warehouse {
  warehouseId: number;
  warehouseName: string;
  location: string;
  photoUrl?: string;
}

export interface CreateWarehouseRequest {
  warehouseName: string;
  location: string;
  photoUrl?: string;
}

export interface UpdateWarehouseRequest extends Partial<CreateWarehouseRequest> {
  warehouseId: number;
}

export interface FilterWarehousesDto {
  name?: string;
}
