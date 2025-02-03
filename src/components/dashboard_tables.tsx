import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, FileText, Trash } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import mentors from '@/constants/mentors';

const DashboardTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 5;

  // Calculate the current mentorss to display
  const indexOfLastmentors = currentPage * mentorsPerPage;
  const indexOfFirstmentors = indexOfLastmentors - mentorsPerPage;
  const currentmentorss = mentors.slice(indexOfFirstmentors, indexOfLastmentors);

  // Calculate the total number of pages
  const totalPages = Math.ceil(mentors.length / mentorsPerPage);

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full box-border">
      <div className='flex justify-between pb-2'>
            <h1 className=''>List of Mentor's</h1>
            <a href="/dashboard/add/mentors" className='text-end text-primary'>
            <Button size="sm" className='bg-blue-950 hover:bg-blue-900'>Add Mentor</Button>
            </a>
          </div>
          <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
            <Table className="min-w-[800px] bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="w-fit">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentmentorss.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.organization}</TableCell>
                    <TableCell>{item.expertise}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                              <a href={'/dashboard/coordinator/evaluate/'+item.id}>
                                <Pen className="h-4 w-4 text-blue-950" />
                              </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                              <a href={'/dashboard/coordinator/view-mentors/'+item.id}>
                                <Trash className="h-4 w-4 text-destructive" />
                              </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove Mentor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-4 bg-card">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
    </div>
  );
};

export default DashboardTables;