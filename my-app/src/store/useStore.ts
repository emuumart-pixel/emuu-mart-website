import { create } from 'zustand';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image?: string;
}

interface AdminState {
  orders: Order[];
  products: Product[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

export const useStore = create<AdminState>((set) => ({
  orders: [
    { id: 'ORD-001', customer: 'Alice Smith', date: '2026-06-28', status: 'Pending', total: 1250 },
    { id: 'ORD-002', customer: 'Bob Johnson', date: '2026-06-27', status: 'Processing', total: 4500 },
    { id: 'ORD-003', customer: 'Charlie Brown', date: '2026-06-27', status: 'Delivered', total: 850 },
    { id: 'ORD-004', customer: 'Diana Prince', date: '2026-06-26', status: 'Shipped', total: 3200 },
    { id: 'ORD-005', customer: 'Evan Wright', date: '2026-06-25', status: 'Delivered', total: 1500 },
  ],
  products: [
    { id: 'PROD-001', title: 'Baby Stroller', category: 'Gear', price: 15000 },
    { id: 'PROD-002', title: 'Soft Teddy Bear', category: 'Toys', price: 2500 },
  ],
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => order.id === id ? { ...order, status } : order)
  })),
  addProduct: (product) => set((state) => ({
    products: [{ id: `PROD-00${state.products.length + 1}`, ...product }, ...state.products]
  })),
}));
