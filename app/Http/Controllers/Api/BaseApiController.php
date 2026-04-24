<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller as Controller;

class BaseApiController extends Controller
{

    /**
     * success response method.
     *
     * @return JsonResponse
     */
    public static function success($result = null, ?string $message = null)
    {
        $response = [
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return JsonResponse
     */
    public static function error(string $errorMessage = "An error has occurred.", array $errorMessages = [], int $code = 404)
    {
        $response = [
            'message' => $errorMessage,
        ];

        if(!empty($errorMessages)){
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

}
