import React, { useState, useRef } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useProductStore } from '../../store/useProductStore';
import { categories } from '../../data/categories';
import Badge from '../../components/ui/Badge';

const ProductsPage = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [catFilter, setCatFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', cat: '', price: '', oldPrice: '', badge: '', desc: '', images: []
  });

  const BADGES = [
    { value: '', label: 'None', color: 'bg-gray-100 text-gray-500 border-gray-200' },
    { value: 'Sale', label: 'Sale', color: 'bg-primary text-white border-primary' },
    { value: 'New', label: 'New', color: 'bg-green-500 text-white border-green-500' },
    { value: 'Hot', label: 'Hot', color: 'bg-orange-500 text-white border-orange-500' },
    { value: 'Best', label: 'Best', color: 'bg-blue-600 text-white border-blue-600' },
    { value: 'Sold Out', label: 'Sold Out', color: 'bg-gray-800 text-white border-gray-800' },
  ];

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', cat: '', price: '', oldPrice: '', badge: '', desc: '', images: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      cat: product.cat || '',
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      badge: product.badge || '',
      desc: product.desc || '',
      images: product.images || (product.image ? [product.image] : [])
    });
    setIsModalOpen(true);
  };

  // Convert files to base64
  const processFiles = (files) => {
    const fileArray = Array.from(files);
    const maxImages = 5;
    const remaining = maxImages - formData.images.length;

    if (remaining <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToProcess = fileArray.slice(0, remaining);

    filesToProcess.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (fileArray.length > remaining) {
      toast.error(`Only ${remaining} more image(s) can be added (max 5)`);
    }
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = ''; // Reset input so same files can be selected again
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.cat || !formData.price) {
      toast.error('Please fill all required fields');
      return;
    }

    const saleDiscount = formData.oldPrice && formData.price
      ? Math.round((1 - Number(formData.price) / Number(formData.oldPrice)) * 100)
      : null;

    const productData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      badge: formData.badge || '',
      salePercent: saleDiscount,
      image: formData.images[0] || null,
      images: formData.images,
      emoji: formData.images.length === 0 ? '📦' : null,
      rating: 5,
      reviews: 0
    };

    if (modalMode === 'add') {
      addProduct({ ...productData, id: Date.now() });
      toast.success('Product added successfully!');
    } else {
      updateProduct(editingId, productData);
      toast.success('Product updated successfully!');
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = catFilter ? p.cat === catFilter : true;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };

  const getProductThumb = (product) => {
    const src = product.images?.[0] || product.image;
    if (src) return <img src={src} alt={product.name} className="w-full h-full object-cover" />;
    return <span className="text-xl">{product.emoji || '📦'}</span>;
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your catalog, pricing, and inventory.</p>
        </div>
        <button
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
          onClick={openAddModal}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-blush-deep overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-blush-deep flex flex-col md:flex-row gap-4 items-center justify-between bg-blush">
          <div className="flex items-center bg-white border border-blush-deep rounded-lg px-3 py-2 w-full md:w-80 focus-within:border-primary transition-colors">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-white border border-blush-deep rounded-lg px-4 py-2 text-sm w-full md:w-auto outline-none focus:border-primary"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blush text-text-color text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6 font-bold">Product</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold">Status/Badge</th>
                <th className="p-4 font-bold text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-blush transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blush rounded-lg flex items-center justify-center text-xl shrink-0 overflow-hidden">
                          {getProductThumb(product)}
                        </div>
                        <div>
                          <span className="font-semibold text-secondary text-sm line-clamp-1">{product.name}</span>
                          {product.images?.length > 1 && (
                            <span className="text-[10px] text-gray-400">{product.images.length} photos</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 capitalize">{product.cat}</td>
                    <td className="p-4 font-bold text-secondary text-sm">₨ {product.price.toLocaleString()}</td>
                    <td className="p-4">
                      {product.badge ? <Badge type={product.badge} /> : <span className="text-xs text-gray-400 font-medium">Standard</span>}
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="w-8 h-8 rounded bg-blush text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">
                    No products match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-blush shrink-0">
              <h2 className="text-xl font-bold text-secondary">
                {modalMode === 'add' ? '➕ Add New Product' : '✏️ Edit Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-white/60 hover:bg-red-100 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleFormSubmit} className="space-y-5">

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Winter Jacket"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
                    <select
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-primary bg-white"
                      value={formData.cat}
                      onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₨) *</label>
                    <input
                      type="number"
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-primary transition-colors"
                      placeholder="e.g. 2500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Images <span className="text-gray-400 font-normal">(up to 5)</span>
                  </label>

                  {/* Drop Zone */}
                  <div
                    onClick={() => fileInputRef.current.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-primary bg-blush scale-[1.01]'
                        : 'border-gray-200 hover:border-primary hover:bg-blush/30'
                    }`}
                  >
                    <FaCloudUploadAlt className={`text-4xl mx-auto mb-2 transition-colors ${isDragging ? 'text-primary' : 'text-gray-300'}`} />
                    <p className="text-sm font-semibold text-gray-600">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — Max 5MB per file</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Image Previews */}
                  {formData.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          {idx === 0 && (
                            <span className="absolute bottom-0 left-0 right-0 bg-primary text-white text-[9px] text-center font-bold py-0.5">MAIN</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          >
                            <FaTimes className="text-[8px]" />
                          </button>
                        </div>
                      ))}
                      {/* Add more slot */}
                      {formData.images.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-primary hover:bg-blush/30 flex items-center justify-center transition-colors"
                        >
                          <FaPlus className="text-gray-400 text-sm" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Badge Selector */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Badge</label>
                  <div className="flex flex-wrap gap-2">
                    {BADGES.map(b => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, badge: b.value })}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                          formData.badge === b.value
                            ? b.color + ' scale-105 shadow-md'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {b.label === 'None' ? 'No Badge' : b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Old Price / Sale */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Original Price — <span className="text-gray-400 font-normal">Add if product is on sale</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₨</span>
                    <input
                      type="number"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 outline-none focus:border-primary transition-colors"
                      placeholder="e.g. 3500 (leave blank if no sale)"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    />
                  </div>
                  {formData.oldPrice && formData.price && Number(formData.oldPrice) > Number(formData.price) && (
                    <p className="text-xs mt-1 font-semibold text-emerald-600">
                      ✓ Discount: {Math.round((1 - Number(formData.price) / Number(formData.oldPrice)) * 100)}% off
                    </p>
                  )}
                  {formData.oldPrice && formData.price && Number(formData.oldPrice) <= Number(formData.price) && (
                    <p className="text-xs mt-1 text-red-500">⚠ Original price must be higher than sale price</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-primary transition-colors resize-none h-24"
                    placeholder="Write a short product description..."
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    {modalMode === 'add' ? '✓ Add Product' : '✓ Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
