<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function register(Request $request)
    {
        // Validate dữ liệu
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Tạo người dùng
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => $user
        ], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();
        if (!$user) {
            return response()->json([
                'error' => 'Email chưa được đăng ký'
            ], 404);
        }

        if (! $accessToken = JWTAuth::attempt($credentials)) {
            return response()->json([
                'error' => 'Mật khẩu không đúng'
            ], 401);
        }

        try {
            $user = JWTAuth::user();

            $refreshToken = bin2hex(random_bytes(64));

            $user->refresh_token = $refreshToken;
            $user->save();

            return $this->respondWithToken($accessToken, $refreshToken);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Không thể tạo token'], 500);
        }
    }
    public function me()
    {
        $user = JWTAuth::user(); 

        return response()->json($user);
    }
    protected function respondWithToken($accessToken, $refreshToken)
    {
        return response()
            ->json([
                'message' => 'Đăng nhập thành công',
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60
            ])
            ->cookie('access_token', $accessToken, config('jwt.ttl'), '/', null, true, true, false, 'Strict')
            ->cookie('refresh_token', $refreshToken, 43200, '/', null, true, true, false, 'Strict'); // 30 ngày
    }
}
