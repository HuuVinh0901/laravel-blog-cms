import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { getUserById, getPostByUser } from '../../api/apiClient'; 
import defaultAvatar from '../../../../public/images/default-avatar.png'; 
import fallbackImage from '../../../../public/images/no-image.png'; 
const ProfileBase = ({ isOwner, userId: userIdProp }) => {
    const params = useParams();
    const userId = userIdProp || params.userId;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserById(userId);
        const postsResponse = await getPostByUser(userId);
        setUser(userResponse.data);
        setPosts(postsResponse.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (!user) return <div className="container mx-auto p-4 text-center">Không tìm thấy thông tin người dùng.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 relative">
        <div className="flex items-center mb-4">
          <img
            src={user.avatar || defaultAvatar}
            alt={user.name}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
            className="w-24 h-24 rounded-full mr-6 border-4 border-white -mt-12"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            {/* <p className="text-gray-600">{user.friends_count || 0} bạn bè</p> */}
          </div>
        </div>
        <p className="text-gray-700 mb-4">{user.bio || 'Chào mừng đến với trang cá nhân của tôi!'}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Ngày tham gia: {new Date(user.created_at).toLocaleDateString()}</span>
          <span>Bài viết: {posts.length}</span>
        </div>
        {isOwner && (
          <button
            onClick={() => navigate('/edit-profile')}
            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Chỉnh sửa trang cá nhân
          </button>
        )}
        {/* {!isOwner && (
          <button className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Thêm bạn
          </button>
        )} */}
      </div>

      {/* Wall (Posts) */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết</h2>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {posts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="block">
              <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-2">
                  <img
                    src={defaultAvatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.summary}</p>
                <img
                  src={post.thumbnail || fallbackImage}
                  alt={post.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                  className="w-full max-h-48 object-contain rounded-lg mb-2"
                />
                <div className="flex items-center text-gray-500">
                  <button className="flex items-center mr-4 hover:text-red-600">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {post.liked_users_count || 0}
                  </button>
                  <button className="flex items-center hover:text-blue-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01" />
                    </svg>
                    {post.comment_count || 0}
                  </button>
                </div>
              </div>
            </Link>
          ))}
          {isOwner && (
            <button
              onClick={() => navigate('/create-post')}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
            >
              Thêm bài viết mới
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBase;