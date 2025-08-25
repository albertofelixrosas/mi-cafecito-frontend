import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/dashboard.css';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="dashboard__main">
        <Header onMenuClick={toggleSidebar} />
        <main className="dashboard__content">
          <div className="dashboard__container">
            <Outlet />
          </div>
        </main>
      </div>
      {sidebarOpen && <div className="dashboard__overlay" onClick={closeSidebar} />}
    </div>
  );
};

export default DashboardLayout;
