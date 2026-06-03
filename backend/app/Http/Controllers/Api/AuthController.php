<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
            'birth_place' => ['required', 'string', 'max:255'],
            'birth_date' => ['required', 'date'],
            'address' => ['required', 'string'],
            'occupation' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'university' => ['required', 'string', 'max:255'],
            'graduation_year' => ['required', 'string', 'max:4'],
            'category' => ['required', Rule::in([
                User::CATEGORY_DOKTER_HEWAN,
                User::CATEGORY_PARAMEDIS,
            ])],
            'province_code' => ['required', 'string', 'max:10'],
            'province_name' => ['required', 'string', 'max:255'],
            'regency_code' => ['required', 'string', 'max:10'],
            'regency_name' => ['required', 'string', 'max:255'],
            'district_code' => ['required', 'string', 'max:10'],
            'district_name' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:10'],
            'diploma_number' => ['nullable', 'string', 'max:255'],
        ]);

        $hasDiploma = !empty($data['diploma_number']);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => false,
            'birth_place' => $data['birth_place'],
            'birth_date' => $data['birth_date'],
            'address' => $data['address'],
            'occupation' => $data['occupation'],
            'phone' => $data['phone'],
            'university' => $data['university'],
            'graduation_year' => $data['graduation_year'],
            'category' => $data['category'],
            'province_code' => $data['province_code'],
            'province_name' => $data['province_name'],
            'regency_code' => $data['regency_code'],
            'regency_name' => $data['regency_name'],
            'district_code' => $data['district_code'],
            'district_name' => $data['district_name'],
            'postal_code' => $data['postal_code'],
            'diploma_number' => $hasDiploma ? $data['diploma_number'] : null,
            'membership_status' => $hasDiploma
                ? User::STATUS_PENDING_VERIFICATION
                : User::STATUS_AWAITING_DIPLOMA,
            'diploma_deadline_at' => $hasDiploma
                ? null
                : Carbon::now()->addDays(User::DIPLOMA_DEADLINE_DAYS),
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

        $user = Auth::user();
        $this->autoExpireIfDue($user);

        return response()->json([
            'user' => $this->userPayload($user->fresh()),
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
        $user = $request->user();
        $this->autoExpireIfDue($user);

        return response()->json([
            'user' => $this->userPayload($user->fresh()),
        ]);
    }

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
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'university' => ['nullable', 'string', 'max:255'],
            'graduation_year' => ['nullable', 'string', 'max:4'],
            'category' => ['nullable', Rule::in([
                User::CATEGORY_DOKTER_HEWAN,
                User::CATEGORY_PARAMEDIS,
            ])],
            'province_code' => ['nullable', 'string', 'max:10'],
            'province_name' => ['nullable', 'string', 'max:255'],
            'regency_code' => ['nullable', 'string', 'max:10'],
            'regency_name' => ['nullable', 'string', 'max:255'],
            'district_code' => ['nullable', 'string', 'max:10'],
            'district_name' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:10'],
            'diploma_number' => ['nullable', 'string', 'max:255'],
        ]);

        $diplomaProvided = array_key_exists('diploma_number', $data)
            && !empty($data['diploma_number']);
        $diplomaChanged = array_key_exists('diploma_number', $data)
            && ($data['diploma_number'] ?? null) !== $user->diploma_number;

        $resetableStates = [
            User::STATUS_AWAITING_DIPLOMA,
            User::STATUS_PENDING_VERIFICATION,
            User::STATUS_EXPIRED,
            User::STATUS_REJECTED,
        ];

        if ($diplomaChanged && in_array($user->membership_status, $resetableStates, true)) {
            if ($diplomaProvided) {
                $data['membership_status'] = User::STATUS_PENDING_VERIFICATION;
                $data['diploma_deadline_at'] = null;
                $data['verified_by'] = null;
                $data['verification_notes'] = null;
                $data['joined_at'] = null;
            } else {
                $data['membership_status'] = User::STATUS_AWAITING_DIPLOMA;
                $data['diploma_deadline_at'] = Carbon::now()
                    ->addDays(User::DIPLOMA_DEADLINE_DAYS);
            }
        }

        $user->update($data);

        return response()->json([
            'user' => $this->userPayload($user->fresh()),
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

    private function autoExpireIfDue(?User $user): void
    {
        if (!$user || $user->is_admin) {
            return;
        }
        if ($user->membership_status !== User::STATUS_AWAITING_DIPLOMA) {
            return;
        }
        if (!$user->diploma_deadline_at || $user->diploma_deadline_at->isFuture()) {
            return;
        }

        $user->update([
            'membership_status' => User::STATUS_EXPIRED,
        ]);
    }

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
            'birth_place' => $user->birth_place,
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null,
            'address' => $user->address,
            'occupation' => $user->occupation,
            'phone' => $user->phone,
            'university' => $user->university,
            'graduation_year' => $user->graduation_year,
            'category' => $user->category,
            'province_code' => $user->province_code,
            'province_name' => $user->province_name,
            'regency_code' => $user->regency_code,
            'regency_name' => $user->regency_name,
            'district_code' => $user->district_code,
            'district_name' => $user->district_name,
            'postal_code' => $user->postal_code,
            'diploma_number' => $user->diploma_number,
            'diploma_deadline_at' => $user->diploma_deadline_at?->toIso8601String(),
            'membership_number' => $user->membership_number,
            'membership_status' => $user->membership_status,
            'joined_at' => $user->joined_at?->toIso8601String(),
            'verification_notes' => $user->verification_notes,
        ];
    }
}
