"use client";

import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";

export default function CandidateEditDialog({ candidate, onEditSubmit }) {
    const { data: editData, setData } = useForm({
        name: candidate.name,
        gender: candidate.gender,
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("gender", editData.gender);
        if (editData.image) formData.append("image", editData.image);
        formData.append("_method", "PUT"); // spoof PUT

        onEditSubmit(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Éditer le candidat</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Nom</Label>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <Label>Genre</Label>
                        <select
                            value={editData.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>
                    <div>
                        <Label>Image</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full"
                        />
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button type="submit">Mettre à jour</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
