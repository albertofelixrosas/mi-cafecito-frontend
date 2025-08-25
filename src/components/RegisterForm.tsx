import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './RegisterForm.css';
import type { RegisterData } from '../types/auth';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError('Error al crear la cuenta. Intenta nuevamente.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="form__header">
        <h2 className="form__title">Crear Cuenta</h2>
      </div>

      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        <div className="form__field">
          <label htmlFor="confirmPassword" className="form__label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        {error && <div className="form__error">{error}</div>}

        <div className="form__actions">
          <Link to="/login" className="btn btn--cancel">
            Cancelar
          </Link>
          <button type="submit" className="btn btn--submit" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </div>

        <div className="form__footer">
          <p className="form__footer-text">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="form__footer-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
