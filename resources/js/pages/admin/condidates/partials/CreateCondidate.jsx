import React from 'react';
import { Plus, Users } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const CreateCondidate = () => {
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button className='flex items-center gap-2 bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'><Plus />Ajouter Condidat</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter in Jurer</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nom de Candidat</Label>
                                <Input id="name" name="Name" placeholder='Entrer le nom de Condidat' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="image">Image</Label>
                                <Input type='file' id="image" name="image" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="gender">Genre</Label>
                                <Input id="gender" name="gender" placeholder='Entrer le genre de Condidat' />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className='bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>Annuler</Button>
                            </DialogClose>
                            <Button type="submit" className='bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>Ajouter Condidat</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default CreateCondidate;