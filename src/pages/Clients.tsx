
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, Search, Phone, Mail, Calendar } from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const clients = [
    { 
      id: 1, 
      name: 'John Smith', 
      phone: '+1 (555) 123-4567', 
      email: 'john@email.com',
      lastCall: '2 days ago',
      totalCalls: 5,
      appointments: 3,
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      phone: '+1 (555) 987-6543', 
      email: 'sarah@email.com',
      lastCall: '1 week ago',
      totalCalls: 3,
      appointments: 2,
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      phone: '+1 (555) 456-7890', 
      email: 'mike@email.com',
      lastCall: '3 days ago',
      totalCalls: 8,
      appointments: 5,
      status: 'VIP'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      phone: '+1 (555) 321-0987', 
      email: 'emily@email.com',
      lastCall: '1 day ago',
      totalCalls: 2,
      appointments: 1,
      status: 'New'
    },
  ];

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            Clients
          </h1>
          <p className="text-gray-600 mt-1">Manage your client relationships and call history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter client information to add them to your database.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter client name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="client@email.com" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any additional notes about this client..." />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-600">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Clients</CardTitle>
            <Badge className="bg-gold-100 text-gold-700">VIP</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">High value clients</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <Badge variant="secondary">New</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">Recently added</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
            <p className="text-xs text-gray-600">Per client</p>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Client Directory</CardTitle>
              <CardDescription>All your clients and their interaction history</CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Call</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.lastCall}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{client.totalCalls}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{client.appointments}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={client.status === 'VIP' ? 'default' : 'outline'}
                      className={
                        client.status === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                        client.status === 'New' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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

export default Clients;
