import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import FeaturesBar from '../components/home/FeaturesBar';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';
import { categories } from '../data/categories';
import { useProductStore } from '../store/useProductStore';

const HomePage = () => {
  const products = useProductStore((state) => state.products);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products for different sections
  const bestSellers = products.filter(p => p.badge === 'Best' || p.badge === 'Hot').slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4);

  return (
    <div className="bg-soft-bg pb-16">
      <HeroSection />
      <FeaturesBar />

      {/* Categories Grid */}
      <section className="max-w-screen-xl mx-auto px-4 my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary">Shop by Category</h2>
          <Link to="/search" className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-1">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const count = products.filter(p => p.cat === cat.key).length;
            return <CategoryCard key={cat.key} category={cat} productCount={count} />;
          })}
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-4 my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Promo Banners */}
      <section className="max-w-screen-xl mx-auto px-4 my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#2EC4B6] to-[#0A9396] rounded-2xl p-8 text-white relative overflow-hidden h-48 flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="absolute -right-4 -bottom-4 text-[8rem] opacity-20">🎧</div>
            <h3 className="font-bold text-xl mb-2 relative z-10">Electronics Sale</h3>
            <p className="mb-4 text-sm text-white/80 relative z-10">Up to 40% off on all gadgets</p>
            <Link to="/category/electronics" className="text-sm font-bold bg-white text-secondary px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors relative z-10">Shop Now</Link>
          </div>
          <div className="bg-gradient-to-r from-[#9B5DE5] to-[#7109AA] rounded-2xl p-8 text-white relative overflow-hidden h-48 flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="absolute -right-4 -bottom-4 text-[8rem] opacity-20">👕</div>
            <h3 className="font-bold text-xl mb-2 relative z-10">Winter Collection</h3>
            <p className="mb-4 text-sm text-white/80 relative z-10">Stay warm with style</p>
            <Link to="/category/clothing" className="text-sm font-bold bg-white text-secondary px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors relative z-10">Shop Now</Link>
          </div>
          <div className="bg-gradient-to-r from-[#F15BB5] to-[#D00000] rounded-2xl p-8 text-white relative overflow-hidden h-48 flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="absolute -right-4 -bottom-4 text-[8rem] opacity-20">💄</div>
            <h3 className="font-bold text-xl mb-2 relative z-10">Beauty Essentials</h3>
            <p className="mb-4 text-sm text-white/80 relative z-10">Premium brands inside</p>
            <Link to="/category/beauty" className="text-sm font-bold bg-white text-secondary px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors relative z-10">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-4 my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {/* About the Brand */}
      <section className="max-w-screen-xl mx-auto px-4 my-16">
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 border border-gray-100">
          <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" alt="About our brand" className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full w-fit mb-4">About Us</div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">Our Story & Commitment</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At <span className="font-semibold text-primary">EmuuMart</span>, we believe in delivering not just products, but an experience. We source the highest quality materials and work with passionate creators to bring you everyday essentials that elevate your lifestyle.
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Our commitment to sustainability and customer satisfaction is at the core of everything we do.
            </p>
            <Link to="/about" className="inline-flex items-center font-bold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-full transition-colors w-fit shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40">
              Discover More <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-screen-xl mx-auto px-4 my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-3">What Our Customers Say</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Don't just take our word for it. Here is some feedback from our awesome community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, name: "Fatima A.", role: "Verified Buyer", rating: 5, text: "Absolutely love my purchase! The quality exceeded my expectations and delivery was super fast. Highly recommend to anyone." },
            { id: 2, name: "Ali R.", role: "Frequent Shopper", rating: 5, text: "EmuuMart never disappoints. Their customer service is top notch and the product selection is fantastic. My go-to store!" },
            { id: 3, name: "Zainab B.", role: "Verified Buyer", rating: 4, text: "Great experience overall. The packaging was beautiful and the item fits perfectly. Will definitely be shopping here again." }
          ].map(review => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
