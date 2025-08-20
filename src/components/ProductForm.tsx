'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useProducts } from '../hooks/useProducts';
import { useProductCategories } from '../hooks/useProductCategories';
import type { Product, CreateProductRequest } from '../models/product.model';
import '../styles/product-form.css';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { createProduct, updateProduct } = useProducts();
  const { categories } = useProductCategories();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateProductRequest>({
    productCategoryId: 0,
    productName: '',
    unitOfMeasurement: '',
    description: '',
    isElaborated: false,
    isPortioned: false,
    photoUrl: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productCategoryId: product.productCategoryId,
        productName: product.productName,
        unitOfMeasurement: product.unitOfMeasurement,
        description: product.description,
        isElaborated: product.isElaborated,
        isPortioned: product.isPortioned,
        photoUrl: product.photoUrl || '',
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        await updateProduct({ ...formData, productId: product.productId });
      } else {
        await createProduct(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'productCategoryId') {
      setFormData(prev => ({ ...prev, [name]: Number.parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="product-form__overlay">
      <div className="product-form__form">
        <header className="form__header">
          <h2 className="form__title">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="form__close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="productName">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form__input"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="productCategoryId">
              Category *
            </label>
            <select
              id="productCategoryId"
              name="productCategoryId"
              className="form__select"
              value={formData.productCategoryId}
              onChange={handleChange}
              required
            >
              <option value={0}>Select a category</option>
              {categories.map(category => (
                <option key={category.productCategoryId} value={category.productCategoryId}>
                  {category.productCategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="unitOfMeasurement">
              Unit of Measurement *
            </label>
            <input
              type="text"
              id="unitOfMeasurement"
              name="unitOfMeasurement"
              className="form__input"
              value={formData.unitOfMeasurement}
              onChange={handleChange}
              placeholder="e.g., kg, liters, pieces"
              required
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="form__textarea"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="photoUrl">
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              className="form__input"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form__checkboxes">
            <div className="form__checkbox-field">
              <input
                type="checkbox"
                id="isElaborated"
                name="isElaborated"
                className="form__checkbox"
                checked={formData.isElaborated}
                onChange={handleChange}
              />
              <label className="form__checkbox-label" htmlFor="isElaborated">
                Is Elaborated
              </label>
            </div>

            <div className="form__checkbox-field">
              <input
                type="checkbox"
                id="isPortioned"
                name="isPortioned"
                className="form__checkbox"
                checked={formData.isPortioned}
                onChange={handleChange}
              />
              <label className="form__checkbox-label" htmlFor="isPortioned">
                Is Portioned
              </label>
            </div>
          </div>

          <div className="form__actions">
            <button type="button" className="btn btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--submit" disabled={loading}>
              {loading ? 'Saving...' : product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
