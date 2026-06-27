<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_id')->constrained('analyses')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('tx_hash');
            $table->decimal('amount', 20, 6);
            $table->string('currency')->default('CROO');
            $table->string('status')->default('pending');
            $table->string('from_address')->nullable();
            $table->string('to_address')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();

            $table->unique('tx_hash');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
    }
};
