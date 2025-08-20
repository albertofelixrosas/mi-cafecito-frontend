export interface StockLoss {
  stockLossId: number;
  productId: number;
  warehouseId: number;
  lossAt: string;
  quantity: number;
  reason: string;
}

export interface CreateStockLossRequest {
  productId: number;
  warehouseId: number;
  lossAt: string;
  quantity: number;
  reason: string;
}

export interface UpdateStockLossRequest extends Partial<CreateStockLossRequest> {
  stockLossId: number;
}
