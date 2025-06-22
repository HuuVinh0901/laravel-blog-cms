import React, { useState, useEffect } from 'react';
import { getCategories } from '../../shared/api/apiClient'; 
import Loading from '../../shared/components/Loading';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.data || response.data); // Điều chỉnh dựa trên cấu trúc API
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await apiClient.post('/categories', { name: newCategory.name, description: newCategory.description });
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', description: '' });
      setShowModal(false); // Đóng modal sau khi thêm thành công
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory({ ...category });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(`/categories/${editCategory.id}`, { name: editCategory.name, description: editCategory.description });
      setCategories(categories.map(cat => cat.id === editCategory.id ? response.data : cat));
      setEditCategory(null);
    } catch (err) {
      setError('Failed to update category');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await apiClient.delete(`/categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    }
  };

  // Lọc danh sách category dựa trên searchTerm
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>
      
      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Category Name..."
          className="p-2 border rounded w-full max-w-md"
        />
      </div>

      {/* Nút mở modal thêm mới */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Category
      </button>

      {/* Modal thêm mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Category Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Posts</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-2">{category.id}</td>
              <td className="p-2">
                {editCategory && editCategory.id === category.id ? (
                  <input
                    type="text"
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    className="p-1 border rounded"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="p-2">
                {editCategory && editCategory.id === category.id ? (
                  <input
                    type="text"
                    value={editCategory.description}
                    onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                    className="p-1 border rounded"
                  />
                ) : (
                  category.description || 'No description'
                )}
              </td>
              <td className="p-2">{category.posts || 0}</td>
              <td className="p-2">
                {editCategory && editCategory.id === category.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;