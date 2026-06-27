<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\SecurityFinding;

/**
 * TSK-011: Auditor keamanan smart contract.
 * Memindai: Reentrancy, Overflow, Access Control,
 * Oracle Risks, DOS Vectors, dll.
 */
class SecurityScannerService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Security';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Running security scan...');

        $contracts = $analysis->contracts;
        $findings = [];
        $rules = $this->getRules();

        foreach ($contracts as $contract) {
            $code = $contract->source_code ?? '';
            $ast = $contract->ast_json ?? [];

            foreach ($rules as $rule) {
                $matches = $this->applyRule($rule, $code, $ast);
                foreach ($matches as $match) {
                    $finding = SecurityFinding::create([
                        'analysis_id'    => $analysis->id,
                        'contract_id'    => $contract->id,
                        'severity'       => $rule['severity'],
                        'title'          => $rule['title'],
                        'description'    => $match['description'],
                        'location'       => $match['location'] ?? null,
                        'recommendation' => $rule['recommendation'],
                    ]);
                    $findings[] = $finding;
                }
            }
        }

        $this->log($task, 'Security scan done. ' . count($findings) . ' findings.');

        return [
            'findings_count' => count($findings),
            'findings'       => $findings->toArray(),
        ];
    }

    private function getRules(): array
    {
        return [
            [
                'title' => 'Reentrancy Risk',
                'severity' => 'high',
                'recommendation' => 'Use ReentrancyGuard or checks-effects-interactions pattern.',
                'patterns' => ['\.call\{value:', '\.transfer\(', '\.send\('],
            ],
            [
                'title' => 'Unchecked External Call',
                'severity' => 'medium',
                'recommendation' => 'Always check return value of low-level calls.',
                'patterns' => ['\.call\(', '\.delegatecall\('],
            ],
            [
                'title' => 'Integer Overflow/Underflow',
                'severity' => 'low',
                'recommendation' => 'Solidity 0.8+ has built-in overflow checks. Verify pragma >=0.8.0.',
                'patterns' => ['pragma solidity \^?0\.[5-7]'],
            ],
            [
                'title' => 'Missing Access Control',
                'severity' => 'high',
                'recommendation' => 'Add onlyOwner or role-based access control modifier.',
                'patterns' => ['function\s+\w+\s*\([^)]*\)\s*(?:public|external)\s*(?!.*(?:onlyOwner|onlyRole|require\s*\(msg\.sender))'],
            ],
            [
                'title' => 'Timestamp Dependence',
                'severity' => 'medium',
                'recommendation' => 'Avoid block.timestamp for critical logic; use block.number instead.',
                'patterns' => ['block\.timestamp'],
            ],
            [
                'title' => 'tx.origin Authentication',
                'severity' => 'high',
                'recommendation' => 'Use msg.sender instead of tx.origin for authentication.',
                'patterns' => ['tx\.origin'],
            ],
            [
                'title' => 'Self-Destruct Risk',
                'severity' => 'critical',
                'recommendation' => 'Remove selfdestruct or restrict to owner-only with timelock.',
                'patterns' => ['selfdestruct\(', 'suicide\('],
            ],
        ];
    }

    private function applyRule(array $rule, string $code, array $ast): array
    {
        $matches = [];
        foreach ($rule['patterns'] as $pattern) {
            if (preg_match('/' . $pattern . '/i', $code, $m, PREG_OFFSET_CAPTURE)) {
                $line = substr_count(substr($code, 0, $m[0][1]), "\n") + 1;
                $matches[] = [
                    'description' => "Pattern '{$pattern}' detected.",
                    'location'    => "Line {$line}",
                ];
            }
        }
        return $matches;
    }
}
