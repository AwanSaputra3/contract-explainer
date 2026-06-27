<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('protocol_dependencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_id')->constrained('analyses')->onDelete('cascade');
            $table->foreignId('parent_contract_id')->nullable()->constrained('contracts')->onDelete('cascade');
            $table->foreignId('child_contract_id')->constrained('contracts')->onDelete('cascade');
            $table->string('dependency_type');
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('dependency_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('protocol_dependencies');
    }
};
