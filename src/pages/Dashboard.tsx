
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Calendar, Users, TrendingUp, Settings } from 'lucide-react';

const Dashboard = () => {
  const missedCalls = [
    { id: 1, phone: '+1 (555) 123-4567', time: '2 hours ago', status: 'SMS Sent', client: 'John Smith' },
    { id: 2, phone: '+1 (555) 987-6543', time: '4 hours ago', status: 'Pending', client: 'Sarah Johnson' },
    { id: 3, phone: '+1 (555) 456-7890', time: '1 day ago', status: 'Booked', client: 'Mike Wilson' },
  ];

  const upcomingAppointments = [
    { id: 1, client: 'Emily Davis', time: 'Today 2:00 PM', service: 'Consultation' },
    { id: 2, client: 'Alex Thompson', time: 'Tomorrow 10:30 AM', service: 'Follow-up' },
    { id: 3, client: 'Lisa Brown', time: 'Friday 3:15 PM', service: 'Initial Visit' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your calls today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <Phone className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-gray-600">From missed calls</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">78%</div>
            <p className="text-xs text-gray-600">Calls to appointments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Missed Calls */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Recent Missed Calls
            </CardTitle>
            <CardDescription>Calls that need follow-up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {missedCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium">{call.phone}</div>
                    <div className="text-sm text-gray-600">{call.client} • {call.time}</div>
                  </div>
                  <Badge 
                    variant={call.status === 'Booked' ? 'default' : call.status === 'SMS Sent' ? 'secondary' : 'outline'}
                    className={call.status === 'Booked' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {call.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Calls
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div>
                    <div className="font-medium">{appointment.client}</div>
                    <div className="text-sm text-gray-600">{appointment.service}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {appointment.time}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you manage your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center">
              <Calendar className="h-5 w-5 mb-1" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Users className="h-5 w-5 mb-1" />
              Add New Client
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <MessageSquare className="h-5 w-5 mb-1" />
              SMS Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
