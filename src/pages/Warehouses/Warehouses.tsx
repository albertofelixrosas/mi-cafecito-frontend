import React from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate, Outlet, Link /* useSearchParams */ } from 'react-router-dom';
import '../../styles/product-list.css';
import { useWarehouses } from '../../hooks/warehouses/useWarehouses';
import { useDeleteWarehouse } from '../../hooks/warehouses/useDeleteWarehouse';

const Warehouses: React.FC = () => {
  const navigate = useNavigate();
  const {
    deleteWarehouse,
    // isPending: isLoadingDeleteProduct,
    // error: errorAtDelete,
  } = useDeleteWarehouse();

  /*
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    name: searchParams.get('name') || undefined,
  };
   */

  const {
    warehouses,
    // isFetching,
    /* isLoading: isLoadingProducts, */
    error: errorAtGet,
  } = useWarehouses();

  // 🔄 actualizar la URL (y por lo tanto los filtros)
  /*
  const handleFilterChange = (key: WarehousesFiltersKeys, value: string | number | undefined) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams);
  };
  */

  // 📌 Loader modal
  /*
  if (isLoadingProducts) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="product-list__title">Cargando productos...</p>
        </div>
      </div>
    );
  }
  */

  // 📌 Error modal
  if (errorAtGet) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Ocurrió un error</h2>
          <p>{errorAtGet.message}</p>
          <button onClick={() => window.location.reload()} className="btn btn--submit">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <header className="product-list__header">
        <h1 className="product-list__title">ALMACENES</h1>
        <button className="btn btn--submit" onClick={() => navigate('nuevo')}>
          <MdAdd className="product-list__add-icon" />
          Agregar nueva
        </button>
      </header>

      {/*
        <div className="product-list__controls">
        <div className="form__search">
          <MdSearch className="form__search-icon" />
          <input
            type="text"
            className="form__search-input"
            placeholder="Buscar almacenes..."
            value={filters.name || ''}
            onChange={e => handleFilterChange('name', e.target.value)}
          />
        </div>
      </div>
      */}

      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th className="table__header">Nombre</th>
              <th className="table__header">Localización</th>
              <th className="table__header">Acciones</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {warehouses.map(warehouse => (
              <tr key={warehouse.warehouseId} className="table__row">
                <td className="table__cell table__cell--name">{warehouse.warehouseName}</td>
                <td className="table__cell table__cell--description">{warehouse.location}</td>
                <td className="table__cell">
                  <div className="table__actions">
                    <Link
                      to={`${warehouse.warehouseId}/editar`}
                      className="table__action-btn table__action-btn--edit"
                    >
                      <MdEdit />
                    </Link>
                    <button
                      className="table__action-btn table__action-btn--delete"
                      onClick={() => deleteWarehouse(warehouse.warehouseId)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 👇 Aquí se montará el modal cuando la ruta sea /productos/nuevo o /productos/:id/editar */}
      <Outlet />
    </div>
  );
};

export default Warehouses;
