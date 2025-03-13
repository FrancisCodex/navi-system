import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActivities } from "@/hooks/use-activities";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import type { Activity } from "@/constants/types";

interface EditActivityFormProps {
  activity: Activity;
  onSuccess: () => void;
}

export default function EditActivityForm({ activity, onSuccess }: EditActivityFormProps) {
  const { updateActivity, loading } = useActivities();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(activity.due_date));
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    activity_name: activity.activity_name,
    module: activity.module,
    session: activity.session,
    activity_description: activity.activity_description,
    speaker_name: activity.speaker_name,
    TBI: activity.TBI,
    due_date: new Date(activity.due_date),
    file: undefined,
  });

  useEffect(() => {
    setFormData({
      activity_name: activity.activity_name,
      module: activity.module,
      session: activity.session,
      activity_description: activity.activity_description,
      speaker_name: activity.speaker_name,
      TBI: activity.TBI,
      due_date: new Date(activity.due_date),
      file: undefined,
    });
    setSelectedDate(new Date(activity.due_date));
  }, [activity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file || undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formData,
      due_date: selectedDate ? selectedDate.toISOString() : ''
    };
    await updateActivity(activity.id, data);
    onSuccess();
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Activity"}
        </Button>
      </form>
    </div>
  );
}