import React from 'react';

const PostList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Tiêu đề bài viết {index + 1}</h3>
        <p className="text-gray-600 mb-4">Đây là nội dung tóm tắt của bài viết. Nhấn vào để đọc thêm...</p>
        <a href="#" className="text-blue-600 font-medium hover:underline">Đọc thêm</a>
      </div>
    ))}
  </div>
);

export default PostList;