<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    protected $fillable = [
        'analysis_id',
        'contract_name',
        'contract_type',
        'compiler_version',
        'deployed_address',
        'chain',
        'is_verified',
        'file_path',
        'source_code',
        'ast_json',
    ];

    protected function casts(): array
    {
        return [
            'ast_json' => 'array',
            'is_verified' => 'boolean',
        ];
    }

    // ─── Relationships ──────────────────────────────────

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }

    public function securityFindings(): HasMany
    {
        return $this->hasMany(SecurityFinding::class);
    }

    public function gasOptimizations(): HasMany
    {
        return $this->hasMany(GasOptimization::class);
    }

    public function parentDependencies(): HasMany
    {
        return $this->hasMany(ProtocolDependency::class, 'parent_contract_id');
    }

    public function childDependencies(): HasMany
    {
        return $this->hasMany(ProtocolDependency::class, 'child_contract_id');
    }
}

