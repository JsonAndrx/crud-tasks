<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;

class ApiResponse
{
    public static function succes_response($message, $data, $response = Response::HTTP_OK) {
        return response([
            'status' => true,
            'message' => $message,
            'data' => $data
        ], $response);
    }

    public static function error_response($message, $error, $response = Response::HTTP_BAD_REQUEST) {
        return response([
            'status' => false,
            'message' => $message,
            'error' => $error
        ], $response);
    }
}