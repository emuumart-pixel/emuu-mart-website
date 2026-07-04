import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  // Fetch all orders from Supabase
  fetchOrders: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      set({ loading: false, error: error.message });
    } else {
      // Normalize field names for compatibility with existing UI
      const normalized = (data || []).map(o => ({
        ...o,
        date: o.created_at,
        deliveryFee: o.delivery_fee,
        paymentMethod: o.payment_method,
      }));
      set({ orders: normalized, loading: false });
    }
  },

  // Place a new order — called from CheckoutPage
  addOrder: async (orderData) => {
    const orderId = `EM-${Date.now()}`;

    const insertData = {
      id: orderId,
      customer: orderData.customer,
      items: orderData.items,
      subtotal: orderData.subtotal,
      delivery_fee: orderData.deliveryFee || 200,
      total: orderData.total,
      status: 'pending',
      payment_method: orderData.paymentMethod || 'Cash on Delivery',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error placing order:', error);
      throw error;
    }

    const newOrder = {
      ...data,
      date: data.created_at,
      deliveryFee: data.delivery_fee,
      paymentMethod: data.payment_method,
    };

    set(state => ({ orders: [newOrder, ...state.orders] }));
    return orderId;
  },

  // Update order status (admin use)
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating status:', error);
      throw error;
    }

    set(state => ({
      orders: state.orders.map(o =>
        o.id === id ? { ...o, status: data.status } : o
      )
    }));
  },

  // Delete an order (admin use)
  deleteOrder: async (id) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }

    set(state => ({
      orders: state.orders.filter(o => o.id !== id)
    }));
  },

  getOrderById: (id) => get().orders.find(o => o.id === id),
}));
