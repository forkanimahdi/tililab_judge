"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";
import AdminActions from "./AdminActions";

export default function CandidateHeader({ candidate, average, evaluations, authJudge, onDelete, onEditSubmit }) {
    return (
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={"/storage/" + candidate.image} alt={candidate.name} />
                    <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-x-3 w-full">
                        <CardTitle className="text-2xl font-semibold">{candidate.name}</CardTitle>
                        {authJudge.role === "admin" && (
                            <AdminActions candidate={candidate} onDelete={onDelete} onEditSubmit={onEditSubmit} />
                        )}
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
        </CardHeader>
    );
}
