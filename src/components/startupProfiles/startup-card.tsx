import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface StartupCardProps {
  startup: {
    id: string
    startup_name: string
    industry: string
    startup_description: string
    status: "Active" | "Inactive"
    total_members: string
  }
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{startup.startup_name}</CardTitle>
            <CardDescription>{startup.industry}</CardDescription>
          </div>
          <Badge variant={startup.status === "Active" ? "default" : "secondary"}>{startup.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-sm line-clamp-2 text-muted-foreground mb-4">{startup.startup_description}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{startup.total_members} team members</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Link to={`/dashboard/startups/${startup.id}`} className="w-full">
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}