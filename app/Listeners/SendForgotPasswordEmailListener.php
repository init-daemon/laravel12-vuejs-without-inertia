<?php

namespace App\Listeners;

use App\Events\UserForgotPassword;
use App\Mail\ForgotPasswordMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendForgotPasswordEmailListener implements ShouldQueue
{
    public string $queue = 'emails';

    public int $tries = 3;

    /**
     * Handle the event.
     */
    public function handle(UserForgotPassword $event): void
    {
        $resetLink = config('app.url'). '/reset-password/' . $event->token . '?email=' . urlencode($event->user->email);

        Mail::to($event->user->email)->send(new ForgotPasswordMail($resetLink, $event->user->email));
    }

    public function backoff(): array
    {
        return [10, 30, 60];
    }
}