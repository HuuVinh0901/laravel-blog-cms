<?php

namespace App\Http\Controllers;

use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
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

        $userValidationResult = $this->validateUserCredentials($credentials['email'], $credentials['password']);
        if ($userValidationResult instanceof JsonResponse) {
            return $userValidationResult;
        }

        $user = JWTAuth::user();

        try {
            $accessToken = JWTAuth::fromUser($user);
            $refreshToken = bin2hex(random_bytes(64));

            RefreshToken::create([
                'user_id' => $user->id,
                'token' => hash('sha256', $refreshToken),
                'expires_at' => now()->addDays(7),
            ]);

            return $this->respondWithToken($accessToken, $refreshToken);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Không thể tạo token'], 500);
        }
    }
    public function refreshToken(Request $request)
    {
        $token = $request->refresh_token;
        $user = User::find($token->user_id);

        if (!$user) {
            return response()->json(['error' => 'Người dùng không tồn tại'], 404);
        }

        try {
            $accessToken = JWTAuth::fromUser($user);
            $newRefreshToken = bin2hex(random_bytes(64));

            // Cập nhật refresh token cũ
            $token->update([
                'token' => hash('sha256', $newRefreshToken),
                'expires_at' => now()->addDays(7),
                'revoked' => false,
            ]);

            return $this->respondWithToken($accessToken, $newRefreshToken);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Không thể làm mới token'], 500);
        }
    }
    public function logout(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');
        if ($refreshToken) {
            RefreshToken::where('token', hash('sha256', $refreshToken))
                ->update(['revoked' => true]);
        }

        return response()
            ->json(['message' => 'Đăng xuất thành công'])
            ->cookie('access_token', null, -1)
            ->cookie('refresh_token', null, -1);
    }
    public function me()
    {
        $user = JWTAuth::user();

        return response()->json($user);
    }
    protected function validateUserCredentials($email, $password)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => 'Email chưa được đăng ký'], 404);
        }

        if (!JWTAuth::attempt(['email' => $email, 'password' => $password])) {
            return response()->json(['error' => 'Mật khẩu không đúng'], 401);
        }

        return $user;
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
