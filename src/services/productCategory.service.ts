import { apiService } from './api.service';
import type {
  ProductCategory,
  CreateProductCategoryRequest,
  UpdateProductCategoryRequest,
} from '../models/productCategory.model';

export class ProductCategoryService {
  private readonly baseUrl = '/product-categories';

  async getAllCategories(): Promise<ProductCategory[]> {
    return apiService.get<ProductCategory[]>(this.baseUrl);
  }

  async getCategoryById(id: number): Promise<ProductCategory> {
    return apiService.get<ProductCategory>(`${this.baseUrl}/${id}`);
  }

  async createCategory(category: CreateProductCategoryRequest): Promise<ProductCategory> {
    return apiService.post<ProductCategory>(this.baseUrl, category);
  }

  async updateCategory(category: UpdateProductCategoryRequest): Promise<ProductCategory> {
    return apiService.put<ProductCategory>(
      `${this.baseUrl}/${category.productCategoryId}`,
      category,
    );
  }

  async deleteCategory(id: number): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const productCategoryService = new ProductCategoryService();
