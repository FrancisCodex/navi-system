import { Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Mentor } from "@/constants/types"
import { useNavigate } from "react-router-dom"

interface MentorsTableProps {
  mentors: Mentor[]
}

export function MentorsTable({ mentors }: MentorsTableProps) {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('mentors')
      }
  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <div className="grid grid-cols-5 p-4 text-sm font-medium min-w-[800px]">
          <div>Name</div>
          <div>Industry</div>
          <div>Expertise</div>
          <div>Experience</div>
          <div>Email</div>
        </div>
        <div className="divide-y">
          {mentors.map((mentor, index) => (
            <div key={index} className="grid grid-cols-5 items-center p-4 min-w-[800px]">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{mentor.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{`${mentor.firstName} ${mentor.lastName}`}</span>
              </div>
              <div>{mentor.organization}</div>
              <div>{mentor.expertise}</div>
              <div>{mentor.yearsOfExperience}</div>
              <div className="flex items-center gap-1 text-sm">
                <Mail className="h-3 w-3" />
                <span>{mentor.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleNavigate}>
        View All Mentors
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}