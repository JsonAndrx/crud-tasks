<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Helpers\ApiResponse;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            $user = User::where('name', $request->username)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'username' => ['The provided credentials are incorrect.'],
                ]);
            }

            $token = $user->createToken('auth-token')->plainTextToken;

            return ApiResponse::succes_response('User logged in successfully', ['token' => $token]);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to login user', $e->getMessage());
        }
    }
}
