import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext'; // Điều chỉnh đường dẫn nếu cần
import defaultAvatar from '../../../../public/images/default-avatar.png';
const Sidebar = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Chuyển hướng sau khi logout
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg">
      {user && (
        <div className="mb-6 relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={defaultAvatar} // Placeholder avatar
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium">{user.name || user.email}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
          {showMenu && (
            <div className="absolute top-16 left-0 w-full bg-gray-700 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 text-white hover:bg-red-700 rounded-lg transition duration-200"
                  >
                    Logout
                  </button>
                </li>
                {/* Có thể thêm tùy chọn khác nếu cần */}
              </ul>
            </div>
          )}
        </div>
      )}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition duration-200`
              }
            >
              <span className="mr-3">📊</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition duration-200`
              }
            >
              <span className="mr-3">👤</span> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/posts"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition duration-200`
              }
            >
              <span className="mr-3">📝</span> Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition duration-200`
              }
            >
              <span className="mr-3">📑</span> Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;