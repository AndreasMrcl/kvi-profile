@extends('layouts.admin')

@section('title', 'Memberships')
@section('heading', 'Membership Submissions')
@section('description', 'Review and verify KVI membership applications.')

@section('content')
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($memberships as $membership)
                    <tr>
                        <td>#{{ $membership->id }}</td>
                        <td>{{ $membership->full_name }}</td>
                        <td>{{ $membership->email }}</td>
                        <td>
                            <span class="badge badge-{{ $membership->status }}">{{ ucfirst($membership->status) }}</span>
                        </td>
                        <td>{{ optional($membership->created_at)->format('d M Y H:i') }}</td>
                        <td><a href="{{ route('admin.memberships.show', $membership) }}">View</a></td>
                    </tr>
                @empty
                    <tr>
                        <td class="note" colspan="6">No submissions yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">
        {{ $memberships->links() }}
    </div>
@endsection
