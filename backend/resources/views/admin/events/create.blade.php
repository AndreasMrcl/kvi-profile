@extends('layouts.admin')

@section('title', 'Create Event')
@section('breadcrumb')
    <a href="{{ route('admin.events.index') }}">Acara</a>
@endsection
@section('heading', 'Create Event')
@section('description', 'Tambah acara mendatang baru.')

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.events.store') }}" class="form-grid">
            @csrf

            <div>
                <label for="title">Title</label>
                <input id="title" type="text" name="title" value="{{ old('title') }}" required>
            </div>

            <div>
                <label for="location">Location</label>
                <input id="location" type="text" name="location" value="{{ old('location') }}"
                    placeholder="Mis. Jakarta Selatan">
            </div>

            <div>
                <label for="starts_at">Date</label>
                <input id="starts_at" type="date" name="starts_at" value="{{ old('starts_at') }}" required>
            </div>

            <div>
                <label for="status">Status</label>
                <select id="status" name="status" class="select" required>
                    <option value="draft" @selected(old('status') === 'draft')>Draft</option>
                    <option value="published" @selected(old('status') === 'published')>Published</option>
                </select>
                <div class="note">Hanya acara "Published" dengan tanggal di masa depan yang tampil di website.</div>
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.events.index') }}">Cancel</a>
                <button type="submit" class="btn">Create Event</button>
            </div>
        </form>
    </div>
@endsection
