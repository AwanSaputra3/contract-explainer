<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Contract;
use App\Traits\HasHermesAgent;

/**
 * TSK-003: Pengekstrak kode dan pembuat AST.
 * Mem-parsing kode Solidity menggunakan Hermes LLM.
 */
class ParserService extends BaseAgentService
{
    use HasHermesAgent;

    public function agentName(): string
    {
        return 'Parser';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Starting Solidity parsing via Hermes...');

        $contracts = $analysis->contracts;
        $output = [];

        $systemPrompt = "You are a highly experienced reverse engineer and compiler architect who specializes in Ethereum Virtual Machine (EVM) architecture. You break down complex code into understandable structures. Analyze the given Solidity smart contract code and extract its Abstract Syntax Tree (AST) components.";

        foreach ($contracts as $contract) {
            $code = $contract->source_code ?? '';
            
            $userPrompt = "Analyze the following Solidity smart contract code:\n\n" . $code . "\n\n" .
            "Extract the following into a structured format:\n" .
            "1. pragmas (array of strings)\n" .
            "2. imports (array of strings)\n" .
            "3. contracts (array of objects with 'name' and 'inherits')\n" .
            "4. interfaces (array of strings)\n" .
            "5. libraries (array of strings)\n" .
            "6. structs (array of objects with 'name')\n" .
            "7. enums (array of objects with 'name')\n" .
            "8. events (array of objects with 'name' and 'params')\n" .
            "9. errors (array of objects with 'name' and 'params')\n" .
            "10. modifiers (array of objects with 'name' and 'params')\n" .
            "11. functions (array of objects with 'name', 'params', 'visibility', 'modifier', and 'returns')\n" .
            "12. state_vars (array of objects with 'name', 'type', and 'visibility')\n\n" .
            "Return a JSON object containing EXACTLY these keys. Ensure the response is robust and accurate.";

            try {
                $ast = $this->callHermes($systemPrompt, $userPrompt, true);
                
                // Ensure defaults for missing keys
                $ast = array_merge([
                    'pragmas' => [], 'imports' => [], 'contracts' => [], 'interfaces' => [],
                    'libraries' => [], 'structs' => [], 'enums' => [], 'events' => [],
                    'errors' => [], 'modifiers' => [], 'functions' => [], 'state_vars' => []
                ], is_array($ast) ? $ast : []);

                $contract->update(['ast_json' => $ast]);
                $output[] = [
                    'contract_id'   => $contract->id,
                    'contract_name' => $contract->contract_name,
                    'ast'           => $ast,
                ];
                $this->log($task, "Successfully parsed contract: {$contract->contract_name}");
            } catch (\Exception $e) {
                $this->log($task, "Failed to parse contract: {$contract->contract_name}. Error: " . $e->getMessage());
                // Fallback empty AST if it fails
                $contract->update(['ast_json' => []]);
            }
        }

        $this->log($task, 'Parsing completed for ' . count($contracts) . ' contracts.');

        return [
            'contracts_parsed' => count($contracts),
            'ast_data'         => $output,
        ];
    }
}

