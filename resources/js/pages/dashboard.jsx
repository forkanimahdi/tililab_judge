"use client";

import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import CreateJurer from "./admin/jurer/partials/CreateJurer";
import CreateCondidate from "./admin/condidates/partials/CreateCondidate";
import JurersTable from "./admin/jurer/partials/JurerTable";
import CondidatesTable from "./admin/condidates/partials/CondidatesTable";
import { Users, FileText, BarChart2, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const breadcrumbs = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function Dashboard() {
    const { auth, jurers, condidates } = usePage().props;

    // Compute some stats
    const totalJurers = jurers.length;
    const totalCondidates = condidates.length;
    const averageScore =
        condidates.length > 0
            ? (condidates.reduce((acc, c) => acc + parseFloat(c.average || 0), 0) / condidates.length).toFixed(1)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">

                {/* Top Buttons */}
                <div className="flex gap-2 items-center justify-end">
                    <CreateJurer />
                    <CreateCondidate />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <Users size={24} />
                            <CardTitle>Total des juré(e)s</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalJurers}</p>
                            <CardDescription>Nombre de jurés enregistrés</CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <FileText size={24} />
                            <CardTitle>Total des participants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalCondidates}</p>
                            <CardDescription>Nombre de participants enregistrés</CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex items-center gap-2">
                            <Award size={24} />
                            <CardTitle>Score moyen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{averageScore}/20</p>
                            <CardDescription>Score moyen des participants évalués</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Jurers Section */}
                <div className="flex items-center gap-4 pt-4">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Juré(e)s</h1>
                </div>
                {auth.user?.role === "admin" && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <JurersTable jurers={jurers} />
                    </div>
                )}

                {/* Participants Section */}
                <div className="flex items-center gap-4 pt-4">
                    <FileText size={24} />
                    <h1 className="text-2xl font-bold">Participants</h1>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <CondidatesTable condidates={condidates} />
                </div>
            </div>
        </AppLayout>
    );
}
