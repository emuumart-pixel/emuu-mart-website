import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch all products from Supabase
  fetchProducts: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      set({ loading: false, error: error.message });
    } else {
      set({ products: data || [], loading: false });
    }
  },

  getByCategory: (slug) => {
    const all = get().products;
    if (slug === 'bestseller') {
      return all.filter(p => p.badge === 'Best' || p.badge === 'Hot');
    }
    return all.filter(p => p.cat === slug);
  },

  getById: (id) => {
    return get().products.find(p => String(p.id) === String(id));
  },

  searchProducts: (query) => {
    const all = get().products;
    if (!query) return [];
    const lower = query.toLowerCase();
    return all.filter(p =>
      p.name?.toLowerCase().includes(lower) ||
      p.desc?.toLowerCase().includes(lower)
    );
  },

  addProduct: async (product) => {
    const { id, ...productWithoutId } = product;
    const insertData = {
      name: productWithoutId.name,
      price: Number(productWithoutId.price),
      original_price: productWithoutId.oldPrice ? Number(productWithoutId.oldPrice) : null,
      desc: productWithoutId.desc || '',
      cat: productWithoutId.cat,
      emoji: productWithoutId.emoji || '📦',
      badge: productWithoutId.badge || '',
      images: productWithoutId.images || [],
      rating: productWithoutId.rating || 4.5,
      reviews_count: productWithoutId.reviews || 0,
      in_stock: true,
    };

    const { data, error } = await supabase
      .from('products')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }

    set(state => ({ products: [data, ...state.products] }));
    return data;
  },

  updateProduct: async (id, updatedData) => {
    const updatePayload = {
      name: updatedData.name,
      price: Number(updatedData.price),
      original_price: updatedData.oldPrice ? Number(updatedData.oldPrice) : null,
      desc: updatedData.desc || '',
      cat: updatedData.cat,
      emoji: updatedData.emoji || null,
      badge: updatedData.badge || '',
      images: updatedData.images || [],
    };

    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    set(state => ({
      products: state.products.map(p => String(p.id) === String(id) ? data : p)
    }));
    return data;
  },

  deleteProduct: async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }

    set(state => ({
      products: state.products.filter(p => String(p.id) !== String(id))
    }));
  },
}));
