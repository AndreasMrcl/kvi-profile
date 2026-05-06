@extends('layouts.admin')

@section('title', 'Edit Admin User')
@section('breadcrumb')
    <a href="{{ route('admin.users.index') }}">Admin Users</a>
@endsection
@section('heading', 'Edit Admin User')
@section('description', 'Update details for ' . $admin->name . '.')

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.users.update', $admin) }}" class="form-grid">
            @csrf
            @method('PUT')

            <div>
                <label for="name">Full name</label>
                <input id="name" type="text" name="name" value="{{ old('name', $admin->name) }}" required>
            </div>

            <div>
                <label for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email', $admin->email) }}" required>
            </div>

            <div>
                <label for="password">New password (optional)</label>
                <input id="password" type="password" name="password">
            </div>

            <div>
                <label for="password_confirmation">Confirm new password</label>
                <input id="password_confirmation" type="password" name="password_confirmation">
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.users.index') }}">Back</a>
                <button type="submit" class="btn">Save Changes</button>
            </div>
        </form>
    </div>

    <div class="card" style="margin-top: 16px;">
        <p class="card-title">Danger zone</p>
        <form method="post" action="{{ route('admin.users.destroy', $admin) }}"
            onsubmit="return confirm('Delete this admin user?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">Delete Admin User</button>
        </form>
    </div>
@endsection
