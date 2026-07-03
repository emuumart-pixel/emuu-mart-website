import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-soft-bg min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">About EmuuMart</h1>
          <p className="text-gray-500">Your ultimate destination for quality products and exceptional shopping experience.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-blush-deep overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded with a passion for bringing the best products to our customers, EmuuMart started as a small idea that grew into a comprehensive shopping platform. We believe that shopping should be easy, enjoyable, and accessible to everyone. Our carefully curated selection spans across fashion, electronics, home goods, and more, ensuring you always find what you're looking for.
            </p>

            <h2 className="text-2xl font-bold text-secondary mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              To provide our customers with high-quality products at competitive prices, backed by outstanding customer service. We continuously strive to innovate and improve our platform to make your shopping journey seamless from start to finish.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
              <div className="p-6 bg-blush rounded-2xl">
                <div className="text-3xl mb-3">🌟</div>
                <h3 className="font-bold text-secondary mb-2">Quality First</h3>
                <p className="text-sm text-gray-500">We carefully select every product to ensure top quality.</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl">
                <div className="text-3xl mb-3">🚚</div>
                <h3 className="font-bold text-secondary mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-500">Quick and reliable shipping right to your doorstep.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl">
                <div className="text-3xl mb-3">💖</div>
                <h3 className="font-bold text-secondary mb-2">Customer Care</h3>
                <p className="text-sm text-gray-500">Dedicated support team to help you anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
