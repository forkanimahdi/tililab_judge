"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, FileText, Plus } from "lucide-react";
import CreateCondidate from "./CreateCondidate";
import CondidateCard from "./CondidateCard";

const CondidateTable = ({ condidates }) => {
    const [search, setSearch] = useState("");

    // Filter participants based on search input
    const filteredCondidates = useMemo(() => {
        if (!search) return condidates?.data || [];
        return condidates?.data.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, condidates]);

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
                        placeholder="Search participant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <CreateCondidate>
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus size={16} /> Add
                        </Button>
                    </CreateCondidate>
                </div>
            </div>

            {/* Participants Grid */}
            {filteredCondidates.length === 0 ? (
                <Card className="border-0 mt-8">
                    <CardContent className="p-12 text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <Users className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Participants Found</h2>
                        <p className="mb-6 text-gray-600">No participants match your search. Try another name or adjust your filters.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCondidates.map((condidat) => (
                        <CondidateCard key={condidat.id} condidat={condidat} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CondidateTable;
