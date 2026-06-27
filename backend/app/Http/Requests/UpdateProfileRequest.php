<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name'           => ['sometimes', 'string', 'max:255'],
            'email'          => ['sometimes', 'email', 'max:255', Rule::unique('users')->ignore($userId)],
            'wallet_address' => ['nullable', 'string', 'max:255'],
            'avatar_url'     => ['nullable', 'url', 'max:500'],
        ];
    }
}
