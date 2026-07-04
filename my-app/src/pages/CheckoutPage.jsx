import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore(state => state.addOrder);
  const navigate = useNavigate();
  const subtotal = getTotal();
  const DELIVERY_FEE = 200;
  const total = subtotal + DELIVERY_FEE;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: 'Sindh',
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (items.length === 0 && step !== 4) {
      navigate('/cart');
    }
  }, [items, navigate, step]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim() || formData.phone.length < 11) newErrors.phone = 'Valid 11-digit phone number required';
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setStep(step + 1);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderId = await addOrder({
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.province}`,
          city: formData.city,
        },
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.qty || i.quantity || 1, emoji: i.emoji, size: i.size })),
        subtotal: subtotal,
        deliveryFee: DELIVERY_FEE,
        total: total,
        paymentMethod: 'Cash on Delivery',
      });
      clearCart();
      setStep(4);
      toast.success('Order placed successfully! 🎉');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (step === 4) {
    return (
      <div className="bg-soft-bg min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-200">
          <div className="text-6xl mb-4">🎉</div>
          <FaCheckCircle className="text-primary text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-secondary mb-3">Order Confirmed!</h2>
          <p className="text-gray-500 mb-3">
            Thank you for shopping with <strong className="text-primary">EmuuMart</strong>!
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Your order has been placed successfully. We'll contact you on <strong>{formData.phone}</strong> to confirm delivery.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-10 rounded-full transition-colors w-full sm:w-auto shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16 pt-8">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form */}
        <div className="lg:col-span-2">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8 px-2 sm:px-10 relative">
            <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className={`absolute top-1/2 left-10 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500`} style={{width: `${(step-1)*50}%`}}></div>
            {[1,2,3].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-500'}`}>
                {s}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} outline-none transition-colors`} placeholder="John Doe" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (11 digits) *</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary'} outline-none transition-colors`} placeholder="03001234567" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200 focus:border-primary'} outline-none transition-colors`} placeholder="House/Apt, Street Name" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200 focus:border-primary'} outline-none transition-colors`} placeholder="Karachi" />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                      <select name="province" value={formData.province} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary outline-none transition-colors">
                        <option>Sindh</option>
                        <option>Punjab</option>
                        <option>KPK</option>
                        <option>Balochistan</option>
                        <option>Gilgit Baltistan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Payment Method</h2>
                <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-primary bg-primary/5 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl shrink-0">
                    💵
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Cash on Delivery (COD)</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Pay in cash when your order arrives at your doorstep.</p>
                  </div>
                  <div className="ml-auto w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">🔒 Your order is secured. Our delivery team will contact you before delivery.</p>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="text-gray-500 font-bold hover:text-primary transition-colors">
                  &larr; Back
                </button>
              ) : <div></div>}
              
              {step < 3 ? (
                <button onClick={nextStep} className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg">
                  Next Step
                </button>
              ) : (
                <button onClick={handlePlaceOrder} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-primary/30">
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Order Summary) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-secondary text-lg mb-4 border-b border-gray-100 pb-4">Order Summary</h3>
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center shrink-0">{item.emoji}</span>
                    <span className="text-gray-700 line-clamp-1">{item.name}</span>
                  </div>
                  <div className="text-gray-500 whitespace-nowrap">x{item.qty}</div>
                  <div className="font-semibold text-secondary whitespace-nowrap">₨ {(item.price * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₨ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className="font-semibold text-gray-700">₨ {DELIVERY_FEE.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
              <span className="font-bold text-lg text-secondary">Total</span>
              <span className="font-extrabold text-2xl text-primary">₨ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
