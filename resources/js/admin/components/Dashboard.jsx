import React from 'react';

const Dashboard = () => {
  const sampleData = {
    totalUsers: 150,
    totalPosts: 320,
    totalCategories: 25,
    lastUpdated: '04:02 PM +07, June 21, 2025',
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{sampleData.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Posts</h2>
          <p className="text-2xl">{sampleData.totalPosts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Categories</h2>
          <p className="text-2xl">{sampleData.totalCategories}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Last Updated</h2>
          <p className="text-2xl">{sampleData.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;