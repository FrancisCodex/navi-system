import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, School, Pencil, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
interface MentorCardProps {
  mentor: {
    name: string,
    organization: string,
    expertise: string,
    yearsofexperience: number,
    email: string,
    image: string,
  }
}

export function MentorCard({ mentor }: MentorCardProps) {
    return(
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer hover:-translate-y-1.5 hover:transition">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <CardTitle>{mentor.name}</CardTitle>
                        <CardDescription>{mentor.organization}</CardDescription>
                    </div>
                    </div>

                    <div>
                         <div className="flex gap-2 flex-col md:flex-row justify-end items-center">
                            <Button variant="outline" size="icon" >
                                <Pencil className="h-4 w-4 text-primary" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4 text-destructive" />
                            </Button>
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
                        <span>{mentor.yearsofexperience}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{mentor.email}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}