'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product-form.css';
import { useProductCategoryById } from '../../hooks/product-categories/useProductCategoryById';
import { useCreateProductCategory } from '../../hooks/product-categories/useCreateProductCategory';
import { useUpdateProductCategory } from '../../hooks/product-categories/useUpdateProductCategory';
import type { ProductCategory } from '../../models/productCategory.model';
import { useForm } from 'react-hook-form';
import {
  productCategorySchema,
  type ProductCategorySchema,
} from '../../schemas/product-category.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ProductCategoryFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createProductCategory } = useCreateProductCategory();
  const { updateProductCategory } = useUpdateProductCategory();
  const { data: productCategoryData } = useProductCategoryById(id ? Number(id) : 0);
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductCategorySchema>({
    resolver: zodResolver(productCategorySchema),
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (productCategoryData) {
        setProductCategory(productCategoryData);
        setValue('description', productCategoryData.description);
        setValue('photoUrl', productCategoryData.photoUrl);
        setValue('productCategoryName', productCategoryData.productCategoryName);
      }
    }
  }, [isEdit, id, productCategoryData, setValue]);

  const onSubmit = async (formData: ProductCategorySchema): Promise<void> => {
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

        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <label className="form__label" htmlFor="productCategoryName">
              Nombre *
            </label>
            <input
              type="text"
              id="productCategoryName"
              className="form__input"
              {...register('productCategoryName')}
            />
            {errors.productCategoryName && (
              <span className="form__error-label">{errors.productCategoryName.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="description">
              Descripción *
            </label>
            <textarea
              id="description"
              className="form__textarea"
              {...register('description')}
              rows={3}
            />
            {errors.description && (
              <span className="form__error-label">{errors.description.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="photoUrl">
              URL de la imagen (opcional)
            </label>
            <input
              id="photoUrl"
              className="form__input"
              {...register('photoUrl')}
              placeholder="https://example.com/image.jpg"
            />
            {errors.photoUrl && (
              <span className="form__error-label">{errors.photoUrl.message}</span>
            )}
          </div>

          <div className="form__actions">
            <button type="button" className="btn btn--cancel" onClick={() => navigate('..')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCategoryFormModal;
