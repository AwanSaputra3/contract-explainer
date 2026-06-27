<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;

interface AgentServiceInterface
{
    public function agentName(): string;
    public function execute(Analysis $analysis, AgentTask $task): array;
}
