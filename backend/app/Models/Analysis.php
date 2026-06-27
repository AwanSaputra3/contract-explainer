<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Analysis extends Model
{
    protected $fillable = [
        'user_id',
        'source_type',
        'source_value',
        'chain',
        'status',
        'payment_status',
        'tx_hash',
        'progress_percentage',
        'error_message',
        'completed_at',
        'total_cost',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
            'expires_at' => 'datetime',
            'total_cost' => 'decimal:6',
        ];
    }

    // ─── Status Helpers ─────────────────────────────────

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    // ─── Relationships ──────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function agentTasks(): HasMany
    {
        return $this->hasMany(AgentTask::class);
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    public function securityFindings(): HasMany
    {
        return $this->hasMany(SecurityFinding::class);
    }

    public function gasOptimizations(): HasMany
    {
        return $this->hasMany(GasOptimization::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function chatSession(): HasOne
    {
        return $this->hasOne(ChatSession::class);
    }

    public function paymentTransactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }

    public function protocolDependencies(): HasMany
    {
        return $this->hasMany(ProtocolDependency::class);
    }

    public function analysisSettings(): HasOne
    {
        return $this->hasOne(AnalysisSetting::class);
    }
}

