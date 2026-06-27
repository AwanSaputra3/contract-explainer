<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ═══════════════════════════════════════
        // Super Admin (1 akun)
        // ═══════════════════════════════════════
        User::factory()->superAdmin()->create([
            'name'       => 'Super Admin',
            'email'      => 'admin@contractmind.ai',
            'password'   => bcrypt('password123'),
            'avatar_url' => 'https://api.dicebear.com/7.x/initials/svg?seed=SA',
        ]);

        // ═══════════════════════════════════════
        // Regular Users (5 akun)
        // ═══════════════════════════════════════
        $users = [
            ['name' => 'Andi Setiawan',   'email' => 'andi@example.com',     'wallet' => '0x1234567890abcdef1234567890abcdef12345678'],
            ['name' => 'Budi Santoso',    'email' => 'budi@example.com',     'wallet' => '0xabcdef1234567890abcdef1234567890abcdef12'],
            ['name' => 'Citra Dewi',      'email' => 'citra@example.com',    'wallet' => null],
            ['name' => 'Deni Kurniawan',  'email' => 'deni@example.com',     'wallet' => '0x9876543210fedcba9876543210fedcba98765432'],
            ['name' => 'Eka Putri',       'email' => 'eka@example.com',      'wallet' => null],
        ];

        foreach ($users as $user) {
            User::factory()->create([
                'name'           => $user['name'],
                'email'          => $user['email'],
                'password'       => bcrypt('password123'),
                'wallet_address' => $user['wallet'],
                'avatar_url'     => 'https://api.dicebear.com/7.x/initials/svg?seed=' . urlencode($user['name']),
            ]);
        }

        // ═══════════════════════════════════════
        // Deactivated User (1 akun)
        // ═══════════════════════════════════════
        User::factory()->create([
            'name'       => 'User Nonaktif',
            'email'      => 'blocked@example.com',
            'password'   => bcrypt('password123'),
            'is_active'  => false,
        ]);

        echo "\nSeeder selesai!\n";
        echo "────────────────────────────────────────\n";
        echo " 1 Super Admin   | admin@contractmind.ai\n";
        echo " 5 Regular Users | (andi, budi, citra, deni, eka)\n";
        echo " 1 Blocked User  | blocked@example.com\n";
        echo "────────────────────────────────────────\n";
        echo " SEMUA PASSWORD: password123\n\n";
    }
}
