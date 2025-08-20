import type React from 'react';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">DASHBOARD</h1>
      </header>

      <div className="dashboard__content">
        <div className="dashboard__cards">
          <div className="dashboard__card">
            <h3 className="dashboard__card-title">Total Products</h3>
            <p className="dashboard__card-value">156</p>
          </div>

          <div className="dashboard__card">
            <h3 className="dashboard__card-title">Categories</h3>
            <p className="dashboard__card-value">12</p>
          </div>

          <div className="dashboard__card">
            <h3 className="dashboard__card-title">Warehouses</h3>
            <p className="dashboard__card-value">3</p>
          </div>

          <div className="dashboard__card">
            <h3 className="dashboard__card-title">Low Stock Items</h3>
            <p className="dashboard__card-value dashboard__card-value--warning">8</p>
          </div>
        </div>

        <div className="dashboard__charts">
          <div className="dashboard__chart">
            <h3 className="dashboard__chart-title">Recent Stock Movements</h3>
            <div className="dashboard__chart-placeholder">
              Chart placeholder - Stock movements over time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
