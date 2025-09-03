"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Trash2, Edit2 } from "lucide-react";
import CandidateEditDialog from "./CandidateEditDialog";

export default function AdminActions({ candidate, onDelete, onEditSubmit }) {
    return (
        <div className="flex gap-2">
            <CandidateEditDialog candidate={candidate} onEditSubmit={onEditSubmit} />
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
                        <Button variant="destructive" onClick={() => onDelete(candidate.id)}>Supprimer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
