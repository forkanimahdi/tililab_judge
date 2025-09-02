<?php

namespace App\Http\Controllers;

use App\Models\Jurer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name'  => 'required|string|max:255',
            'genre' => 'nullable|string|max:50',
        ]);

        $plainPassword = Str::random(10);

        $jurer = User::create([
            'email' => $request->email,
            'name'  => $request->name,
            'genre' => $request->genre,
            'role' => 'jurer',
            'password' => Hash::make($plainPassword),
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Jurer ajouté avec succès');
    }
}
