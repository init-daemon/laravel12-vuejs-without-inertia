<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\Request;

class BaseApiController extends Controller
{
    const DEFAULT_PER_PAGE = 25;

    /**
     * success response method.
     *
     * @return JsonResponse
     */
    public static function success($result = null, ?string $message = null, $code = 200)
    {
        $response = [
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, $code);
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


    /**
     * success response method (for list).
     *
     * @return JsonResponse
     */
    public static function successList($query, Request $request)
    {
        $noPagination = $request->boolean('no_pagination');

        if ($noPagination) {
            $data = $query->get();

            return response()->json([
                'data' => $data,
                'meta' => []
            ]);
        }

        $paginated = $query->paginate(
            perPage: $request->input('per_page', self::DEFAULT_PER_PAGE),
            page: $request->input('current_page', 1)
        );

        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ]
        ]);
    }
}
