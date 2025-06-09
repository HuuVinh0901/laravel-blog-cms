import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white p-4 shadow-sm">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wider">
        Citizens
      </Link>

      <nav className="flex space-x-8 text-gray-600">
        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
        <Link to="/services" className="hover:text-blue-600 font-medium">Services</Link>
        <Link to="/classes" className="hover:text-blue-600 font-medium">Classes</Link>
        <Link to="/contact" className="hover:text-blue-600 font-medium">Contact</Link>
        <Link to="/blog" className="hover:text-blue-600 font-medium">Blog</Link>
        <Link to="/about" className="hover:text-blue-600 font-medium">Về chúng tôi</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Đăng nhập</Link>
        <button className="text-gray-600 hover:text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
);

export default Header;