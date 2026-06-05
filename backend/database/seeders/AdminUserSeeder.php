<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Buat/perbarui akun admin dari kredensial di .env.
     * Admin sengaja TANPA membership_number & category (NULL) — tidak ikut
     * urutan/penomoran anggota. Set ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD di .env.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@konsilveteriner.com');
        $password = env('ADMIN_PASSWORD', 'change-me');

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => env('ADMIN_NAME', 'Administrator KVI'),
                'password' => Hash::make($password),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
