import React from 'react';
import { Link } from 'react-router-dom'; // <== thêm dòng này

const LoginForm = () => (
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
      <input type="email" id="email" className="w-full p-2 border rounded-md" placeholder="Nhập email của bạn" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2" htmlFor="password">Mật khẩu</label>
      <input type="password" id="password" className="w-full p-2 border rounded-md" placeholder="Nhập mật khẩu" />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Đăng nhập</button>

    {/* 👉 Link tới trang đăng ký */}
    <p className="text-center text-sm text-gray-600 mt-4">
      Chưa có tài khoản?{' '}
      <Link to="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
    </p>
  </div>
);

export default LoginForm;
