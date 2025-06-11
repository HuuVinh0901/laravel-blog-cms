import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, getPostsByCategory } from '../../../../api/apiClient';
import Loading from '../../Loading';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryResponse, postsResponse] = await Promise.all([
          getCategories(),
          getPostsByCategory(categoryId)
        ]);
        console.log(categoryResponse.data)
        setCategories(categoryResponse.data);
        setPosts(postsResponse.data);
        // Nếu có categoryId từ URL, tự động chọn danh mục đó
        if (categoryId) {
          setSelectedCategory(categoryId);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setSelectedCategory(newCategoryId);
    navigate(`/category/${newCategoryId}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Danh mục: {posts.length > 0 ? posts[0].category.name : 'Không tìm thấy'}</h1>
      <div className="mb-6">
        <label htmlFor="category-select" className="block text-gray-700 font-medium mb-2">
          Chọn danh mục
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.content.substring(0, 100) + '...'}</p>
              <p className="text-sm text-gray-500">
                Đăng lúc: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có bài viết trong danh mục này.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;