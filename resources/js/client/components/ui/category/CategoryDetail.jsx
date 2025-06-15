import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategories, getPostsByCategory } from '../../../../api/apiClient';
import Loading from '../../Loading';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const fallbackImage = "/images/no-image.png";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryResponse, postsResponse] = await Promise.all([
          getCategories(),
          getPostsByCategory(categoryId),
        ]);

        setCategories(categoryResponse.data);
        setPosts(postsResponse.data.data.data || []);

        if (categoryId) {
          setSelectedCategory(categoryId);
        } else {
          setSelectedCategory('');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId || '');
    }
  }, [categoryId, selectedCategory]);

  const handleCategoryChange = (newCategoryId) => {
    setSelectedCategory(newCategoryId);
    navigate(`/category/${newCategoryId}`);
    setIsOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-6 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-50 transition-all duration-200"
        >
          {categories.find((cat) => cat.id == selectedCategory)?.name || 'Chọn danh mục'}
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            <button
              onClick={() => handleCategoryChange('')}
              className="w-full text-left p-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
            >
              Chọn danh mục
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className="w-full text-left p-2 text-gray-700 hover:bg-gray-100"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="block bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <div className="sm:w-1/3 relative aspect-[4/3] bg-gray-200">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImage; }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="sm:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Đăng lúc: {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                    <span className="inline-flex items-center text-blue-500 hover:text-blue-700">
                      Đọc thêm
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-4 text-gray-500">Không có bài viết trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;