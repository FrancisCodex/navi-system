import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useActivities } from "@/hooks/use-activities"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import type { Activity } from "@/constants/types"

interface ActivityFormProps {
  onSuccess: () => void
}

export default function ActivityForm({ onSuccess }: ActivityFormProps) {
  const { createActivity, loading } = useActivities()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    activity_name: "",
    module: "",
    session: "",
    activity_description: "",
    speaker_name: "",
    TBI: "",
    due_date: new Date(),
    file: undefined
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFormData((prevData) => ({
      ...prevData,
      file: file || undefined
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append('activity_name', formData.activity_name)
    data.append('module', formData.module)
    data.append('session', formData.session)
    data.append('activity_description', formData.activity_description)
    data.append('speaker_name', formData.speaker_name)
    data.append('TBI', formData.TBI)
    data.append('due_date', selectedDate ? selectedDate.toISOString() : '')
    if (formData.file) {
      data.append('file', formData.file)
    }
    await createActivity(data)
    onSuccess()
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <Label htmlFor="activity_name">Activity Name</Label>
          <Input
            id="activity_name"
            name="activity_name"
            value={formData.activity_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="module">Module</Label>
          <Input
            id="module"
            name="module"
            value={formData.module}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="session">Session</Label>
          <Input
            id="session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="activity_description">Activity Description</Label>
          <Textarea
            id="activity_description"
            name="activity_description"
            value={formData.activity_description}
            onChange={handleChange}
            className="max-h-[200px]"
            required
          />
        </div>
        <div>
          <Label htmlFor="speaker_name">Speaker Name</Label>
          <Input
            id="speaker_name"
            name="speaker_name"
            value={formData.speaker_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="TBI">TBI</Label>
          <Input
            id="TBI"
            name="TBI"
            value={formData.TBI}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="file">File (optional)</Label>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Activity"}
        </Button>
      </form>
    </div>
  )
}