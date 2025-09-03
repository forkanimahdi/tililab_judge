"use client"

import { useState, useEffect } from "react"
import { router, useForm } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLayout from "@/layouts/app-layout"
import { CheckCircle, XCircle, MessageCircle, Award, Trash2, Edit2 } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CandidateDetailsPage({ candidate, evaluations, authJudge }) {
    const [tab, setTab] = useState("evaluation")
    const judgeEval = evaluations.find((e) => e.user_id === authJudge?.id)

    const { data, setData, post, processing } = useForm({
        motivation: judgeEval?.motivation || 0,
        implication: judgeEval?.implication || 0,
        originalite: judgeEval?.originalite || 0,
        communication: judgeEval?.communication || 0,
        decision: judgeEval?.decision || "",
        comments: judgeEval?.comments || "",
    })

    const [isModified, setIsModified] = useState(false)

    // Edit form
    const { data: editData, setData: setEditData } = useForm({
        name: candidate.name,
        gender: candidate.gender,
        image: null
    })

    useEffect(() => {
        if (!judgeEval) {
            setIsModified(
                data.motivation !== 0 ||
                data.implication !== 0 ||
                data.originalite !== 0 ||
                data.communication !== 0 ||
                data.decision !== ""
            )
        } else {
            setIsModified(
                data.motivation !== judgeEval.motivation ||
                data.implication !== judgeEval.implication ||
                data.originalite !== judgeEval.originalite ||
                data.communication !== judgeEval.communication ||
                data.decision !== judgeEval.decision
            )
        }
    }, [data, judgeEval])

    const total = data.motivation + data.implication + data.originalite + data.communication
    const average =
        evaluations.length > 0
            ? (
                evaluations.reduce(
                    (acc, e) => acc + e.motivation + e.implication + e.originalite + e.communication,
                    0
                ) / evaluations.length
            ).toFixed(1)
            : 0

    // --- HANDLERS ---
    const handleSubmit = () => post(route("candidates.evaluate", candidate.id), { preserveScroll: true, data })
    const handleFinalDecision = (decision) => router.put(route("candidates.finalDecision", candidate.id), { final_decision: decision }, { preserveScroll: true, onSuccess: () => location.reload() })
    const handleDelete = (id) => { if (confirm("Voulez-vous vraiment supprimer ce candidat ?")) router.delete(route('candidates.destroy', id), { onSuccess: () => router.visit("/dashboard") }) }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", editData.name)
        formData.append("gender", editData.gender)
        if (editData.image) formData.append("image", editData.image)
        formData.append("_method", "PUT")
        router.post(route("candidates.update", candidate.id), formData, { forceFormData: true, preserveScroll: true, onSuccess: () => edit_closer.click() })
    }

    // ---------------- COMPONENTS ----------------

    const CandidateHeader = () => (
        <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src={"/storage/" + candidate.image} alt={candidate.name} />
                <AvatarFallback>{candidate.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center justify-between gap-x-3 w-full">
                    <CardTitle className="text-2xl font-semibold">{candidate.name}</CardTitle>
                    {authJudge.role === "admin" && <AdminActions />}
                </div>
                <CardDescription className="text-gray-600">
                    Genre: <span className="font-medium">{candidate.gender === "F" ? "Féminin" : "Masculin"}</span>
                </CardDescription>
                <div className="mt-2 flex items-center gap-2">
                    <Award className="text-yellow-500 w-5 h-5" />
                    <span className="font-bold text-lg">{average}/20</span>
                    <span className="text-sm text-gray-500">
                        Moyenne sur {evaluations.length} juge{evaluations.length > 1 ? "s" : ""}
                    </span>
                </div>
            </div>
        </div>
    )

    const AdminActions = () => (
        <div className="flex gap-2">
            <CandidateEditDialog />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer le candidat</DialogTitle>
                    </DialogHeader>
                    <p>Voulez-vous vraiment supprimer ce candidat ? Cette action est irréversible.</p>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={() => handleDelete(candidate.id)}>Supprimer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )

    const CandidateEditDialog = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Éditer le candidat</DialogTitle></DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <Label>Nom</Label>
                        <input type="text" value={editData.name} onChange={e => setEditData("name", e.target.value)} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <Label>Genre</Label>
                        <select value={editData.gender} onChange={e => setEditData("gender", e.target.value)} className="w-full border p-2 rounded" required>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>
                    <div>
                        <Label>Image</Label>
                        <input type="file" accept="image/*" onChange={e => setEditData("image", e.target.files[0])} className="w-full" />
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose id="edit_closer" asChild><Button variant="outline">Annuler</Button></DialogClose>
                        <Button type="submit">Mettre à jour</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

    const EvaluationTab = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {[
                { key: 'motivation', label: 'Motivation', description: "Clarté des objectifs et engagement." },
                { key: 'implication', label: 'Implication', description: "Sérieux, préparation, investissement." },
                { key: 'originalite', label: 'Originalité & Personnalité', description: "Créativité et authenticité." },
                { key: 'communication', label: 'Communication', description: "Clarté et aisance orale." }
            ].map(item => (
                <div key={item.key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <Label className="font-medium">{item.label}</Label>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <div className="flex gap-2 flex-wrap">
                        {[0,1,2,3,4,5].map(score => (
                            <Button key={score} size="sm" variant={data[item.key]===score?"default":"outline"} className="w-10 h-10 rounded-full" onClick={() => setData(item.key, score)}>{score}</Button>
                        ))}
                    </div>
                </div>
            ))}
            <div className="col-span-full bg-primary/10 p-4 rounded-lg flex justify-between items-center text-lg font-semibold">
                <span>Total</span><span>{total}/20</span>
            </div>
            <div className="col-span-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <Button variant={data.decision==="oui"?"default":"outline"} onClick={()=>setData("decision","oui")} className="flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Oui</Button>
                    <Button variant={data.decision==="non"?"destructive":"outline"} onClick={()=>setData("decision","non")} className="flex items-center gap-1"><XCircle className="w-4 h-4"/> Non</Button>
                    <Button variant={data.decision==="discuter"?"secondary":"outline"} onClick={()=>setData("decision","discuter")} className="flex items-center gap-1"><MessageCircle className="w-4 h-4"/> Discuter</Button>
                </div>
                <Button onClick={handleSubmit} disabled={!isModified || !data.decision || processing} className={`mt-4 sm:mt-0 w-full sm:w-auto text-white ${!isModified || !data.decision || processing?"opacity-50 cursor-not-allowed":""}`}>
                    {judgeEval?"Mettre à jour l'évaluation":"Soumettre"}
                </Button>
            </div>
        </div>
    )

    const JudgesTab = () => (
        <div className="overflow-x-auto mt-6">
            <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Juge</th>
                        <th className="p-3 text-center">Motivation</th>
                        <th className="p-3 text-center">Implication</th>
                        <th className="p-3 text-center">Originalité</th>
                        <th className="p-3 text-center">Communication</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Décision</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluations.map((e,i)=>(
                        <tr key={i} className="border-t border-gray-200">
                            <td className="p-3">{e.user.name}</td>
                            <td className="p-3 text-center">{e.motivation}/5</td>
                            <td className="p-3 text-center">{e.implication}/5</td>
                            <td className="p-3 text-center">{e.originalite}/5</td>
                            <td className="p-3 text-center">{e.communication}/5</td>
                            <td className="p-3 text-center font-bold">{e.motivation+e.implication+e.originalite+e.communication}/20</td>
                            <td className="p-3 text-center">{e.decision}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const FinalDecisionTab = () => (
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button onClick={()=>handleFinalDecision("accepté")} className="flex items-center gap-2 bg-primary text-white w-full sm:w-auto"><CheckCircle className="w-4 h-4"/> Accepter</Button>
            <Button onClick={()=>handleFinalDecision("refusé")} variant="destructive" className="flex items-center gap-2 w-full sm:w-auto"><XCircle className="w-4 h-4"/> Refuser</Button>
        </div>
    )

    // ---------------- PAGE RETURN ----------------
    return (
        <AppLayout className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-md border border-gray-200">
                <CardHeader><CandidateHeader /></CardHeader>
                <CardContent>
                    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                        <TabsList className="grid grid-cols-3 w-full bg-gray-50 rounded-lg p-1">
                            <TabsTrigger value="evaluation">Évaluer</TabsTrigger>
                            <TabsTrigger value="judges">Juges</TabsTrigger>
                            <TabsTrigger value="decision">Décision finale</TabsTrigger>
                        </TabsList>
                        <TabsContent value="evaluation"><EvaluationTab /></TabsContent>
                        <TabsContent value="judges"><JudgesTab /></TabsContent>
                        <TabsContent value="decision"><FinalDecisionTab /></TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AppLayout>
    )
}
