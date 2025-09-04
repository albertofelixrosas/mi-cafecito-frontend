'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/product-form.css'; // puedes renombrar si quieres "user-form.css"
import { useCreateUser } from '../../hooks/users/useCreateUser';
import type { User } from '../../models/user.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '../../hooks/users/useUpdateUser';
import { useUserById } from '../../hooks/users/useUserById';
import { createUserSchema, type CreateUserSchema } from '../../schemas/user.schema';
import { useForm } from 'react-hook-form';

const UserFormModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si hay id → edición
  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const { data: userData } = useUserById(id ? Number(id) : 0);
  const [user, setUser] = useState<User | null>(null);

  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  // 🔹 Si estamos en edición, cargar usuario
  useEffect(() => {
    if (isEdit && id) {
      if (userData) {
        setUser(userData);
        setValue('name', userData.name);
        setValue('lastname', userData.lastname);
        setValue('role', userData.role);
      }
    }
  }, [isEdit, id, userData, setValue]);

  const onSubmit = async (formData: CreateUserSchema): Promise<void> => {
    try {
      if (isEdit && user) {
        await updateUser({
          ...formData,
          userId: user.userId,
        });
      } else {
        await createUser(formData);
      }
      navigate('..'); // volver a la lista de usuarios
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="product-form__overlay">
      <div className="product-form__form">
        <header className="form__header">
          <h2 className="form__title">{isEdit ? `Editar usuario` : 'Agregar nuevo usuario'}</h2>
          <button className="form__close-btn" onClick={() => navigate('..')}>
            <MdClose />
          </button>
        </header>

        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field">
            <label className="form__label" htmlFor="name">
              Nombre *
            </label>
            <input type="text" id="name" className="form__input" {...register('name')} />
            {errors.name && <span className="form__error-label">{errors.name.message}</span>}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="lastname">
              Apellido *
            </label>
            <input type="text" id="lastname" className="form__input" {...register('lastname')} />
            {errors.lastname && (
              <span className="form__error-label">{errors.lastname.message}</span>
            )}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="role">
              Rol *
            </label>
            <select id="role" className="form__input" {...register('role')}>
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            {errors.role && <span className="form__error-label">{errors.role.message}</span>}
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

export default UserFormModal;
