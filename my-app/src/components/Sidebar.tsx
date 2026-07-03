import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiPlusSquare, FiSettings } from 'react-icons/fi';

export const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: FiHome },
    { name: 'Orders', path: '/orders', icon: FiShoppingBag },
    { name: 'Add Product', path: '/products/new', icon: FiPlusSquare },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col shadow-sm">
      <div className="p-6 flex items-center justify-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary">
          Emuu<span className="text-secondary">Mart</span>
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-200 hover:text-primary'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
          <FiSettings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};
