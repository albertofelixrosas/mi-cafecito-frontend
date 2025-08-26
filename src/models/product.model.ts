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
}

export interface CreateProductRequest {
  productCategoryId: number;
  productName: string;
  unitOfMeasurement: string;
  description: string;
  isElaborated: boolean;
  isPortioned: boolean;
  photoUrl?: string;
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
