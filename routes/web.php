<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/{any?}', function () {
    return view('admin');
})->where('any', '.*');

Route::get('/{any?}', function () {
    return view('client');
})->where('any', '.*');
