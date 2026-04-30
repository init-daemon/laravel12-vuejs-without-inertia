<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
    <style>
        body, table, td, a {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .card {
            background-color: #ffffff;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            text-align: center;
        }
        .btn {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin: 24px 0;
        }
        .footer {
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            margin-top: 24px;
        }
    </style>
</head>
<body class="container">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <div class="card">
                    <h2 style="margin-top: 0;">Reset your password</h2>

                    <p>Hello,</p>

                    <p>
                        You have requested a password reset for your account associated with
                        <strong>{{ $userEmail }}</strong>.
                    </p>

                    <p>Click on the button below to define your new password:</p>

                    <a href="{{ $resetLink }}" class="btn">Reset my password</a>

                    <p>
                        This link is valid for <strong>60 minutes</strong>. If you did not initiate this request, please ignore this email.
                    </p>

                    <p style="font-size: 13px; color: #6b7280; margin-top: 16px;">
                        If you don't see this email in your inbox, please check your spam or junk folder.
                    </p>

                    <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

                    <p style="font-size: 14px; color: #4b5563;">
                        Thanks,<br>
                        The {{ config('app.name') }} team
                    </p>
                </div>

                <div class="footer">
                    &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                </div>
            </td>
        </tr>
    </table>
</body>
</html>