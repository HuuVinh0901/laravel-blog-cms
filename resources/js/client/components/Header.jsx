import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import defaultAvatar from '../../../../public/images/default-avatar.png';

const Header = () => {
  const { user, logout, loading } = useAuth(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Nếu đang loading, hiển thị placeholder hoặc không render gì
  // if (loading) {
  //   return (
  //     <header className="bg-white p-4 shadow-sm">
  //       <div className="container mx-auto flex justify-between items-center">
  //         <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wider">
  //           Citizens
  //         </Link>
  //         <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div> {/* Placeholder */}
  //       </div>
  //     </header>
  //   );
  // }

  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wider">
          Citizens
        </Link>

        <nav className="flex space-x-8 text-gray-600">
          <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
          <Link to="/new-feed" className="hover:text-blue-600 font-medium">Blog</Link>
          <Link to="/category/1" className="hover:text-blue-600 font-medium">Danh mục</Link>
          <Link to="/about" className="hover:text-blue-600 font-medium">Về chúng tôi</Link>
        </nav>
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200">
                  {user.name}
                </span>
                <img
                  src={user.avatar || defaultAvatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 cursor-pointer"
                  onClick={handleAvatarClick}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link
                    to={`/profile/${user.id}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Hồ sơ
                  </Link>
                  <button
                    onClick={() => { logout(); setIsDropdownOpen(false); }}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 font-medium text-sm bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;