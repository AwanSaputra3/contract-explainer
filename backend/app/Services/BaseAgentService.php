<?php

namespace App\Services;

use App\Models\AgentTask;
use Illuminate\Support\Facades\Log;

abstract class BaseAgentService implements AgentServiceInterface
{
    protected function log(AgentTask $task, string $message): void
    {
        Log::channel('agent')->info("[{$this->agentName()}] {$message}", [
            'task_id' => $task->id,
        ]);
    }
}
