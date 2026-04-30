<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseApiController;

class VerificationController extends BaseApiController
{
    public function verify(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->hasVerifiedEmail() || ! $request->hasValidSignature()) {
            return redirect('/login');
        }

        $user->markEmailAsVerified();

        return redirect('/login?verified=1');
    }
}