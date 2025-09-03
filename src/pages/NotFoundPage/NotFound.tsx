'use client';

import { useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import './notFound.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found__container">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Página no encontrada</p>
      <p className="not-found__text">
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </p>
      <button className="not-found__button" onClick={() => navigate('/')}>
        <MdHome className="not-found__icon" />
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFoundPage;
