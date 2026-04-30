<?php

namespace App\Listeners;

use App\Events\UserRegisterEvent;
use App\Mail\ConfirmEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class SendEmailConfirmationListener
{
    public function handle(UserRegisterEvent $event): void
    {
        $user = $event->user;
        
        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id]
        );

        Mail::to($user->email)->send(new ConfirmEmail($url, $user));
    }
}