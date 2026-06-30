<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\GasOptimization;
use App\Traits\HasHermesAgent;

/**
 * TSK-013 + TSK-014: Ahli efisiensi dan optimasi biaya.
 * Identifikasi pola boros gas & estimasi penghematan menggunakan Hermes LLM.
 */
class GasOptimizerService extends BaseAgentService
{
    use HasHermesAgent;

    public function agentName(): string
    {
        return 'GasOptimizer';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Analyzing gas optimization opportunities via Hermes...');

        $contracts = $analysis->contracts;
        $optimizations = [];
        $totalOpts = 0;

        $systemPrompt = "You are an expert in EVM opcodes and gas mechanics. You know every trick in the book to save Wei on transactions, from packing storage variables to optimizing memory allocation.";

        foreach ($contracts as $contract) {
            $code = $contract->source_code ?? '';
            
            $userPrompt = "Review the following smart contract code for gas optimization opportunities:\n\n" . $code . "\n\n" .
            "Look for:\n- Unnecessary storage reads/writes\n- Inefficient loops\n- Variable packing opportunities\n- calldata vs memory usage\n- Use of immutable/constant\n- Custom errors vs revert strings\n- Short-circuiting opportunities\n- Event emission optimization\n\n" .
            "Return a JSON array of objects. Each object must have these exact keys:\n" .
            "1. 'title' (short string)\n" .
            "2. 'description' (detailed explanation string)\n" .
            "3. 'location' (line number or function name)\n" .
            "4. 'estimated_savings' (approximate gas saved, e.g., '~2000 gas')\n\n" .
            "If no optimizations are found, return an empty array [].";

            try {
                $result = $this->callHermes($systemPrompt, $userPrompt, true);
                
                if (is_array($result)) {
                    foreach ($result as $optData) {
                        if (!isset($optData['title'])) continue;
                        
                        $opt = GasOptimization::create([
                            'analysis_id'      => $analysis->id,
                            'contract_id'      => $contract->id,
                            'description'      => $optData['description'] ?? '',
                            'location'         => $optData['location'] ?? '',
                            'estimated_savings' => $optData['estimated_savings'] ?? '',
                        ]);
                        $optimizations[] = $opt;
                        $totalOpts++;
                    }
                }
                $this->log($task, "Gas optimization completed for contract: {$contract->contract_name}");
            } catch (\Exception $e) {
                $this->log($task, "Failed gas optimization for contract: {$contract->contract_name}. Error: " . $e->getMessage());
            }
        }

        $this->log($task, 'Gas optimization done. ' . $totalOpts . ' suggestions.');

        return [
            'optimizations_count' => $totalOpts,
            'optimizations'       => array_map(function($o) { return $o->toArray(); }, $optimizations),
        ];
    }
}

