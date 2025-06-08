<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run()
    {
        // Tạo 5 bài post
        Post::factory()->count(5)->create();

        // Lấy tất cả user và post
        $users = User::all();
        $posts = Post::all();

        // Mỗi user like ngẫu nhiên 1-3 bài
        foreach ($users as $user) {
            $likedPosts = $posts->random(rand(1, 3));
            foreach ($likedPosts as $post) {
                // Thêm like mà không xoá các like khác
                $user->likedPosts()->syncWithoutDetaching($post->id);
            }
        }
    }
}
