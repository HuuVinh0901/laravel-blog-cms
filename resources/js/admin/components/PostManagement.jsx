import React from 'react';

const PostManagement = () => {
  const samplePosts = [
    { id: 1, title: 'Post 1', author: 'Nguyen Van A', date: 'June 20, 2025' },
    { id: 2, title: 'Post 2', author: 'Tran Van B', date: 'June 19, 2025' },
    { id: 3, title: 'Post 3', author: 'Le Thi C', date: 'June 18, 2025' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Post Management</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {samplePosts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-2">{post.id}</td>
              <td className="p-2">{post.title}</td>
              <td className="p-2">{post.author}</td>
              <td className="p-2">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostManagement;