<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->string('contract_type')->default('contract')->after('contract_name');
            $table->string('compiler_version')->nullable()->after('contract_type');
            $table->string('deployed_address')->nullable()->after('compiler_version');
            $table->string('chain')->nullable()->after('deployed_address');
            $table->boolean('is_verified')->default(false)->after('chain');
        });
    }

    public function down(): void
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn(['contract_type', 'compiler_version', 'deployed_address', 'chain', 'is_verified']);
        });
    }
};
