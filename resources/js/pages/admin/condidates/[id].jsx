"use client";

import { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CandidateHeader from "./partials/CandidateHeader";
import EvaluationTab from "./partials/EvaluationTab";
import JudgesTab from "./partials/JudgesTab";
import FinalDecisionTab from "./partials/FinalDecisionTab";

export default function CandidateDetailsPage({ candidate, evaluations, authJudge }) {
    const [tab, setTab] = useState("evaluation");

    const judgeEval = evaluations.find((e) => e.user_id === authJudge?.id);

    const { data, setData, post, processing } = useForm({
        motivation: judgeEval?.motivation || 0,
        implication: judgeEval?.implication || 0,
        originalite: judgeEval?.originalite || 0,
        communication: judgeEval?.communication || 0,
        decision: judgeEval?.decision || "",
        comments: judgeEval?.comments || "",
    });

    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (!judgeEval) {
            setIsModified(
                data.motivation !== 0 ||
                data.implication !== 0 ||
                data.originalite !== 0 ||
                data.communication !== 0 ||
                data.decision !== ""
            );
        } else {
            setIsModified(
                data.motivation !== judgeEval.motivation ||
                data.implication !== judgeEval.implication ||
                data.originalite !== judgeEval.originalite ||
                data.communication !== judgeEval.communication ||
                data.decision !== judgeEval.decision
            );
        }
    }, [data, judgeEval]);

    const totalAverage =
        evaluations.length > 0
            ? (
                evaluations.reduce(
                    (acc, e) => acc + e.motivation + e.implication + e.originalite + e.communication,
                    0
                ) / evaluations.length
            ).toFixed(1)
            : 0;

    const handleSubmit = () => post(route("candidates.evaluate", candidate.id), { preserveScroll: true, data });

    const handleFinalDecision = (decision) => {
        router.put(route("candidates.finalDecision", candidate.id), { final_decision: decision }, {
            preserveScroll: true,
            onSuccess: () => location.reload()
        });
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer ce candidat ? Cette action est irréversible.")) {
            router.delete(route('candidates.destroy', id), {
                onSuccess: () => router.visit("/dashboard"),
                onError: (errors) => alert('Une erreur est survenue : ' + errors),
            });
        }
    };

    const handleEditSubmit = (formData) => {
        router.post(route("candidates.update", candidate.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => location.reload(),
        });
    };

    return (
        <AppLayout className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-md border border-gray-200">
                <CandidateHeader candidate={candidate} average={totalAverage} evaluations={evaluations} authJudge={authJudge} onDelete={handleDelete} onEditSubmit={handleEditSubmit} />
                <CardContent>
                    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                        <TabsList className={`grid  w-full bg-gray-50 rounded-lg p-1 ${authJudge.role == "admin" ? "grid-cols-3": "grid-cols-2"}`}>
                            <TabsTrigger value="evaluation">Évaluer</TabsTrigger>
                            <TabsTrigger value="judges">Juges</TabsTrigger>
                            {
                                authJudge.role == "admin" &&
                                <TabsTrigger value="decision">Décision finale</TabsTrigger>
                            }
                        </TabsList>

                        <TabsContent value="evaluation">
                            <EvaluationTab data={data} setData={setData} isModified={isModified} processing={processing} judgeEval={judgeEval} onSubmit={handleSubmit} />
                        </TabsContent>

                        <TabsContent value="judges">
                            <JudgesTab evaluations={evaluations} />
                        </TabsContent>

                        {
                            authJudge.role == "admin" &&
                            <TabsContent value="decision">
                                <FinalDecisionTab onDecision={handleFinalDecision} />
                            </TabsContent>
                        }
                    </Tabs>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
