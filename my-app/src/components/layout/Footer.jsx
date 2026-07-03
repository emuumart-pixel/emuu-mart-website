import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa';
import { categories } from '../../data/categories';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-14 pb-6">
      {/* Top Rose Strip */}
      <div className="bg-primary h-1 mb-14 -mt-14"></div>

      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Info with Logo */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo_transparent.png" alt="EmuuMart" className="h-16 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your premium destination for quality products across Pakistan. Unbeatable prices, secure payments, fast delivery right to your doorstep.
          </p>
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-semibold">Follow Us</p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white">
              <FaFacebook />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white">
              <FaTiktok />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-base font-bold mb-5 pb-2 border-b border-primary/40 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full inline-block"></span> Shop Categories
          </h3>
          <ul className="space-y-2.5">
            {categories.map(cat => (
              <li key={cat.key}>
                <Link to={`/category/${cat.key}`} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-base font-bold mb-5 pb-2 border-b border-primary/40 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full inline-block"></span> Useful Links
          </h3>
          <ul className="space-y-2.5">
            {[
              { label: 'About Us', to: '/about' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'FAQs', to: '/faq' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms & Conditions', to: '/terms' },
              { label: 'Return Policy', to: '/returns' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-blush-mid hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="text-primary text-xs">▸</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-bold mb-5 pb-2 border-b border-primary/40 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full inline-block"></span> Get In Touch
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-primary mt-1 shrink-0 text-sm" />
              <span className="text-gray-400 text-sm leading-relaxed">
                123 E-commerce Avenue,<br />
                Karachi, Pakistan
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-primary shrink-0 text-sm" />
              <span className="text-gray-400 text-sm">+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-primary shrink-0 text-base" />
              <a href="https://wa.me/923001234567" className="text-gray-400 text-sm hover:text-primary transition-colors">WhatsApp Us</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary shrink-0 text-sm" />
              <span className="text-gray-400 text-sm">support@emuumart.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-xl mx-auto px-4 pt-6 border-t border-white/10 flex justify-center items-center gap-4">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          © {new Date().getFullYear()} EmuuMart. Made with <FaHeart className="text-primary text-xs mx-0.5" /> in Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
