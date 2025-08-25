import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdCategory,
  MdInventory,
  MdWarehouse,
  MdSwapHoriz,
  MdAssessment,
  MdSettings,
  MdClose,
} from 'react-icons/md';
import '../styles/sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: MdDashboard, path: '/dashboard' },
    { id: 'categorias', label: 'CATEGORÍAS', icon: MdCategory, path: '/dashboard/categorias' },
    { id: 'productos', label: 'PRODUCTOS', icon: MdInventory, path: '/dashboard/productos' },
    { id: 'almacenes', label: 'ALMACENES', icon: MdWarehouse, path: '/dashboard/almacenes' },
    { id: 'movimientos', label: 'MOVIMIENTOS', icon: MdSwapHoriz, path: '/dashboard/movimientos' },
    { id: 'reportes', label: 'REPORTES', icon: MdAssessment, path: '/dashboard/reportes' },
    {
      id: 'configuracion',
      label: 'CONFIGURACIÓN',
      icon: MdSettings,
      path: '/dashboard/configuracion',
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <img className="sidebar__logo-image" src="/logo.png" alt="logo" />
          </div>
          <button className="sidebar__close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <nav className="sidebar__nav">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`sidebar__nav-item ${isActive(item.path) ? 'sidebar__nav-item--active' : ''}`}
                onClick={onClose}
              >
                <IconComponent className="sidebar__nav-icon" />
                <span className="sidebar__nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
