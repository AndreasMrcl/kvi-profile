@extends('layouts.admin')

@section('title', 'Acara')
@section('heading', 'Acara Mendatang')
@section('description', 'Kelola daftar acara yang tampil di website KVI.')
@section('actions')
    <a class="btn" href="{{ route('admin.events.create') }}">Create Event</a>
@endsection

@section('content')
    <div class="card stack">
        <form method="get" class="filter-row">
            <div>
                <label for="q">Search</label>
                <input id="q" type="text" name="q" value="{{ $query }}"
                    placeholder="Search title or location">
            </div>
            <div>
                <label for="status">Status</label>
                <select id="status" name="status" class="select">
                    <option value="">All</option>
                    <option value="draft" @selected($status === 'draft')>Draft</option>
                    <option value="published" @selected($status === 'published')>Published</option>
                </select>
            </div>
            <div class="button-row" style="justify-content:flex-start;">
                <button type="submit" class="btn">Filter</button>
                <a class="btn btn-outline" href="{{ route('admin.events.index') }}">Reset</a>
            </div>
        </form>
    </div>

    <div class="card" style="margin-top: 16px;">
        <table class="table">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($events as $event)
                    <tr>
                        <td style="font-weight:700;">{{ $event->title }}</td>
                        <td>{{ optional($event->starts_at)->format('d M Y') }}</td>
                        <td>{{ $event->location ?: '-' }}</td>
                        <td>
                            <span class="badge badge-{{ $event->status }}">{{ ucfirst($event->status) }}</span>
                        </td>
                        <td>
                            <div class="actions">
                                <a href="{{ route('admin.events.edit', $event) }}" class="btn btn-outline btn-sm">Edit</a>
                                <form method="post" action="{{ route('admin.events.destroy', $event) }}"
                                    data-confirm="Hapus acara ini secara permanen?" data-confirm-yes="Ya, hapus">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="note" colspan="5">No events found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">
        {{ $events->links() }}
    </div>
@endsection
