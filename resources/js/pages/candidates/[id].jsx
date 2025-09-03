"use client"

import { useState } from "react"
import { useForm, Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import AppLayout from '@/layouts/app-layout'
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, MessageCircle, Award } from "lucide-react"

export default function CandidateDetailsPage({ candidate, evaluations, authJudge }) {
    const [tab, setTab] = useState("evaluation")

    // Check if current judge has already evaluated
    const judgeEval = evaluations.find((e) => e.user_id === authJudge?.id)

    const { data, setData, post, processing } = useForm({
        motivation: judgeEval?.motivation || 0,
        implication: judgeEval?.implication || 0,
        originalite: judgeEval?.originalite || 0,
        communication: judgeEval?.communication || 0,
        decision: judgeEval?.decision || "",
        comments: judgeEval?.comments || "",
    })

    console.log(evaluations);


    const total =
        data.motivation + data.implication + data.originalite + data.communication

    const average =
        evaluations.length > 0
            ? (
                evaluations.reduce(
                    (acc, e) =>
                        acc +
                        (e.motivation + e.implication + e.originalite + e.communication),
                    0
                ) / evaluations.length
            ).toFixed(1)
            : 0

    const handleSubmit = () => {
        post(route("candidates.evaluate", candidate.id), {
            preserveScroll: true,
            data,
        })
    }

    const handleFinalDecision = (decision) => {
        post(route("candidates.finalDecision", candidate.id), {
            preserveScroll: true,
            data: { decision },
        })
    }

    return (
        <AppLayout className="max-w-6xl mx-auto px-6 py-8">
            <Card className="border-0 shadow-sm">
                {/* Candidate header with profile */}
                <CardHeader>
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={candidate.image} alt={candidate?.name} />
                            <AvatarFallback>{candidate?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-heading">
                                {candidate?.name}
                            </CardTitle>
                            <CardDescription>
                                Genre: {candidate.gender === "F" ? "Féminin" : "Masculin"}
                            </CardDescription>
                            <div className="flex items-center gap-2 mt-3">
                                <Award className="h-4 w-4 text-primary" />
                                <span className="text-primary font-bold">{average}/20</span>
                                <span className="text-sm text-muted-foreground">
                                    Moyenne sur {evaluations.length} juge
                                    {evaluations.length > 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs value={tab} onValueChange={setTab}>
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="evaluation">Évaluer</TabsTrigger>
                            <TabsTrigger value="judges">Juges</TabsTrigger>
                            <TabsTrigger value="decision">Décision finale</TabsTrigger>
                        </TabsList>

                        {/* --- EVALUATION TAB --- */}
                        <TabsContent value="evaluation">
                            <div className="mt-6 space-y-6">
                                {/* Motivation */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
                                        MOTIVATION
                                    </Label>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Clarté des objectifs, volonté d’apprendre et de s’investir
                                    </p>
                                    <div className="flex gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((score) => (
                                            <Button
                                                key={score}
                                                variant={
                                                    data.motivation === score
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() => setData("motivation", score)}
                                            >
                                                {score}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Implication */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
                                        IMPLICATION
                                    </Label>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Niveau d’engagement perçu, sérieux, préparation du pitch
                                    </p>
                                    <div className="flex gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((score) => (
                                            <Button
                                                key={score}
                                                variant={
                                                    data.implication === score
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() => setData("implication", score)}
                                            >
                                                {score}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Originalité */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
                                        ORIGINALITÉ & PERSONNALITÉ
                                    </Label>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Capacité à se distinguer, authenticité, créativité dans la
                                        présentation
                                    </p>
                                    <div className="flex gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((score) => (
                                            <Button
                                                key={score}
                                                variant={
                                                    data.originalite === score
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() => setData("originalite", score)}
                                            >
                                                {score}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Communication */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
                                        COMMUNICATION
                                    </Label>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Clarté, aisance orale, capacité à convaincre
                                    </p>
                                    <div className="flex gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((score) => (
                                            <Button
                                                key={score}
                                                variant={
                                                    data.communication === score
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() => setData("communication", score)}
                                            >
                                                {score}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="p-4 bg-primary/5 rounded-lg flex justify-between">
                                    <span className="font-medium">TOTAL</span>
                                    <span className="text-xl font-bold">{total}/20</span>
                                </div>

                                {/* Decision */}
                                <div>
                                    <Label className="text-sm font-medium text-foreground">
                                        Décision
                                    </Label>
                                    <div className="flex gap-4 mt-2">
                                        <Button
                                            variant={
                                                data.decision === "oui" ? "default" : "outline"
                                            }
                                            onClick={() => setData("decision", "oui")}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-1" /> oui
                                        </Button>
                                        <Button
                                            variant={
                                                data.decision === "non"
                                                    ? "destructive"
                                                    : "outline"
                                            }
                                            onClick={() => setData("decision", "non")}
                                        >
                                            <XCircle className="h-4 w-4 mr-1" /> non
                                        </Button>
                                        <Button
                                            variant={
                                                data.decision === "discuter"
                                                    ? "secondary"
                                                    : "outline"
                                            }
                                            onClick={() => setData("decision", "discuter")}
                                        >
                                            <MessageCircle className="h-4 w-4 mr-1" /> discuter
                                        </Button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <Button
                                    onClick={handleSubmit}
                                    disabled={processing || !data.decision}
                                    className="w-full mt-6"
                                >
                                    {judgeEval ? "Mettre à jour l'évaluation" : "Soumettre"}
                                </Button>
                            </div>
                        </TabsContent>

                        {/* --- JUDGES TAB --- */}
                        <TabsContent value="judges">
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full border">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="py-3 px-4 text-left">Juge</th>
                                            <th className="py-3 px-4">Motivation</th>
                                            <th className="py-3 px-4">Implication</th>
                                            <th className="py-3 px-4">Originalité</th>
                                            <th className="py-3 px-4">Communication</th>
                                            <th className="py-3 px-4">Total</th>
                                            <th className="py-3 px-4">Décision</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluations.map((e, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="py-3 px-4">{e.user.name}</td>
                                                <td className="py-3 px-4 text-center">
                                                    {e.motivation}/5
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {e.implication}/5
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {e.originalite}/5
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {e.communication}/5
                                                </td>
                                                <td className="py-3 px-4 text-center font-bold">
                                                    {e.motivation +
                                                        e.implication +
                                                        e.originalite +
                                                        e.communication}
                                                    /20
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {e.decision}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>

                        {/* --- FINAL DECISION TAB --- */}
                        <TabsContent value="decision">
                            <div className="mt-6 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    La décision finale détermine l’acceptation ou le refus
                                    définitif du candidat.
                                </p>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => handleFinalDecision("ACCEPTED")}
                                        className="bg-primary"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-1" /> Accepter
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleFinalDecision("DECLINED")}
                                    >
                                        <XCircle className="h-4 w-4 mr-1" /> Refuser
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AppLayout>
    )
}
