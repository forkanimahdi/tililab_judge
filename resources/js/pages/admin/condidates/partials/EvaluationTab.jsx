"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, MessageCircle } from "lucide-react";

export default function EvaluationTab({ data, setData, isModified, processing, judgeEval, onSubmit }) {
    const total = data.motivation + data.implication + data.originalite + data.communication;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {[
                { key: 'motivation', label: 'Motivation', description: "Clarté des objectifs et engagement." },
                { key: 'implication', label: 'Implication', description: "Sérieux, préparation, investissement." },
                { key: 'originalite', label: 'Originalité & Personnalité', description: "Créativité et authenticité." },
                { key: 'communication', label: 'Communication', description: "Clarté et aisance orale." }
            ].map((item) => (
                <div key={item.key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <Label className="font-medium">{item.label}</Label>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <div className="flex gap-2 flex-wrap">
                        {[0, 1, 2, 3, 4, 5].map(score => (
                            <Button
                                key={score}
                                size="sm"
                                variant={data[item.key] === score ? "default" : "outline"}
                                className="w-10 h-10 rounded-full"
                                onClick={() => setData(item.key, score)}
                            >
                                {score}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
            <div className="col-span-full bg-primary/10 p-4 rounded-lg flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>{total}/20</span>
            </div>
            <div className="col-span-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <Button variant={data.decision === "oui" ? "default" : "outline"} onClick={() => setData("decision", "oui")} className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Oui</Button>
                    <Button variant={data.decision === "non" ? "destructive" : "outline"} onClick={() => setData("decision", "non")} className="flex items-center gap-1"><XCircle className="w-4 h-4" /> Non</Button>
                    <Button variant={data.decision === "discuter" ? "secondary" : "outline"} onClick={() => setData("decision", "discuter")} className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Discuter</Button>
                </div>
                <Button onClick={onSubmit} disabled={!isModified || !data.decision || processing} className={`mt-4 sm:mt-0 w-full sm:w-auto text-white ${!isModified || !data.decision || processing ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {judgeEval ? "Mettre à jour l'évaluation" : "Soumettre"}
                </Button>
            </div>
        </div>
    );
}
