import { useState } from "react"
import type { Achievement } from "@/constants/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash, Award, BookOpenText } from "lucide-react"
import { AchievementModal } from "@/components/startupProfiles/achievement-modal"
import { AddAchievementForm } from "@/components/incubatees/myteam/addachievementform"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { useAchievements } from "@/hooks/use-achievements"

interface AchievementProps {
  achievements: Achievement[]
  startupProfileId: string
}

export function AchievementTabs({ achievements, startupProfileId }: AchievementProps): JSX.Element {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [achievementToDelete, setAchievementToDelete] = useState<Achievement | null>(null)
  const { deleteAchievement } = useAchievements()

  const handleCardClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
  }

  const handleCloseModal = () => {
    setSelectedAchievement(null)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleDeleteClick = (achievement: Achievement) => {
    setAchievementToDelete(achievement)
    setIsAlertDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (achievementToDelete) {
      await deleteAchievement(achievementToDelete.id, startupProfileId)
      setIsAlertDialogOpen(false)
      setAchievementToDelete(null)
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Add Achievement</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Achievement</DialogTitle>
                <DialogDescription>
                  Add a new Achievement in your Startup Journey
                </DialogDescription>
              </DialogHeader>
              <AddAchievementForm startupProfileId={startupProfileId} onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Achievement
          </Button>
        </div>
      </div>
      {achievements.length === 0 ? (
        <div className="text-sm text-muted-foreground">No Achievements Yet</div>
      ) : (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="relative flex gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm">
                <Award className="h-5 w-5" />
              </div>
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle>{achievement.competition_name}</CardTitle>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Button variant="outline" size="icon" onClick={() => handleCardClick(achievement)} className="w-full p-3">
                          <BookOpenText />
                          <span>Open</span>
                        </Button>
                      </div>
                      <div className="flex gap-4 rounded">
                        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(achievement)}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the achievement.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    <span>{new Date(achievement.date_achieved).toLocaleDateString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
      {selectedAchievement && (
        <AchievementModal achievement={selectedAchievement} onClose={handleCloseModal} />
      )}
    </div>
  )
}