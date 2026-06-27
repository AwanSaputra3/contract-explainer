<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Contract;
use App\Models\AnalysisSetting;
use App\Services\InteractiveQAService;
use App\Services\OrchestratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'source_type'   => 'required|in:file,github,address',
            'source_value'  => 'required|string|max:500',
            'chain'         => 'nullable|string|max:50',
            'source_code'   => 'nullable|string|max:50000',
            'contract_name' => 'required_with:source_code|string|max:255',
            'settings'      => 'nullable|array',
        ]);

        $analysis = Analysis::create([
            'user_id'      => $request->user()->id,
            'source_type'  => $request->source_type,
            'source_value' => $request->source_value,
            'chain'        => $request->chain,
            'status'       => 'pending',
        ]);

        AnalysisSetting::create([
            'analysis_id'             => $analysis->id,
            'enable_security_scan'    => $request->input('settings.enable_security_scan', true),
            'enable_gas_optimization' => $request->input('settings.enable_gas_optimization', true),
            'enable_flow_diagram'     => $request->input('settings.enable_flow_diagram', true),
            'enable_documentation'    => $request->input('settings.enable_documentation', true),
            'target_severity_level'   => $request->input('settings.target_severity_level', 'info'),
            'custom_prompt'           => $request->input('settings.custom_prompt'),
        ]);

        if ($request->source_code) {
            Contract::create([
                'analysis_id'   => $analysis->id,
                'contract_name' => $request->contract_name,
                'source_code'   => $request->source_code,
                'contract_type' => $request->input('contract_type', 'contract'),
                'chain'         => $request->chain,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Analysis created.',
            'data'    => $analysis->load(['contracts', 'analysisSettings']),
        ], 201);
    }

    public function analyze(int $id): JsonResponse
    {
        $analysis = Analysis::with('contracts')->findOrFail($id);
        if ($analysis->status === 'analyzing') {
            return response()->json(['success' => false, 'message' => 'Already running.'], 409);
        }

        $task = AgentTask::create([
            'analysis_id' => $analysis->id,
            'agent_name'  => 'Orchestrator',
            'status'      => 'running',
            'started_at'  => now(),
        ]);

        $result = app(OrchestratorService::class)->execute($analysis, $task);

        $task->update([
            'status'         => $result['status'] === 'completed' ? 'completed' : 'failed',
            'output_payload' => $result,
            'completed_at'   => now(),
        ]);

        return response()->json([
            'success' => $result['status'] === 'completed',
            'message' => $result['status'] === 'completed' ? 'Analysis complete.' : 'Analysis failed.',
            'data'    => $analysis->fresh()->load([
                'agentTasks', 'contracts', 'securityFindings',
                'gasOptimizations', 'reports', 'chatSession',
            ]),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $a = Analysis::with(['contracts','agentTasks','securityFindings','gasOptimizations','reports','chatSession','analysisSettings','protocolDependencies'])->findOrFail($id);
        return response()->json(['success'=>true,'data'=>$a]);
    }

    public function index(Request $request): JsonResponse
    {
        $list = $request->user()->analyses()->withCount(['agentTasks','securityFindings','reports'])->latest()->paginate($request->get('per_page',10));
        return response()->json(['success'=>true,'data'=>$list]);
    }

    public function destroy(int $id): JsonResponse
    {
        Analysis::findOrFail($id)->delete();
        return response()->json(['success'=>true,'message'=>'Deleted.']);
    }

    public function chatAsk(Request $request, int $analysisId): JsonResponse
    {
        $request->validate(['question'=>'required|string|max:2000']);
        $analysis = Analysis::with('contracts','securityFindings','chatSession')->findOrFail($analysisId);
        $answer = app(InteractiveQAService::class)->answer($analysis,$request->question);
        return response()->json(['success'=>true,'data'=>['question'=>$request->question,'answer'=>$answer]]);
    }

    public function chatHistory(int $analysisId): JsonResponse
    {
        $session = Analysis::findOrFail($analysisId)->chatSession;
        return response()->json(['success'=>true,'data'=>$session?->messages()->latest()->get()??[]]);
    }
}
