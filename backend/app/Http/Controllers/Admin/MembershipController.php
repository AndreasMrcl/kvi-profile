<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class MembershipController extends Controller
{
    public function index(): View
    {
        $memberships = Membership::orderByDesc('created_at')->paginate(20);

        return view('admin.memberships.index', [
            'memberships' => $memberships,
        ]);
    }

    public function show(Membership $membership): View
    {
        return view('admin.memberships.show', [
            'membership' => $membership,
        ]);
    }

    public function verify(Request $request, Membership $membership): RedirectResponse
    {
        $data = $request->validate([
            'verification_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $membership->fill([
            'status' => Membership::STATUS_APPROVED,
            'verified_at' => now(),
            'approved_at' => now(),
            'rejected_at' => null,
            'verification_notes' => $data['verification_notes'] ?? null,
        ]);
        $membership->save();

        return redirect()
            ->route('admin.memberships.show', $membership)
            ->with('status', 'Membership verified and approved.');
    }

    public function reject(Request $request, Membership $membership): RedirectResponse
    {
        $data = $request->validate([
            'verification_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $membership->fill([
            'status' => Membership::STATUS_REJECTED,
            'verified_at' => null,
            'approved_at' => null,
            'rejected_at' => now(),
            'verification_notes' => $data['verification_notes'] ?? null,
        ]);
        $membership->save();

        return redirect()
            ->route('admin.memberships.show', $membership)
            ->with('status', 'Membership rejected.');
    }

    public function document(Membership $membership)
    {
        if (!$membership->document_path) {
            abort(404);
        }

        $disk = Storage::disk('local');
        if (!$disk->exists($membership->document_path)) {
            abort(404);
        }

        $downloadName = $membership->document_original_name ?: 'membership-document.jpg';

        return $disk->download($membership->document_path, $downloadName);
    }
}
