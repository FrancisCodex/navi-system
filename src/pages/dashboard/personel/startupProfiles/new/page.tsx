import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { date, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard-header"
import { useIncubatees } from "@/hooks/use-incubatees"
import { useStartupProfile } from "@/hooks/use-startup-profile"

// Form schema with validation
const startupFormSchema = z.object({
  startup_name: z.string().min(2, { message: "Startup name must be at least 2 characters." }),
  industry: z.string({
    required_error: "Please input an Industry.",
  }),
  leader_id: z.string({
    required_error: "Please select a leader.",
  }),
  date_registered_dti: z.date().optional(),
  date_registered_bir: z.date().optional(),
  startup_founded: z.date({
    required_error: "Please select the founding date.",
  }),
  startup_description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a status.",
  }),
})

type StartupFormValues = z.infer<typeof startupFormSchema>

// Default values for the form
const defaultValues: Partial<StartupFormValues> = {
  startup_name: "",
  startup_description: "",
  status: "Active",
  industry: "",
}

export default function NewStartupPage() {
  const router = useNavigate()
  const { fetchIncubateesWithoutStartups, noStartupLeaders } = useIncubatees()
  const { createStartupProfile, loading } = useStartupProfile()

  useEffect(() => {
    fetchIncubateesWithoutStartups()
  }, [fetchIncubateesWithoutStartups])

  // Initialize the form
  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupFormSchema),
    defaultValues,
  })

  // Handle form submission
  async function onSubmit(data: StartupFormValues) {
    await createStartupProfile(data)
    // Redirect to dashboard
    router("/dashboard/startups")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  // Convert noStartupLeaders object to array
  const leadersArray = Object.values(noStartupLeaders)

  return (
    <div className="p-4 md:p-10">
      <DashboardHeader heading="Add New Startup" text="Create a new startup profile">
        <Link to="/dashboard/startups">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </DashboardHeader>
      <Card className="max-w-3xl mx-auto my-5">
        <CardHeader>
          <CardTitle>New Startup</CardTitle>
          <CardDescription>Fill in the details to create a new startup profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="startup_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startup Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter startup name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter industry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leader_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leader</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a leader" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leadersArray.length > 0 ? (
                            leadersArray.map((leader) => (
                              <SelectItem key={leader.id} value={leader.id.toString()}>
                                {leader.name} ({leader.email})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="n/a" disabled>
                              No more unassigned leaders
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        <Link to="/dashboard/leaders/new" className="text-primary hover:underline">
                          + Add a new leader
                        </Link>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="startup_founded"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Founded</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_registered_dti"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>DTI Registration Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Optional</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>DTI registration date (if available)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_registered_bir"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>BIR Registration Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Optional</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>BIR registration date (if available)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="startup_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a brief description of the startup"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Active" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Active</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Inactive" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Inactive</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end gap-4 px-0 pb-0">
                <Link to="/dashboard/startups">
                  <Button variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Startup
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}