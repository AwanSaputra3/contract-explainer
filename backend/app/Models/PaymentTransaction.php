<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentTransaction extends Model
{
    protected $fillable = [
        'analysis_id',
        'user_id',
        'tx_hash',
        'amount',
        'currency',
        'status',
        'from_address',
        'to_address',
        'confirmed_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:6',
            'confirmed_at' => 'datetime',
        ];
    }

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
