import React, { useState } from 'react';

const FeaturedPost = ({ post }) => {
  const fallbackImage = "/images/no-image.png";
  const [likes, setLikes] = useState(post.liked_users_count);

  const handleLike = () => {
    setLikes(likes + 1);
  };
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-3xl shadow-lg p-4 h-full">
      <div className="w-full md:w-1/2">
        <img
          src={post.thumbnail || fallbackImage}
          alt={post.title}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-orange-100 text-orange-600 text-sm font-medium px-2 py-1 rounded-full">{post.category.name}</span>
            <span className="text-gray-500 text-sm">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-2">{post.title}</h2>
          <p className="text-gray-600">{truncateText(post.content, 50)}</p>
        </div>
        <div className="mt-2 flex items-center">
          <button onClick={handleLike} className="flex items-center text-red-600 hover:text-red-800 font-medium mr-4">
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
  );
};

export default FeaturedPost;