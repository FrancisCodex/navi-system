"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ChevronLeft, ChevronRight, MapPin, LinkIcon, User, Clock } from "lucide-react"
import { useState } from "react"

export interface Achievement {
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

interface AchievementModalProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Early return if no achievement selected
  if (!achievement) return null

  const photos = achievement.photos || []

  const nextImage = () => {
    if (photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }
  }

  const prevImage = () => {
    if (photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    }
  }

  return (
    <Dialog open={!!achievement} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{achievement.category}</Badge>
              <DialogTitle>{achievement.title}</DialogTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(achievement.date).toLocaleDateString()}</span>
            </div>
          </div>
          <DialogDescription className="flex items-center gap-2 pt-2">
            {achievement.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{achievement.location}</span>
              </div>
            )}
            {achievement.team && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{achievement.team}</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Photo carousel */}
        {photos.length > 0 && (
          <div className="relative my-4">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
              <img
                src={photos[currentImageIndex] || "/placeholder.svg"}
                alt={`Achievement photo ${currentImageIndex + 1}`}
                className="object-cover"
              />

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {photos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievement details */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>

          {achievement.impact && (
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">Impact</h4>
              <p className="text-sm text-muted-foreground">{achievement.impact}</p>
            </div>
          )}

          {achievement.link && (
            <div className="mt-4 flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn more about this achievement
              </a>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              <span>{achievement.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Added on {new Date(achievement.addedDate || achievement.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

