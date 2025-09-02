import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from '@inertiajs/react';

const CreateJurer = () => {
    const [open, setOpen] = useState(false); 

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        name: "",
        genre: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("jurers.store"), {
            onSuccess: () => {
                reset();   
                setOpen(false); 
            },
            onError: () => {
                console.log('Error');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-2 bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>
                    <Plus /> Ajouter Jurer
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[50%] h-[60vh] flex flex-col gap-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <DialogHeader>
                        <DialogTitle>Ajouter Jurer</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="Entrer email de Jurer"
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Entrer le nom de Jurer"
                            />
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="genre">Genre</Label>
                            <Select
                                id="genre"
                                value={data.genre}
                                onValueChange={(value) => setData("genre", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner le genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Femme">Femme</SelectItem>
                                    <SelectItem value="Homme">Homme</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.genre && <span className="text-red-500">{errors.genre}</span>}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="bg-gray-400 text-white py-3 hover:bg-gray-500 transition-all duration-300 cursor-pointer"
                            >
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            Ajouter Jurer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateJurer;
