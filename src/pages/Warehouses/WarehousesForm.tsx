'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product-form.css';
import { useCreateWarehouse } from '../../hooks/warehouses/useCreateWarehouse';
import { useUpdateWarehouse } from '../../hooks/warehouses/useUpdateWarehouse';
import { useWarehouseById } from '../../hooks/warehouses/useWarehouseById';
import type { CreateWarehouseRequest, Warehouse } from '../../models/warehouse.model';

const WarehouseFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createWarehouse } = useCreateWarehouse();
  const { updateWarehouse } = useUpdateWarehouse();
  const { data: warehouseData } = useWarehouseById(id ? Number(id) : 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);

  const [formData, setFormData] = useState<CreateWarehouseRequest>({
    warehouseName: '',
    location: '',
    photoUrl: '',
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (warehouseData) {
        setWarehouse(warehouseData);
        setFormData({
          photoUrl: warehouseData.photoUrl || '',
          location: warehouseData.location,
          warehouseName: warehouseData.warehouseName,
        });
      }
    }
  }, [isEdit, id, warehouseData]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && warehouse) {
        await updateWarehouse({
          ...formData,
          warehouseId: warehouse.warehouseId,
        });
      } else {
        await createWarehouse(formData);
      }
      navigate('..'); // volver a /productos
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValidWarehouse = (category: CreateWarehouseRequest): boolean => {
    return category.warehouseName.trim() !== '' && category.location.trim() !== '';
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
          <h2 className="form__title">{isEdit ? `Editar almacen` : 'Agregar nuevo almacen'}</h2>
          <button className="form__close-btn" onClick={() => navigate('..')}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="warehouseName">
              Nombre *
            </label>
            <input
              type="text"
              id="warehouseName"
              name="warehouseName"
              className="form__input"
              value={formData.warehouseName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="location">
              Localización *
            </label>
            <textarea
              id="location"
              name="location"
              className="form__textarea"
              value={formData.location}
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
              disabled={loading || !isValidWarehouse(formData)}
            >
              {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseFormModal;
