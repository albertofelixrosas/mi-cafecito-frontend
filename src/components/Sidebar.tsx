'use client';

import type React from 'react';
import {
  MdDashboard,
  MdCategory,
  MdInventory,
  MdWarehouse,
  MdSwapHoriz,
  MdAssessment,
  MdSettings,
} from 'react-icons/md';
import '../styles/sidebar.css';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: MdDashboard },
    { id: 'categorias', label: 'CATEGORÍAS', icon: MdCategory },
    { id: 'productos', label: 'PRODUCTOS', icon: MdInventory },
    { id: 'almacenes', label: 'ALMACENES', icon: MdWarehouse },
    { id: 'movimientos', label: 'MOVIMIENTOS', icon: MdSwapHoriz },
    { id: 'reportes', label: 'REPORTES', icon: MdAssessment },
    { id: 'configuracion', label: 'CONFIGURACIÓN', icon: MdSettings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <img className="sidebar__logo-image" src="logo.png" alt="logo" />
        </div>
      </div>

      <nav className="sidebar__nav">
        {menuItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar__nav-item ${activeView === item.id ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <IconComponent className="sidebar__nav-icon" />
              <span className="sidebar__nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
