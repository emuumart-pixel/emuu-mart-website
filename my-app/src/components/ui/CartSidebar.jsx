import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { items, isOpen, toggleSidebar, updateQty, removeFromCart, getTotal } = useCartStore();

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    toggleSidebar();
    navigate('/checkout');
  };

  const handleCartPage = () => {
    toggleSidebar();
    navigate('/cart');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
            <FaShoppingBag className="text-primary" /> Your Cart
          </h2>
          <button 
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4">
                🛒
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-[200px]">Looks like you haven't added anything yet.</p>
              <button 
                onClick={toggleSidebar}
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-full transition-colors text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 relative group">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.emoji || '📦'
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-semibold text-sm text-secondary leading-tight line-clamp-1 pr-6">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.cat}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-primary font-bold text-sm">₨ {item.price.toLocaleString()}</div>
                      <div className="flex items-center bg-gray-100 rounded-md p-1 h-7">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaMinus className="text-[10px]" /></button>
                        <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaPlus className="text-[10px]" /></button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaTrash className="text-[11px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-secondary">₨ {getTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Checkout Now
              </button>
              <button 
                onClick={handleCartPage}
                className="w-full bg-white hover:bg-gray-50 text-secondary font-bold py-3.5 rounded-xl transition-colors border-2 border-gray-100"
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
