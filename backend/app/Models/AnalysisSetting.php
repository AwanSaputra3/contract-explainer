<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnalysisSetting extends Model
{
    protected $fillable = [
        'analysis_id',
        'enable_security_scan',
        'enable_gas_optimization',
        'enable_flow_diagram',
        'enable_documentation',
        'target_severity_level',
        'custom_prompt',
    ];

    protected function casts(): array
    {
        return [
            'enable_security_scan' => 'boolean',
            'enable_gas_optimization' => 'boolean',
            'enable_flow_diagram' => 'boolean',
            'enable_documentation' => 'boolean',
        ];
    }

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }
}
