import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/apiClient'; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(5); // Hiển thị 5 mục ban đầu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleCategories(prev => Math.min(prev + 5, categories.length)); // Tăng 5 mục, không vượt quá tổng số
  };

  const hideCategories = () => {
    setVisibleCategories(5); // Quay lại 5 mục ban đầu
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Danh mục ({categories.length})</h3>
      <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto"> {/* Chiều cao cố định với scroll dọc */}
        {categories.slice(0, visibleCategories).map((category) => (
          <span
            key={category.id}
            className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full inline-block whitespace-nowrap"
          >
            {category.name}
          </span>
        ))}
      </div>
      {visibleCategories <= 5 && visibleCategories < categories.length && (
        <button
          onClick={loadMore}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
        >
          Xem thêm
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      )}
      {visibleCategories > 5 && (
        <button
          onClick={hideCategories}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
        >
          Ẩn
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Categories;