@extends('layouts.admin')

@section('title', 'Edit Event')
@section('breadcrumb')
    <a href="{{ route('admin.events.index') }}">Acara</a>
@endsection
@section('heading', 'Edit Event')
@section('description', 'Update detail acara.')

@section('actions')
    <form method="post" action="{{ route('admin.events.destroy', $event) }}" data-confirm="Hapus acara ini secara permanen?" data-confirm-yes="Ya, hapus">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger">Delete Event</button>
    </form>
@endsection

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.events.update', $event) }}" class="form-grid">
            @csrf
            @method('PUT')

            <div>
                <label for="title">Title</label>
                <input id="title" type="text" name="title" value="{{ old('title', $event->title) }}" required>
            </div>

            <div>
                <label for="location">Location</label>
                <input id="location" type="text" name="location" value="{{ old('location', $event->location) }}">
            </div>

            <div>
                <label for="starts_at">Date</label>
                <input id="starts_at" type="date" name="starts_at"
                    value="{{ old('starts_at', optional($event->starts_at)->format('Y-m-d')) }}" required>
            </div>

            <div>
                <label for="status">Status</label>
                <select id="status" name="status" class="select" required>
                    <option value="draft" @selected(old('status', $event->status) === 'draft')>Draft</option>
                    <option value="published" @selected(old('status', $event->status) === 'published')>Published</option>
                </select>
                <div class="note">Hanya acara "Published" dengan tanggal di masa depan yang tampil di website.</div>
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.events.index') }}">Back</a>
                <button type="submit" class="btn">Save Changes</button>
            </div>
        </form>
    </div>
@endsection
