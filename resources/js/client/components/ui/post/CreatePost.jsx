import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, createPost } from '../../../../api/apiClient'; 
import Loading from '../../Loading';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: null,
    category_id: '', 
    is_published: false, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);

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
    const categoryId = e.target.value;
    setFormData((prev) => ({ ...prev, category_id: categoryId }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.content || !formData.category_id) {
      setError('Vui lòng điền đầy đủ tiêu đề, nội dung và danh mục.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);
    data.append('category_id', formData.category_id);
    // data.append('is_published', formData.is_published ? 'true' : 'false'); // Thử gửi "true"/"false"

    // Debug dữ liệu gửi đi
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await createPost(data); 
      console.log('Bài viết đã được tạo:', response.data);
      toast.success('Bài viết đã được tạo thành công!', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => navigate(`/post/${response.data.id}`), 
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Lỗi khi tạo bài viết. Vui lòng thử lại.');
      console.error('Lỗi chi tiết:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tạo bài viết mới</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category_id" className="block text-gray-700 font-medium mb-2">
              Danh mục
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
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

          <div>
            <label htmlFor="is_published" className="block text-gray-700 font-medium mb-2">
              Đăng ngay
            </label>
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              checked={formData.is_published}
              onChange={handleInputChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Đăng bài ngay khi tạo</span>
          </div>

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
      <ToastContainer />
    </div>
  );
};

export default CreatePost;