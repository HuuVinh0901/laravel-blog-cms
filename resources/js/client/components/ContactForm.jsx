import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { sendContact } from '../../shared/api/apiClient';
const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendContact(form);
      toast.success('Gửi liên hệ thành công!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Send contact error:', error);
      toast.error(
        error.response?.data?.message || 'Gửi liên hệ thất bại, vui lòng thử lại.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Liên hệ với chúng tôi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Nội dung liên hệ"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactForm;
