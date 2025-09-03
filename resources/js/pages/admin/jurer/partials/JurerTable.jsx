"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import CreateJurer from "./CreateJurer";

const JurersTable = ({ jurers }) => {

    


const handleDelete = (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce juré ? Cette action est irréversible.")) {
        router.delete(route('jurers.destroy', id), {
            onSuccess: () => {
                alert('Juré supprimé avec succès.');
            },
            onError: (errors) => {
                alert('Une erreur est survenue : ' + errors);
            }
        });
    }
};




    return (
        <div className="overflow-x-auto border rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className=""></div>
                <CreateJurer>
                    <Button variant="primary" className="flex items-center gap-2">
                        Ajouter un juré
                    </Button>
                </CreateJurer>
            </div>

            {/* Table */}
            <Table className=" rounded-lg border border-gray-200">
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="text-left w-10">#</TableHead>
                        <TableHead className="text-left">Nom</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-left">Genre</TableHead>
                        <TableHead className="text-center w-32">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {jurers?.map((jurer, index) => (
                        <TableRow
                            key={jurer.id}
                            className=" transition-colors cursor-default"
                        >
                            <TableCell>{index + 1 }</TableCell>
                            <TableCell>{jurer.name}</TableCell>
                            <TableCell>{jurer.email}</TableCell>
                            <TableCell>{jurer.gender === "M" ? "Masculin" : "Féminin"}</TableCell>
                            <TableCell className="flex justify-center">
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex items-center gap-1"
                                    onClick={() => handleDelete(jurer.id)}
                                >
                                    <Trash2 size={14} /> Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            {/* <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 rounded-lg">
                <Button
                    variant="outline"
                    disabled={!jurers.prev_page_url}
                    onClick={() => jurers.prev_page_url && router.visit(jurers.prev_page_url)}
                >
                    Précédent
                </Button>

                <span className="text-sm font-medium">
                    Page {jurers.current_page} sur {jurers.last_page}
                </span>

                <Button
                    variant="outline"
                    disabled={!jurers.next_page_url}
                    onClick={() => jurers.next_page_url && router.visit(jurers.next_page_url)}
                >
                    Suivant
                </Button>
            </div> */}
        </div>
    );
};

export default JurersTable;
