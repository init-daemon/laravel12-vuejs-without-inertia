<?php

namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtAuthService implements AuthServiceInterface
{
    public function attempt(array $credentials): array
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return [null, null];
        }

        $user = JWTAuth::user();

        return [$token, $user];
    }

    public function logout(Request $request): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function user(Request $request): ?User
    {
        try {
            return JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return [$token, $user];
    }
}