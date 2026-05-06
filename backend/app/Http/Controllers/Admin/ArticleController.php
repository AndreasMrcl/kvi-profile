<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class ArticleController extends Controller
{
    public function index(Request $request): View
    {
        $status = $request->string('status')->toString();
        $query = $request->string('q')->toString();

        $articles = Article::query()
            ->with('author')
            ->when($status !== '', function ($builder) use ($status) {
                if (in_array($status, [Article::STATUS_DRAFT, Article::STATUS_PUBLISHED], true)) {
                    $builder->where('status', $status);
                }
            })
            ->when($query !== '', function ($builder) use ($query) {
                $builder->where(function ($inner) use ($query) {
                    $inner->where('title', 'like', '%' . $query . '%')
                        ->orWhere('slug', 'like', '%' . $query . '%')
                        ->orWhere('excerpt', 'like', '%' . $query . '%');
                });
            })
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return view('admin.cms.index', [
            'articles' => $articles,
            'status' => $status,
            'query' => $query,
        ]);
    }

    public function create(): View
    {
        return view('admin.cms.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateArticle($request);
        $slug = $this->makeUniqueSlug($data['slug'] ?? $data['title']);

        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('articles', 'public');
        }

        $status = $this->normalizeStatus($data['status'] ?? Article::STATUS_DRAFT);

        $article = Article::create([
            'title' => $data['title'],
            'slug' => $slug,
            'category' => $data['category'] ?? null,
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'],
            'cover_image_path' => $coverPath,
            'is_featured' => $request->boolean('is_featured'),
            'status' => $status,
            'published_at' => $status === Article::STATUS_PUBLISHED ? now() : null,
            'author_id' => Auth::id(),
        ]);

        return redirect()
            ->route('admin.cms.edit', $article)
            ->with('status', 'Article created.');
    }

    public function edit(Article $article): View
    {
        return view('admin.cms.edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $data = $this->validateArticle($request, $article->id);
        $slug = $this->makeUniqueSlug($data['slug'] ?? $data['title'], $article->id);

        $coverPath = $article->cover_image_path;
        if ($request->boolean('remove_cover')) {
            $this->deleteCoverImage($coverPath);
            $coverPath = null;
        }

        if ($request->hasFile('cover_image')) {
            $this->deleteCoverImage($coverPath);
            $coverPath = $request->file('cover_image')->store('articles', 'public');
        }

        $status = $this->normalizeStatus($data['status'] ?? $article->status);
        $publishedAt = $status === Article::STATUS_PUBLISHED
            ? ($article->published_at ?? now())
            : null;

        $article->update([
            'title' => $data['title'],
            'slug' => $slug,
            'category' => $data['category'] ?? null,
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'],
            'cover_image_path' => $coverPath,
            'is_featured' => $request->boolean('is_featured'),
            'status' => $status,
            'published_at' => $publishedAt,
        ]);

        return redirect()
            ->route('admin.cms.edit', $article)
            ->with('status', 'Article updated.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->deleteCoverImage($article->cover_image_path);
        $article->delete();

        return redirect()
            ->route('admin.cms.index')
            ->with('status', 'Article deleted.');
    }

    private function validateArticle(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'slug' => ['nullable', 'string', 'max:200'],
            'category' => ['nullable', 'string', 'max:120'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'status' => ['required', Rule::in([Article::STATUS_DRAFT, Article::STATUS_PUBLISHED])],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);
    }

    private function normalizeStatus(string $status): string
    {
        return in_array($status, [Article::STATUS_DRAFT, Article::STATUS_PUBLISHED], true)
            ? $status
            : Article::STATUS_DRAFT;
    }

    private function makeUniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $slug = Str::slug($value);
        if ($slug === '') {
            $slug = 'article';
        }

        $original = $slug;
        $counter = 2;

        while ($this->slugExists($slug, $ignoreId)) {
            $slug = $original . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    private function slugExists(string $slug, ?int $ignoreId = null): bool
    {
        $query = Article::where('slug', $slug);
        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    private function deleteCoverImage(?string $path): void
    {
        if (!$path) {
            return;
        }

        $disk = Storage::disk('public');
        if ($disk->exists($path)) {
            $disk->delete($path);
        }
    }
}
