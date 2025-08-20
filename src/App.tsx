'use client';

import type React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import './styles/app.css';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'productos':
        return <ProductList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="app__content">{renderContent()}</main>
    </div>
  );
};

export default App;
