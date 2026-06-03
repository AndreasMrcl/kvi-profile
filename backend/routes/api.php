<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

// Berita/artikel publik (hanya yang berstatus published) — sumber: CMS admin.
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

// Acara mendatang publik (published & tanggal >= hari ini) — sumber: CMS admin.
Route::get('/events', [EventController::class, 'index']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::put('/auth/profile', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');
Route::put('/auth/password', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');
