<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;

Route::post('/register', [AuthController::class, 'register']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);