export interface StockWithdrawal {
  stockWithdrawalId: number;
  productId: number;
  warehouseId: number;
  withdrawalAt: string;
  quantity: number;
  reason: string;
}

export interface CreateStockWithdrawalRequest {
  productId: number;
  warehouseId: number;
  withdrawalAt: string;
  quantity: number;
  reason: string;
}

export interface UpdateStockWithdrawalRequest extends Partial<CreateStockWithdrawalRequest> {
  stockWithdrawalId: number;
}
