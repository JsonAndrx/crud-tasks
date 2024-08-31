<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:pending,completed',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Title is required',
            'title.string' => 'Title must be a string',
            'title.max' => 'Title must not exceed 255 characters',
            'description.required' => 'Description is required',
            'description.string' => 'Description must be a string',
            'status.required' => 'Status is required',
            'status.in' => 'Status must be either pending or completed',
        ];
    }
}
