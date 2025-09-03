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
import { FileText, Users } from "lucide-react";
// import Create from "./Createcondidate";
import CreateCondidate from "./CreateCondidate";

const CondidateTable = ({ condidates }) => {
    console.log(condidates);
    
    return (
        <div className="overflow-x-auto border rounded-lg shadow-md py-5">
            <div className="flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <FileText size={45} />
                        <h1 className="text-4xl font-semibold">Condidates</h1>
                    </div>
                    <CreateCondidate />
                </div>
                <Table>
                    <TableHeader className="bg-gray-100 dark:bg-gray-800">
                        <TableRow>
                            <TableHead className="text-left">#</TableHead>
                            <TableHead className="text-left">Profile</TableHead>
                            <TableHead className="text-left">Nom</TableHead>
                            <TableHead className="text-left">Genre</TableHead>
                            <TableHead className="text-left">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {condidates?.data.map((condidate, index) => (
                            <TableRow
                                key={condidate.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <TableCell>
                                    {index + 1 + (condidates.current_page - 1) * condidates.per_page}
                                </TableCell>
                                <TableCell>{condidate.image}</TableCell>
                                <TableCell>{condidate.name}</TableCell>
                                <TableCell>{condidate.gender}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.location.href = `/condidates/${condidate.id}/edit`}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            if (confirm("Supprimer ce juré ?")) {
                                                window.location.href = `/condidates/${condidate.id}/delete`;
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
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <a
                    href={condidates.prev_page_url || "#"}
                    className={`px-4 py-2 rounded border bg-white hover:bg-gray-100 ${!condidates.prev_page_url ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Previous
                </a>

                <span className="text-sm font-medium">
                    Page {condidates.current_page} of {condidates.last_page}
                </span>

                <a
                    href={condidates.next_page_url || "#"}
                    className={`px-4 py-2 rounded border bg-white hover:bg-gray-100 ${!condidates.next_page_url ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    Next
                </a>
            </div>
        </div>
    );
};

export default CondidateTable;
