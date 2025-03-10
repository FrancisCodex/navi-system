import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar } from "lucide-react"
import { AchievementModal } from "./achievement-modal"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: "Funding" | "Award" | "Milestone" | "Partnership" | "Other"
  location?: string
  team?: string
  impact?: string
  link?: string
  addedDate?: string
  photos?: string[]
}

interface AchievementTimelineProps {
  achievements: Achievement[]
}

export function AchievementTimeline({ achievements }: AchievementTimelineProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  // Sort achievements by date (newest first)
  const sortedAchievements = [...achievements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium">Startup Journey</h3>

      {sortedAchievements.length === 0 ? (
        <p className="text-muted-foreground">No achievements yet</p>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border">
          {sortedAchievements.map((achievement) => (
            <div key={achievement.id} className="relative flex gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm">
                <Award className="h-5 w-5" />
              </div>
              <Card
                className="flex-1 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedAchievement(achievement)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{achievement.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Achievement modal */}
      <AchievementModal achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />
    </div>
  )
}