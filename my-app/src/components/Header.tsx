import { FiSearch, FiBell } from 'react-icons/fi';

export const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex-1 flex items-center">
        <div className="relative w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search orders, products..." 
            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 text-gray-500 hover:bg-soft-bg hover:text-primary rounded-full transition-colors relative">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="w-px h-8 bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-200 text-primary flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
