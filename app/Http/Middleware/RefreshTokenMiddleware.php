<?php
namespace App\Http\Middleware;

use Closure;
use App\Models\RefreshToken;

class RefreshTokenMiddleware
{
    public function handle($request, Closure $next)
    {
        $refreshToken = $request->cookie('refresh_token');
        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token không được cung cấp'], 400);
        }

        $token = RefreshToken::where('token', hash('sha256', $refreshToken))
            ->where('expires_at', '>', now())
            ->where('revoked', false)
            ->first();

        if (!$token) {
            return response()->json(['error' => 'Refresh token không hợp lệ hoặc đã hết hạn'], 401);
        }

        $request->merge(['refresh_token' => $token]);
        return $next($request);
    }
}