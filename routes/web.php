<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
// Route::prefix('auth')->group(function () {
//     Route::get('me', [AuthController::class, 'me'])->middleware(['web', 'jwt.cookie']);
// });

Route::get('/admin/{any?}', function () {
    return view('admin');
})->where('any', '.*');

Route::get('/{any}', function () {
    return view('client');
})->where('any', '^(?!api).*$');
Route::get('/test-cache', function () {
    Cache::put('hello', 'world', 60);
    return Cache::get('hello');
});