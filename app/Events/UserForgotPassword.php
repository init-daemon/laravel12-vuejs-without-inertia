<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserForgotPassword
{
    use Dispatchable, SerializesModels;

    public function __construct(public User $user, public string $token)
    {
        $this->user = $user;
        $this->token = $token;
    }
}
