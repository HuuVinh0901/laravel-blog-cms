<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Alice Nguyen', 'email' => 'alice@example.com'],
            ['name' => 'Bob Tran', 'email' => 'bob@example.com'],
            ['name' => 'Charlie Le', 'email' => 'charlie@example.com'],
            ['name' => 'Diana Pham', 'email' => 'diana@example.com'],
            ['name' => 'Ethan Hoang', 'email' => 'ethan@example.com'],
            ['name' => 'Fiona Vu', 'email' => 'fiona@example.com'],
            ['name' => 'George Mai', 'email' => 'george@example.com'],
            ['name' => 'Hannah Do', 'email' => 'hannah@example.com'],
            ['name' => 'Ian Nguyen', 'email' => 'ian@example.com'],
            ['name' => 'Julia Tran', 'email' => 'julia@example.com'],
        ];

        foreach ($users as $index => $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'email_verified_at' => now(),
                    'password' => Hash::make('123456'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                    'role' => $index === 0 ? 'admin' : 'user', // 👈 Gán role theo vị trí
                ]
            );
        }
    }
}
