import React from 'react';

const RelatedPosts = () => (
  <div className="bg-white rounded-3xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Related Posts</h3>
    <div className="space-y-4">
      {/* Post 1 */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/80x80"
          alt="Related Post 1"
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div>
          <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">Gym</span>
          <h4 className="text-lg font-semibold text-gray-900 mt-2">
            Ready, Set, Go! How to Start Running to Stay Fit
          </h4>
        </div>
      </div>
      {/* Post 2 */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/80x80"
          alt="Related Post 2"
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div>
          <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-3 py-1 rounded-full">Tutorials &

Demos</span>
          <h4 className="text-lg font-semibold text-gray-900 mt-2">
            How to Work Out in a Limited Space
          </h4>
        </div>
      </div>
      {/* Post 3 */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/80x80"
          alt="Related Post 3"
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div>
          <span className="bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">Gym</span>
          <h4 className="text-lg font-semibold text-gray-900 mt-2">
            Athletic Training is Soft and Hard
          </h4>
        </div>
      </div>
    </div>
  </div>
);

export default RelatedPosts;