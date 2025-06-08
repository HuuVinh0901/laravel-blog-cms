<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'thumbnail',
        'category_id',
        'is_published',
    ];

    // Quan hệ: bài viết thuộc về người dùng
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Quan hệ: bài viết thuộc danh mục
    public function category() {
        return $this->belongsTo(Category::class);
    }

    // Quan hệ: bài viết có nhiều comment
    public function comments() {
        return $this->hasMany(Comment::class);
    }

    // Quan hệ: bài viết có nhiều tag (n-n)
    // public function tags() {
    //     return $this->belongsToMany(Tag::class, 'post_tags');
    // }
}
