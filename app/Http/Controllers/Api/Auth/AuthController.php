<?php

namespace App\Http\Controllers\Api\Auth;

use App\Contracts\AuthServiceInterface;
use App\Events\UserForgotPasswordEvent;
use App\Events\UserRegisterEvent;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\User;
use App\Services\UserService;
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

        UserService::checkEmailVerified($request->email);

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
            'firstname' => 'required|string|min:2|max:50',
            'lastname' => 'required|string|min:2|max:50',
            'email' => 'required|string|min:2|max:50|unique:users,email,',
            'password' => 'required|min:8|confirmed',
        ]);

        $registerResult = $this->authService->register($request->all());
        $user = $registerResult['user'];

        event(new UserRegisterEvent($user));

        return self::success([
            'user' => $user,
        ], 'Registration successful! Please check your email to confirm your address.', 201);
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
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = Password::createToken($user);
    
            event(new UserForgotPasswordEvent($user, $token));
        }

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

                if (!$user->hasVerifiedEmail()) {
                    $user->email_verified_at = now();
                }

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