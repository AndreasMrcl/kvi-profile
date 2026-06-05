@extends('layouts.admin')

@section('title', 'CMS Artikel')
@section('heading', 'CMS Artikel')
@section('description', 'Kelola berita dan artikel untuk publikasi KVI.')
@section('actions')
    <a class="btn" href="{{ route('admin.cms.create') }}">Create Article</a>
@endsection

@section('content')
    <div class="card stack">
        <form method="get" class="filter-row">
            <div>
                <label for="q">Search</label>
                <input id="q" type="text" name="q" value="{{ $query }}"
                    placeholder="Search title, slug, or excerpt">
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
                <a class="btn btn-outline" href="{{ route('admin.cms.index') }}">Reset</a>
            </div>
        </form>
    </div>

    <div class="card" style="margin-top: 16px;">
        <table class="table">
            <thead>
                <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Updated</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($articles as $article)
                    <tr>
                        <td>
                            <div style="display:flex; align-items:center; gap:12px;">
                                @if ($article->cover_image_path)
                                    <img class="thumb"
                                        src="{{ asset('storage/' . $article->cover_image_path) }}"
                                        alt="{{ $article->title }}">
                                @else
                                    <div class="thumb thumb-placeholder">No image</div>
                                @endif
                                <div>
                                    <div style="font-weight:700;">{{ $article->title }}</div>
                                    <div class="note">/{{ $article->slug }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ $article->category ?: '-' }}</td>
                        <td>
                            <span class="badge badge-{{ $article->status }}">{{ ucfirst($article->status) }}</span>
                        </td>
                        <td>
                            @if ($article->is_featured)
                                <span class="badge badge-featured">Featured</span>
                            @else
                                <span class="note">-</span>
                            @endif
                        </td>
                        <td>{{ optional($article->updated_at)->format('d M Y H:i') }}</td>
                        <td>
                            <div class="actions">
                                <a href="{{ route('admin.cms.edit', $article) }}" class="btn btn-outline btn-sm">Edit</a>
                                <form method="post" action="{{ route('admin.cms.destroy', $article) }}"
                                    data-confirm="Hapus artikel ini secara permanen?" data-confirm-yes="Ya, hapus">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="note" colspan="6">No articles found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">
        {{ $articles->links() }}
    </div>
@endsection
