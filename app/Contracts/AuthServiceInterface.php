<?php

namespace App\Contracts;

use Illuminate\Http\Request;

interface AuthServiceInterface
{
    /**
     * Attempts to authenticate the user with the provided credentials(email, password).
     * Returns an array containing the token (or null) and the user object. [token: String, user: \App\Models\User]
     */

    public function attempt(array $credentials): array;

    public function logout(Request $request): void;

    /**
     * Retrieve the currently authenticated user from the request.
     */
    public function user(Request $request): ?\App\Models\User;

    /**
     * Register a new user.
     */
    public function register(array $data): array;
}