'use client';

import { useState, useEffect } from 'react';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../models/product.model';
import { productService } from '../services/product.service';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: CreateProductRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productData: UpdateProductRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await productService.updateProduct(productData);
      setProducts(prev =>
        prev.map(product =>
          product.productId === updatedProduct.productId ? updatedProduct : product,
        ),
      );
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.productId !== id));
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
