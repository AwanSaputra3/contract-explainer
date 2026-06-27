<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Report;

/**
 * TSK-007: Penerjemah protokol dan pemodel ekonomi.
 * Menganalisis tujuan kode, aliran nilai aset,
 * tokenomics, ownership, access control, life cycle.
 */
class BusinessLogicService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'BusinessLogic';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Analyzing business logic...');

        $contracts = $analysis->contracts;
        $summary = [];

        foreach ($contracts as $contract) {
            $ast = $contract->ast_json ?? [];
            $funcs = $ast['functions'] ?? [];
            $vars = $ast['state_vars'] ?? [];

            // Detect token patterns
            $isERC20 = $this->detectPattern($funcs, ['transfer', 'balanceOf', 'allowance', 'approve']);
            $isERC721 = $this->detectPattern($funcs, ['ownerOf', 'safeTransferFrom', 'tokenURI']);
            $isOwnable = $this->detectPattern($funcs, ['owner', 'transferOwnership', 'renounceOwnership']);
            $hasPausable = $this->detectPattern($funcs, ['pause', 'unpause', 'whenNotPaused']);

            // Build summary
            $summary[] = [
                'contract'      => $contract->contract_name,
                'protocol_type' => $isERC20 ? 'ERC20 Token' : ($isERC721 ? 'ERC721 NFT' : 'Custom'),
                'features'      => array_filter([
                    'ERC20'        => $isERC20,
                    'ERC721'       => $isERC721,
                    'Ownable'      => $isOwnable,
                    'Pausable'     => $hasPausable,
                ], fn($v) => $v),
                'functions_count'   => count($funcs),
                'state_vars_count'  => count($vars),
                'economic_model'    => $this->buildEconomicModelDesc($isERC20, $isERC721, $isOwnable),
            ];
        }

        $content = "# Business Logic Analysis\n\n" . json_encode($summary, JSON_PRETTY_PRINT);

        $report = Report::create([
            'analysis_id' => $analysis->id,
            'type'        => 'business_logic',
            'content'     => $content,
            'format'      => 'markdown',
            'status'      => 'published',
            'generated_by' => $this->agentName(),
        ]);

        $this->log($task, 'Business logic analysis completed.');

        return [
            'report_id'  => $report->id,
            'summaries'  => $summary,
        ];
    }

    private function detectPattern(array $functions, array $names): bool
    {
        $fnNames = array_column($functions, 'name');
        return count(array_intersect($fnNames, $names)) >= 2;
    }

    private function buildEconomicModelDesc(bool $erc20, bool $erc721, bool $ownable): string
    {
        $parts = [];
        if ($erc20) $parts[] = 'Token standard ERC20 with transfer/burn/mint capabilities';
        if ($erc721) $parts[] = 'NFT standard ERC721 with unique token ownership';
        if ($ownable) $parts[] = 'Centralized ownership with admin controls';
        return implode('. ', $parts) ?: 'Custom protocol logic';
    }
}
