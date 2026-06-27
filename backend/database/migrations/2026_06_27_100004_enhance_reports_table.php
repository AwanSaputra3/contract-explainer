<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->string('format')->default('markdown')->after('content');
            $table->string('file_path')->nullable()->after('format');
            $table->string('status')->default('draft')->after('file_path');
            $table->string('generated_by')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn(['format', 'file_path', 'status', 'generated_by']);
        });
    }
};
