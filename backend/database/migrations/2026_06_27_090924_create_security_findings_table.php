<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('security_findings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_id')->constrained('analyses')->onDelete('cascade');
            $table->foreignId('contract_id')->nullable()->constrained('contracts')->onDelete('cascade');
            $table->string('severity'); // critical, high, medium, low, info
            $table->string('title');
            $table->text('description');
            $table->string('location')->nullable();
            $table->text('recommendation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_findings');
    }
};
