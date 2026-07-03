import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useOrderStore } from '../../store/useOrderStore';

const AdminTopBar = () => {
  const admin = useAuthStore(state => state.admin);
  const orders = useOrderStore(state => state.orders);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <header className="bg-white border-b border-blush-deep px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-secondary">EmuuMart Admin</h2>
        <p className="text-xs text-gray-400">Welcome back, {admin?.name || 'Admin'}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-blush flex items-center justify-center text-primary hover:bg-blush-mid transition-colors">
            <FaBell className="text-sm" />
          </button>
          {pendingOrders > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {pendingOrders}
            </span>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
            <FaUserCircle className="text-xl" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-secondary">{admin?.name || 'Admin'}</p>
            <p className="text-[11px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
