import { useStore } from '../store/useStore';
import { FiShoppingBag, FiDollarSign, FiCheckCircle, FiClock } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 8890 },
  { name: 'Sat', sales: 9390 },
  { name: 'Sun', sales: 11490 },
];

export const Dashboard = () => {
  const { orders } = useStore();

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  
  // Use a fixed date for mock so we actually see today's data if needed, but let's use the actual today
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => o.date === today);
  const todaysSales = todaysOrders.reduce((acc, order) => acc + order.total, 0);

  const stats = [
    { title: 'Total Sales', value: `Rs ${totalSales.toLocaleString()}`, icon: FiDollarSign, color: 'text-primary', bg: 'bg-primary/10' },
    { title: "Today's Sales", value: `Rs ${todaysSales.toLocaleString()}`, icon: FiClock, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Total Orders', value: totalOrders, icon: FiShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100' },
    { title: 'Completed Orders', value: completedOrders, icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back to EmuuMart Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-card transition-shadow">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Sales Overview</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8547A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E8547A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#E8547A" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
