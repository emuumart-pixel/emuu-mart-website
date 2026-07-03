import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/923001234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 z-[90]"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-[32px]" />
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
      </span>
    </a>
  );
};

export default WhatsAppFloat;
