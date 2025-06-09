<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

//Auth
Route::post('/register', [AuthController::class, 'register']);

//Category
Route::get('/categories', [CategoryController::class, 'index']);

//Post
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/users/{userId}', [PostController::class, 'getPostsByUser']);
//User
Route::get('/users/{id}', [UserController::class, 'getUserById']);