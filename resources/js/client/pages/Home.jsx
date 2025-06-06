import React from 'react';
import FeaturedPost from '../components/FeaturedPost';
import RelatedPosts from '../components/RelatedPosts';
import Categories from '../components/Categories';

const Home = () => (
  <main className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
    {/* Main Content */}
    <div className="flex-grow">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8">BLOG</h1>
      <FeaturedPost />
      {/* Additional Posts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Post 1"
            className="w-full h-48 object-cover rounded-2xl mb-4"
          />
          <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">Gym</span>
          <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">Another Great Post Title</h3>
          <p className="text-gray-600">A short summary of another blog post to keep the reader engaged...</p>
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
            Read More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Post 2"
            className="w-full h-48 object-cover rounded-2xl mb-4"
          />
          <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">Fitness</span>
          <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">Yet Another Post Title</h3>
          <p className="text-gray-600">A short summary of another blog post to keep the reader engaged...</p>
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
            Read More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <aside className="w-full md:w-1/3">
      <RelatedPosts />
      <Categories />
      <div className="mt-6">
        <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          Read Our Blog
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </aside>
  </main>
);

export default Home;