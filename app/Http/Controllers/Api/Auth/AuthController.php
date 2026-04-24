<?php

namespace App\Http\Controllers\Api\Auth;

use App\Contracts\AuthServiceInterface;
use App\Http\Controllers\Api\BaseApiController;
use Illuminate\Http\Request;

class AuthController extends BaseApiController
{
    public function __construct(
        protected AuthServiceInterface $authService
    ) {}

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        [$token, $user] = $this->authService->attempt($request->only('email', 'password'));

        if (!$token) {
            return self::error("Invalid credentials", code: 422);
        }

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request);

        return  self::success(message: 'Logged out');
    }

    public function user(Request $request)
    {
        $user = $this->authService->user($request);

        return self::success($user);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        [$token, $user] = $this->authService->register($request->all());

        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 201);
    }
}