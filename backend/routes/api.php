<?php

use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ──────────────────────────────────

Route::prefix('auth')->group(function () {
    Route::post('/register',       [AuthController::class, 'register']);
    Route::post('/login',          [AuthController::class, 'login']);
});

// ─── Protected Routes ────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout',     [AuthController::class, 'logout']);
        Route::get('/profile',     [AuthController::class, 'profile']);
        Route::put('/profile',     [AuthController::class, 'updateProfile']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user()->loadCount(['analyses', 'chatSessions']);
    });

    // Analysis
    Route::get('/analyses',              [AnalysisController::class, 'index']);
    Route::post('/analyses',             [AnalysisController::class, 'create']);
    Route::get('/analyses/{id}',         [AnalysisController::class, 'show']);
    Route::post('/analyses/{id}/analyze',[AnalysisController::class, 'analyze']);
    Route::delete('/analyses/{id}',      [AnalysisController::class, 'destroy']);
    Route::post('/analyses/{id}/chat',   [AnalysisController::class, 'chatAsk']);
    Route::get('/analyses/{id}/chat',    [AnalysisController::class, 'chatHistory']);
});

// ─── Admin Routes ──────────────────────────────────

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users',           [AuthController::class, 'listUsers']);
    Route::get('/users/{id}',      [AuthController::class, 'showUser']);
    Route::put('/users/{id}/role', [AuthController::class, 'updateUserRole']);
    Route::put('/users/{id}/toggle-active', [AuthController::class, 'toggleActive']);
});
