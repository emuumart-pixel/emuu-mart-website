import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useMessageStore } from '../store/useMessageStore';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const { addMessage } = useMessageStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      addMessage(formData);
      toast.success('Your message has been sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-soft-bg min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Have a question or feedback? We would love to hear from you. Fill out the form below and our team will get back to you as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-card border border-blush-deep text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blush text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                <FaMapMarkerAlt />
              </div>
              <h3 className="font-bold text-secondary mb-2">Visit Us</h3>
              <p className="text-sm text-gray-500">123 EmuuMart Street, Fashion Avenue<br/>Lahore, Pakistan</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-card border border-blush-deep text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blush text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                <FaPhone />
              </div>
              <h3 className="font-bold text-secondary mb-2">Call Us</h3>
              <p className="text-sm text-gray-500">+92 300 1234567<br/>Mon - Fri, 9am - 6pm</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-card border border-blush-deep text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blush text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                <FaEnvelope />
              </div>
              <h3 className="font-bold text-secondary mb-2">Email Us</h3>
              <p className="text-sm text-gray-500">support@emuumart.com<br/>info@emuumart.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-card border border-blush-deep">
              <h3 className="text-2xl font-bold text-secondary mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Email *</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:bg-white transition-colors"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Message *</label>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:bg-white transition-colors resize-none h-32"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
