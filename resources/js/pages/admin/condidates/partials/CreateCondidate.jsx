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
import { useForm } from '@inertiajs/react';

const CreateCondidate = () => {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        genre: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('genre', data.genre);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('condidat.store'), {
            data: formData,
            forceFormData: true, // required for file upload
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: () => {
                alert('❌ Erreur lors de l\'ajout du condidat');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-2 bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>
                    <Plus /> Ajouter Condidat
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter Condidat</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nom de Candidat</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder='Entrer le nom de Condidat'
                            />
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                type='file'
                                id="image"
                                name="image"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            {errors.image && <span className="text-red-500">{errors.image}</span>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="genre">Genre</Label>
                            <Input
                                id="genre"
                                name="genre"
                                value={data.genre}
                                onChange={(e) => setData('genre', e.target.value)}
                                placeholder='Entrer le genre de Condidat'
                            />
                            {errors.genre && <span className="text-red-500">{errors.genre}</span>}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" className='bg-gray-400 text-white py-3 hover:bg-gray-500'>
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing} className='bg-beta text-white py-3 hover:bg-beta/80'>
                            Ajouter Condidat
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCondidate;
