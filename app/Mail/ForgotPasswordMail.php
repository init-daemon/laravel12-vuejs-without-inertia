<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForgotPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $resetLink, public string $userEmail)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset your password.',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.forgot-password',
            with: [
                'resetLink' => $this->resetLink,
                'userEmail' => $this->userEmail,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}