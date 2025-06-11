import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../../api/apiClient';
import Loading from '../../Loading';
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const fallbackImage = "/images/no-image.png";
  const defaultAvatar = "/images/default-avatar.png"; 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết bài viết:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPost();
  }, [id]);
  
  // Giả lập danh sách comment (bạn có thể thay bằng API thực tế)
  useEffect(() => {
    if (post) {
      setComments([
        { id: 1, text: 'Comment 1', author: 'User1' },
        { id: 2, text: 'Comment 2', author: 'User2' },
        { id: 3, text: 'Comment 3', author: 'User3' },
        { id: 4, text: 'Comment 4', author: 'User4' },
        { id: 5, text: 'Comment 5', author: 'User5' },
      ]);
    }
  }, [post]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, author: 'CurrentUser' }]);
      setNewComment('');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <img
          src={post.thumbnail || fallbackImage}
          alt={post.title}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
          className="w-full max-h-64 object-contain rounded-2xl mb-6"
        />
        <div className="flex items-center mb-6">
          <img
            src={post.user?.avatar || defaultAvatar}
            alt={post.user.name || 'Author'}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-900 font-medium">{post.user.name || 'Unknown Author'}</p>
            <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
          {post.category.name}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.content}</p>

        <div className="flex justify-between items-center mb-6">
          <div>
            <button className="flex items-center text-red-600 hover:text-red-800 font-medium">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {post.liked_users_count || 0}
            </button>
          </div>
          <div className="relative">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>
            {/* Menu dropdown (bạn có thể thêm logic sau) */}
            <div className="hidden absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Tùy chọn 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Tùy chọn 2</a>
            </div>
          </div>
        </div>

        {/* Comment section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bình luận</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Viết bình luận của bạn..."
              rows="3"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Gửi
            </button>
          </form>
          <div className="max-h-60 overflow-y-auto pr-2 space-y-4"> 
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                <img
                  src={defaultAvatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-800 font-medium">{comment.author}</p>
                  <p className="text-gray-600 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;