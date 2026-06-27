<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Contract;
use App\Models\ProtocolDependency;

/**
 * TSK-006: Arsitek dan pembuat peta protokol.
 * Menyelesaikan import, membangun inheritance tree,
 * memetakan external calls antar kontrak.
 */
class DependencyAnalyzerService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Dependency';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Analyzing contract dependencies...');

        $contracts = $analysis->contracts;
        $deps = [];

        foreach ($contracts as $contract) {
            $ast = $contract->ast_json;
            if (!$ast) continue;

            // Inheritance
            $contractsDef = $ast['contracts'] ?? [];
            foreach ($contractsDef as $def) {
                if (!empty($def['inherits'])) {
                    $parents = array_map('trim', explode(',', $def['inherits']));
                    foreach ($parents as $parent) {
                        $parentContract = $analysis->contracts()
                            ->where('contract_name', $parent)->first();

                        $dep = ProtocolDependency::create([
                            'analysis_id'       => $analysis->id,
                            'parent_contract_id' => $parentContract?->id,
                            'child_contract_id'  => $contract->id,
                            'dependency_type'    => 'inheritance',
                            'metadata'           => ['parent_name' => $parent, 'child_name' => $def['name']],
                        ]);
                        $deps[] = $dep;
                    }
                }
            }

            // Imports
            foreach ($ast['imports'] ?? [] as $import) {
                $dep = ProtocolDependency::create([
                    'analysis_id'        => $analysis->id,
                    'child_contract_id'  => $contract->id,
                    'dependency_type'    => 'import',
                    'metadata'           => ['path' => $import],
                ]);
                $deps[] = $dep;
            }

            // External calls (simplified mock)
            $funcs = $ast['functions'] ?? [];
            foreach ($funcs as $fn) {
                if (str_contains($fn['params'] ?? '', '.') || str_contains($fn['name'] ?? '', 'call')) {
                    $dep = ProtocolDependency::create([
                        'analysis_id'       => $analysis->id,
                        'child_contract_id'  => $contract->id,
                        'dependency_type'    => 'external_call',
                        'metadata'           => ['function' => $fn['name']],
                    ]);
                    $deps[] = $dep;
                }
            }
        }

        $this->log($task, 'Dependency analysis done. ' . count($deps) . ' dependencies found.');

        return [
            'dependencies_found' => count($deps),
            'dependencies'       => $deps,
        ];
    }
}
