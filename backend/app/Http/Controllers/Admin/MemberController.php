<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class MemberController extends Controller
{
    public function index(Request $request): View
    {
        $query = User::query()->where('is_admin', false);

        if ($search = trim((string) $request->get('q', ''))) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('diploma_number', 'like', "%{$search}%")
                    ->orWhere('membership_number', 'like', "%{$search}%");
            });
        }

        if ($category = $request->get('category')) {
            $query->where('category', $category);
        }

        if ($status = $request->get('membership_status')) {
            $query->where('membership_status', $status);
        }

        if ($province = $request->get('province_code')) {
            $query->where('province_code', $province);
        }

        $members = $query->orderByDesc('created_at')->paginate(20)->withQueryString();

        return view('admin.members.index', [
            'members' => $members,
            'filters' => [
                'q' => $request->get('q', ''),
                'category' => $request->get('category', ''),
                'membership_status' => $request->get('membership_status', ''),
                'province_code' => $request->get('province_code', ''),
            ],
            'provinces' => User::query()
                ->where('is_admin', false)
                ->whereNotNull('province_code')
                ->select('province_code', 'province_name')
                ->distinct()
                ->orderBy('province_name')
                ->get(),
            'statuses' => [
                User::STATUS_AWAITING_DIPLOMA,
                User::STATUS_PENDING_VERIFICATION,
                User::STATUS_ACTIVE,
                User::STATUS_SUSPENDED,
                User::STATUS_REJECTED,
                User::STATUS_EXPIRED,
            ],
        ]);
    }

    public function show(User $user): View
    {
        $this->ensureMember($user);

        return view('admin.members.show', [
            'member' => $user->load('verifier'),
        ]);
    }

    public function approve(Request $request, User $user): RedirectResponse
    {
        $this->ensureMember($user);

        if (empty($user->diploma_number)) {
            return back()->withErrors([
                'membership' => 'Anggota belum mengisi nomor ijazah, tidak bisa disahkan.',
            ]);
        }

        $data = $request->validate([
            'verification_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        if (!$user->membership_number) {
            $user->membership_number = User::generateMembershipNumber($user->category);
        }

        $user->fill([
            'membership_status' => User::STATUS_ACTIVE,
            'joined_at' => $user->joined_at ?? now(),
            'verified_by' => $request->user()->id,
            'verification_notes' => $data['verification_notes'] ?? null,
            'diploma_deadline_at' => null,
        ])->save();

        return redirect()
            ->route('admin.members.show', $user)
            ->with('status', "Keanggotaan disahkan. Nomor anggota: {$user->membership_number}");
    }

    public function reject(Request $request, User $user): RedirectResponse
    {
        $this->ensureMember($user);

        $data = $request->validate([
            'verification_notes' => ['required', 'string', 'max:2000'],
        ]);

        $user->update([
            'membership_status' => User::STATUS_REJECTED,
            'verified_by' => $request->user()->id,
            'verification_notes' => $data['verification_notes'],
            'diploma_deadline_at' => null,
        ]);

        return redirect()
            ->route('admin.members.show', $user)
            ->with('status', 'Keanggotaan ditolak.');
    }

    public function suspend(Request $request, User $user): RedirectResponse
    {
        $this->ensureMember($user);

        $data = $request->validate([
            'verification_notes' => ['required', 'string', 'max:2000'],
        ]);

        $user->update([
            'membership_status' => User::STATUS_SUSPENDED,
            'verified_by' => $request->user()->id,
            'verification_notes' => $data['verification_notes'],
        ]);

        return redirect()
            ->route('admin.members.show', $user)
            ->with('status', 'Anggota di-suspend.');
    }

    public function reactivate(Request $request, User $user): RedirectResponse
    {
        $this->ensureMember($user);

        if (!$user->membership_number || !$user->joined_at) {
            return back()->withErrors([
                'membership' => 'Anggota belum pernah aktif sebelumnya, gunakan tombol Sahkan.',
            ]);
        }

        $user->update([
            'membership_status' => User::STATUS_ACTIVE,
            'verified_by' => $request->user()->id,
            'verification_notes' => null,
        ]);

        return redirect()
            ->route('admin.members.show', $user)
            ->with('status', 'Anggota diaktifkan kembali.');
    }

    private function ensureMember(User $user): void
    {
        if ($user->is_admin) {
            abort(404);
        }
    }
}
