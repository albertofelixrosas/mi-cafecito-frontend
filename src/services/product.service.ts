import { apiService } from './api.service';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  FilterProductsDto,
  ProductResponse,
} from '../models/product.model';

export class ProductService {
  async getProducts(filters?: FilterProductsDto): Promise<ProductResponse> {
    return apiService.get<ProductResponse>('/products', { params: filters ?? {} });
  }

  async getProductById(id: number): Promise<Product> {
    return apiService.get<Product>(`${'/products'}/${id}`);
  }

  async createProduct(product: CreateProductRequest): Promise<Product> {
    console.log({ url: '/products' });
    return apiService.post<Product>('/products', product);
  }

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    const { productId, ...rest } = product;
    return apiService.patch<Product>(`${'/products'}/${productId}`, rest);
  }

  async deleteProduct(id: number): Promise<void> {
    return apiService.delete<void>(`${'/products'}/${id}`);
  }
}

export const productService = new ProductService();
