import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { getCategories } from '../../../../shared/api/apiClient';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(5);
  const navigate = useNavigate();

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
    setVisibleCategories(prev => Math.min(prev + 5, categories.length));
  };

  const hideCategories = () => {
    setVisibleCategories(5);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Danh mục ({categories.length})</h3>

      <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto">
        {categories.slice(0, visibleCategories).map((category) => (
          <Link to={`/category/${category.id}`}>
            <span
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full inline-block whitespace-nowrap cursor-pointer hover:bg-blue-200"
            >
              {category.name}
            </span>
          </Link>
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