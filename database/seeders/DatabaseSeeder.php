<?php

namespace Database\Seeders;

use App\Models\Condidate;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'admin123',
            'role' => 'admin',
            'gender' => 'Homme',
        ]);
        for ($i = 0; $i < 10; $i++) {
            # code...
            User::create([
                'name' => 'user' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => 'user123',
                'role' => 'jurer',
                'gender' => 'Homme',
            ]);
            Condidate::create([
                'name' => 'condidate' . $i,
                'gender' => 'Homme',
                'image' => 'image' . $i,
            ]);
        }
    }
}
