"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Call, Client } from "@/types";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface CallHistoryProps {
  calls: Call[];
  clients: Client[];
  userRole: 'admin' | 'supervisor' | 'agent';
}

export function CallHistory({ calls, clients, userRole }: CallHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Helper function to get client name by ID
  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : "Unknown Client";
  };

  // Format duration in seconds to minutes:seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Filter calls based on search term and status
  const filteredCalls = calls.filter(call => {
    const clientName = getClientName(call.clientId).toLowerCase();
    const matchesSearch = 
      clientName.includes(searchTerm.toLowerCase()) ||
      call.clientId.includes(searchTerm) ||
      call.agentId.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "effective":
        return <Badge variant="default" className="bg-green-500">Effective</Badge>;
      case "hung-up":
        return <Badge variant="destructive">Hung Up</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">In Progress</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call History</CardTitle>
        <CardDescription>View and filter all call records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search calls..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="effective">Effective</SelectItem>
                <SelectItem value="hung-up">Hung Up</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Date</TableHead>
                  {(userRole === 'admin' || userRole === 'supervisor') && (
                    <TableHead>Notes</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCalls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={userRole === 'agent' ? 5 : 6} className="text-center h-24">
                      No calls found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium">{getClientName(call.clientId)}</TableCell>
                      <TableCell>Agent ID: {call.agentId}</TableCell>
                      <TableCell>{getStatusBadge(call.status)}</TableCell>
                      <TableCell>{formatDuration(call.duration)}</TableCell>
                      <TableCell>{format(new Date(call.createdAt), 'MMM dd, yyyy')}</TableCell>
                      {(userRole === 'admin' || userRole === 'supervisor') && (
                        <TableCell className="max-w-[200px] truncate">
                          {call.notes || "No notes"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}