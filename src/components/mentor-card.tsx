import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useMentor } from "@/hooks/create-mentor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MentorCardProps {
    mentor: {
        id: string;
        firstName: string;
        lastName: string;
        organization: string;
        expertise: string;
        yearsOfExperience: number;
        email: string;
        phoneNumber?: string;
        image?: string;
    };
}

export function MentorCard({ mentor }: MentorCardProps) {
    const { deleteMentor, updateMentor, viewAllMentors } = useMentor();
    const [editMentorData, setEditMentorData] = useState(mentor);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = async () => {
        await deleteMentor(mentor.id);
        viewAllMentors(); // Refresh the mentor list
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEditMentorData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateMentor(mentor.id, editMentorData);
        setIsDialogOpen(false); // Close the dialog
        viewAllMentors(); // Refresh the mentor list
    };


    return (
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer hover:-translate-y-1.5 hover:transition">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={mentor.image} alt={mentor.firstName} />
                            <AvatarFallback>{mentor.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <CardTitle>{mentor.firstName} {mentor.lastName}</CardTitle>
                            <CardDescription>{mentor.organization}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Expertise:</span>
                        <span>{mentor.expertise}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Years of Experience:</span>
                        <span>{mentor.yearsOfExperience}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{mentor.email}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex gap-2 flex-row w-full justify-center md:justify-end">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-fit">
                                Edit <Pencil className="h-4 w-4 text-white" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Mentor</DialogTitle>
                                <DialogDescription>
                                    Make changes to mentor details
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
                                <div className="flex items-center justify-center gap-10">
                                    <div>
                                        <Label htmlFor="firstName" className="text-right">
                                            First Name
                                        </Label>
                                        <Input id="firstName" value={editMentorData.firstName} onChange={handleEditChange} className="col-span-3" />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName" className="text-right">
                                            Last Name
                                        </Label>
                                        <Input id="lastName" value={editMentorData.lastName} onChange={handleEditChange} className="col-span-3" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-10">
                                    <div className="w-full">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" value={editMentorData.email} onChange={handleEditChange} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-10">
                                    <div className="w-full">
                                        <Label htmlFor="phoneNumber" className="text-right">
                                            Phone Number
                                        </Label>
                                        <Input id="phoneNumber" value={editMentorData.phoneNumber} onChange={handleEditChange} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-10">
                                    <div className="w-full">
                                        <Label htmlFor="organization" className="text-right">
                                            Organization
                                        </Label>
                                        <Input id="organization" value={editMentorData.organization} onChange={handleEditChange} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-10">
                                    <div className="w-full">
                                        <Label htmlFor="yearsOfExperience" className="text-right">
                                            Years of Experience
                                        </Label>
                                        <Input id="yearsOfExperience" value={editMentorData.yearsOfExperience} onChange={handleEditChange} className="w-full" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant="destructive" className="w-full">
                                Destroy <Trash className="h-4 w-4 text-white" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Mentor</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Are you sure you want to delete this mentor?
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    );
}