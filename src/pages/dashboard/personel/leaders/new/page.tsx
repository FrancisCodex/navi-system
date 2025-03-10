import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Form schema with validation
const leaderFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    password_confirmation: z.string().min(8, { message: "Password confirmation must be at least 8 characters." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })

type LeaderFormValues = z.infer<typeof leaderFormSchema>

// Default values for the form
const defaultValues: Partial<LeaderFormValues> = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
}

export default function NewLeaderPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { registerIncubatee } = useAuth()

  // Initialize the form
  const form = useForm<LeaderFormValues>({
    resolver: zodResolver(leaderFormSchema),
    defaultValues,
  })

  // Handle form submission
  async function onSubmit(data: LeaderFormValues) {
    setIsLoading(true)

    try {
      await registerIncubatee(data.email, data.password, data.password_confirmation, data.name)

      // Redirect to leaders page
      navigate("/dashboard/leaders")
    } catch (error) {
      console.error("Failed to create leader account", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Create Leader Account" text="Add a new incubate leader to the platform">
        <Link to="/dashboard/leaders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </DashboardHeader>

      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>New Leader Account</CardTitle>
          <CardDescription>
            Create an account for an incubate leader. They will be able to manage their startup profiles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Enter the leader's full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormDescription>This will be used for login and communications.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>At least 8 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>Repeat the password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CardFooter className="flex justify-end px-0 pb-0">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>    
    </div>
  )
}