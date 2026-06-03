<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class ArticleController extends Controller
{
    private const BULAN = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
    ];

    /**
     * Daftar artikel yang sudah dipublikasikan (ringkasan, tanpa konten penuh).
     */
    public function index(): JsonResponse
    {
        $articles = Article::query()
            ->where('status', Article::STATUS_PUBLISHED)
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $articles->map(fn (Article $article) => $this->summary($article))->all(),
        ]);
    }

    /**
     * Satu artikel berdasarkan slug, lengkap dengan konten.
     */
    public function show(string $slug): JsonResponse
    {
        $article = Article::query()
            ->with('author')
            ->where('status', Article::STATUS_PUBLISHED)
            ->where('slug', $slug)
            ->first();

        if (!$article) {
            return response()->json(['message' => 'Artikel tidak ditemukan.'], 404);
        }

        return response()->json([
            'data' => $this->detail($article),
        ]);
    }

    private function summary(Article $article): array
    {
        $date = $article->published_at ?? $article->created_at;

        return [
            'id' => $article->id,
            'slug' => $article->slug,
            'judul' => $article->title,
            'kategori' => $article->category,
            'ringkasan' => $article->excerpt,
            'gambar' => $article->cover_image_path
                ? asset('storage/' . $article->cover_image_path)
                : null,
            'tanggal' => $this->formatTanggal($date),
            'featured' => (bool) $article->is_featured,
        ];
    }

    private function detail(Article $article): array
    {
        return array_merge($this->summary($article), [
            'subjudul' => $article->excerpt,
            'penulis' => $article->author?->name ?? 'Admin KVI',
            'baca' => $this->readingTime($article->content),
            'konten' => $this->toBlocks($article->content),
            'tags' => [],
            'infoBox' => [],
        ]);
    }

    private function formatTanggal(?Carbon $date): string
    {
        if (!$date) {
            return '';
        }

        return $date->day . ' ' . self::BULAN[(int) $date->month] . ' ' . $date->year;
    }

    private function readingTime(?string $content): string
    {
        $words = str_word_count(strip_tags((string) $content));
        $minutes = max(1, (int) ceil($words / 200));

        return $minutes . ' menit baca';
    }

    /**
     * Ubah konten teks (textarea CMS) menjadi blok paragraf yang dimengerti frontend.
     * Pemisah paragraf: baris kosong (double newline).
     */
    private function toBlocks(?string $content): array
    {
        $content = trim((string) $content);
        if ($content === '') {
            return [];
        }

        $paragraphs = preg_split('/\n\s*\n/', $content) ?: [$content];

        $blocks = [];
        foreach ($paragraphs as $paragraph) {
            $paragraph = trim($paragraph);
            if ($paragraph !== '') {
                $blocks[] = ['tipe' => 'p', 'isi' => $paragraph];
            }
        }

        return $blocks;
    }
}
