import React, { useState, useEffect } from 'react';
import FeaturedPost from '../components/ui/post/FeaturedPost';
import PostList from '../components/ui/post/PostList';
import RelatedPosts from '../components/ui/post/RelatedPosts';
import Categories from '../components/ui/Categories';
import Loading from '../components/Loading'; // Import component loading
import { getPosts } from '../../api/apiClient';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        const maxLikedPost = response.data.reduce((max, post) => max.liked_by_users_count > post.liked_by_users_count ? max : post);
        setFeaturedPost(maxLikedPost);
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      } finally {
        setLoading(false); // Dừng loading khi hoàn thành hoặc lỗi
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">BLOG</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[400px]">
        {/* Featured Post */}
        <div className="lg:col-span-2 h-full">
          {featuredPost && <FeaturedPost post={featuredPost} />}
        </div>
        {/* Related Posts và Categories */}
        <aside className="lg:col-span-1 grid grid-rows-2 gap-4 h-full">
          {featuredPost && <RelatedPosts categoryId={featuredPost.category_id} posts={posts} />}
          <Categories />
        </aside>
      </div>
      {/* Danh sách bài viết mới nhất */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bài viết mới nhất</h2>
        <PostList posts={posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))} />
      </div>
    </main>
  );
};

export default Home;