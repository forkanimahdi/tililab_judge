"use client";

import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import CreateJurer from "./admin/jurer/partials/CreateJurer";
import CreateCondidate from "./admin/condidates/partials/CreateCondidate";
import JurersTable from "./admin/jurer/partials/JurerTable";
import CondidatesTable from "./admin/condidates/partials/CondidatesTable";
import { Users, FileText, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const breadcrumbs = [
    {
        title: "Tableau de bord",
        href: "/dashboard",
    },
];

export default function Dashboard() {
    const { auth, jurers, condidates } = usePage().props;

    // Calcul des statistiques
    const totalJudges = jurers.length;
    const totalCandidates = condidates.length;
    const averageScore =
        condidates.length > 0
            ? (
                condidates.reduce((acc, c) => acc + parseFloat(c.average || 0), 0) /
                condidates.length
            ).toFixed(1)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Boutons d’action */}
                {auth.user?.role === "admin" && (
                    <div className="flex gap-2 items-center justify-end">
                        <CreateJurer />
                        <CreateCondidate />
                    </div>
                )}

                {/* Cartes de statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <Users size={24} />
                            <CardTitle>Nombre de juges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalJudges}</p>
                            <CardDescription>Total des juges enregistrés</CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <FileText size={24} />
                            <CardTitle>Nombre de candidats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalCandidates}</p>
                            <CardDescription>Total des candidats inscrits</CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <Award size={24} />
                            <CardTitle>Score moyen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{averageScore}/20</p>
                            <CardDescription>Score moyen des candidats évalués</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Section Juges */}
                {auth.user?.role === "admin" && (
                    <>
                        <div className="flex items-center gap-4 pt-4">
                            <Users size={24} />
                            <h1 className="text-2xl font-bold">Juges</h1>
                        </div>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <JurersTable jurers={jurers} />
                        </div>
                    </>
                )}

                {/* Section Candidats */}
                <div className="flex items-center gap-4 pt-4">
                    <FileText size={24} />
                    <h1 className="text-2xl font-bold">Candidats</h1>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <CondidatesTable authRole={auth?.user?.role} condidates={condidates} />
                </div>
            </div>
        </AppLayout>
    );
}
