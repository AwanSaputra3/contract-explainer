<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProtocolDependency extends Model
{
    protected $fillable = [
        'analysis_id',
        'parent_contract_id',
        'child_contract_id',
        'dependency_type',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }

    public function parentContract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, 'parent_contract_id');
    }

    public function childContract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, 'child_contract_id');
    }
}
