import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { StartupCard } from "@/components/startupProfiles/startup-card"
import { Search, Plus, UserPlus, LoaderCircle } from "lucide-react"
import { useStartupProfile } from "@/hooks/use-startup-profile"

export default function StartupProfiles() {
  const { fetchStartupProfiles, loading, startupProfiles, pagination } = useStartupProfile()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchStartupProfiles(currentPage, debouncedSearchQuery)
  }, [fetchStartupProfiles, currentPage, debouncedSearchQuery])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Startup Groups" text="Manage all your startup groups in one place.">
        <div className="flex gap-2">
          <Link to="/dashboard/leaders/new" state={{ from: location.pathname }}>
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Leader
            </Button>
          </Link>
          <Link to="new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Startup
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search startups..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{startupProfiles.length}</strong> startups
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <LoaderCircle className="animate-spin h-6 w-6" />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {startupProfiles.map((startup) => (
                  <StartupCard key={startup.id} startup={{ ...startup, total_members: startup.total_members || "0" }} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <LoaderCircle className="animate-spin h-6 w-6" />
              </div>
            ) : (
              <div className="space-y-4">
                {startupProfiles.map((startup) => (
                  <Card key={startup.id}>
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {startup.startup_name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle>{startup.startup_name}</CardTitle>
                        <CardDescription>{startup.industry}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="text-sm text-muted-foreground">{startup.total_members} team members</div>
                      <Link to={`/dashboard/startups/${startup.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination?.prev_page_url}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {pagination?.current_page} of {pagination?.last_page}
          </div>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination?.next_page_url}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}