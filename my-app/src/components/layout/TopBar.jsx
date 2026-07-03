import React from 'react';
import { FaTruck, FaShieldAlt, FaPhoneAlt, FaTag } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-secondary text-white text-xs py-2 overflow-hidden">
      <div className="flex animate-none">
        <div className="flex items-center justify-center gap-8 w-full flex-wrap px-4 py-0.5">
          <span className="flex items-center gap-2 font-medium whitespace-nowrap">
            <FaTruck className="text-white/80" /> Flat Delivery Charge ₨200 Nationwide
          </span>
          <span className="hidden sm:flex items-center gap-2 font-medium whitespace-nowrap">
            <FaTag className="text-white/80" /> Exclusive Online Deals — Limited Time Only!
          </span>
          <span className="hidden md:flex items-center gap-2 font-medium whitespace-nowrap">
            <FaShieldAlt className="text-white/80" /> 100% Secure Checkout
          </span>
          <span className="hidden lg:flex items-center gap-2 font-medium whitespace-nowrap">
            <FaPhoneAlt className="text-white/80" /> Support: +92 300 1234567
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
