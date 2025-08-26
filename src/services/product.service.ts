import { apiService } from './api.service';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  FilterProductsDto,
} from '../models/product.model';

export class ProductService {
  private readonly baseUrl = '/products';

  async getAllProducts(filters?: FilterProductsDto): Promise<Product[]> {
    return apiService.get<Product[]>(this.baseUrl, { params: filters ?? {} });
  }

  async getProductById(id: number): Promise<Product> {
    return apiService.get<Product>(`${this.baseUrl}/${id}`);
  }

  async createProduct(product: CreateProductRequest): Promise<Product> {
    return apiService.post<Product>(this.baseUrl, product);
  }

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    return apiService.put<Product>(`${this.baseUrl}/${product.productId}`, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return apiService.get<Product[]>(`${this.baseUrl}/category/${categoryId}`);
  }
}

export const productService = new ProductService();
