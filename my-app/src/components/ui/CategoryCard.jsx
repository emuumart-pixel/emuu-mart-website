import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category, productCount }) => {
  return (
    <Link
      to={`/category/${category.key}`}
      className="group flex flex-col items-center gap-2 py-4 px-2 rounded-2xl bg-white hover:bg-blush border border-blush-deep hover:border-primary/30 transition-all duration-200 hover:shadow-rose cursor-pointer"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm overflow-hidden bg-blush">
        <img src={category.image} alt={category.label} className="w-full h-full object-cover" />
      </div>
      <div className="text-center">
        <h3 className="text-xs md:text-sm font-semibold text-secondary group-hover:text-primary transition-colors leading-tight">
          {category.label}
        </h3>
        {productCount !== undefined && (
          <p className="text-[10px] text-text-color mt-0.5">{productCount} items</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
