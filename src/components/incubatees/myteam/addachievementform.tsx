import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAchievements } from "@/hooks/use-achievements"

const achievementFormSchema = z.object({
  competition_name: z.string().min(2, { message: "Competition name is required" }),
  organized_by: z.string().min(2, { message: "Organizer is required" }),
  date_achieved: z.string({ required_error: "Date is required" }),
  prize_amount: z.string().transform((val) => (val ? parseFloat(val) : 0)),
  category: z.string({ required_error: "Please select a category" }),
  description: z.string().min(10, { message: "Description should be at least 10 characters" }),
  event_location: z.string().min(2, { message: "Event location is required" }),
  article_link: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  photos: z.array(z.instanceof(File)).optional(),
})

export type AchievementFormValues = z.infer<typeof achievementFormSchema>

interface AddAchievementFormProps {
  startupProfileId: string
  onSuccess: () => void
}

export function AddAchievementForm({ startupProfileId, onSuccess }: AddAchievementFormProps) {
  const { createAchievement } = useAchievements()
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      competition_name: "",
      organized_by: "",
      date_achieved: "",
      prize_amount: undefined,
      category: "",
      description: "",
      event_location: "",
      article_link: "",
      photos: [],
    },
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const files = Array.from(e.target.files)
    setUploadedPhotos((prev) => [...prev, ...files])
    console.log("Uploaded Photos:", files)
  }

  const removePhoto = (file: File) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo !== file))
  }

  const handleSubmit = async (data: AchievementFormValues) => {
    console.log("Form Data:", data)
    console.log("Uploaded Photos before submission:", uploadedPhotos)
    const parsedData = {
      ...data,
      startup_profile_id: startupProfileId,
      photos: uploadedPhotos,
      prize_amount: data.prize_amount ?? 0,
    }
    console.log("Parsed Data:", parsedData)
    await createAchievement(parsedData)
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="competition_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competition Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter competition name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organized_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organized By</FormLabel>
              <FormControl>
                <Input placeholder="Enter organizer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_achieved"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Achieved</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                    >
                      {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date?.toISOString())} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prize_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter prize amount (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                  <SelectItem value="grant">Grant</SelectItem>
                  <SelectItem value="recognition">Recognition</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the achievement" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter event location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="article_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Photos (Optional)</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("add-photo-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload Photos</span>
              </Button>
              <input
                id="add-photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
          {uploadedPhotos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="relative rounded-md border">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={photo.name}
                    className="h-24 w-full rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() => removePhoto(photo)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="mt-1 truncate px-2 text-xs text-muted-foreground">{photo.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Save Achievement</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}


