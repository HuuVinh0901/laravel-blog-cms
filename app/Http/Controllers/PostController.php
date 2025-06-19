<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 3;
        $page = $request->input('page', 1);
        $cacheKey = "posts_page_{$page}_per_{$perPage}";

        $posts = Cache::remember($cacheKey, 60, function () use ($perPage, $page, $cacheKey) {
            Log::info("⚠️ Cache MISS - Query DB: $cacheKey");
            return Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
                ->withCount('likedUsers')
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);
        });

        Log::info("✅ Returning from cache key: $cacheKey");
        return response()->json($posts);
    }

    public function show($id)
    {
        $cacheKey = "post_detail_{$id}";

        $post = Cache::remember($cacheKey, 60, function () use ($id, $cacheKey) {
            Log::info("⚠️ Cache MISS - Query DB: $cacheKey");
            return Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
                ->withCount('likedUsers')
                ->find($id);
        });

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        Log::info("✅ Returning from cache key: $cacheKey");
        return response()->json($post);
    }

    public function getPostsByUser($userId)
    {
        $cacheKey = "posts_user_{$userId}";

        $posts = Cache::remember($cacheKey, 60, function () use ($userId, $cacheKey) {
            Log::info("⚠️ Cache MISS - Query DB: $cacheKey");
            return Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
                ->withCount('likedUsers')
                ->where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get();
        });

        Log::info("✅ Returning from cache key: $cacheKey");

        return response()->json([
            'data' => $posts,
            'message' => $posts->isEmpty() ? 'No posts found for this user' : 'Posts retrieved successfully'
        ], 200);
    }

    public function getPostsByCategory($categoryId, Request $request)
    {
        $perPage = 3;
        $page = $request->input('page', 1);
        $cacheKey = "posts_category_{$categoryId}_page_{$page}_per_{$perPage}";

        $posts = Cache::remember($cacheKey, 60, function () use ($categoryId, $perPage, $page, $cacheKey) {
            Log::info("⚠️ Cache MISS - Query DB: $cacheKey");
            return Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
                ->withCount('likedUsers')
                ->where('category_id', $categoryId)
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);
        });

        Log::info("✅ Returning from cache key: $cacheKey");

        return response()->json([
            'data' => $posts,
            'message' => $posts->isEmpty() ? 'No posts found for this category' : 'Posts retrieved successfully'
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->auth_user ?? null;
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'thumbnail' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'is_published' => 'nullable|boolean',
        ]);

        $data = $request->only(['title', 'content', 'thumbnail', 'category_id', 'is_published']);
        $data['user_id'] = $user->id;
        $data['slug'] = Str::slug($request->title);
        $data['is_published'] = $data['is_published'] ?? false;

        $post = Post::create($data);


        Cache::flush();

        return response()->json($post, 201);
    }
}
