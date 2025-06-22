import React, { useState } from 'react';
import { registerUser } from '../../shared/api/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if(formData.password !== formData.password_confirmation){
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const res = await registerUser(formData);
      toast.success('Đăng ký thành công!');
      console.log(res.data);
    } catch (err) {
      const message = err.response?.data?.message || "Có lỗi xảy ra";
      toast.error(message);
      console.error(err.response?.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        <input
          id="name"
          placeholder="Họ tên"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          id="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          id="password"
          type="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          id="password_confirmation"
          type="password"
          placeholder="Xác nhận mật khẩu"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Đăng ký
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default SignUpForm;
