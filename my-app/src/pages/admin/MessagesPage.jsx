import React from 'react';
import { useMessageStore } from '../../store/useMessageStore';
import { FaEnvelope, FaEnvelopeOpenText, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MessagesPage = () => {
  const { messages, markAsRead, deleteMessage } = useMessageStore();

  const handleMarkAsRead = (id) => {
    markAsRead(id);
    toast.success('Message marked as read');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      toast.success('Message deleted');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary">Customer Messages</h1>
        <p className="text-gray-500 text-sm mt-1">View and respond to inquiries from the Contact Us page.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-blush-deep overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FaEnvelopeOpenText className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map(msg => (
              <div key={msg.id} className={`p-6 transition-colors hover:bg-gray-50 ${msg.status === 'unread' ? 'bg-blush/30' : ''}`}>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-secondary text-lg">{msg.name}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{msg.email}</span>
                      {msg.status === 'unread' && (
                        <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    {msg.subject && <h4 className="text-sm font-semibold text-gray-700 mb-2">Subject: {msg.subject}</h4>}
                    <p className="text-sm text-gray-600 whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-3">{new Date(msg.date).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 shrink-0">
                    {msg.status === 'unread' && (
                      <button 
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <FaEnvelopeOpenText /> Mark Read
                      </button>
                    )}
                    <a 
                      href={`mailto:${msg.email}?subject=Reply to your EmuuMart inquiry`}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 text-center"
                    >
                      <FaEnvelope /> Reply
                    </a>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
