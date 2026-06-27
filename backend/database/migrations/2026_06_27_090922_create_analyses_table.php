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
        Schema::create('analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('source_type'); // file, github, address
            $table->string('source_value'); 
            $table->string('chain')->nullable(); 
            $table->string('status')->default('pending'); // pending, analyzing, completed, failed
            $table->string('payment_status')->default('locked'); // locked, released, disputed
            $table->string('tx_hash')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};
