import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaBoxOpen, FaShoppingBag, FaUsers,
  FaSignOutAlt, FaChevronLeft, FaChevronRight, FaStore, FaEnvelope, FaTimes, FaBars
} from 'react-icons/fa';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { path: '/admin/products', label: 'Products', icon: <FaBoxOpen /> },
  { path: '/admin/orders', label: 'Orders', icon: <FaShoppingBag />, badge: true },
  { path: '/admin/customers', label: 'Customers', icon: <FaUsers /> },
  { path: '/admin/messages', label: 'Messages', icon: <FaEnvelope /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const orders = useOrderStore(state => state.orders);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const SidebarContent = ({ onLinkClick }) => (
    <>
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              title={collapsed ? item.label : undefined}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {item.badge && pendingOrders > 0 && (
                <span className={`${collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold`}>
                  {pendingOrders}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-2 py-3 space-y-1">
        <Link
          to="/"
          onClick={onLinkClick}
          title={collapsed ? 'View Store' : undefined}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <FaStore className="text-lg shrink-0" />
          {!collapsed && <span>View Store</span>}
        </Link>
        <button
          onClick={() => { handleLogout(); onLinkClick?.(); }}
          title={collapsed ? 'Logout' : undefined}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <FaSignOutAlt className="text-lg shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className={`hidden md:flex ${collapsed ? 'w-16' : 'w-60'} bg-secondary text-white flex-col h-screen sticky top-0 transition-all duration-300 shrink-0 z-40 shadow-xl`}>
        {/* Header */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-4 py-5 border-b border-white/10`}>
          {!collapsed && (
            <img src="/logo_transparent.png" alt="EmuuMart" className="h-12 w-auto object-contain" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors shrink-0"
          >
            {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-secondary text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <img src="/logo_transparent.png" alt="EmuuMart" className="h-10 w-auto object-contain" />
        <div className="flex items-center gap-3">
          {pendingOrders > 0 && (
            <span className="bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {pendingOrders}
            </span>
          )}
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
          >
            <FaBars className="text-base" />
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 bg-secondary text-white flex flex-col h-full shadow-2xl animate-slide-in-left">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <img src="/logo_transparent.png" alt="EmuuMart" className="h-12 w-auto object-contain" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
            <SidebarContent onLinkClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
