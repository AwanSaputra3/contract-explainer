<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agent_tasks', function (Blueprint $table) {
            $table->json('input_payload')->nullable()->after('agent_name');
            $table->json('output_payload')->nullable()->after('input_payload');
            $table->integer('retry_count')->default(0)->after('output_payload');
            $table->string('priority')->default('normal')->after('retry_count');
        });
    }

    public function down(): void
    {
        Schema::table('agent_tasks', function (Blueprint $table) {
            $table->dropColumn(['input_payload', 'output_payload', 'retry_count', 'priority']);
        });
    }
};
