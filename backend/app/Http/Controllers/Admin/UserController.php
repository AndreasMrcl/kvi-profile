<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class UserController extends Controller
{
    public function index(): View
    {
        $admins = User::query()
            ->where('is_admin', true)
            ->orderBy('name')
            ->paginate(20);

        return view('admin.users.index', [
            'admins' => $admins,
        ]);
    }

    public function create(): View
    {
        return view('admin.users.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'email' => ['required', 'email', 'max:200', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $admin = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        return redirect()
            ->route('admin.users.edit', $admin)
            ->with('status', 'Admin user created.');
    }

    public function edit(User $user): View
    {
        $this->ensureAdminUser($user);

        return view('admin.users.edit', [
            'admin' => $user,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $this->ensureAdminUser($user);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'email' => [
                'required',
                'email',
                'max:200',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }

        $payload['is_admin'] = true;

        $user->update($payload);

        return redirect()
            ->route('admin.users.edit', $user)
            ->with('status', 'Admin user updated.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $this->ensureAdminUser($user);

        if ($request->user() && $request->user()->id === $user->id) {
            return back()->withErrors([
                'email' => 'You cannot delete your own account.',
            ]);
        }

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('status', 'Admin user deleted.');
    }

    private function ensureAdminUser(User $user): void
    {
        if (!$user->is_admin) {
            abort(404);
        }
    }
}
