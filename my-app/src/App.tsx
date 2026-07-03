import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { AddProduct } from './pages/AddProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products/new" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
