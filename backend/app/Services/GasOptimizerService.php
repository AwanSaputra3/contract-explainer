<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\GasOptimization;

/**
 * TSK-013 + TSK-014: Ahli efisiensi dan optimasi biaya.
 * Identifikasi pola boros gas & estimasi penghematan.
 */
class GasOptimizerService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'GasOptimizer';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Analyzing gas optimization opportunities...');

        $contracts = $analysis->contracts;
        $optimizations = [];
        $rules = $this->getRules();

        foreach ($contracts as $contract) {
            $code = $contract->source_code ?? '';
            foreach ($rules as $rule) {
                foreach ($rule['patterns'] as $pattern) {
                    if (preg_match('/' . $pattern . '/i', $code, $m, PREG_OFFSET_CAPTURE)) {
                        $line = substr_count(substr($code, 0, $m[0][1]), "\n") + 1;
                        $opt = GasOptimization::create([
                            'analysis_id'      => $analysis->id,
                            'contract_id'      => $contract->id,
                            'description'      => $rule['description'],
                            'location'         => "Line {$line}: {$m[0][0]}",
                            'estimated_savings' => $rule['estimated_savings'],
                        ]);
                        $optimizations[] = $opt;
                    }
                }
            }
        }

        $this->log($task, 'Gas optimization done. ' . count($optimizations) . ' suggestions.');

        return [
            'optimizations_count' => count($optimizations),
            'optimizations'       => $optimizations,
        ];
    }

    private function getRules(): array
    {
        return [
            ['patterns' => ['\bstring\b.*\bmemory\b'], 'description' => 'Use calldata instead of memory for external function string params', 'estimated_savings' => '~200-500 gas per call'],
            ['patterns' => ['for\s*\(.*\.length'], 'description' => 'Cache array length outside loop to avoid repeated SLOAD', 'estimated_savings' => '~100 gas per iteration'],
            ['patterns' => ['\buint\s+(\w+)\s*=[^;]*;.*\1\s*\+\+'], 'description' => 'Use ++i (pre-increment) instead of i++ for gas savings', 'estimated_savings' => '~5 gas per use'],
            ['patterns' => ['\bpublic\s+(\w+)\s+(\w+)\s*;'], 'description' => 'Mark state variable as private + getter if not needed public', 'estimated_savings' => '~2000 gas on deploy'],
            ['patterns' => ['\b(\w+)\s*=\s*0\s*;'], 'description' => 'Default value is 0; explicit initialization wastes gas', 'estimated_savings' => '~100 gas per var'],
            ['patterns' => ['\b(\w+)\.push\(', '\b(\w+)\s*=\s*new\s'], 'description' => 'Consider fixed-size array or mapping to reduce storage cost', 'estimated_savings' => '~20000 gas on deploy'],
            ['patterns' => ['\bconstant\b'], 'description' => 'Great! Using constant saves gas ✓', 'estimated_savings' => 'already optimized'],
            ['patterns' => ['\bimmutable\b'], 'description' => 'Great! Using immutable saves gas ✓', 'estimated_savings' => 'already optimized'],
        ];
    }
}
