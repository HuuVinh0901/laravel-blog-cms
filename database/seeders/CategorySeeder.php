<?php

namespace Database\Seeders;

use App\Models\Category;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Technology',
            'Health',
            'Lifestyle',
            'Food',
            'Fitness',
            'Travel',
            'Education',
            'Finance',
            'Entertainment',
            'Business',
        ];

        foreach ($categories as $name) {
            Category::create([
                'name' => $name,
            ]);
        }
    }
}
