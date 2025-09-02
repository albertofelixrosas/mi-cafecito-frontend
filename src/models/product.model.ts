import type { ProductCategory } from './productCategory.model';

export interface Product {
  productId: number;
  productCategoryId: number;
  productName: string;
  unitOfMeasurement: string;
  description: string;
  isElaborated: boolean;
  isPortioned: boolean;
  photoUrl: string;
  category: ProductCategory;
  barCode?: string | null;
  minStock: number;
}

export interface CreateProductRequest {
  productCategoryId: number;
  productName: string;
  unitOfMeasurement: string;
  description: string;
  isElaborated: boolean;
  isPortioned: boolean;
  photoUrl: string | null;
  barCode: string | null;
  minStock: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  productId: number;
}

export interface FilterProductsDto {
  name?: string;
  categoryId?: number;
  page: number;
  limit: number;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
