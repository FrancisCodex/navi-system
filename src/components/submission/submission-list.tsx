import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Download, Eye, FileText, MoreHorizontal, Check, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SubmissionDetails } from "@/constants/types";

interface SubmissionListProps {
  submissions: SubmissionDetails[];
}

export function SubmissionList({ submissions }: SubmissionListProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  console.log(submissions);

  const handleDownload = async (id: string, fileName: string) => {
    setDownloading(id);

    try {
      // In a real app, you would call your API to download the file
      await new Promise((resolve) => setTimeout(resolve, 1500));

    } catch (error) {
        console.error("Failed to download file", error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Submissions</CardTitle>
        <CardDescription>{submissions.length} submissions received for the Activity: <Link to={`/dashboard/activities/${submissions?.[0]?.activity_id}`} className="font-black inline-block text-black hover:underline">"{submissions?.[0]?.activity_name}"</Link></CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incubatee Team</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <div className="font-medium">{submission.startup_name}</div>
                  <div className="text-sm text-muted-foreground">{submission.leader_name}</div>
                </TableCell>
                <TableCell>
                  {format(new Date(submission.submission_date), "PPP")}
                  <div className="text-sm text-muted-foreground">{format(new Date(submission.submission_date), "P")}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{submission.file_path.split('/').pop()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={submission.graded ? "default" : "outline"}>
                    {submission.graded ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : (
                      <X className="mr-1 h-3 w-3" />
                    )}
                    {submission.graded ? "Graded" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/activities/submissions/grade/${submission.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(submission.id, submission.file_path.split('/').pop()!)}
                        disabled={downloading === submission.id}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {downloading === submission.id ? "Downloading..." : "Download"}
                      </DropdownMenuItem>
                      {!submission.graded && (
                        <DropdownMenuItem asChild>
                          <Link to={`/activities/${submission.activity_id}/submissions/${submission.id}?grade=true`}>
                            <Check className="mr-2 h-4 w-4" />
                            Grade Submission
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}