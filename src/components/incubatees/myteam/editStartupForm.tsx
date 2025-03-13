import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useStartupProfile } from "@/hooks/use-startup-profile"
import type { StartupProfile } from "@/constants/types"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"

// This component is for editing the startup profile
interface EditStartupFormProps {
  startupProfile: StartupProfile
  onSuccess: () => void
}

export const EditStartupForm = ({ startupProfile, onSuccess }: EditStartupFormProps): JSX.Element => {
  const { updateStartupProfile } = useStartupProfile()
  const [profile, setProfile] = useState<StartupProfile>(startupProfile)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (name: string, date: Date | null) => {
    setProfile((prev) => ({
      ...prev,
      [name]: date ? date.toISOString() : null,
    }))
  }

  const handleSubmit = async () => {
    await updateStartupProfile(profile.id, profile)
    onSuccess()
  }

  return (
    <div>
      <div className="grid gap-4">
        <Input
          id="startup_name"
          name="startup_name"
          value={profile.startup_name}
          onChange={handleChange}
          placeholder="Startup Name"
        />
        <Input
          id="startup_description"
          name="startup_description"
          value={profile.startup_description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Input
          id="industry"
          name="industry"
          value={profile.industry}
          onChange={handleChange}
          placeholder="Industry"
        />
        <div>
          <label htmlFor="date_registered_dti">DTI Registration Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {profile.date_registered_dti ? format(new Date(profile.date_registered_dti), 'PPP') : 'Pick a date'}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={typeof profile.date_registered_dti === 'string' ? parseISO(profile.date_registered_dti) : undefined}
                onSelect={(date) => handleDateChange('date_registered_dti', date ?? null)}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label htmlFor="date_registered_bir">BIR Registration Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {profile.date_registered_bir ? format(new Date(profile.date_registered_bir), 'PPP') : 'Pick a date'}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={typeof profile.date_registered_bir === 'string' ? parseISO(profile.date_registered_bir) : undefined}
                onSelect={(date) => handleDateChange('date_registered_bir', date ?? null)}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  )
}