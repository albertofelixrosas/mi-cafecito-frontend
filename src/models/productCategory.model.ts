export interface ProductCategory {
  productCategoryId: number;
  productCategoryName: string;
  description: string;
  photoUrl?: string;
}

export interface CreateProductCategoryRequest {
  productCategoryName: string;
  description: string;
  photoUrl?: string;
}

export interface UpdateProductCategoryRequest extends Partial<CreateProductCategoryRequest> {
  productCategoryId: number;
}

export interface FilterProductCategoriesDto {
  name?: string;
}
