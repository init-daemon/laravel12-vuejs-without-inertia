<?php

namespace App\Http\Controllers\Api\Auth;

use App\Contracts\AuthServiceInterface;
use App\Http\Controllers\Api\BaseApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

        return self::success([
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

        return self::success([
            'token' => $token,
            'user' => $user,
        ], code: 201);
    }


    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();
        
        if (!Hash::check($request->old_password, $user->password)) {
            $errMsg = 'The current password is incorrect.';
            return self::error($errMsg, [
                'old_password' => [$errMsg],
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return self::success(message: 'Password updated successfully');
    }
}