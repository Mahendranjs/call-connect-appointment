
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Users, Calendar, MessageSquare, TrendingUp, PhoneMissed, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Button asChild className="transition-all duration-200 hover:scale-105">
          <Link to="/calls">
            <Phone className="w-4 h-4 mr-2" />
            View All Calls
          </Link>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Calls</CardTitle>
            <Phone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <PhoneMissed className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-muted-foreground">Needs follow-up</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">142</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <p className="text-xs text-muted-foreground">+3% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer group">
          <Link to="/calls">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 mx-auto text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <CardTitle className="text-lg">Call Logs</CardTitle>
              <CardDescription>View and manage all calls</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer group">
          <Link to="/messages">
            <CardHeader className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-green-600 group-hover:scale-110 transition-transform duration-200" />
              <CardTitle className="text-lg">SMS & Chat</CardTitle>
              <CardDescription>Send messages and follow-ups</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer group">
          <Link to="/analytics">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>Track performance metrics</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer group">
          <Link to="/appointments">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-200" />
              <CardTitle className="text-lg">Appointments</CardTitle>
              <CardDescription>Schedule and manage meetings</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest calls and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'call', contact: 'John Smith', action: 'Missed call', time: '2 minutes ago', status: 'missed' },
              { type: 'sms', contact: 'Sarah Johnson', action: 'SMS sent', time: '15 minutes ago', status: 'sent' },
              { type: 'call', contact: 'Mike Wilson', action: 'Call answered', time: '1 hour ago', status: 'answered' },
              { type: 'appointment', contact: 'Emily Davis', action: 'Appointment scheduled', time: '2 hours ago', status: 'scheduled' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg transition-all duration-200 hover:bg-accent">
                <div className="flex items-center gap-3">
                  {activity.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'sms' && <MessageSquare className="h-4 w-4 text-green-600" />}
                  {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-orange-600" />}
                  <div>
                    <p className="font-medium">{activity.contact}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
