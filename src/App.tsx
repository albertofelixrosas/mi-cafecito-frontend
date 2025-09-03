import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import RegisterForm from './components/RegisterForm';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import Categorias from './pages/Categories/Categories';
import Productos from './pages/Products/Products';
import ProductoFormModal from './pages/Products/ProductForm';
import Almacenes from './pages/Warehouses/Warehouses';
import Entradas from './pages/StockEntries/StockEntries';
import Reportes from './pages/Reports/Reports';
import Configuracion from './pages/Configuration/Configuration';
import ProductCategoryFormModal from './pages/Categories/ProductCategoryForm';
import WarehouseFormModal from './pages/Warehouses/WarehousesForm';
import NotFoundPage from './pages/NotFoundPage/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
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
          <Route path="almacenes" element={<Almacenes />}>
            <Route path="nuevo" element={<WarehouseFormModal />} />
            <Route path=":id/editar" element={<WarehouseFormModal />} />
          </Route>
          <Route path="entradas" element={<Entradas />}>
            <Route path="nuevo" element={<div>Formulario de nueva entrada</div>} />
            <Route path=":id/editar" element={<div>Formulario de editar entrada</div>} />
          </Route>
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// https://chat.deepseek.com/a/chat/s/4d6d1778-61de-45d5-bf91-5677057f58f2
