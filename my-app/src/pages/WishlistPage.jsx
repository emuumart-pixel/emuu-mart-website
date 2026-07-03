import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { FaHeartBroken, FaShoppingCart, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import StarRating from '../components/ui/StarRating';

const WishlistPage = () => {
  const { items, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] pb-16 pt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-secondary">My Wishlist</h1>
          <span className="text-sm font-bold text-gray-400 bg-white px-4 py-1.5 rounded-full shadow-sm">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6 text-gray-300 flex justify-center"><FaHeartBroken /></div>
            <h2 className="text-2xl font-bold text-secondary mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love and buy them later.</p>
            <Link to="/" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col relative group border border-gray-100">
                <div className="h-40 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <span className="text-[4rem] group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                    {product.emoji || '📦'}
                  </span>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{product.cat}</p>
                  <h3 className="font-semibold text-secondary text-sm line-clamp-2 mb-2">{product.name}</h3>
                  <div className="mb-3"><StarRating rating={product.rating} /></div>
                  <div className="text-lg font-extrabold text-primary mb-4">₨ {product.price.toLocaleString()}</div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-gray-100 hover:bg-primary hover:text-white text-secondary font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <FaShoppingCart /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
