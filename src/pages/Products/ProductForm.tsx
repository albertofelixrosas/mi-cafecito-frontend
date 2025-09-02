'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductCategories } from '../../hooks/product-categories/useProductCategories';
import type { Product } from '../../models/product.model';
import '../../styles/product-form.css';
import { useProductById } from '../../hooks/products/useProductById';
import { useCreateProduct } from '../../hooks/products/useCreateProduct';
import { useUpdateProduct } from '../../hooks/products/useUpdateProduct';
import { useForm } from 'react-hook-form';
import { productSchema, type ProductSchema } from '../../schemas/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ProductFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const { data: productData } = useProductById(id ? Number(id) : 0);
  const { productCategories } = useProductCategories();
  const [product, setProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      productCategoryId: 0,
      unitOfMeasurement: '',
      description: '',
      photoUrl: '',
      isElaborated: false,
      isPortioned: false,
      barCode: '',
      minStock: 1,
    },
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (productData) {
        setProduct(productData);
        setValue('productName', productData.productName);
        setValue('productCategoryId', productData.productCategoryId);
        setValue('unitOfMeasurement', productData.unitOfMeasurement);
        setValue('description', productData.description);
        setValue('photoUrl', productData.photoUrl || undefined);
        setValue('isElaborated', productData.isElaborated);
        setValue('isPortioned', productData.isPortioned);
        setValue('barCode', productData.barCode || undefined);
        setValue('minStock', productData.minStock);
      }
    }
  }, [isEdit, id, productData, setValue]);

  const onSubmit = async (formData: ProductSchema): Promise<void> => {
    const normalizedData = {
      ...formData,
      barCode: formData.barCode === '' || !formData.barCode ? null : formData.barCode,
      photoUrl: formData.photoUrl === '' || !formData.photoUrl ? null : formData.photoUrl,
    };

    try {
      if (isEdit && product) {
        await updateProduct({
          ...normalizedData,
          productId: product.productId,
        });
      } else {
        await createProduct(normalizedData);
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
          <h2 className="form__title">
            {isEdit ? `Modificar producto` : 'Agregar nuevo producto'}
          </h2>
          <button className="form__close-btn" onClick={() => navigate('..')}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <label className="form__label" htmlFor="productName">
              Nombre *
            </label>
            <input
              type="text"
              id="productName"
              className="form__input"
              {...register('productName')}
            />
            {errors.productName && (
              <span className="form__error-label">{errors.productName.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="productCategoryId">
              Categoria *
            </label>
            <select
              id="productCategoryId"
              className="form__select"
              {...register('productCategoryId', { valueAsNumber: true })}
            >
              <option value={0} disabled>
                Selecciona una categoría
              </option>
              {productCategories.map(category => (
                <option key={category.productCategoryId} value={category.productCategoryId}>
                  {category.productCategoryName}
                </option>
              ))}
            </select>
            {errors.productCategoryId && (
              <span className="form__error-label">{errors.productCategoryId.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="unitOfMeasurement">
              Unidad de medida *
            </label>
            <input
              type="text"
              id="unitOfMeasurement"
              className="form__input"
              placeholder="e.g., kg, liters, pieces"
              {...register('unitOfMeasurement')}
            />
            {errors.unitOfMeasurement && (
              <span className="form__error-label">{errors.unitOfMeasurement.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="description">
              Descripción *
            </label>
            <textarea
              id="description"
              className="form__textarea"
              rows={3}
              {...register('description')}
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
              placeholder="https://example.com/image.jpg"
              {...register('photoUrl')}
            />
            {errors.photoUrl && (
              <span className="form__error-label">{errors.photoUrl.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="minStock">
              Stock minimo
            </label>
            <input
              type="number"
              id="minStock"
              className="form__input"
              {...register('minStock', { valueAsNumber: true })}
            />
            {errors.minStock && (
              <span className="form__error-label">{errors.minStock.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="barCode">
              Codigo de Barras (opcional)
            </label>
            <input type="text" id="barCode" className="form__input" {...register('barCode')} />
            {errors.barCode && <span className="form__error-label">{errors.barCode.message}</span>}
          </div>

          <div className="form__checkboxes">
            <div className="form__checkbox-field">
              <input
                type="checkbox"
                id="isElaborated"
                className="form__checkbox"
                {...register('isElaborated')}
              />
              <label className="form__checkbox-label" htmlFor="isElaborated">
                Es Elaborado
              </label>
              {errors.isElaborated && (
                <span className="form__error-label">{errors.isElaborated.message}</span>
              )}
            </div>

            <div className="form__checkbox-field">
              <input
                type="checkbox"
                id="isPortioned"
                className="form__checkbox"
                {...register('isPortioned')}
              />
              <label className="form__checkbox-label" htmlFor="isPortioned">
                Es porcionado
              </label>
              {errors.isPortioned && (
                <span className="form__error-label">{errors.isPortioned.message}</span>
              )}
            </div>
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

export default ProductFormModal;
