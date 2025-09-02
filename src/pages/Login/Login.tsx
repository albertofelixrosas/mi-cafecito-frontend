import { useState } from 'react';
import '../../styles/forms.css';
import '../../styles/login.css'; // estilos extra para la pantalla
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../schemas/login.schema';

const LoginPage = () => {
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async ({ email, password }: LoginSchema) => {
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        toast.error('Credenciales inválidas');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al iniciar sesión');
      console.error(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__brand">
          <h1 className="login__title">Mi Aplicación</h1>
          <p className="login__subtitle">Bienvenido, inicia sesión para continuar</p>
        </div>

        <div className="form">
          <div className="form__header">
            <h2 className="form__title">Iniciar sesión</h2>
          </div>

          <form className="form__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form__field">
              <label htmlFor="email" className="form__label">
                Correo electrónico
              </label>
              <input type="email" id="email" className="form__input" {...register('email')} />
              {errors.email && <span className="form__error-label">{errors.email.message}</span>}
            </div>

            <div className="form__field">
              <label htmlFor="password" className="form__label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form__input"
                {...register('password')}
              />
              {errors.password && (
                <span className="form__error-label">{errors.password.message}</span>
              )}
            </div>

            <div className="form__checkboxes">
              <div className="form__checkbox-field">
                <input
                  type="checkbox"
                  id="remember"
                  className="form__checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <label htmlFor="remember" className="form__checkbox-label">
                  Recuérdame
                </label>
              </div>
            </div>

            <div className="form__actions">
              <button type="button" className="btn btn--cancel">
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn--submit"
                disabled={isLoading}
                style={{ color: 'var(--color-text-inverse)' }}
              >
                {isLoading ? 'Cargando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
