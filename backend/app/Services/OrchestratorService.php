<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;

/**
 * Orchestrator: Koordinator pusat sistem multi-agent.
 * Menjalankan pipeline Native PHP menggunakan Hermes LLM.
 */
class OrchestratorService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Orchestrator';
    }

    private array $agents = [
        ParserService::class,
        DependencyAnalyzerService::class,
        BusinessLogicService::class,
        FlowVisualizerService::class,
        SecurityScannerService::class,
        GasOptimizerService::class,
        DocumentationGeneratorService::class,
        InteractiveQAService::class,
    ];

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Starting native PHP analysis pipeline for #' . $analysis->id);
        $analysis->update(['status' => 'analyzing', 'progress_percentage' => 0]);

        $results = [];
        $total = count($this->agents);

        // Fase 1: Ingestion — Parser
        $results[] = $this->runAgent($analysis, ParserService::class);
        
        // Cek jika parsing gagal fatal
        if (!$analysis->fresh()->agentTasks()->where('agent_name', 'Parser')->where('status', 'completed')->exists()) {
            $analysis->update(['status' => 'failed', 'error_message' => 'Parser phase failed.']);
            return ['status' => 'failed', 'error' => 'Parser failed'];
        }

        // Fase 2: Mapping — Dependency
        $results[] = $this->runAgent($analysis, DependencyAnalyzerService::class);
        
        // Fase 3: Analysis
        $analysisAgents = [
            BusinessLogicService::class,
            FlowVisualizerService::class,
            SecurityScannerService::class,
            GasOptimizerService::class,
        ];
        foreach ($analysisAgents as $agentClass) {
            $results[] = $this->runAgent($analysis, $agentClass);
        }

        // Fase 4: Synthesis — Documentation
        $results[] = $this->runAgent($analysis, DocumentationGeneratorService::class);

        // Fase 5: Interaction — QA
        $results[] = $this->runAgent($analysis, InteractiveQAService::class);

        // Final: mark completed
        $analysis->update([
            'status'              => 'completed',
            'progress_percentage' => 100,
            'completed_at'        => now(),
        ]);

        $this->log($task, "Pipeline complete. {$total} agents executed via Native PHP.");

        return [
            'status'        => 'completed',
            'total_agents'  => $total,
            'results'       => $results,
        ];
    }

    private function runAgent(Analysis $analysis, string $agentClass): array
    {
        /** @var AgentServiceInterface $agent */
        $agent = app($agentClass);

        // Create subtask
        $subTask = AgentTask::create([
            'analysis_id' => $analysis->id,
            'agent_name'  => $agent->agentName(),
            'status'      => 'running',
            'started_at'  => now(),
        ]);

        try {
            $output = $agent->execute($analysis, $subTask);
            $subTask->update([
                'status'        => 'completed',
                'output_payload' => $output,
                'completed_at'  => now(),
            ]);

            $analysis->increment('progress_percentage', (int)(100 / 8));

            return ['agent' => $agent->agentName(), 'status' => 'completed', 'output' => $output];
        } catch (\Throwable $e) {
            $subTask->update([
                'status'         => 'failed',
                'error_message'  => $e->getMessage(),
                'completed_at'   => now(),
            ]);

            return ['agent' => $agent->agentName(), 'status' => 'failed', 'error' => $e->getMessage()];
        }
    }
}

