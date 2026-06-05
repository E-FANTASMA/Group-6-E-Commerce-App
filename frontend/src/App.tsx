import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';
import { getAuthToken } from './api/auth';
import WalletPage from './pages/WalletPage';
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminOrdersPage from './pages/AdminOrdersPage'

function App() {
  const token = getAuthToken();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
              <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/account"
  element={
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/product/:id"
  element={
    <ProtectedRoute>
      <ProductPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboardPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrdersPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <ProductsPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/customers"
  element={
    <AdminRoute>
      <CustomersPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/settings"
  element={
    <AdminRoute>
      <SettingsPage />
    </AdminRoute>
  }
/>
        <Route path="/checkout" element={<Navigate to="/cart" replace />} />
        <Route path="/confirmation" element={<Navigate to="/cart" replace />} />
        <Route
  path="/wallet/fund"
  element={
    <ProtectedRoute>
      <WalletPage />
    </ProtectedRoute>
  }
/>
        <Route path="/splash" element={<SplashPage />} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
