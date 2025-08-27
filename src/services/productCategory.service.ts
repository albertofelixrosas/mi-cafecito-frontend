import { apiService } from './api.service';
import type {
  ProductCategory,
  CreateProductCategoryRequest,
  UpdateProductCategoryRequest,
  FilterProductCategoriesDto,
} from '../models/productCategory.model';

export class ProductCategoryService {
  async getAllCategories(filters?: FilterProductCategoriesDto): Promise<ProductCategory[]> {
    return apiService.get<ProductCategory[]>('/product-categories', { params: filters ?? {} });
  }

  async getCategoryById(id: number): Promise<ProductCategory> {
    return apiService.get<ProductCategory>(`${'/product-categories'}/${id}`);
  }

  async createCategory(category: CreateProductCategoryRequest): Promise<ProductCategory> {
    return apiService.post<ProductCategory>('/product-categories', category);
  }

  async updateCategory(category: UpdateProductCategoryRequest): Promise<ProductCategory> {
    return apiService.put<ProductCategory>(
      `${'/product-categories'}/${category.productCategoryId}`,
      category,
    );
  }

  async deleteCategory(id: number): Promise<void> {
    return apiService.delete<void>(`${'/product-categories'}/${id}`);
  }
}

export const productCategoryService = new ProductCategoryService();
