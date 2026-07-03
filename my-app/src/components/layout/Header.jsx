import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart, FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { categories } from '../../data/categories';

const Header = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = useCartStore(state => state.getCount());
  const toggleCart = useCartStore(state => state.toggleSidebar);
  const wishlistCount = useWishlistStore(state => state.getCount());

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&cat=${category}`);
    }
  };

  return (
    <header className="bg-white border-b border-blush-deep sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4 md:py-5 gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-secondary w-9 h-9 flex items-center justify-center transition-colors hover:text-primary"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group mx-auto md:mx-0">
          <img src="/logo_transparent.png" alt="EmuuMart" className="h-16 w-auto object-contain" />
        </Link>

        {/* Search — hidden on mobile, shown md+ */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[400px] border border-blush-deep rounded-full overflow-hidden focus-within:border-primary transition-colors mx-auto bg-blush">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border-none outline-none px-5 py-2.5 text-sm bg-blush font-sans text-secondary placeholder:text-text-color"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="text-primary hover:text-primary-dark px-5 transition-colors flex items-center justify-center bg-blush">
            <FaSearch size={16} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative bg-blush hover:bg-primary hover:text-white text-primary w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-rose">
            <FaHeart className="text-sm" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button onClick={toggleCart} className="relative bg-primary hover:bg-primary-dark text-white w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md">
            <FaShoppingCart className="text-sm" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-gray-50 text-gray-600 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex border-2 border-gray-200 rounded-full overflow-hidden focus-within:border-primary transition-colors">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border-none outline-none px-4 py-2 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 transition-colors">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blush-deep bg-blush px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <Link
                key={cat.key}
                to={`/category/${cat.key}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-color hover:bg-blush-mid hover:text-primary transition-colors"
              >
                <span>{cat.icon}</span> {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
