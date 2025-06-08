<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['category', 'likedUsers'])->withCount('likedUsers')->orderBy('created_at', 'desc')->get();
    }

    // GET /api/posts/{id}
    public function show($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post);
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
