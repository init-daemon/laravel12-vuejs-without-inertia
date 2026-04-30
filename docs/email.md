## Email Queue for Password Reset

Password reset emails are processed through Laravel queues to avoid blocking the API while waiting for SMTP.

## Why we use queues

Sending emails directly during the request can slow down the API and introduce reliability issues (SMTP delays, timeouts, transient failures).

Using queues solves this by:

* Returning the API response immediately after the request is handled
* Retrying email jobs automatically if something fails
* Running email delivery in the background
* Keeping the user experience fast and consistent

## Setup

### Queue driver

For local development:

```env
QUEUE_CONNECTION=database
```

In production, we use Redis:

```env
QUEUE_CONNECTION=redis
```

---

### Database queue setup

```bash
php artisan queue:table
php artisan migrate
```

## How it works

An event listener handles the password reset email asynchronously.

```php
namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendPasswordRequestListener implements ShouldQueue
{
    public $queue = 'emails';
    public $tries = 3;

    public function handle(UserForgotPasswordEvent $event): void
    {
        $resetLink = '...';

        Mail::to($event->user->email)
            ->send(new ForgotPasswordMail($resetLink, $event->user->email));
    }

    public function backoff(): array
    {
        return [10, 30, 60];
    }
}
```

## Running the worker

```bash
php artisan queue:work --queue=emails --tries=3 --timeout=90
```

## Production setup

In production, workers are usually managed with Supervisor to ensure they keep running:

```ini
[program:laravel-worker]
command=php artisan queue:work --queue=emails --tries=3 --timeout=90
autostart=true
autorestart=true
user=www-data
stdout_logfile=/var/log/laravel-worker.log
```

## Important note

We explicitly rely on the listener being queueable (`ShouldQueue`) to handle email delivery asynchronously.

Inside the listener, we use `send()` instead of `queue()` because the job is already executed in the background. This avoids unnecessary nested queuing and keeps the flow simpler and more predictable.

Keeping the mail logic explicit inside the listener improves readability and makes the execution flow easier to understand.