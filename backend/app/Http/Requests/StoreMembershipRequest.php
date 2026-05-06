<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMembershipRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $maxYear = (int) date('Y') + 1;

        return [
            'full_name' => ['required', 'string', 'max:200'],
            'birth_place' => ['required', 'string', 'max:200'],
            'birth_date' => ['required', 'date'],
            'address' => ['required', 'string', 'max:500'],
            'occupation' => ['required', 'string', 'max:200'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:200'],
            'university' => ['required', 'string', 'max:200'],
            'graduation_year' => ['required', 'integer', 'between:1900,' . $maxYear],
            'document' => ['required', 'file', 'mimes:jpg,jpeg', 'max:10240'],
        ];
    }
}
