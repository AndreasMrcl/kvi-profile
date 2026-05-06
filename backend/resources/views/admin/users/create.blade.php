@extends('layouts.admin')

@section('title', 'Create Admin User')
@section('breadcrumb')
    <a href="{{ route('admin.users.index') }}">Admin Users</a>
@endsection
@section('heading', 'Create Admin User')
@section('description', 'Add a new administrator for the membership panel.')

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.users.store') }}" class="form-grid">
            @csrf

            <div>
                <label for="name">Full name</label>
                <input id="name" type="text" name="name" value="{{ old('name') }}" required>
            </div>

            <div>
                <label for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required>
            </div>

            <div>
                <label for="password">Password</label>
                <input id="password" type="password" name="password" required>
            </div>

            <div>
                <label for="password_confirmation">Confirm password</label>
                <input id="password_confirmation" type="password" name="password_confirmation" required>
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.users.index') }}">Cancel</a>
                <button type="submit" class="btn">Create Admin</button>
            </div>
        </form>
    </div>
@endsection
