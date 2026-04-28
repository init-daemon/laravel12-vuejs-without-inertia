<?php

namespace App\Enums;

enum UserTypeEnum: string
{
    case ADMIN = 'admin';

    public function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
