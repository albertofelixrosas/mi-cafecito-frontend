'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product-form.css';
import { useCreateWarehouse } from '../../hooks/warehouses/useCreateWarehouse';
import { useUpdateWarehouse } from '../../hooks/warehouses/useUpdateWarehouse';
import { useWarehouseById } from '../../hooks/warehouses/useWarehouseById';
import type { Warehouse } from '../../models/warehouse.model';
import { useForm } from 'react-hook-form';
import { warehouseSchema, type WarehouseSchema } from '../../schemas/warehouses.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const WarehouseFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createWarehouse } = useCreateWarehouse();
  const { updateWarehouse } = useUpdateWarehouse();
  const { data: warehouseData } = useWarehouseById(id ? Number(id) : 0);
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WarehouseSchema>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      warehouseName: '',
      location: '',
      photoUrl: '',
    },
  });

  const isEdit = Boolean(id);

  // 🔹 Si estamos en edición, cargar el producto
  useEffect(() => {
    if (isEdit && id) {
      if (warehouseData) {
        setWarehouse(warehouseData);
        setValue('warehouseName', warehouseData.warehouseName);
        setValue('location', warehouseData.location);
        setValue('photoUrl', warehouseData.photoUrl || '');
      }
    }
  }, [isEdit, id, warehouseData, setValue]);

  const onSubmit = async (formData: WarehouseSchema): Promise<void> => {
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

        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <label className="form__label" htmlFor="warehouseName">
              Nombre *
            </label>
            <input
              type="text"
              id="warehouseName"
              className="form__input"
              {...register('warehouseName')}
            />
            {errors.warehouseName && (
              <span className="form__error-label">{errors.warehouseName.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="location">
              Localización *
            </label>
            <textarea id="location" className="form__textarea" rows={3} {...register('location')} />
            {errors.location && (
              <span className="form__error-label">{errors.location.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="photoUrl">
              URL de la imagen (opcional)
            </label>
            <input
              type="url"
              id="photoUrl"
              className="form__input"
              placeholder="https://example.com/image.jpg"
              {...register('photoUrl')}
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

export default WarehouseFormModal;
