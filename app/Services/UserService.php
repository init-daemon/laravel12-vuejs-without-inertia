<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public static function generateUsername(string $firstname, string $lastname): string
    {
        $base = Str::slug($firstname . '.' . $lastname, '.');

        $username = $base;
        $count = 1;

        while (User::where('username', $username)->exists()) {
            $username = $base . '.' . $count;
            $count++;
        }

        return $username;
    }

    public static function createUser(array $data): User
    {
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $username = $data['username'] ?? static::generateUsername($firstname, $lastname);
        $password = $data['password'] ?? fake()->password(8);

        $user = User::create([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'username' => $username,
            'email' => $data['email'],
            'password' => Hash::make($password),
        ]);

        return $user;
    }


    public static function checkEmailVerified(string $email)
    {
        $user = User::where('email', $email)->first();
        
        if (!$user->hasVerifiedEmail()) {
            abort(403, 'Your email address is not verified yet. Please check your inbox and verify your email before logging in.');
        }
    }
}