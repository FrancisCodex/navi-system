import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { Search, UserPlus, Building, Mail, Phone, LoaderCircle } from "lucide-react";
import { useStartupProfile } from "@/hooks/use-startup-profile";

export default function LeadersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchLeadersWithStartupProfile, loading } = useStartupProfile();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await fetchLeadersWithStartupProfile(currentPage);
      if (data) {
        setLeaders(data.data);
        setTotalPages(data.last_page);
      }
    };

    fetchLeaders();
  }, [fetchLeadersWithStartupProfile, currentPage]);

  // Filter leaders based on search query
  const filteredLeaders = leaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.startup_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(loading){
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Startup Leaders" text="Manage all incubate leaders and their startups">
        <Link to="/dashboard/leaders/new" state={{ from: location.pathname }}>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Leader
          </Button>
        </Link>
      </DashboardHeader>

      <div className="space-y-4 py-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leaders by name, email, or startup..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredLeaders.length}</strong> leaders
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLeaders.map((leader) => (
                <Card key={leader.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={leader.avatar || `/placeholder.svg?height=40&width=40`} alt={leader.name} />
                          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{leader.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">{leader.role || "CEO"}</div>
                        </div>
                      </div>
                      <Badge variant={leader.startup_status === "Active" ? "default" : "secondary"}>
                        {leader.startup_status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{leader.startup_name}</span>
                        <span className="text-xs text-muted-foreground">({leader.industry})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{leader.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{leader.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/startups/${leader.startupId}`)}>
                      <Building className="mr-2 h-3.5 w-3.5" />
                      View Startup
                    </Button>
                    <Button size="sm">Contact</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leader</TableHead>
                    <TableHead>Startup</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                        No leaders found matching your search
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeaders.map((leader) => (
                      <TableRow key={leader.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={leader.avatar || `/placeholder.svg?height=40&width=40`}
                                alt={leader.name}
                              />
                              <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{leader.name}</div>
                              <div className="text-xs text-muted-foreground">{leader.role || "CEO"}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{leader.startup_name}</div>
                          <div className="text-xs text-muted-foreground">{leader.industry}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{leader.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{leader.phone || "Not provided"}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={leader.startup_status === "Active" ? "default" : "secondary"}>
                            {leader.startup_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/dashboard/startups/${leader.startupId}`)}
                            >
                              View Startup
                            </Button>
                            <Button size="sm">Contact</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}