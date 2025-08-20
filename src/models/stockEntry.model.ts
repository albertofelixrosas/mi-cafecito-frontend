export interface StockEntry {
  stockEntryId: number;
  productId: number;
  warehouseId: number;
  incomeAt: string;
  quantity: number;
  observations?: string;
  expirationAt?: string;
}

export interface CreateStockEntryRequest {
  productId: number;
  warehouseId: number;
  incomeAt: string;
  quantity: number;
  observations?: string;
  expirationAt?: string;
}

export interface UpdateStockEntryRequest extends Partial<CreateStockEntryRequest> {
  stockEntryId: number;
}
