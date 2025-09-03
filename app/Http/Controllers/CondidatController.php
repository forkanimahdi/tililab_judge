<?php

namespace App\Http\Controllers;

use App\Models\Condidate;
use App\Models\Evaluation;
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
            $imagePath = $request->file('image')->store('condidats', 'public');
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

        return Inertia::render('candidates/[id]', [
            'candidate' => $condidate,
            'evaluations' => $condidate->evaluations,
            'average' => $average,
            'authJudge' => Auth::user(),
        ]);
    }

    public function storeEvaluation(Request $request, Condidate $condidate)
    {
        $data = $request->validate([
            'motivation' => 'required|integer|min:0|max:5',
            'implication' => 'required|integer|min:0|max:5',
            'originalite' => 'required|integer|min:0|max:5',
            'communication' => 'required|integer|min:0|max:5',
            'decision' => 'required|in:oui,non,discuter',
        ]);

        Evaluation::updateOrCreate(
            ['candidate_id' => $condidate->id, 'user_id' => Auth::id()],
            $data
        );

        return back()->with('success', 'Évaluation enregistrée.');
    }

    public function setFinalDecision(Request $request, Condidate $condidate)
    {
        $data = $request->validate([
            'final_decision' => 'required|in:accepte,refuse,en_attente',
        ]);

        $condidate->update($data);

        return back()->with('success', 'Décision finale enregistrée.');
    }
}
