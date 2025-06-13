import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/apiClient';
import { ToastContainer, toast } from 'react-toastify';
const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const validateLoginForm = ({ email, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return 'Vui lòng nhập đầy đủ email và mật khẩu';
    }

    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ';
    }

    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    return null; // Không có lỗi
  };
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateLoginForm(formData);

    if (error) {
      toast.error(error);
      return;
    }
    try {
      await loginUser(formData);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.error;
      toast.error(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" noValidate>
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Đăng nhập
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginForm;
