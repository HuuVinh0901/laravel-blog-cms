<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout',[AuthController::class, 'logout'])->middleware('refresh.token');
    Route::post('refresh', [AuthController::class, 'refreshToken'])->middleware('refresh.token');
    Route::get('me', [AuthController::class, 'me'])->middleware('jwt.cookie');
});


//Category
Route::get('/categories', [CategoryController::class, 'index']);

//Post
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/users/{userId}', [PostController::class, 'getPostsByUser']);
Route::get('/posts/categories/{id}', [PostController::class, 'getPostsByCategory']);
//User
Route::get('/users/{id}', [UserController::class, 'getUserById']);
Route::get('/test-cookie', function () {
    return response()->json([
        'cookies' => request()->cookies->all()
    ]);
});
