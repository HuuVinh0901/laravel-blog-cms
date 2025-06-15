<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $token = $request->cookie('access_token');
            if (!$token) return response()->json(['error' => 'Token không được cung cấp'], 400);

            $user = JWTAuth::setToken($token)->authenticate();
            if (!$user) return response()->json(['error' => 'Người dùng không tồn tại'], 404);

            $request->merge(['auth_user' => $user]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token đã hết hạn'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token không hợp lệ'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xác thực'], 401);
        }

        return $next($request);
    }
}
