@extends('layouts.admin')

@section('title', 'Membership #' . $membership->id)
@section('breadcrumb')
    <a href="{{ route('admin.memberships.index') }}">Back to list</a>
@endsection
@section('heading', 'Membership #' . $membership->id)
@section('description', 'Review applicant details and verification notes.')
@section('content')
    <div class="card stack">
        <div class="detail-grid">
            <div class="label">Status</div>
            <div>
                <span class="badge badge-{{ $membership->status }}">{{ ucfirst($membership->status) }}</span>
            </div>

            <div class="label">Full name</div>
            <div>{{ $membership->full_name }}</div>

            <div class="label">Birth place</div>
            <div>{{ $membership->birth_place }}</div>

            <div class="label">Birth date</div>
            <div>{{ optional($membership->birth_date)->format('d M Y') }}</div>

            <div class="label">Address</div>
            <div>{{ $membership->address }}</div>

            <div class="label">Occupation</div>
            <div>{{ $membership->occupation }}</div>

            <div class="label">Phone</div>
            <div>{{ $membership->phone }}</div>

            <div class="label">Email</div>
            <div>{{ $membership->email }}</div>

            <div class="label">University</div>
            <div>{{ $membership->university }}</div>

            <div class="label">Graduation year</div>
            <div>{{ $membership->graduation_year }}</div>

            <div class="label">Document</div>
            <div>
                <a href="{{ route('admin.memberships.document', $membership) }}">Download document</a>
                <div class="note">
                    {{ $membership->document_original_name ?? 'document.jpg' }}
                    @if ($membership->document_size)
                        ({{ number_format($membership->document_size / 1024, 0) }} KB)
                    @endif
                </div>
            </div>

            <div class="label">Submitted</div>
            <div>{{ optional($membership->created_at)->format('d M Y H:i') }}</div>

            <div class="label">Verified at</div>
            <div>{{ optional($membership->verified_at)->format('d M Y H:i') ?? '-' }}</div>

            <div class="label">Approved at</div>
            <div>{{ optional($membership->approved_at)->format('d M Y H:i') ?? '-' }}</div>

            <div class="label">Rejected at</div>
            <div>{{ optional($membership->rejected_at)->format('d M Y H:i') ?? '-' }}</div>

            <div class="label">Notes</div>
            <div>{{ $membership->verification_notes ?: '-' }}</div>
        </div>
    </div>

    <div class="card stack" style="margin-top: 16px;">
        <form class="form-grid" method="post" action="{{ route('admin.memberships.verify', $membership) }}">
            @csrf
            <div>
                <label for="verify-notes">Verification notes</label>
                <textarea id="verify-notes" name="verification_notes" placeholder="Notes or checks performed..."></textarea>
                <div class="note">Verification auto-approves the membership.</div>
            </div>
            <div class="button-row">
                <button type="submit" class="btn">Verify &amp; Approve</button>
            </div>
        </form>

        <form class="form-grid" method="post" action="{{ route('admin.memberships.reject', $membership) }}">
            @csrf
            <div>
                <label for="reject-notes">Rejection notes</label>
                <textarea id="reject-notes" name="verification_notes" placeholder="Reason for rejection..."></textarea>
            </div>
            <div class="button-row">
                <button type="submit" class="btn btn-danger">Reject</button>
            </div>
        </form>
    </div>
@endsection
