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

const JurersTable = ({ jurers }) => {
    return (
        <div className="overflow-x-auto border rounded-lg shadow-md">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                        <TableHead className="text-left">#</TableHead>
                        <TableHead className="text-left">Nom</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-left">Genre</TableHead>
                        <TableHead className="text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {jurers?.data.map((jurer, index) => (
                        <TableRow
                            key={jurer.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <TableCell>
                                {index + 1 + (jurers.current_page - 1) * jurers.per_page}
                            </TableCell>
                            <TableCell>{jurer.name}</TableCell>
                            <TableCell>{jurer.email}</TableCell>
                            <TableCell>{jurer.gender}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.location.href = `/jurers/${jurer.id}/edit`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirm("Supprimer ce juré ?")) {
                                            window.location.href = `/jurers/${jurer.id}/delete`;
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <a
                    href={jurers.prev_page_url || "#"}
                    className={`px-4 py-2 rounded border bg-white hover:bg-gray-100 ${!jurers.prev_page_url ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Previous
                </a>

                <span className="text-sm font-medium">
                    Page {jurers.current_page} of {jurers.last_page}
                </span>

                <a
                    href={jurers.next_page_url || "#"}
                    className={`px-4 py-2 rounded border bg-white hover:bg-gray-100 ${!jurers.next_page_url ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Next
                </a>
            </div>
        </div>
    );
};

export default JurersTable;
