<?php

namespace App\Providers;

use App\Contracts\AuthServiceInterface;
use App\Services\SanctumAuthService;
use App\Services\JwtAuthService;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthServiceInterface::class, function ($app) {
            return match (config('auth_service.driver')) {
                'jwt' => new JwtAuthService(),
                default => new SanctumAuthService(),
            };
        });
    }
}