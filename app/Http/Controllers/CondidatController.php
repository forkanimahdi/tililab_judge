<?php

namespace App\Http\Controllers;

use App\Models\Condidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CondidatController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('condidats', 'public');
        }

        $condidat = Condidate::create([
            'name' => $request->name,
            'gender' => $request->genre,
            'image' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Condidat ajouté avec succès !');
    }
}
