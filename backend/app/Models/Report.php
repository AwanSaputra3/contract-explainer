<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'analysis_id',
        'type',
        'content',
        'format',
        'file_path',
        'status',
        'generated_by',
    ];

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }
}

