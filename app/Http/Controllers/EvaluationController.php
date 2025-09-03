<?php

namespace App\Http\Controllers;

use App\Models\Condidate;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Condidate $condidate)
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

    /**
     * Display the specified resource.
     */
    public function show(Evaluation $evaluation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evaluation $evaluation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evaluation $evaluation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Evaluation $evaluation)
    {
        //
    }

    public function setFinalDecision(Request $request, Condidate $condidate)
    {
        $data = $request->validate([
            'final_decision' => 'required|in:accepte,refuse',
        ]);

        $condidate->update([
            'final_decision' => $data['final_decision']
        ]);

        return back()->with('success', 'Décision finale mise à jour.');
    }
}
