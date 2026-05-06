@extends('layouts.admin')

@section('title', 'Edit Article')
@section('breadcrumb')
    <a href="{{ route('admin.cms.index') }}">CMS Artikel</a>
@endsection
@section('heading', 'Edit Article')
@section('description', 'Update article details and status.')

@section('actions')
    <form method="post" action="{{ route('admin.cms.destroy', $article) }}" onsubmit="return confirm('Delete this article?')">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger">Delete Article</button>
    </form>
@endsection

@section('content')
    <div class="card">
        @if ($errors->any())
            <div class="alert">{{ $errors->first() }}</div>
        @endif

        <form method="post" action="{{ route('admin.cms.update', $article) }}" class="form-grid"
            enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div>
                <label for="title">Title</label>
                <input id="title" type="text" name="title" value="{{ old('title', $article->title) }}" required>
            </div>

            <div>
                <label for="slug">Slug (optional)</label>
                <input id="slug" type="text" name="slug" value="{{ old('slug', $article->slug) }}">
            </div>

            <div>
                <label for="category">Category</label>
                <input id="category" type="text" name="category" value="{{ old('category', $article->category) }}">
            </div>

            <div>
                <label for="excerpt">Excerpt</label>
                <textarea id="excerpt" name="excerpt" rows="3">{{ old('excerpt', $article->excerpt) }}</textarea>
            </div>

            <div>
                <label for="content">Content</label>
                <textarea id="content" name="content" rows="10" required>{{ old('content', $article->content) }}</textarea>
            </div>

            <div>
                <label for="cover_image">Cover image (JPG/PNG/WEBP, max 4MB)</label>
                @if ($article->cover_image_path)
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom: 10px;">
                        <img class="thumb" src="{{ \Illuminate\Support\Facades\Storage::url($article->cover_image_path) }}"
                            alt="{{ $article->title }}">
                        <div>
                            <div class="note">Current cover image</div>
                            <div class="checkbox-row" style="margin-top:6px;">
                                <input type="checkbox" name="remove_cover" value="1">
                                <span>Remove cover image</span>
                            </div>
                        </div>
                    </div>
                @endif
                <input id="cover_image" type="file" name="cover_image" accept="image/jpeg,image/png,image/webp">
            </div>

            <div>
                <label for="status">Status</label>
                <select id="status" name="status" class="select" required>
                    <option value="draft" @selected(old('status', $article->status) === 'draft')>Draft</option>
                    <option value="published" @selected(old('status', $article->status) === 'published')>Published</option>
                </select>
            </div>

            <div>
                <div class="checkbox-row">
                    <input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $article->is_featured))>
                    <span>Featured article</span>
                </div>
                <div class="note">Featured articles appear on top of the list.</div>
            </div>

            <div class="button-row">
                <a class="btn btn-outline" href="{{ route('admin.cms.index') }}">Back</a>
                <button type="submit" class="btn">Save Changes</button>
            </div>
        </form>
    </div>
@endsection
