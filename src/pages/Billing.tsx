
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Eye, Calendar, DollarSign, TrendingUp, Phone, MessageSquare } from 'lucide-react';

const Billing = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-green-600" />
          Billing & Usage
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your subscription and track usage</p>
      </div>

      {/* Current Plan */}
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Plan
            <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
          </CardTitle>
          <CardDescription>Professional plan with unlimited calls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$49</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Unlimited</div>
              <p className="text-sm text-muted-foreground">calls per month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-sm text-muted-foreground">support included</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">calls made</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">messages this month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minutes Used</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">call minutes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Bill</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$49</div>
            <p className="text-xs text-muted-foreground">due Jan 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your billing history and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Dec 15, 2023', amount: '$49.00', status: 'Paid', invoice: 'INV-001' },
              { date: 'Nov 15, 2023', amount: '$49.00', status: 'Paid', invoice: 'INV-002' },
              { date: 'Oct 15, 2023', amount: '$49.00', status: 'Paid', invoice: 'INV-003' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:bg-accent">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{invoice.invoice}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
