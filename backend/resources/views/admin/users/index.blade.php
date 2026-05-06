@extends('layouts.admin')

@section('title', 'Admin Users')
@section('heading', 'Admin Users')
@section('description', 'Manage admin accounts for the membership panel.')
@section('actions')
    <a class="btn" href="{{ route('admin.users.create') }}">Add Admin</a>
@endsection

@section('content')
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($admins as $admin)
                    <tr>
                        <td>{{ $admin->name }}</td>
                        <td>{{ $admin->email }}</td>
                        <td>{{ optional($admin->created_at)->format('d M Y') }}</td>
                        <td>
                            <a href="{{ route('admin.users.edit', $admin) }}">Edit</a>
                            <form method="post" action="{{ route('admin.users.destroy', $admin) }}"
                                style="display:inline-block; margin-left: 12px;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="link-danger"
                                    onclick="return confirm('Delete this admin user?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="note" colspan="4">No admin users found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">
        {{ $admins->links() }}
    </div>
@endsection
