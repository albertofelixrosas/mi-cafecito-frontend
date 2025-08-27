import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import Categorias from './pages/Categories/Categories';
import Productos from './pages/Products/Products';
import ProductoFormModal from './components/ProductForm';
import Almacenes from './pages/Warehouses/Warehouses';
import Entradas from './pages/StockEntries/StockEntries';
import Reportes from './pages/Reports/Reports';
import Configuracion from './pages/Configuration/Configuration';
import ProductCategoryFormModal from './components/ProductCategoryForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Rutas protegidas con layout de dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="categorias" element={<Categorias />}>
            <Route path="nuevo" element={<ProductCategoryFormModal />} />
            <Route path=":id/editar" element={<ProductCategoryFormModal />} />
          </Route>
          <Route path="productos" element={<Productos />}>
            <Route path="nuevo" element={<ProductoFormModal />} />
            <Route path=":id/editar" element={<ProductoFormModal />} />
          </Route>
          <Route path="almacenes" element={<Almacenes />} />
          <Route path="entradas" element={<Entradas />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Ruta 404 */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// https://chat.deepseek.com/a/chat/s/4d6d1778-61de-45d5-bf91-5677057f58f2
