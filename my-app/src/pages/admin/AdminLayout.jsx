import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopBar from '../../components/admin/AdminTopBar';
import DashboardPage from './DashboardPage';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import LoginPage from './LoginPage';
import MessagesPage from './MessagesPage';
import { useAuthStore } from '../../store/useAuthStore';

const CustomersPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-secondary mb-2">Customers</h1>
    <p className="text-gray-400 text-sm mb-8">View and manage your customers.</p>
    <div className="bg-white p-12 rounded-2xl text-center border border-blush-deep shadow-sm">
      <div className="text-5xl mb-4">👥</div>
      <p className="font-medium">Customer management coming soon...</p>
    </div>
  </div>
);

const AdminLayout = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex bg-soft-bg min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden pt-[64px] md:pt-0">
        <AdminTopBar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
