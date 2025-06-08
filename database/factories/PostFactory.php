<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = \App\Models\Post::class;

    public function definition()
    {
        // Lấy 1 user id ngẫu nhiên
        $userId = User::inRandomOrder()->first()->id ?? 1;

        // Lấy 1 category id ngẫu nhiên
        $categoryId = Category::inRandomOrder()->first()->id ?? 1;

        $title = $this->faker->sentence(6, true);
        return [
            'user_id' => $userId,
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $this->faker->paragraphs(3, true),
            'thumbnail' => 'https://via.placeholder.com/600x400.png?text=Post+Thumbnail',
            'is_published' => $this->faker->boolean(80), // 80% true
        ];
    }
}
