import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import PostManagement from './components/PostManagement';
import CategoryManagement from './components/CategoryManagement';
import { AuthProvider } from '../shared/context/AuthContext';
import Loading from '../shared/components/Loading';
import { useAuth } from '../shared/context/AuthContext';
import ContactManagement from './components/ContactManagement';
const container = document.getElementById('admin');
const root = ReactDOM.createRoot(container);

const AdminApp = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || user.role !== 'admin') {
    return <div className="p-6 text-red-500">Bạn không có quyền truy cập!</div>;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            {/* <Route path="/admin" element={<Navigate to="/admin/dashboard" />} /> */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/posts" element={<PostManagement />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />
            <Route path="/admin/contacts" element={<ContactManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

root.render(
  <AuthProvider>
    <AdminApp />
  </AuthProvider>
);