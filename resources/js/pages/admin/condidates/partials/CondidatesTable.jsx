"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Users, FileText, Plus, Grid, List } from "lucide-react";
import CreateCondidate from "./CreateCondidate";
import CondidateCard from "./CondidateCard";

const CondidateTable = ({ condidates }) => {
    const [search, setSearch] = useState("");
    const [view, setView] = useState("card"); // "card" or "table"

    // Filter participants based on search input
    const filteredCondidates = useMemo(() => {
        if (!search) return condidates?.data || [];
        return condidates?.data.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, condidates]);

    // Compute average points for classement
    const sortedByAverage = useMemo(() => {
        if (!condidates?.data) return [];
        return [...condidates.data].map(c => {
            const totalPoints = c.evaluations?.reduce((acc, e) => acc + e.motivation + e.implication + e.originalite + e.communication, 0) || 0;
            const nbJudges = c.evaluations?.length || 1;
            return {
                ...c,
                average: (totalPoints / nbJudges).toFixed(1)
            };
        }).sort((a, b) => b.average - a.average);
    }, [condidates]);

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <FileText size={24} />
                    <h1 className="text-2xl font-bold">Participants</h1>
                </div>

                <div className="flex gap-2 items-center">
                    <Input
                        placeholder="Rechercher un participant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button
                        variant={view === "card" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("card")}
                        className="flex items-center gap-1"
                    >
                        <Grid size={16} /> Carte
                    </Button>
                    <Button
                        variant={view === "table" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("table")}
                        className="flex items-center gap-1"
                    >
                        <List size={16} /> Classement
                    </Button>
                    <CreateCondidate>
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus size={16} /> Ajouter
                        </Button>
                    </CreateCondidate>
                </div>
            </div>

            {/* No participants state */}
            {filteredCondidates.length === 0 && (
                <Card className="border-0 mt-8">
                    <CardContent className="p-12 text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <Users className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-[#212529]">Aucun participant trouvé</h2>
                        <p className="mb-6 text-gray-600">Aucun participant ne correspond à votre recherche. Essayez un autre nom ou ajustez vos filtres.</p>
                    </CardContent>
                </Card>
            )}

            {/* Card View */}
            {view === "card" && filteredCondidates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCondidates.map((condidat) => (
                        <CondidateCard key={condidat.id} condidat={condidat} />
                    ))}
                </div>
            )}

            {/* Table / Classement View */}
            {view === "table" && filteredCondidates.length > 0 && (
                <div className="overflow-x-auto mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead className="text-center">Moyenne</TableHead>
                                <TableHead className="text-center">Décision finale</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedByAverage.map((c, index) => (
                                <TableRow key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell className="text-center font-bold">{c.average}/20</TableCell>
                                    <TableCell className="text-center">{c.final_decision ? c.final_decision.replaceAll('_', ' ') : "Non défini"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default CondidateTable;
