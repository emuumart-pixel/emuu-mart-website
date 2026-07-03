import React from 'react';
import { FaMoneyBillWave, FaShoppingCart, FaUsers, FaBoxOpen, FaClock } from 'react-icons/fa';
import { useProductStore } from '../../store/useProductStore';
import { useOrderStore } from '../../store/useOrderStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'Jan', val: 42000 },
  { name: 'Feb', val: 38000 },
  { name: 'Mar', val: 55000 },
  { name: 'Apr', val: 48000 },
  { name: 'May', val: 61000 },
  { name: 'Jun', val: 72000 },
  { name: 'Jul', val: 58000 },
];

const categoryData = [
  { name: 'Clothing', value: 400 },
  { name: 'Beauty', value: 300 },
  { name: 'Kitchen', value: 200 },
  { name: 'Mobile', value: 280 },
];

const COLORS = ['#C0526A', '#A03D54', '#D97589', '#FAD7DE'];

const DashboardPage = () => {
  const productsCount = useProductStore(state => state.products.length);
  const orders = useOrderStore(state => state.orders);

  const today = new Date().toISOString().split('T')[0];
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'completed').length;
  const todayOrders = orders.filter(o => o.date && o.date.startsWith(today)).length;
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.total || 0), 0);
  const todayRevenue = orders.filter(o => o.date && o.date.startsWith(today) && o.status !== 'cancelled').reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₨ ${totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-xl" />,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      change: 'Lifetime',
    },
    {
      title: 'Today\'s Sales',
      value: `₨ ${todayRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-xl" />,
      bg: 'bg-green-50',
      iconColor: 'text-green-500',
      change: 'Today',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: <FaBoxOpen className="text-xl" />,
      bg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      change: 'Lifetime',
    },
    {
      title: 'Today\'s Orders',
      value: todayOrders.toString(),
      icon: <FaShoppingCart className="text-xl" />,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      change: 'Today',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders.toString(),
      icon: <FaClock className="text-xl" />,
      bg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      change: 'Needs action',
    },
    {
      title: 'Completed Orders',
      value: completedOrders.toString(),
      icon: <FaBoxOpen className="text-xl" />,
      bg: 'bg-blush',
      iconColor: 'text-primary',
      change: 'Delivered',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-secondary">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-card border border-blush-deep hover:shadow-rose transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bg} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <span className="text-xs text-gray-400 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-secondary mb-0.5">{stat.value}</h3>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-card border border-blush-deep">
          <h3 className="font-bold text-secondary mb-5">Revenue Analytics (Last 7 Months)</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f9e4ea" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-8} />
                <Tooltip
                  cursor={{ fill: '#FFF0F5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(232,84,122,0.15)' }}
                  formatter={(val) => [`₨ ${val.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="val" fill="#C0526A" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-card border border-blush-deep">
          <h3 className="font-bold text-secondary mb-5">Sales by Category</h3>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={65} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-400 font-bold uppercase">Total</span>
              <span className="text-xl font-extrabold text-secondary">1.2K</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }}></span>
                  <span className="text-gray-500">{cat.name}</span>
                </div>
                <span className="font-bold text-secondary">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-card border border-blush-deep overflow-hidden">
        <div className="p-5 border-b border-blush-deep flex items-center justify-between">
          <h3 className="font-bold text-secondary">Recent Orders</h3>
          <span className="text-xs text-gray-400">{orders.length} total</span>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <FaShoppingCart className="text-4xl mx-auto mb-3 text-gray-200" />
            <p className="text-sm">No orders yet. Orders will appear here after customers checkout.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
              <tr className="bg-blush text-xs text-text-color uppercase tracking-wider font-bold">
                <th className="px-5 py-3 font-bold">Order ID</th>
                <th className="px-5 py-3 font-bold">Customer</th>
                <th className="px-5 py-3 font-bold">Amount</th>
                <th className="px-5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-blush transition-colors">
                  <td className="px-5 py-3.5 text-sm font-mono text-primary font-bold">{order.id}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{order.customer?.name || 'N/A'}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-secondary">₨ {order.total?.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
