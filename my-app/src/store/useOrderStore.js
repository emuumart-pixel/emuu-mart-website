import { create } from 'zustand';

const dummyOrders = [
  {
    id: 'EM-1718000000001',
    date: new Date().toISOString(),
    status: 'pending',
    customer: { name: 'Ali Khan', email: 'ali@example.com', phone: '03001234567', address: 'DHA Phase 5, Lahore' },
    items: [{ name: 'Wireless Earbuds', quantity: 1, price: 5000, emoji: '🎧' }],
    subtotal: 5000,
    deliveryFee: 200,
    total: 5200,
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'EM-1718000000002',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'delivered',
    customer: { name: 'Sara Ahmed', email: 'sara@example.com', phone: '03219876543', address: 'Clifton, Karachi' },
    items: [{ name: 'Smart Watch', quantity: 1, price: 8500, emoji: '⌚' }],
    subtotal: 8500,
    deliveryFee: 0,
    total: 8500,
    paymentMethod: 'Credit Card'
  }
];

const loadOrders = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('em_orders'));
    if (!orders || orders.length === 0) {
      localStorage.setItem('em_orders', JSON.stringify(dummyOrders));
      return dummyOrders;
    }
    return orders;
  } catch {
    return dummyOrders;
  }
};

const saveOrders = (orders) => {
  localStorage.setItem('em_orders', JSON.stringify(orders));
};

export const useOrderStore = create((set, get) => ({
  orders: loadOrders(),

  addOrder: (orderData) => {
    const newOrder = {
      id: `EM-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
      ...orderData,
    };
    set((state) => {
      const newOrders = [newOrder, ...state.orders];
      saveOrders(newOrders);
      return { orders: newOrders };
    });
    return newOrder.id;
  },

  updateStatus: (id, status) => {
    set((state) => {
      const newOrders = state.orders.map(o => o.id === id ? { ...o, status } : o);
      saveOrders(newOrders);
      return { orders: newOrders };
    });
  },

  deleteOrder: (id) => {
    set((state) => {
      const newOrders = state.orders.filter(o => o.id !== id);
      saveOrders(newOrders);
      return { orders: newOrders };
    });
  },

  getOrderById: (id) => get().orders.find(o => o.id === id),
}));
