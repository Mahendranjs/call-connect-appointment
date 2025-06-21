
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Phone, Users, Clock, MessageSquare } from 'lucide-react';

const callData = [
  { month: 'Jan', answered: 145, missed: 23, voicemail: 12 },
  { month: 'Feb', answered: 167, missed: 19, voicemail: 15 },
  { month: 'Mar', answered: 189, missed: 31, voicemail: 18 },
  { month: 'Apr', answered: 201, missed: 27, voicemail: 22 },
  { month: 'May', answered: 234, missed: 35, voicemail: 19 },
  { month: 'Jun', answered: 256, missed: 29, voicemail: 25 },
];

const pieData = [
  { name: 'Answered', value: 78, color: '#10b981' },
  { name: 'Missed', value: 15, color: '#ef4444' },
  { name: 'Voicemail', value: 7, color: '#f59e0b' },
];

const Analytics = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your call performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Answer Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% improvement
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:32</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.5 min from last month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.1% increase
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Call Trends</CardTitle>
            <CardDescription>Monthly call statistics over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="answered" fill="#10b981" name="Answered" />
                <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                <Bar dataKey="voicemail" fill="#f59e0b" name="Voicemail" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Call Distribution</CardTitle>
            <CardDescription>Breakdown of call outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
