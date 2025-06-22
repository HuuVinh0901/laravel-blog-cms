import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, getPostByUser } from '../../shared/api/apiClient';
import defaultAvatar from '../../../../public/images/default-avatar.png';
import fallbackImage from '../../../../public/images/no-image.png';
import Loading from '../../shared/components/Loading';
import { useAuth } from '../../shared/context/AuthContext';

const ProfileBase = () => {
    const { userId } = useParams();
    const { user: userContext, logout } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(null);
    console.log(userContext)
    const isOwner = userId == userContext?.id
    useEffect(() => {

        const fetchData = async () => {
            try {
                const userResponse = await getUserById(userId);

                const postsResponse = await getPostByUser(userId);
                setUser(userResponse.data);
                setPosts(postsResponse?.data?.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))|| []);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu profile:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleMenuToggle = (postId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(menuOpen === postId ? null : postId);
    };

    const handleEditPost = (postId, e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/edit-post/${postId}`);
        setMenuOpen(null);
    };

    const handleDeletePost = (postId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            setPosts(posts.filter((post) => post.id !== postId));
            // Gọi API xóa bài viết: deletePost(postId)
        }
        setMenuOpen(null);
    };

    if (loading) return <Loading />;
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
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{user.bio || 'Chào mừng đến với trang cá nhân của tôi!'}</p>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Ngày tham gia: {new Date(user.created_at).toLocaleDateString()}</span>
                    <span>Bài viết: {posts.length}</span>
                </div>
                {isOwner && (
                    <Link
                        to="/edit-profile"
                        className="absolute top-4 right-4 items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
                    >
                        Chỉnh sửa trang cá nhân
                    </Link>
                )}
            </div>

            {/* Wall (Posts) */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Bài viết</h2>
                    {isOwner && (
                        <Link
                            to="/create-post"
                            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Tạo bài viết
                        </Link>
                    )}
                </div>{posts.length === 0 ? (
                    <div className="text-center text-gray-600">Chưa có bài viết.</div>
                ) : (
                    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                        {posts.map((post) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="block">
                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
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
                                        {isOwner && (
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => handleMenuToggle(post.id, e)}
                                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-gray-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                                        />
                                                    </svg>
                                                </button>
                                                {menuOpen === post.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                                        <button
                                                            onClick={(e) => handleEditPost(post.id, e)}
                                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Chỉnh sửa bài viết
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDeletePost(post.id, e)}
                                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                                        >
                                                            Xóa bài viết
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
                                        {post.category?.name || 'Chưa có danh mục'}
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-2">{post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}</p>
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
                                            <svg
                                                className="w-5 h-5 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                                />
                                            </svg>
                                            {post.comment_count || 0}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileBase;