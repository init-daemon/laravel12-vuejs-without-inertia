<?php

namespace App\Http\Controllers\Api\Auth;

use App\Contracts\AuthServiceInterface;
use App\Events\UserForgotPassword;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

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
        $user = auth()->user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();
        
        if (!Hash::check($request->current_password, $user->password)) {
            $errMsg = 'The current password is incorrect.';
            return self::error($errMsg, [
                'current_password' => [$errMsg],
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return self::success(message: 'Password updated successfully');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        $token = Password::createToken($user);

        event(new UserForgotPassword($user, $token));

        return self::success(message: 'A password reset email has been sent to you.');
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|min:8|confirmed',
        ]);

        $record = \DB::table('password_reset_tokens')->where('email', $request->email)->first();
        
        if (!$record) {
            return self::error('No password reset request was found for this email.', code: 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            \DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return self::success(message: 'Password reset successfully.');
        }

        return self::error('Password reset link is invalid or expired.', code: 422);
    }
}