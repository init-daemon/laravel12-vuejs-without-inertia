<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VerificationController;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/forgot-password', 'forgotPassword');
    Route::post('/reset-password', 'resetPassword');
});

Route::middleware('auth:api')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/user', 'user');
        Route::put('/user/password', 'updatePassword');
    });

    Route::apiResource('/users', UserController::class)->names('users');
});

Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])
    ->name('verification.verify');

Route::get('/{any?}', function () {
    abort(404, 'Not found.');
})->where('any', '.*');