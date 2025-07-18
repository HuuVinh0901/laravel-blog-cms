import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const LatestPost = ({ posts }) => {
  const fallbackImage = "/images/no-image.png";

  return (
    <div className="max-h-[600px] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const [likes, setLikes] = useState(post.liked_users_count || 0);
          const handleLike = () => setLikes(likes + 1);

          // Giới hạn summary trong khoảng 50 ký tự
          const truncatedSummary = post.content.length > 50
            ? post.content.substring(0, 50) + "..."
            : post.content;

          return (
            <Link to={`/post/${post.id}`} key={post.id} className="block">
              <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col h-full border border-gray-200">
                <div className="flex-shrink-0 mb-4">
                  <img
                    src={post.thumbnail || fallbackImage}
                    alt={post.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                    className="w-full max-h-32 object-contain rounded-2xl mb-4"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-4">
                    <span className="bg-orange-100 text-orange-600 text-sm font-medium px-2 py-1 rounded-full">
                      {post.category.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {dayjs(post.created_at).fromNow()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{truncatedSummary}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => { e.preventDefault(); handleLike(); }}
                      className="flex items-center text-red-600 hover:text-red-800 font-medium"
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {likes}
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      Đọc Thêm <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestPost;