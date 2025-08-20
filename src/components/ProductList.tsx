'use client';

import type React from 'react';
import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import { useProducts } from '../hooks/useProducts';
import { useProductCategories } from '../hooks/useProductCategories';
import ProductForm from './ProductForm';
import type { Product } from '../models/product.model';
import '../styles/product-list.css';
import '../styles/table.css';

const ProductList: React.FC = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const { categories } = useProductCategories();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = products.filter(
    product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(cat => cat.productCategoryId === categoryId);
    return category?.productCategoryName || 'Unknown Category';
  };

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleCloseForm = (): void => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="product-list__loading">Loading products...</div>;
  }

  if (error) {
    return <div className="product-list__error">Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <header className="product-list__header">
        <h1 className="product-list__title">PRODUCTOS</h1>
        <button className="btn btn--submit" onClick={() => setShowForm(true)}>
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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form__search">
          <MdSearch className="form__search-icon" />
          <input
            type="text"
            className="form__search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
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
            {filteredProducts.map(product => (
              <tr key={product.productId} className="table__row">
                <td className="table__cell table__cell--name">{product.productName}</td>
                <td className="table__cell">{getCategoryName(product.productCategoryId)}</td>
                <td className="table__cell">{product.unitOfMeasurement}</td>
                <td className="table__cell table__cell--description">{product.description}</td>
                <td className="table__cell">
                  <span
                    className={`table__badge ${product.isElaborated ? 'table__badge--yes' : 'table__badge--no'}`}
                  >
                    {product.isElaborated ? 'Si' : 'No'}
                  </span>
                </td>
                <td className="table__cell">
                  <span
                    className={`table__badge ${product.isPortioned ? 'table__badge--yes' : 'table__badge--no'}`}
                  >
                    {product.isPortioned ? 'Si' : 'No'}
                  </span>
                </td>
                <td className="table__cell">
                  <div className="table__actions">
                    <button
                      className="table__action-btn table__action-btn--edit"
                      onClick={() => handleEdit(product)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="table__action-btn table__action-btn--delete"
                      onClick={() => handleDelete(product.productId)}
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

      {showForm && <ProductForm product={editingProduct} onClose={handleCloseForm} />}
    </div>
  );
};

export default ProductList;
