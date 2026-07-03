import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { useCartStore } from '../store/useCartStore';

const CartPage = () => {
  const { items, updateQty, removeFromCart, getTotal } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total = getTotal();

  return (
    <div className="bg-gray-50 min-h-screen pb-16 pt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-secondary mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-secondary mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative">
                  <div className="md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                      {item.emoji || '📦'}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary mb-1 line-clamp-2 pr-6 md:pr-0">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.cat}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 text-center hidden md:block font-bold text-gray-600">
                    ₨ {item.price.toLocaleString()}
                  </div>
                  
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 h-10 w-28">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaMinus className="text-xs" /></button>
                      <span className="flex-1 text-center font-bold text-secondary text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaPlus className="text-xs" /></button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 text-right font-extrabold text-primary flex justify-between md:block items-center">
                    <span className="md:hidden text-gray-500 font-normal text-sm">Total:</span>
                    ₨ {(item.price * item.qty).toLocaleString()}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 md:static md:col-span-12 flex justify-end text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <span className="md:hidden text-xs mr-1">Remove</span>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">₨ {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-success font-semibold">{total > 2000 ? 'Free' : 'Calculated at checkout'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Tax</span>
                    <span>₨ 0</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-end">
                  <span className="font-bold text-secondary text-lg">Total</span>
                  <span className="font-extrabold text-primary text-2xl">₨ {total.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 mb-4"
                >
                  Proceed to Checkout <FaArrowRight />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <FaShieldAlt /> Secure Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
