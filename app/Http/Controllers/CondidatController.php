<?php

namespace App\Http\Controllers;

use App\Models\Condidate;
use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            $imagePath = $request->file('image')->store('images/condidats', 'public');
        }

        $condidat = Condidate::create([
            'name' => $request->name,
            'gender' => $request->genre,
            'image' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Condidat ajouté avec succès !');
    }


    public function show(Condidate $condidate)
    {
        $condidate->load(['evaluations.user']);

        $average = [
            'motivation'   => round($condidate->evaluations->avg('motivation'), 1),
            'implication'  => round($condidate->evaluations->avg('implication'), 1),
            'originalite'  => round($condidate->evaluations->avg('originalite'), 1),
            'communication' => round($condidate->evaluations->avg('communication'), 1),
            'total'        => round($condidate->evaluations->avg(fn($e) => $e->total), 1),
        ];

        return Inertia::render('admin/condidates/[id]', [
            'candidate' => $condidate,
            'evaluations' => $condidate->evaluations,
            'average' => $average,
            'authJudge' => Auth::user(),
        ]);
    }



    public function update(Request $request, Condidate $condidate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:M,F',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($condidate->image) {
                Storage::disk('public')->delete($condidate->image);
            }
            $validated['image'] = $request->file('image')->store('images/condidats', 'public');
        }

        $condidate->update($validated);

        return back()->with('success', 'Candidat mis à jour avec succès.');
    }


    public function destroy(Condidate $condidate)
    {
        if ($condidate->image) {
            Storage::disk('public')->delete($condidate->image);
        }
        $condidate->delete();

        return redirect("/dashboard");

    }





    public function destroyJudge($id)
    {
        $jurer = User::where('role', 'jurer')->findOrFail($id);

        // if (auth()->id() == $jurer->id) {
        //     return back()->with('error', 'Vous ne pouvez pas vous supprimer vous-même.');
        // }

        $jurer->delete();

        return redirect()->back()->with('success', 'Juré supprimé avec succès.');
    }
}
