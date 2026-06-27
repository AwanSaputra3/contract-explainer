<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\ChatMessage;
use App\Models\ChatSession;

/**
 * TSK-017: Asisten tanya-jawab kontekstual.
 * Menggunakan LLM API untuk menjawab pertanyaan
 * pengguna berdasarkan hasil analisis.
 */
class InteractiveQAService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'InteractiveQA';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Initializing Q&A session...');

        // Create or get chat session
        $session = $analysis->chatSession;
        if (!$session) {
            $session = ChatSession::create([
                'analysis_id' => $analysis->id,
                'user_id'     => $analysis->user_id,
                'title'       => "Q&A — Analysis #{$analysis->id}",
                'status'      => 'active',
            ]);
        }

        // Welcome message
        ChatMessage::create([
            'chat_session_id' => $session->id,
            'role'            => 'agent',
            'content'         => "Hello! I'm ContractMind AI. I've analyzed `{$analysis->source_value}`. Ask me anything about the contracts!",
        ]);

        $this->log($task, 'Q&A session ready.');

        return [
            'session_id' => $session->id,
            'status'     => 'active',
        ];
    }

    /**
     * Answer a user question using context from the analysis.
     */
    public function answer(Analysis $analysis, string $question): string
    {
        $context = $this->buildContext($analysis);
        $session = $analysis->chatSession;
        
        if (!$session) {
            return "Chat session not found.";
        }

        // Call real LLM via OpenRouter
        $answer = $this->callOpenRouterAPI($question, $context, $session);

        ChatMessage::create([
            'chat_session_id' => $session->id,
            'role'            => 'user',
            'content'         => $question,
        ]);
        ChatMessage::create([
            'chat_session_id' => $session->id,
            'role'            => 'agent',
            'content'         => $answer,
        ]);

        return $answer;
    }

    private function buildContext(Analysis $analysis): string
    {
        $ctx = "Analysis of: {$analysis->source_value}\n\n";
        
        foreach ($analysis->contracts as $c) {
            $ctx .= "Contract: {$c->contract_name}\n";
            $ast = $c->ast_json ?? [];
            $ctx .= "Functions: " . json_encode(array_column($ast['functions'] ?? [], 'name')) . "\n";
        }

        $findings = $analysis->securityFindings;
        if ($findings->isNotEmpty()) {
            $ctx .= "\nSecurity findings: " . $findings->count() . " issues\n";
            foreach ($findings as $f) {
                $ctx .= "- [{$f->severity}] {$f->title}\n";
            }
        }

        return $ctx;
    }

    private function callOpenRouterAPI(string $question, string $context, ChatSession $session): string
    {
        $messages = [];
        
        // System prompt
        $messages[] = [
            'role' => 'system',
            'content' => "You are ContractMind AI, an expert smart contract auditor and developer. Answer the user's questions clearly and concisely based on the following analysis context:\n\n" . $context
        ];

        // Fetch last 10 messages for context
        $history = $session->messages()->orderBy('created_at', 'asc')->take(10)->get();
        foreach ($history as $msg) {
            $messages[] = [
                'role' => $msg->role === 'agent' ? 'assistant' : 'user',
                'content' => $msg->content
            ];
        }

        // Add current question
        $messages[] = [
            'role' => 'user',
            'content' => $question
        ];

        $apiKey = env('OPENROUTER_API_KEY');
        if (empty($apiKey)) {
            return "API Key is missing. Please configure OPENROUTER_API_KEY in .env.";
        }

        try {
            $response = \Illuminate\Support\Facades\Http::withoutVerifying()->withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'HTTP-Referer' => config('app.url'),
                'X-Title' => 'ContractMind AI',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'google/gemini-2.5-flash',
                'messages' => $messages,
                'max_tokens' => 2000,
            ]);

            if ($response->successful()) {
                return $response->json('choices.0.message.content') ?? "I couldn't generate a response.";
            }

            return "Error calling AI provider: " . $response->body();
        } catch (\Exception $e) {
            return "Exception occurred: " . $e->getMessage();
        }
    }
}
