@extends('layouts.admin')

@section('title', 'Create Article')
@section('breadcrumb')
    <a href="{{ route('admin.cms.index') }}">CMS Artikel</a>
@endsection
@section('heading', 'Create Article')
@section('description', 'Tambah berita atau artikel baru.')

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.cms.store') }}" class="form-grid" enctype="multipart/form-data">
            @csrf

            <div>
                <label for="title">Title</label>
                <input id="title" type="text" name="title" value="{{ old('title') }}" required>
            </div>

            <div>
                <label for="slug">Slug (optional)</label>
                <input id="slug" type="text" name="slug" value="{{ old('slug') }}"
                    placeholder="auto-generated if empty">
            </div>

            <div>
                <label for="category">Category</label>
                <input id="category" type="text" name="category" value="{{ old('category') }}"
                    placeholder="Pengumuman, Kegiatan, Regulasi">
            </div>

            <div>
                <label for="excerpt">Excerpt</label>
                <textarea id="excerpt" name="excerpt" rows="3" placeholder="Ringkasan singkat">{{ old('excerpt') }}</textarea>
            </div>

            <div>
                <label for="content">Content</label>
                <textarea id="content" name="content" rows="10" placeholder="Isi artikel" required>{{ old('content') }}</textarea>
            </div>

            <div>
                <label for="cover_image">Cover image (JPG/PNG/WEBP, max 4MB)</label>
                <input id="cover_image" type="file" name="cover_image" accept="image/jpeg,image/png,image/webp">
            </div>

            <div>
                <label for="status">Status</label>
                <select id="status" name="status" class="select" required>
                    <option value="draft" @selected(old('status') === 'draft')>Draft</option>
                    <option value="published" @selected(old('status') === 'published')>Published</option>
                </select>
            </div>

            <div>
                <div class="checkbox-row">
                    <input type="checkbox" name="is_featured" value="1" @checked(old('is_featured'))>
                    <span>Featured article</span>
                </div>
                <div class="note">Featured articles appear on top of the list.</div>
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.cms.index') }}">Cancel</a>
                <button type="submit" class="btn">Create Article</button>
            </div>
        </form>
    </div>
@endsection
