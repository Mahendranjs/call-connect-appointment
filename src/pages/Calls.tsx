import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, PhoneCall, PhoneMissed, Voicemail, MessageSquare, Calendar, Search } from 'lucide-react';

const Calls = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const calls = [
    { 
      id: 1, 
      phone: '+1 (555) 123-4567', 
      client: 'John Smith',
      status: 'missed',
      time: '2 hours ago',
      duration: '0:00',
      smsStatus: 'sent'
    },
    { 
      id: 2, 
      phone: '+1 (555) 987-6543', 
      client: 'Sarah Johnson',
      status: 'answered',
      time: '3 hours ago',
      duration: '5:23',
      smsStatus: null
    },
    { 
      id: 3, 
      phone: '+1 (555) 456-7890', 
      client: 'Mike Wilson',
      status: 'missed',
      time: '1 day ago',
      duration: '0:00',
      smsStatus: 'delivered'
    },
    { 
      id: 4, 
      phone: '+1 (555) 321-0987', 
      client: 'Emily Davis',
      status: 'voicemail',
      time: '2 days ago',
      duration: '1:45',
      smsStatus: 'sent'
    },
    { 
      id: 5, 
      phone: '+1 (555) 111-2222', 
      client: 'Unknown',
      status: 'missed',
      time: '3 days ago',
      duration: '0:00',
      smsStatus: 'failed'
    },
  ];

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.phone.includes(searchTerm) || 
                         call.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      case 'answered':
        return <PhoneCall className="h-4 w-4 text-green-500" />;
      case 'voicemail':
        return <Voicemail className="h-4 w-4 text-orange-500" />;
      default:
        return <Phone className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'missed':
        return <Badge variant="destructive">Missed</Badge>;
      case 'answered':
        return <Badge variant="default" className="bg-green-100 text-green-800">Answered</Badge>;
      case 'voicemail':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Voicemail</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSMSBadge = (smsStatus: string | null) => {
    if (!smsStatus) return null;
    
    switch (smsStatus) {
      case 'sent':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">SMS Sent</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{smsStatus}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Phone className="h-8 w-8 text-blue-600" />
            Call Logs
          </h1>
          <p className="text-gray-600 mt-1">Track all incoming calls and follow-up actions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <PhoneMissed className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Answered Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voicemails</CardTitle>
            <Voicemail className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">19</div>
            <p className="text-xs text-gray-600">For missed calls</p>
          </CardContent>
        </Card>
      </div>

      {/* Call Log Table */}
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
    </div>
  );
};

export default Calls;
