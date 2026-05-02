<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = User::sort()->filter();

        return self::successList($query, $request);
    }

    public function show(User $user)
    {

    }


    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'firstname' => 'required|string|min:2|max:50',
                'lastname' => 'required|string|min:2|max:50',
                'username' => [
                    'nullable',
                    'string',
                    'min:2',
                    'max:50',
                    'unique:users,username',
                    'regex:/^[A-Za-z][A-Za-z0-9.]*[A-Za-z0-9]$/'
                ],
                'email' => 'required|string|min:2|max:50|unique:users,email,',
            ],
            [
                'username.regex' => 'The username must start with a letter, contain only letters, numbers, or dots, and cannot end with a dot.',
            ]
        );

        UserService::createUser($validated);

        return self::success($validated, 'Created');
    }


    public function update(User $user, Request $request)
    {
        $validated = $request->validate(
            [
                'firstname' => 'required|string|min:2|max:50',
                'lastname' => 'required|string|min:2|max:50',
                'username' => [
                    'nullable',
                    'string',
                    'min:2',
                    'max:50',
                    'unique:users,username,' . $user->id,
                    'regex:/^[A-Za-z][A-Za-z0-9.]*[A-Za-z0-9]$/'
                ],
                'email' => 'required|string|min:2|max:50|unique:users,email,' . $user->id,
            ],
            [
                'username.regex' => 'The username must start with a letter, contain only letters, numbers, or dots, and cannot end with a dot.',
            ]
        );

        $user->update($validated);

        return self::success($validated, 'Updated');
    }
}
