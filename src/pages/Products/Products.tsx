import React from 'react';
import { MdAdd, MdDelete, MdEdit, MdSearch } from 'react-icons/md';
import { useNavigate, Outlet, Link, useSearchParams } from 'react-router-dom';
import '../../styles/product-list.css';
import { useProducts } from '../../hooks/products/useProducts';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { usePaginationParams } from '../../hooks/usePaginationParams';
import Pagination from '../../components/Pagination';
import { useProductCategories } from '../../hooks/useProductCategories';

type ProductFiltersKeys = 'name' | 'categoryId' | 'page' | 'limit';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const {
    deleteProduct,
    // isPending: isLoadingDeleteProduct,
    // error: errorAtDelete,
  } = useDeleteProduct();

  const [searchParams, setSearchParams] = useSearchParams();

  const { page, setPage } = usePaginationParams(); // para que el hook gestione el parámetro 'page' en la URL

  const filters = {
    name: searchParams.get('name') || undefined,
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
  };

  const { categories } = useProductCategories();

  const {
    products,
    /* isLoading: isLoadingProducts, */ error: errorAtGet,
    pagination,
  } = useProducts(filters);

  // 🔄 actualizar la URL (y por lo tanto los filtros)
  const handleFilterChange = (key: ProductFiltersKeys, value: string | number | undefined) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }

    // resetear a la página 1 si cambian filtros
    if (key !== 'page') {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

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
        <h1 className="product-list__title">PRODUCTOS</h1>
        <button className="btn btn--submit" onClick={() => navigate('nuevo')}>
          <MdAdd className="product-list__add-icon" />
          Add Product
        </button>
      </header>

      <div className="product-list__controls">
        <div className="form__search">
          <MdSearch className="form__search-icon" />
          <input
            type="text"
            className="form__search-input"
            placeholder="Search products..."
            value={filters.name || ''}
            onChange={e => handleFilterChange('name', e.target.value)}
          />
        </div>
        <div>
          <label className="form__label" htmlFor="">
            Buscar por categoría de producto
          </label>
          <select
            className="form__select"
            name="categoryId"
            id="categoryId"
            value={filters.categoryId || ''}
            onChange={e => handleFilterChange('categoryId', e.target.value)}
          >
            <option value="">{'(Sin especificar)'}</option>
            {categories.map(category => (
              <option
                key={category.productCategoryId}
                value={category.productCategoryId}
                selected={filters.categoryId === category.productCategoryId}
                onClick={() =>
                  handleFilterChange(
                    'categoryId',
                    filters.categoryId === category.productCategoryId
                      ? undefined
                      : category.productCategoryId,
                  )
                }
              >
                {category.productCategoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th className="table__header">Name</th>
              <th className="table__header">Category</th>
              <th className="table__header">Unit</th>
              <th className="table__header">Description</th>
              <th className="table__header">Elaborated</th>
              <th className="table__header">Portioned</th>
              <th className="table__header">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {products.map(product => (
              <tr key={product.productId} className="table__row">
                <td className="table__cell table__cell--name">{product.productName}</td>
                <td className="table__cell">{product.category.productCategoryName}</td>
                <td className="table__cell">{product.unitOfMeasurement}</td>
                <td className="table__cell table__cell--description">{product.description}</td>
                <td className="table__cell">
                  <span
                    className={`table__badge ${
                      product.isElaborated ? 'table__badge--yes' : 'table__badge--no'
                    }`}
                  >
                    {product.isElaborated ? 'Si' : 'No'}
                  </span>
                </td>
                <td className="table__cell">
                  <span
                    className={`table__badge ${
                      product.isPortioned ? 'table__badge--yes' : 'table__badge--no'
                    }`}
                  >
                    {product.isPortioned ? 'Si' : 'No'}
                  </span>
                </td>
                <td className="table__cell">
                  <div className="table__actions">
                    <Link
                      to={`${product.productId}/editar`}
                      className="table__action-btn table__action-btn--edit"
                    >
                      <MdEdit />
                    </Link>
                    <button
                      className="table__action-btn table__action-btn--delete"
                      onClick={() => deleteProduct(product.productId)}
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
      <Pagination
        page={page}
        lastPage={Math.ceil(pagination.total / pagination.limit)}
        onPageChange={setPage}
        total={pagination.total} // Aquí deberías pasar el total de productos basado en la respuesta del servidor
        pageRange={2}
      />

      {/* 👇 Aquí se montará el modal cuando la ruta sea /productos/nuevo o /productos/:id/editar */}
      <Outlet />
    </div>
  );
};

export default Products;
