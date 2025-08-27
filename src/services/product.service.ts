import { apiService } from './api.service';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  FilterProductsDto,
  ProductResponse,
} from '../models/product.model';

export class ProductService {
  private readonly baseUrl = '/products';

  async getProducts(filters?: FilterProductsDto): Promise<ProductResponse> {
    return apiService.get<ProductResponse>(this.baseUrl, { params: filters ?? {} });
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
