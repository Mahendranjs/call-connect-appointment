
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search } from 'lucide-react';
import { Call } from '@/types/calls';
import { getStatusIcon, getStatusBadge, getSMSBadge } from '@/utils/callsUtils';

interface CallsTableProps {
  calls: Call[];
}

const CallsTable = ({ calls }: CallsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.phone.includes(searchTerm) || 
                         call.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Call History</CardTitle>
            <CardDescription>Recent incoming calls and their status</CardDescription>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="missed">Missed Only</SelectItem>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>SMS Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.map((call) => (
              <TableRow key={call.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(call.status)}
                    {getStatusBadge(call.status)}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{call.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {call.client !== 'Unknown' ? (
                      <>
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">
                            {call.client.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {call.client}
                      </>
                    ) : (
                      <span className="text-gray-500 italic">Unknown Caller</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{call.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {call.duration}
                  </Badge>
                </TableCell>
                <TableCell>{getSMSBadge(call.smsStatus)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    {call.status === 'missed' && (
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Send SMS
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CallsTable;
