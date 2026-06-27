<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->integer('progress_percentage')->default(0)->after('tx_hash');
            $table->text('error_message')->nullable()->after('progress_percentage');
            $table->timestamp('completed_at')->nullable()->after('error_message');
            $table->decimal('total_cost', 20, 6)->nullable()->after('completed_at');
            $table->timestamp('expires_at')->nullable()->after('total_cost');
        });
    }

    public function down(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->dropColumn(['progress_percentage', 'error_message', 'completed_at', 'total_cost', 'expires_at']);
        });
    }
};
