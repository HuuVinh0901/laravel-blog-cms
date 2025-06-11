import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../api/apiClient';
import Loading from '../../Loading';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: null,
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Lỗi khi tải category:', err);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setFormData((prev) => ({ ...prev, category: selected }));
    setSelectedCategory(selected);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreviewImage(URL.createObjectURL(file)); // Tạo URL để xem trước hình ảnh
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setError('');
    // setLoading(true);

    // // Tạo FormData để gửi file và các trường khác
    // const data = new FormData();
    // data.append('title', formData.title);
    // data.append('content', formData.content);
    // if (formData.thumbnail) {
    //   data.append('thumbnail', formData.thumbnail);
    // }

    // try {
    //   await createPost(data); // Gọi API để tạo bài viết
    //   navigate('/profile'); // Chuyển hướng về trang profile sau khi tạo thành công
    // } catch (error) {
    //   setError('Lỗi khi tạo bài viết. Vui lòng thử lại.');
    //   console.error('Lỗi khi tạo bài viết:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tạo bài viết mới</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Danh mục
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          {/* Trường nội dung */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Nội dung
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="6"
              placeholder="Nhập nội dung bài viết"
              required
            ></textarea>
          </div>

          {/* Trường hình ảnh đại diện */}
          <div>
            <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">
              Hình ảnh đại diện
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-full max-h-48 object-contain rounded-lg"
              />
            )}
          </div>

          {/* Nút gửi và hủy */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              Đăng bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;