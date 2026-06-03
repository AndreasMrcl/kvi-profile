<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\MemberController as AdminMemberController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ProfileController;
use App\Models\Article;
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
    $members = User::query()->where('is_admin', false);

    return view('admin.dashboard', [
        'members_total' => (clone $members)->count(),
        'members_active' => (clone $members)->where('membership_status', User::STATUS_ACTIVE)->count(),
        'members_pending' => (clone $members)->where('membership_status', User::STATUS_PENDING_VERIFICATION)->count(),
        'members_awaiting' => (clone $members)->where('membership_status', User::STATUS_AWAITING_DIPLOMA)->count(),
        'members_rejected' => (clone $members)->where('membership_status', User::STATUS_REJECTED)->count(),
        'members_expired' => (clone $members)->where('membership_status', User::STATUS_EXPIRED)->count(),
        'members_dokter_hewan' => (clone $members)->where('category', User::CATEGORY_DOKTER_HEWAN)->count(),
        'members_paramedis' => (clone $members)->where('category', User::CATEGORY_PARAMEDIS)->count(),
        'admin_users' => User::where('is_admin', true)->count(),
        'articles_total' => Article::count(),
        'articles_published' => Article::where('status', 'published')->count(),
        'articles_draft' => Article::where('status', 'draft')->count(),
        'latest_articles' => Article::orderByDesc('created_at')->limit(5)->get(),
        'latest_members' => User::where('is_admin', false)->orderByDesc('created_at')->limit(5)->get(),
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
        Route::get('/members', [AdminMemberController::class, 'index'])
            ->name('members.index');
        Route::get('/members/{user}', [AdminMemberController::class, 'show'])
            ->name('members.show');
        Route::post('/members/{user}/approve', [AdminMemberController::class, 'approve'])
            ->name('members.approve');
        Route::post('/members/{user}/reject', [AdminMemberController::class, 'reject'])
            ->name('members.reject');
        Route::post('/members/{user}/suspend', [AdminMemberController::class, 'suspend'])
            ->name('members.suspend');
        Route::post('/members/{user}/reactivate', [AdminMemberController::class, 'reactivate'])
            ->name('members.reactivate');

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

        Route::get('/events', [AdminEventController::class, 'index'])
            ->name('events.index');
        Route::get('/events/create', [AdminEventController::class, 'create'])
            ->name('events.create');
        Route::post('/events', [AdminEventController::class, 'store'])
            ->name('events.store');
        Route::get('/events/{event}/edit', [AdminEventController::class, 'edit'])
            ->name('events.edit');
        Route::put('/events/{event}', [AdminEventController::class, 'update'])
            ->name('events.update');
        Route::delete('/events/{event}', [AdminEventController::class, 'destroy'])
            ->name('events.destroy');
    });
