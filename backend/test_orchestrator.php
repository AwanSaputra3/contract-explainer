<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$orchestrator = app(App\Services\OrchestratorService::class);
$analysis = App\Models\Analysis::find(1);

if ($analysis) {
    // Reset tasks
    $analysis->agentTasks()->delete();

    echo "Testing Orchestrator with CrewAI Integration...\n";
    
    // Create a dummy task
    $task = App\Models\AgentTask::create([
        'analysis_id' => $analysis->id,
        'agent_name'  => 'Test Orchestrator',
        'status'      => 'running',
    ]);
    
    $results = $orchestrator->execute($analysis, $task);
    echo "\n=== PIPELINE RESULTS ===\n";
    print_r($results);
    echo "\n=======================\n";
} else {
    echo "Analysis not found.";
}
