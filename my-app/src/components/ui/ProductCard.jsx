import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaBan } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import StarRating from './StarRating';

const badgeColors = {
  Sale: 'bg-red-500',
  Best: 'bg-primary',
  Hot: 'bg-orange-500',
  New: 'bg-emerald-500',
  'Sold Out': 'bg-gray-800',
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isWishlisted = useWishlistStore(state => state.isWishlisted(product.id));

  const isSoldOut = product.badge === 'Sold Out';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist!');
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full relative border border-gray-100 hover:border-primary/20 ${isSoldOut ? 'opacity-80' : ''}`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className={`${badgeColors[product.badge] || 'bg-gray-400'} text-white px-2 py-0.5 text-[10px] font-bold rounded-full w-fit`}>
            {product.badge}
          </span>
        )}
        {!isSoldOut && discount > 0 && (
          <span className="bg-orange-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-full w-fit">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleWishlist}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all"
        >
          {isWishlisted
            ? <FaHeart className="text-primary group-hover:text-white text-sm" />
            : <FaRegHeart className="text-sm" />
          }
        </button>
      </div>

      {/* Image / Emoji Area */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {product.images?.[0] || product.image ? (
          <img src={product.images?.[0] || product.image} alt={product.name} className={`w-full h-full object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale' : 'group-hover:scale-105'}`} />
        ) : (
          <span className={`text-[5rem] drop-shadow filter transition-transform duration-300 ${isSoldOut ? 'grayscale' : 'group-hover:scale-110'}`}>
            {product.emoji || '📦'}
          </span>
        )}

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-gray-900 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <FaBan className="text-red-400" /> Sold Out
            </div>
          </div>
        )}

        {/* Add to cart overlay (hidden if sold out) */}
        {!isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-center text-xs font-bold py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 w-full">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-primary uppercase tracking-widest mb-1 font-semibold">{product.cat}</div>
        <h3 className="font-semibold text-gray-800 text-[14px] leading-snug mb-2 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="mb-3">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <div className={`font-extrabold text-lg leading-none flex items-center gap-0.5 ${isSoldOut ? 'text-gray-400' : 'text-primary'}`}>
              <span className="text-sm font-semibold">₨</span>
              {product.price.toLocaleString()}
            </div>
            {product.oldPrice && (
              <div className="text-xs text-gray-400 line-through mt-0.5">
                ₨ {product.oldPrice.toLocaleString()}
              </div>
            )}
          </div>
          {isSoldOut ? (
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Unavailable</span>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-soft-bg hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 hover:shadow-md"
              aria-label="Add to cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
