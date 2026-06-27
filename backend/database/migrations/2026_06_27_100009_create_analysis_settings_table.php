<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analysis_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_id')->unique()->constrained('analyses')->onDelete('cascade');
            $table->boolean('enable_security_scan')->default(true);
            $table->boolean('enable_gas_optimization')->default(true);
            $table->boolean('enable_flow_diagram')->default(true);
            $table->boolean('enable_documentation')->default(true);
            $table->string('target_severity_level')->default('info');
            $table->text('custom_prompt')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analysis_settings');
    }
};
