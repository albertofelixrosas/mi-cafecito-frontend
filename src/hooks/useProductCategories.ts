'use client';

import { useState, useEffect } from 'react';
import type {
  ProductCategory,
  CreateProductCategoryRequest,
  UpdateProductCategoryRequest,
} from '../models/productCategory.model';
import { productCategoryService } from '../services/productCategory.service';

export const useProductCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await productCategoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: CreateProductCategoryRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await productCategoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
    } catch (err) {
      setError('Failed to create category');
      console.error('Error creating category:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryData: UpdateProductCategoryRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await productCategoryService.updateCategory(categoryData);
      setCategories(prev =>
        prev.map(category =>
          category.productCategoryId === updatedCategory.productCategoryId
            ? updatedCategory
            : category,
        ),
      );
    } catch (err) {
      setError('Failed to update category');
      console.error('Error updating category:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await productCategoryService.deleteCategory(id);
      setCategories(prev => prev.filter(category => category.productCategoryId !== id));
    } catch (err) {
      setError('Failed to delete category');
      console.error('Error deleting category:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
