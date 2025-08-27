'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import type { CreateProductCategoryRequest } from '../models/productCategory.model';
import '../styles/product-form.css';
import { useProductCategoryById } from '../hooks/product-categories/useProductCategoryById';
import { useCreateProductCategory } from '../hooks/product-categories/useCreateProductCategory';
import { useUpdateProductCategory } from '../hooks/product-categories/useUpdateProductCategories';
import type { ProductCategory } from '../models/productCategory.model';

const ProductCategoryFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createProductCategory } = useCreateProductCategory();
  const { updateProductCategory } = useUpdateProductCategory();
  const { data: productCategoryData } = useProductCategoryById(id ? Number(id) : 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);

  const [formData, setFormData] = useState<CreateProductCategoryRequest>({
    productCategoryName: '',
    description: '',
    photoUrl: '',
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (productCategoryData) {
        setProductCategory(productCategoryData);
        setFormData({
          description: productCategoryData.description,
          photoUrl: productCategoryData.photoUrl || '',
          productCategoryName: productCategoryData.productCategoryName,
        });
      }
    }
  }, [isEdit, id, productCategoryData]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && productCategory) {
        await updateProductCategory({
          ...formData,
          productCategoryId: productCategory.productCategoryId,
        });
      } else {
        await createProductCategory(formData);
      }
      navigate('..'); // volver a /productos
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValidProductCategory = (category: CreateProductCategoryRequest): boolean => {
    return category.productCategoryName.trim() !== '' && category.description.trim() !== '';
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
          <h2 className="form__title">{isEdit ? `Editar categoria` : 'Agregar nueva categoria'}</h2>
          <button className="form__close-btn" onClick={() => navigate('..')}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="productCategoryName">
              Nombre *
            </label>
            <input
              type="text"
              id="productCategoryName"
              name="productCategoryName"
              className="form__input"
              value={formData.productCategoryName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="description">
              Descripción *
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
              URL de la imagen (opcional)
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

          <div className="form__actions">
            <button type="button" className="btn btn--cancel" onClick={() => navigate('..')}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn--submit"
              disabled={loading || !isValidProductCategory(formData)}
            >
              {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCategoryFormModal;
