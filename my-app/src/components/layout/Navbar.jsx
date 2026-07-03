import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaFire, FaTag } from 'react-icons/fa';
import { categories } from '../../data/categories';

const Navbar = () => {
  const [hoveredCat, setHoveredCat] = useState(null);

  return (
    <nav className="bg-white border-b border-gray-200 hidden md:block shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center px-4">
        {/* Nav Links */}
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/category/${cat.key}`}
              className="py-4 text-sm font-semibold text-secondary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-2 uppercase tracking-wide"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            to="/search"
            className="py-4 text-sm font-semibold text-primary whitespace-nowrap flex items-center gap-2 uppercase tracking-wide"
          >
            Sale
          </Link>
          <Link
            to="/about"
            className="py-4 text-sm font-semibold text-secondary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-2 uppercase tracking-wide"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="py-4 text-sm font-semibold text-secondary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-2 uppercase tracking-wide"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
