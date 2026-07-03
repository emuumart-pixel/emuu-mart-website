import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiCheck } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export const AddProduct = () => {
  const { addProduct } = useStore();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !price) {
      toast.error('Please fill all fields');
      return;
    }
    
    addProduct({
      title,
      category,
      price: Number(price),
    });
    
    toast.success('Product added successfully!');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-500">Create a new product listing in your store</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-primary transition-all cursor-pointer group">
          <div className="w-16 h-16 bg-gray-200 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FiUploadCloud size={28} />
          </div>
          <h4 className="text-gray-800 font-medium mb-1">Click to upload product image</h4>
          <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Product Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Wooden Dollhouse"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
            >
              <option value="">Select a category</option>
              <option value="Toys">Toys</option>
              <option value="Gear">Gear</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (Rs)</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <FiCheck size={20} />
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};
