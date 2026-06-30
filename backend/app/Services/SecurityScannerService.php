<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\SecurityFinding;
use App\Traits\HasHermesAgent;

/**
 * TSK-011: Auditor keamanan smart contract.
 * Memindai kerentanan menggunakan Hermes LLM.
 */
class SecurityScannerService extends BaseAgentService
{
    use HasHermesAgent;

    public function agentName(): string
    {
        return 'Security';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Running security scan via Hermes...');

        $contracts = $analysis->contracts;
        $findings = [];
        $totalFindings = 0;

        $systemPrompt = "You are a legendary Web3 security auditor. You have prevented billions of dollars in hacks by finding subtle bugs that others miss. You are extremely thorough and paranoid about security.";

        foreach ($contracts as $contract) {
            $code = $contract->source_code ?? '';
            
            $userPrompt = "Review the following smart contract code for security flaws:\n\n" . $code . "\n\n" .
            "Pay special attention to:\n- Reentrancy vulnerabilities\n- Unprotected selfdestruct\n- Access control issues\n- Integer overflow/underflow\n- Oracle manipulation risks\n- DOS vectors\n- Signature replay attacks\n- Upgradeability risks\n- Centralization risks\n\n" .
            "Return a JSON array of objects. Each object must have these exact keys:\n" .
            "1. 'severity' (one of: Critical, High, Medium, Low, Informational)\n" .
            "2. 'title' (short string)\n" .
            "3. 'description' (detailed explanation string)\n" .
            "4. 'location' (line number or function name)\n" .
            "5. 'recommendation' (actionable fix string)\n\n" .
            "If no vulnerabilities are found, return an empty array [].";

            try {
                $result = $this->callHermes($systemPrompt, $userPrompt, true);
                
                if (is_array($result)) {
                    foreach ($result as $vuln) {
                        if (!isset($vuln['title']) || !isset($vuln['severity'])) continue;
                        
                        $finding = SecurityFinding::create([
                            'analysis_id'    => $analysis->id,
                            'contract_id'    => $contract->id,
                            'severity'       => strtolower($vuln['severity']),
                            'title'          => $vuln['title'],
                            'description'    => $vuln['description'] ?? '',
                            'location'       => $vuln['location'] ?? '',
                            'recommendation' => $vuln['recommendation'] ?? '',
                        ]);
                        $findings[] = $finding;
                        $totalFindings++;
                    }
                }
                $this->log($task, "Security scan completed for contract: {$contract->contract_name}");
            } catch (\Exception $e) {
                $this->log($task, "Failed security scan for contract: {$contract->contract_name}. Error: " . $e->getMessage());
            }
        }

        $this->log($task, 'Security scan done. ' . $totalFindings . ' findings.');

        return [
            'findings_count' => $totalFindings,
            'findings'       => array_map(function($f) { return $f->toArray(); }, $findings),
        ];
    }
}

