import { create } from 'zustand';

const dummyMessages = [
  {
    id: 'MSG-1718000000001',
    date: new Date().toISOString(),
    status: 'unread',
    name: 'Ahmed Raza',
    email: 'ahmed@example.com',
    subject: 'Product Availability',
    message: 'Hi, I wanted to ask when the new collection of winter jackets will be available? Thanks.'
  },
  {
    id: 'MSG-1718000000002',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'read',
    name: 'Fatima',
    email: 'fatima@example.com',
    subject: 'Order Delay',
    message: 'My order EM-12345 is delayed. Can you please check?'
  }
];

const loadMessages = () => {
  try {
    const messages = JSON.parse(localStorage.getItem('em_messages'));
    if (!messages || messages.length === 0) {
      localStorage.setItem('em_messages', JSON.stringify(dummyMessages));
      return dummyMessages;
    }
    return messages;
  } catch {
    return dummyMessages;
  }
};

const saveMessages = (messages) => {
  localStorage.setItem('em_messages', JSON.stringify(messages));
};

export const useMessageStore = create((set, get) => ({
  messages: loadMessages(),

  addMessage: (messageData) => {
    const newMessage = {
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread',
      ...messageData,
    };
    set((state) => {
      const newMessages = [newMessage, ...state.messages];
      saveMessages(newMessages);
      return { messages: newMessages };
    });
    return newMessage.id;
  },

  markAsRead: (id) => {
    set((state) => {
      const newMessages = state.messages.map(m => m.id === id ? { ...m, status: 'read' } : m);
      saveMessages(newMessages);
      return { messages: newMessages };
    });
  },

  deleteMessage: (id) => {
    set((state) => {
      const newMessages = state.messages.filter(m => m.id !== id);
      saveMessages(newMessages);
      return { messages: newMessages };
    });
  },
}));
