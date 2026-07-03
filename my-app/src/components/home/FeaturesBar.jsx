import React from 'react';
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';

const features = [
  { icon: <FaTruck className="text-primary text-2xl" />, title: 'Fast Delivery', desc: 'Across Pakistan' },
  { icon: <FaShieldAlt className="text-primary text-2xl" />, title: 'Secure Payment', desc: '100% protected checkout' },
  { icon: <FaUndo className="text-primary text-2xl" />, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: <FaHeadset className="text-primary text-2xl" />, title: '24/7 Support', desc: 'Always here to help you' },
];

const FeaturesBar = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 my-6 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-card border border-blush-deep overflow-hidden flex relative">
        <div className="animate-marquee hover:[animation-play-state:paused]">
          {[...features, ...features].map((f, i) => (
            <div key={i} className="flex items-center gap-4 px-8 py-5 group transition-colors min-w-[300px] border-r border-blush-mid/50">
              <div className="shrink-0 w-12 h-12 bg-blush group-hover:bg-blush-mid rounded-full flex items-center justify-center transition-colors shadow-sm">
                {f.icon}
              </div>
              <div>
                <h4 className="font-bold text-secondary text-sm">{f.title}</h4>
                <p className="text-gray-400 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
