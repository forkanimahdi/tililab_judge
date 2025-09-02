import React from 'react';
import { Plus, Users } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Jurer = () => {

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-4 pt-10">
                <div className='flex justify-between items-center '>
                    <h1 className='flex gap-5 items-center font-semibold text-4xl'><Users size={40} /> All Jurer</h1>

                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className='flex items-center gap-2 bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'><Plus />Add Jurer</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Jurer</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" placeholder='Enter the Jurer Email' />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="Name" placeholder='Enter the Jurer Name' />
                                    </div>
                                    {/* <div className="grid gap-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input id="password" name="password" placeholder='Enter the Jurer Password' />
                                        </div> */}
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className='bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" className='bg-beta text-white py-3 hover:bg-beta/80 hover:text-white transition-all duration-300 cursor-pointer'>Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default Jurer;
