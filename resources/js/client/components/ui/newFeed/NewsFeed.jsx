import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../../api/apiClient';
import Loading from '../../Loading';
import fallbackImage from '../../../../../../public/images/no-image.png'
const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getPosts(page); // Truyền page vào đây
            const newPosts = response.data.data; // Laravel paginate trả về trong `data.data`
            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Lỗi khi tải bài viết:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 200 &&
            !loading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1); // <--- Chỉ tăng page
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    if (loading && posts.length === 0) return <Loading />;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 classNewsFeed="text-3xl font-bold text-gray-900 mb-6">News Feed</h1>
            <div className="space-y-6">
                {posts
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={post.user.avatar || '/images/default-avatar.png'}
                                    alt={post.user.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <Link to={`/profile/${post.user?.id}`}>
                                        <p className="font-medium text-gray-900">{post.user.name}</p>
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            {post.thumbnail && (
                                <img
                                    src={post.thumbnail || fallbackImage}
                                    alt={post.title}
                                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            )}
                            <div className="flex items-center justify-between text-gray-500">
                                <button className="flex items-center hover:text-red-600">
                                    <svg
                                        className="w-5 h-5 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
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
                    ))}
                {loading && <Loading />}
                {!hasMore && <p className="text-center text-gray-500">Đã hết bài viết</p>}
            </div>
        </div>
    );
};

export default NewsFeed;