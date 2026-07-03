import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTruck, FaGift, FaTag } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="w-full relative">
      <Link to="/search" className="block w-full">
        <img 
          src="/hero.jpg" 
          alt="EmuuMart Hero Banner" 
          className="w-full h-[50vh] md:h-[80vh] object-cover object-center"
        />
      </Link>
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 flex justify-center">
        <Link to="/search" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-10 md:py-4 md:px-12 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl text-sm md:text-base uppercase tracking-wider hover:-translate-y-1">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
