<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
            ->withCount('likedUsers')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function show($id)
    {
        $post = Post::with(['user:id,name,avatar', 'category', 'likedUsers']) 
            ->withCount('likedUsers')
            ->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }
    public function getPostsByUser($userId)
    {
        $posts = Post::with(['user:id,name,avatar', 'category', 'likedUsers'])
            ->withCount('likedUsers')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    
        if ($posts->isEmpty()) {
            return response()->json([
                'message' => 'No posts found for this user'
            ], 404);
        }
    
        return response()->json($posts);
    }
    
    // POST /api/posts
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'title' => 'required|string',
    //         'summary' => 'nullable|string',
    //         'content' => 'required|string',
    //         'image_url' => 'nullable|string',
    //         'category' => 'nullable|string',
    //     ]);

    //     $post = Post::create($request->all());
    //     return response()->json($post, 201);
    // }

    // // PUT /api/posts/{id}
    // public function update(Request $request, $id)
    // {
    //     $post = Post::find($id);
    //     if (!$post) {
    //         return response()->json(['message' => 'Post not found'], 404);
    //     }

    //     $post->update($request->all());
    //     return response()->json($post);
    // }

    // // DELETE /api/posts/{id}
    // public function destroy($id)
    // {
    //     $post = Post::find($id);
    //     if (!$post) {
    //         return response()->json(['message' => 'Post not found'], 404);
    //     }

    //     $post->delete();
    //     return response()->json(['message' => 'Post deleted']);
    // }
}
