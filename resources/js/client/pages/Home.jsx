import React, { useState, useEffect } from 'react';
import FeaturedPost from '../components/ui/post/FeaturedPost';
import PostList from '../components/ui/post/LatestPost';
import RelatedPosts from '../components/ui/post/RelatedPosts';
import Categories from '../components/ui/category/Categories';
import Loading from '../components/Loading'; 
import { getPosts } from '../../api/apiClient';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data.data);
        console.log(response.data.data);
        const maxLikedPost = response.data.data.reduce((max, post) => max.liked_users_count > post.liked_users_count ? max : post);
        setFeaturedPost(maxLikedPost);
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">BLOG</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[400px]">
        <div className="lg:col-span-2 h-full">
          {featuredPost && <FeaturedPost post={featuredPost} />}
        </div>
        <aside className="lg:col-span-1 grid grid-rows-2 gap-4 h-full">
          {featuredPost && <RelatedPosts categoryId={featuredPost.category_id} posts={posts} />}
          <Categories />
        </aside>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Bài viết mới nhất</h2>
          <a
            href="/posts"
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
          >
            Xem tất cả
          </a>
        </div>
        <PostList posts={posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 2)} />
      </div>
    </main>
  );
};

export default Home;