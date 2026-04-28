<?php

namespace App\Services;

use App\Models\User;
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
}