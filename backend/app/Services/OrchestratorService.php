<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;

/**
 * Orchestrator: Koordinator pusat sistem multi-agent.
 * Menjalankan pipeline: Parser → Dependency → (Business Logic | Flow | Security | Gas) → Documentation → QA
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
        $this->log($task, 'Starting analysis pipeline for #' . $analysis->id);
        $analysis->update(['status' => 'analyzing', 'progress_percentage' => 0]);

        $results = [];
        $total = count($this->agents);

        // Call CrewAI Python Microservice for Parsing, Security, and Gas
        $pythonResults = $this->runCrewAI($analysis, $task);

        if ($pythonResults) {
            // Fase 1: Ingestion — Parser
            $results[] = ['agent' => 'Parser', 'status' => 'completed', 'output' => $pythonResults['parser_output']];

            // Fase 2: Mapping — Dependency
            $results[] = $this->runAgent($analysis, DependencyAnalyzerService::class);

            // Fase 3: Analysis
            $results[] = ['agent' => 'SecurityScanner', 'status' => 'completed', 'output' => $pythonResults['security_output']];
            $results[] = ['agent' => 'GasOptimizer', 'status' => 'completed', 'output' => $pythonResults['gas_output']];
            $results[] = $this->runAgent($analysis, BusinessLogicService::class);
            $results[] = $this->runAgent($analysis, FlowVisualizerService::class);
        } else {
            // Fallback to purely PHP Mock execution if Python fails
            $results[] = $this->runAgent($analysis, ParserService::class);
            if (!$analysis->fresh()->agentTasks()->where('agent_name', 'Parser')->where('status', 'completed')->exists()) {
                $analysis->update(['status' => 'failed', 'error_message' => 'Parser phase failed.']);
                return ['status' => 'failed', 'error' => 'Parser failed'];
            }
            $results[] = $this->runAgent($analysis, DependencyAnalyzerService::class);
            
            $analysisAgents = [
                BusinessLogicService::class,
                FlowVisualizerService::class,
                SecurityScannerService::class,
                GasOptimizerService::class,
            ];
            foreach ($analysisAgents as $agentClass) {
                $results[] = $this->runAgent($analysis, $agentClass);
            }
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

        $this->log($task, "Pipeline complete. {$total} agents executed.");

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

    private function runCrewAI(Analysis $analysis, AgentTask $task): ?array
    {
        $this->log($task, 'Booting up Python CrewAI Orchestrator...');
        $scriptPath = base_path('../python_agents/main.py');
        if (!file_exists($scriptPath)) {
            $this->log($task, 'CrewAI script not found. Falling back to PHP mocks.');
            return null;
        }

        // Try using python or python3
        $process = new \Symfony\Component\Process\Process(['python', $scriptPath, $analysis->source_value]);
        $process->setTimeout(300); // 5 mins

        try {
            $process->run();
            if ($process->isSuccessful()) {
                $output = json_decode($process->getOutput(), true);
                if (isset($output['status']) && $output['status'] === 'success') {
                    $this->log($task, 'CrewAI execution successful.');
                    return $output;
                }
            }
            $this->log($task, 'CrewAI failed or returned invalid JSON. Output: ' . $process->getErrorOutput() . ' | ' . $process->getOutput());
            return null;
        } catch (\Exception $e) {
            $this->log($task, 'CrewAI execution exception: ' . $e->getMessage());
            return null;
        }
    }
}
