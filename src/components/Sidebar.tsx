import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdCategory,
  MdInventory,
  MdWarehouse,
  // MdSwapHoriz,
  MdAssessment,
  MdSettings,
  MdClose,
  MdArrowCircleDown,
  MdArrowCircleUp,
} from 'react-icons/md';
import '../styles/sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: MdDashboard, path: '/' },
    { id: 'categorias', label: 'CATEGORÍAS', icon: MdCategory, path: '/categorias' },
    { id: 'productos', label: 'PRODUCTOS', icon: MdInventory, path: '/productos' },
    { id: 'almacenes', label: 'ALMACENES', icon: MdWarehouse, path: '/almacenes' },
    { id: 'entradas', label: 'ENTRADAS', icon: MdArrowCircleDown, path: '/entradas' },
    { id: 'salidas', label: 'SALIDAS', icon: MdArrowCircleUp, path: '/salidas' },
    // { id: 'movimientos', label: 'MOVIMIENTOS', icon: MdSwapHoriz, path: '/movimientos' },
    { id: 'reportes', label: 'REPORTES', icon: MdAssessment, path: '/reportes' },
    {
      id: 'configuracion',
      label: 'CONFIGURACIÓN',
      icon: MdSettings,
      path: '/configuracion',
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
            {/*
              <img className="sidebar__logo-image" src="/logo.png" alt="logo" />
              */}
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
