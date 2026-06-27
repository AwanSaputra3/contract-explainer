<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GasOptimization extends Model
{
    protected $fillable = [
        'analysis_id',
        'contract_id',
        'description',
        'location',
        'estimated_savings',
    ];

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }
}

