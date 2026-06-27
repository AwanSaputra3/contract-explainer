<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SecurityFinding extends Model
{
    protected $fillable = [
        'analysis_id',
        'contract_id',
        'severity',
        'title',
        'description',
        'location',
        'recommendation',
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

