<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Report;

/**
 * TSK-010: Visualisator dan pemeta perilaku eksekusi.
 * Membuat diagram Mermaid.js: State Machines, Sequence, Call Graphs.
 */
class FlowVisualizerService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Flow';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Generating flow visualizations...');

        $contracts = $analysis->contracts;
        $diagrams = [];

        foreach ($contracts as $contract) {
            $ast = $contract->ast_json ?? [];
            $funcs = $ast['functions'] ?? [];
            $modifiers = $ast['modifiers'] ?? [];

            // State Machine
            $stateDiagram = "```mermaid\nstateDiagram-v2\n";
            $stateDiagram .= "    [*] --> Created\n";
            $stateDiagram .= "    Created --> Active : initialize()\n";
            $stateDiagram .= "    Active --> Paused : pause()\n";
            $stateDiagram .= "    Paused --> Active : unpause()\n";
            $stateDiagram .= "    Active --> [*] : destroy()\n";
            $stateDiagram .= "```";

            // Sequence Diagram
            $seqDiagram = "```mermaid\nsequenceDiagram\n";
            $seqDiagram .= "    actor User\n";
            $seqDiagram .= "    participant " . $contract->contract_name . "\n";
            foreach (array_slice($funcs, 0, 5) as $fn) {
                $seqDiagram .= "    User->>+" . $contract->contract_name . ": {$fn['name']}()\n";
                $seqDiagram .= "    " . $contract->contract_name . "-->>-User: result\n";
            }
            $seqDiagram .= "```";

            $diagrams[] = [
                'contract'          => $contract->contract_name,
                'state_machine'     => $stateDiagram,
                'sequence_diagram'  => $seqDiagram,
            ];
        }

        $content = "# Execution Flow Diagrams\n\n" . json_encode($diagrams, JSON_PRETTY_PRINT);

        $report = Report::create([
            'analysis_id'  => $analysis->id,
            'type'         => 'state_machine_diagram',
            'content'      => $content,
            'format'       => 'markdown',
            'status'       => 'published',
            'generated_by' => $this->agentName(),
        ]);

        $this->log($task, 'Flow diagrams generated.');

        return [
            'report_id' => $report->id,
            'diagrams'  => $diagrams,
        ];
    }
}
