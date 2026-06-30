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

// ─── Testing Routes (Public) ───────────────────────

Route::post('/test-agent', function (Request $request) {
    $request->validate(['source_value' => 'required|string']);
    
    $apiKey = env('OPENROUTER_API_KEY');
    if (empty($apiKey)) {
        return response()->json(['error' => 'OPENROUTER_API_KEY not found'], 500);
    }

    $systemPrompt = "You are a friendly and expert Web3 educator. Your job is to analyze smart contracts but explain the results in extremely simple, everyday language (layman's terms). You MUST respond with ONLY a raw JSON object. No introductory text, no explanations outside the JSON.";
    $userPrompt = "Review the following smart contract code for security flaws and gas optimizations:\n\n" . $request->source_value . "\n\n" .
        "Return ONLY a JSON object with two keys: 'security_findings' (array of strings) and 'gas_optimizations' (array of strings).\n" .
        "IMPORTANT RULES for the strings:\n" .
        "1. Write everything bilingually: First in English, then followed by Bahasa Indonesia in a new paragraph.\n" .
        "2. Explain the problems and solutions using everyday analogies. Do not use overly technical jargon without explaining what it means simply.\n" .
        "3. Ensure someone with zero programming or Web3 knowledge can understand why it's a problem.";

    $response = \Illuminate\Support\Facades\Http::withoutVerifying()->withHeaders([
        'Authorization' => 'Bearer ' . $apiKey,
        'HTTP-Referer' => config('app.url'),
        'X-Title' => 'ContractMind AI Tester',
    ])->post('https://openrouter.ai/api/v1/chat/completions', [
        'model' => 'nousresearch/hermes-3-llama-3.1-70b',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $userPrompt]
        ],
        'temperature' => 0.1,
    ]);

    if ($response->successful()) {
        $content = $response->json('choices.0.message.content');
        
        // Strip markdown code blocks and preamble text, extract pure JSON
        $content = trim($content);
        // Find the first { and last }
        $start = strpos($content, '{');
        $end = strrpos($content, '}');
        if ($start !== false && $end !== false) {
            $jsonStr = substr($content, $start, $end - $start + 1);
            $parsed = json_decode($jsonStr, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return response()->json([
                    'status' => 'success',
                    'security_findings' => $parsed['security_findings'] ?? [],
                    'gas_optimizations' => $parsed['gas_optimizations'] ?? [],
                ]);
            }
        }
        
        // Fallback: return raw text
        return response()->json(['status' => 'success', 'raw' => $content]);
    }
    
    return response()->json(['status' => 'error', 'error' => $response->body()], 500);
});

Route::post('/test-chat', function (Request $request) {
    $request->validate([
        'question' => 'required|string',
        'contract_code' => 'nullable|string'
    ]);
    
    $apiKey = env('OPENROUTER_API_KEY');
    
    if (empty($apiKey)) {
        return response()->json(['error' => 'OPENROUTER_API_KEY not found in backend .env'], 500);
    }

    $systemPrompt = "You are Hermes 3, a helpful AI assistant. Answer the user clearly.";
    
    $context = "";
    if (!empty($request->contract_code)) {
        $context = "Here is the contract code the user is referring to:\n\n" . $request->contract_code . "\n\n";
    }

    $response = \Illuminate\Support\Facades\Http::withoutVerifying()->withHeaders([
        'Authorization' => 'Bearer ' . $apiKey,
        'HTTP-Referer' => config('app.url'),
        'X-Title' => 'ContractMind AI Tester',
    ])->post('https://openrouter.ai/api/v1/chat/completions', [
        'model' => 'nousresearch/hermes-3-llama-3.1-70b',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $context . $request->question]
        ],
        'max_tokens' => 2000,
    ]);

    if ($response->successful()) {
        return response()->json(['answer' => $response->json('choices.0.message.content')]);
    }
    
    return response()->json(['error' => 'Error calling API: ' . $response->body()], 500);
});
