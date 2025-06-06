import React from 'react';

const Categories = () => (
  <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
    <div className="space-y-2">
      <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Medical Knowledge</span>
      <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Bodybuilding</span>
      <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Reggie Food</span>
      <span className="bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Sickness</span>
      <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Diet</span>
      <span className="bg-pink-100 text-pink-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Lifestyle</span>
      <span className="bg-teal-100 text-teal-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Diseases</span>
      <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full inline-block">Healthy Food</span>
    </div>
    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
      View All Categories
      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
);

export default Categories;