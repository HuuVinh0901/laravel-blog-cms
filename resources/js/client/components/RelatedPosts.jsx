import React from 'react';

const RelatedPosts = ({ categoryId, posts }) => {
  const related = posts.filter(post => post.category_id === categoryId).slice(0, 3);
  const fallbackImage = "/images/no-image.png";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 max-h-[180px] overflow-y-auto"> {/* Chiều cao cố định với scroll */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">Bài viết liên quan</h3>
      <div className="space-y-3">
        {related.map((post) => (
          <div key={post.id} className="flex items-center gap-3">
            <img
              src={post.thumbnail || fallbackImage}
              alt={post.title}
              onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div>
              <span className="bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-full">{post.category.name}</span>
              <h4 className="text-lg font-semibold text-gray-900 mt-1">{post.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;