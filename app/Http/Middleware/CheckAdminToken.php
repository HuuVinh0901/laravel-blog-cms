<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->cookie('access_token');
            if (!$token) {
                return response()->json([
                    'message' => 'Token is required'
                ], 401);
            }

            $user = JWTAuth::setToken($token)->authenticate();
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Unauthorized. Admin access only'
                ], 403);
            }
            $request->merge(['auth_user' => $user]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token has expired'
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token is invalid'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unable to authenticate'
            ], 401);
        }

        return $next($request);
    }
}
