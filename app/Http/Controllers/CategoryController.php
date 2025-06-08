<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Lấy tất cả categories và trả về dạng JSON
        return response()->json(Category::select('id', 'name')->get());
    }
}
