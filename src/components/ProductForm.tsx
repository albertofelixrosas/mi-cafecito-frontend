'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductCategories } from '../hooks/useProductCategories';
import type { Product, CreateProductRequest } from '../models/product.model';
import '../styles/product-form.css';
import { useProductById } from '../hooks/products/useProductById';
import { useCreateProduct } from '../hooks/products/useCreateProduct';
import { useUpdateProduct } from '../hooks/products/useUpdateProduct';

const ProductFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const { data: productData } = useProductById(id ? Number(id) : 0);
  const { categories } = useProductCategories();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<CreateProductRequest>({
    productCategoryId: 0,
    productName: '',
    unitOfMeasurement: '',
    description: '',
    isElaborated: false,
    isPortioned: false,
    photoUrl: '',
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (productData) {
        setProduct(productData);
        setFormData({
          productCategoryId: productData.productCategoryId,
          productName: productData.productName,
          unitOfMeasurement: productData.unitOfMeasurement,
          description: productData.description,
          isElaborated: productData.isElaborated,
          isPortioned: productData.isPortioned,
          photoUrl: productData.photoUrl || '',
        });
      }
    }
  }, [isEdit, id, productData]);

  const isValidProduct = (product: CreateProductRequest): boolean => {
    return (
      product.productName.trim() !== '' &&
      product.productCategoryId > 0 &&
      product.unitOfMeasurement.trim() !== '' &&
      product.description.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && product) {
        await updateProduct({ ...formData, productId: product.productId });
      } else {
        await createProduct(formData);
      }
      navigate('..'); // volver a /productos
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
          <h2 className="form__title">
            {isEdit ? `Modificar producto` : 'Agregar nuevo producto'}
          </h2>
          <button className="form__close-btn" onClick={() => navigate('..')}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="productName">
              Nombre *
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
              Categoria *
            </label>
            <select
              id="productCategoryId"
              name="productCategoryId"
              className="form__select"
              value={formData.productCategoryId}
              onChange={handleChange}
              required
            >
              <option value={0} disabled>
                Selecciona una categoría
              </option>
              {categories.map(category => (
                <option key={category.productCategoryId} value={category.productCategoryId}>
                  {category.productCategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="unitOfMeasurement">
              Unidad de medida *
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
                Es Elaborado
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
                Es porcionado
              </label>
            </div>
          </div>

          <div className="form__actions">
            <button type="button" className="btn btn--cancel" onClick={() => navigate('..')}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn--submit"
              disabled={loading || !isValidProduct(formData)}
            >
              {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
