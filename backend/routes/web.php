<?php

use App\Http\Controllers\Admin\MembershipController as AdminMembershipController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ProfileController;
use App\Models\Article;
use App\Models\Membership;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }

    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return view('admin.dashboard', [
        'memberships_total' => Membership::count(),
        'memberships_pending' => Membership::where('status', 'pending')->count(),
        'memberships_approved' => Membership::where('status', 'approved')->count(),
        'memberships_rejected' => Membership::where('status', 'rejected')->count(),
        'admin_users' => User::where('is_admin', true)->count(),
        'articles_total' => Article::count(),
        'articles_published' => Article::where('status', 'published')->count(),
        'articles_draft' => Article::where('status', 'draft')->count(),
        'latest_articles' => Article::orderByDesc('created_at')->limit(5)->get(),
        'latest_memberships' => Membership::orderByDesc('created_at')->limit(5)->get(),
    ]);
})->middleware(['admin'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::middleware(['admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/memberships', [AdminMembershipController::class, 'index'])
            ->name('memberships.index');
        Route::get('/memberships/{membership}', [AdminMembershipController::class, 'show'])
            ->name('memberships.show');
        Route::post('/memberships/{membership}/verify', [AdminMembershipController::class, 'verify'])
            ->name('memberships.verify');
        Route::post('/memberships/{membership}/reject', [AdminMembershipController::class, 'reject'])
            ->name('memberships.reject');
        Route::get('/memberships/{membership}/document', [AdminMembershipController::class, 'document'])
            ->name('memberships.document');

        Route::get('/users', [AdminUserController::class, 'index'])
            ->name('users.index');
        Route::get('/users/create', [AdminUserController::class, 'create'])
            ->name('users.create');
        Route::post('/users', [AdminUserController::class, 'store'])
            ->name('users.store');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])
            ->name('users.edit');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])
            ->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])
            ->name('users.destroy');

        Route::get('/cms', [AdminArticleController::class, 'index'])
            ->name('cms.index');
        Route::get('/cms/create', [AdminArticleController::class, 'create'])
            ->name('cms.create');
        Route::post('/cms', [AdminArticleController::class, 'store'])
            ->name('cms.store');
        Route::get('/cms/{article}/edit', [AdminArticleController::class, 'edit'])
            ->name('cms.edit');
        Route::put('/cms/{article}', [AdminArticleController::class, 'update'])
            ->name('cms.update');
        Route::delete('/cms/{article}', [AdminArticleController::class, 'destroy'])
            ->name('cms.destroy');
    });
