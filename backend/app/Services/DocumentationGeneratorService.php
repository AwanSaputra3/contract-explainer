<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Report;

/**
 * TSK-015: Technical Writer.
 * Memformat seluruh hasil analisis menjadi dokumentasi
 * rapi: Markdown, JSON, PDF.
 */
class DocumentationGeneratorService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Documentation';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Generating final documentation...');

        // Gather all previous reports
        $reports = $analysis->reports;
        $findings = $analysis->securityFindings;
        $optimizations = $analysis->gasOptimizations;
        $contracts = $analysis->contracts;

        // Build executive summary
        $md = "# 🧠 ContractMind AI — Analysis Report\n\n";
        $md .= "**Analysis ID:** {$analysis->id}\n";
        $md .= "**Source:** {$analysis->source_type} — `{$analysis->source_value}`\n";
        $md .= "**Generated:** " . now()->toDateTimeString() . "\n\n";
        $md .= "---\n\n";

        // Architecture section
        $md .= "## 🏗️ Architecture\n\n";
        foreach ($contracts as $c) {
            $md .= "- **{$c->contract_name}** ({$c->contract_type}) — `{$c->file_path}`\n";
            $ast = $c->ast_json ?? [];
            $md .= "  - Functions: " . count($ast['functions'] ?? []) . "\n";
            $md .= "  - State Vars: " . count($ast['state_vars'] ?? []) . "\n";
            $md .= "  - Events: " . count($ast['events'] ?? []) . "\n";
        }
        $md .= "\n";

        // Security section
        $md .= "## 🛡️ Security Findings\n\n";
        $md .= "| Severity | Title | Location |\n";
        $md .= "|----------|-------|----------|\n";
        foreach ($findings as $f) {
            $md .= "| {$f->severity} | {$f->title} | {$f->location} |\n";
        }
        $md .= "\n";

        // Gas section
        $md .= "## ⛽ Gas Optimizations\n\n";
        foreach ($optimizations as $o) {
            $md .= "- **{$o->location}** — {$o->description} _(save: {$o->estimated_savings})_\n";
        }
        $md .= "\n";

        // Previous reports
        foreach ($reports as $r) {
            $md .= "## 📄 {$r->type}\n\n{$r->content}\n\n---\n\n";
        }

        // Save executive summary
        Report::create([
            'analysis_id'  => $analysis->id,
            'type'         => 'executive_summary',
            'content'      => $md,
            'format'       => 'markdown',
            'status'       => 'published',
            'generated_by' => $this->agentName(),
        ]);

        // Save as JSON too
        $jsonContent = json_encode([
            'analysis_id'   => $analysis->id,
            'source'        => $analysis->source_value,
            'contracts'     => $contracts->toArray(),
            'findings'      => $findings->toArray(),
            'optimizations' => $optimizations->toArray(),
        ], JSON_PRETTY_PRINT);

        Report::create([
            'analysis_id'  => $analysis->id,
            'type'         => 'architecture',
            'content'      => $jsonContent,
            'format'       => 'json',
            'status'       => 'published',
            'generated_by' => $this->agentName(),
        ]);

        $this->log($task, 'Documentation generated successfully.');

        return [
            'reports_generated' => 2,
            'format_markdown'   => true,
            'format_json'       => true,
        ];
    }
}
