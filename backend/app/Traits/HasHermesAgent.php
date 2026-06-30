<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

trait HasHermesAgent
{
    /**
     * Call the Hermes 3 model via OpenRouter API.
     *
     * @param string $systemPrompt The agent's role and backstory.
     * @param string $userPrompt The actual task and input data.
     * @param bool $jsonMode True if the response should be parsed as JSON.
     * @return mixed Array if $jsonMode is true, otherwise string.
     * @throws \Exception
     */
    protected function callHermes(string $systemPrompt, string $userPrompt, bool $jsonMode = false)
    {
        $apiKey = env('OPENROUTER_API_KEY');
        if (empty($apiKey)) {
            throw new \Exception('OPENROUTER_API_KEY is not configured in .env');
        }

        if ($jsonMode) {
            $systemPrompt .= "\n\nIMPORTANT: You must respond ONLY with a raw JSON object or array. Do not wrap the JSON in markdown code blocks like ```json ... ```. Just return the raw valid JSON string.";
        }

        try {
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'HTTP-Referer'  => config('app.url'),
                    'X-Title'       => 'ContractMind AI Native',
                ])
                ->timeout(120) // Agents might take time to think
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'nousresearch/hermes-3-llama-3.1-70b',
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $userPrompt],
                    ],
                    // We can use response_format for models that support it, but prompting is safer for cross-model compatibility on OpenRouter
                    'temperature' => 0.1, // Low temperature for deterministic analysis
                ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                if (!$content) {
                    throw new \Exception("Empty response from AI model.");
                }

                if ($jsonMode) {
                    // Try to parse JSON. Sometimes LLMs still add markdown formatting.
                    $content = trim($content);
                    if (str_starts_with($content, '```json')) {
                        $content = substr($content, 7);
                    } elseif (str_starts_with($content, '```')) {
                        $content = substr($content, 3);
                    }
                    if (str_ends_with($content, '```')) {
                        $content = substr($content, 0, -3);
                    }
                    $content = trim($content);

                    $decoded = json_decode($content, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        Log::error('Failed to parse JSON from Hermes', ['raw_content' => $content, 'error' => json_last_error_msg()]);
                        throw new \Exception("Hermes did not return valid JSON. Error: " . json_last_error_msg());
                    }
                    return $decoded;
                }

                return $content;
            }

            throw new \Exception("OpenRouter API error: " . $response->body());
        } catch (\Exception $e) {
            Log::error('Hermes API Exception', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}
