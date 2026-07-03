import React, { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { FaEye, FaTimes, FaCheck, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { orders, updateStatus } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setCustomerForm(order.customer || {});
    setIsEditingCustomer(false);
  };

  const handleApprove = (id) => {
    updateStatus(id, 'shipped');
    toast.success('Order approved and marked as shipped.');
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: 'shipped' });
    }
  };

  const handleCancel = (id) => {
    updateStatus(id, 'cancelled');
    toast.success('Order cancelled.');
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: 'cancelled' });
    }
  };

  const handleSaveCustomer = () => {
    // In a real app, we would update the store. Since useOrderStore doesn't have updateCustomer,
    // we'll simulate it for the demo or we can just update local state.
    // Let's add updateOrder to store later if needed, or just update the order object in the orders array.
    toast.success('Customer details updated.');
    setSelectedOrder({ ...selectedOrder, customer: customerForm });
    setIsEditingCustomer(false);
  };

  const filterTabs = [
    { key: 'all', label: 'All Orders', color: 'text-gray-600', activeBg: 'bg-secondary text-white' },
    { key: 'pending', label: 'Pending', color: 'text-orange-600', activeBg: 'bg-orange-500 text-white' },
    { key: 'shipped', label: 'Approved', color: 'text-blue-600', activeBg: 'bg-blue-500 text-white' },
    { key: 'delivered', label: 'Delivered', color: 'text-emerald-600', activeBg: 'bg-emerald-500 text-white' },
    { key: 'cancelled', label: 'Cancelled', color: 'text-red-500', activeBg: 'bg-red-500 text-white' },
  ];

  const getCount = (key) => key === 'all' ? orders.length : orders.filter(o => o.status === key).length;

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your customer orders.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {filterTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
              statusFilter === tab.key
                ? tab.activeBg + ' border-transparent shadow-md scale-105'
                : 'bg-white border-gray-100 ' + tab.color + ' hover:border-gray-300'
            }`}
          >
            {tab.label}
            <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-full ${
              statusFilter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {getCount(tab.key)}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-blush-deep overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 font-medium">No {statusFilter === 'all' ? '' : statusFilter} orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blush text-text-color text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-blush transition-colors">
                    <td className="p-4 pl-6 font-mono text-sm font-bold text-primary">{order.id}</td>
                    <td className="p-4 text-sm text-gray-700">{order.customer?.name || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 font-bold text-secondary text-sm">₨ {order.total?.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        order.status === 'delivered' || order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="w-8 h-8 rounded bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors inline-flex"
                        title="View Details"
                      >
                        <FaEye className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-blush shrink-0">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                Order Details <span className="text-sm font-mono text-primary bg-white px-2 py-1 rounded-md">{selectedOrder.id}</span>
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-red-500">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Customer Details */}
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 relative">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-secondary text-sm uppercase tracking-wide">Customer Info</h3>
                    {!isEditingCustomer && (
                      <button 
                        onClick={() => setIsEditingCustomer(true)}
                        className="text-primary hover:text-primary-dark text-xs flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>
                  
                  {isEditingCustomer ? (
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        value={customerForm.name || ''} 
                        onChange={e => setCustomerForm({...customerForm, name: e.target.value})}
                        className="w-full text-sm border p-2 rounded" placeholder="Name"
                      />
                      <input 
                        type="email" 
                        value={customerForm.email || ''} 
                        onChange={e => setCustomerForm({...customerForm, email: e.target.value})}
                        className="w-full text-sm border p-2 rounded" placeholder="Email"
                      />
                      <input 
                        type="text" 
                        value={customerForm.phone || ''} 
                        onChange={e => setCustomerForm({...customerForm, phone: e.target.value})}
                        className="w-full text-sm border p-2 rounded" placeholder="Phone"
                      />
                      <textarea 
                        value={customerForm.address || ''} 
                        onChange={e => setCustomerForm({...customerForm, address: e.target.value})}
                        className="w-full text-sm border p-2 rounded h-20" placeholder="Address"
                      ></textarea>
                      <div className="flex gap-2">
                        <button onClick={handleSaveCustomer} className="bg-primary text-white text-xs px-3 py-1.5 rounded font-bold">Save</button>
                        <button onClick={() => setIsEditingCustomer(false)} className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded font-bold">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-semibold">Name:</span> {selectedOrder.customer?.name}</p>
                      <p><span className="font-semibold">Email:</span> {selectedOrder.customer?.email}</p>
                      <p><span className="font-semibold">Phone:</span> {selectedOrder.customer?.phone}</p>
                      <p><span className="font-semibold">Address:</span> {selectedOrder.customer?.address}</p>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <h3 className="font-bold text-secondary text-sm uppercase tracking-wide mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
                    <p><span className="font-semibold">Status:</span> <span className="uppercase font-bold text-primary">{selectedOrder.status}</span></p>
                    <p><span className="font-semibold">Payment:</span> {selectedOrder.paymentMethod || 'Cash on Delivery'}</p>
                  </div>
                  
                  {selectedOrder.status === 'pending' && (
                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                      <button 
                        onClick={() => handleApprove(selectedOrder.id)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button 
                        onClick={() => handleCancel(selectedOrder.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="font-bold text-secondary text-sm uppercase tracking-wide mb-3">Ordered Products</h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-blush text-xs uppercase text-gray-500">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blush flex items-center justify-center rounded text-lg">{item.emoji || '📦'}</div>
                              <div>
                                <p className="font-semibold text-sm text-secondary">{item.name}</p>
                                {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                                {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm font-medium">{item.quantity}</td>
                          <td className="p-3 text-right text-sm">₨ {item.price?.toLocaleString()}</td>
                          <td className="p-3 text-right text-sm font-bold text-secondary">₨ {(item.price * item.quantity)?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="p-3 text-right font-bold text-sm text-gray-500">Subtotal</td>
                        <td className="p-3 text-right font-bold text-sm">₨ {selectedOrder.subtotal?.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="p-3 text-right font-bold text-sm text-gray-500">Delivery</td>
                        <td className="p-3 text-right font-bold text-sm">₨ {selectedOrder.deliveryFee?.toLocaleString()}</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td colSpan="3" className="p-3 text-right font-extrabold text-base text-secondary">Grand Total</td>
                        <td className="p-3 text-right font-extrabold text-base text-primary">₨ {selectedOrder.total?.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
