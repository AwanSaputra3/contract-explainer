<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Hanya buat custom enum type di PostgreSQL jika belum ada
        DB::statement("DO \$\$ BEGIN CREATE TYPE user_role AS ENUM ('super_admin', 'user'); EXCEPTION WHEN duplicate_object THEN null; END \$\$;");

        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->after('password');
            $table->boolean('is_active')->default(true)->after('role');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
            $table->string('avatar_url')->nullable()->after('last_login_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active', 'last_login_at', 'avatar_url']);
        });

        DB::statement('DROP TYPE IF EXISTS user_role');
    }
};
