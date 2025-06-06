import React from 'react';

const FeaturedPost = () => (
  <div className="flex flex-col md:flex-row gap-6 bg-white rounded-3xl shadow-lg p-6">
    {/* Image */}
    <div className="w-full md:w-1/2">
      <img
        src="https://via.placeholder.com/500x300"
        alt="Featured Post"
        className="w-full h-64 object-cover rounded-2xl"
      />
    </div>

    {/* Content */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">Gym</span>
          <span className="text-gray-500 text-sm">22 Feb</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Best Full-Body Home Gym Machines!
        </h2>
        <p className="text-gray-600">
          Walking Is Recognized As A Safe And Effective Mode Of Exercise When The Goal Is To Improve Fitness, Health, Or Both. Something As Simple As A Daily Brisk Walk Can Help Someone...
        </p>
      </div>
      <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
        Read More
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
);

export default FeaturedPost;