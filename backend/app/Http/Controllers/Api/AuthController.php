<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'email' => ['required', 'email', 'max:200', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'birth_place' => ['required', 'string', 'max:255'], // Baru
            'birth_date' => ['required', 'date'], // Baru
            'address' => ['required', 'string'],
            'occupation' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'university' => ['required', 'string', 'max:255'],
            'graduation_year' => ['required', 'string', 'max:4'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => false,
            'birth_place' => $data['birth_place'], // Baru
            'birth_date' => $data['birth_date'], // Baru
            'address' => $data['address'],
            'occupation' => $data['occupation'],
            'phone' => $data['phone'],
            'university' => $data['university'],
            'graduation_year' => $data['graduation_year'],
        ]);

        Auth::login($user);

        return response()->json([
            'user' => $this->userPayload($user),
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email atau password salah.',
            ], 422);
        }

        $request->session()->regenerate();

        return response()->json([
            'user' => $this->userPayload(Auth::user()),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out.',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->userPayload($request->user()),
        ]);
    }

    // UPDATE: Penyesuaian agar menerima data keanggotaan baru
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'email' => [
                'required',
                'email',
                'max:200',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'birth_place' => ['nullable', 'string', 'max:255'], // Baru
            'birth_date' => ['nullable', 'date'], // Baru
            'address' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'university' => ['nullable', 'string', 'max:255'],
            'graduation_year' => ['nullable', 'string', 'max:4'],
        ]);

        $user->update($data);

        return response()->json([
            'user' => $this->userPayload($user),
        ]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (!Hash::check($data['current_password'], (string) $user->password)) {
            return response()->json([
                'message' => 'Password lama tidak cocok.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'message' => 'Password diperbarui.',
        ]);
    }

    // UPDATE: Penambahan field agar React bisa membaca semua data
    private function userPayload(?User $user): ?array
    {
        if (!$user) {
            return null;
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_admin' => $user->is_admin,
            'birth_place' => $user->birth_place, // Baru
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null, // Baru, diformat agar rapi di input type="date"
            'address' => $user->address,
            'occupation' => $user->occupation,
            'phone' => $user->phone,
            'university' => $user->university,
            'graduation_year' => $user->graduation_year,
        ];
    }
}
