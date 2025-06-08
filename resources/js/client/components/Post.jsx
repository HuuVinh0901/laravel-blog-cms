import React from 'react';

const Post = ({ category, title, summary }) => (
  <div className="bg-white rounded-3xl shadow-lg p-6">
    <img
      src="https://via.placeholder.com/400x200"
      alt={title}
      className="w-full h-48 object-cover rounded-2xl mb-4"
      loading="lazy"
    />
    <span className={`bg-${category === 'Gym' ? 'orange' : 'green'}-100 text-${category === 'Gym' ? 'orange' : 'green'}-600 text-sm font-medium px-3 py-1 rounded-full`}>
      {category}
    </span>
    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{title}</h3>
    <p className="text-gray-600">{summary}</p>
    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
      Đọc Thêm <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  </div>
);

export default Post;