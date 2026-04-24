<?php

namespace App\Services;

use App\Contracts\AuthServiceInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SanctumAuthService implements AuthServiceInterface
{
    public function attempt(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [null, null];
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [$token, $user];
    }

    public function logout(Request $request): void
    {
        $request->user()->currentAccessToken()->delete();
    }

    public function user(Request $request): ?User
    {
        return $request->user();
    }

    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [$token, $user];
    }
}