
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Phone, MessageSquare, Bell, CreditCard, Users, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Configure your Callet application</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="business" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            SMS
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details and booking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Downtown Medical Clinic" />
                </div>
                <div>
                  <Label htmlFor="businessPhone">Main Phone Number</Label>
                  <Input id="businessPhone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div>
                <Label htmlFor="bookingLink">Booking Link</Label>
                <Input id="bookingLink" defaultValue="https://calendly.com/downtownmedical" />
                <p className="text-sm text-gray-500 mt-1">This link will be included in SMS messages to missed callers</p>
              </div>
              <div>
                <Label htmlFor="businessHours">Business Hours</Label>
                <Textarea id="businessHours" defaultValue="Monday - Friday: 9:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 2:00 PM&#10;Sunday: Closed" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phone Settings */}
        <TabsContent value="phone" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Twilio Integration</CardTitle>
              <CardDescription>Configure your phone system integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twilioNumber">Twilio Phone Number</Label>
                <Input id="twilioNumber" defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" defaultValue="https://your-app.com/webhook/twilio" readOnly />
                <p className="text-sm text-gray-500 mt-1">Add this webhook URL to your Twilio phone number configuration</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-detect Missed Calls</Label>
                  <p className="text-sm text-gray-500">Automatically identify missed calls from call logs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Test Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Settings */}
        <TabsContent value="sms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
              <CardDescription>Customize automated messages sent to missed callers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="missedCallTemplate">Missed Call Template</Label>
                <Textarea 
                  id="missedCallTemplate" 
                  defaultValue="Hi {{name}}, sorry we missed your call! We'd love to help you. Book a convenient time here: {{booking_link}}"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">Available variables: {{name}}, {{business_name}}, {{booking_link}}</p>
              </div>
              <div>
                <Label htmlFor="reminderTemplate">Appointment Reminder Template</Label>
                <Textarea 
                  id="reminderTemplate" 
                  defaultValue="Hi {{name}}, this is a reminder about your appointment with {{business_name}} tomorrow at {{time}}. See you then!"
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-send SMS for Missed Calls</Label>
                  <p className="text-sm text-gray-500">Automatically send SMS when a call is missed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Send Appointment Reminders</Label>
                  <p className="text-sm text-gray-500">Send SMS reminders before appointments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="reminderTiming">Reminder Timing</Label>
                <Select defaultValue="24hours">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                    <SelectItem value="2hours">2 hours before</SelectItem>
                    <SelectItem value="24hours">24 hours before</SelectItem>
                    <SelectItem value="both">Both 24h and 1h before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Save SMS Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about important events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email alerts for missed calls</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Get SMS alerts for important events</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-gray-500">Daily email summary of calls and appointments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input id="notificationEmail" type="email" defaultValue="admin@downtownmedical.com" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your Callet subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <h3 className="font-semibold text-lg">Pro Plan</h3>
                  <p className="text-2xl font-bold text-blue-600">$9/month</p>
                  <p className="text-sm text-gray-600 mb-4">Current Plan</p>
                  <ul className="text-sm space-y-1">
                    <li>✅ 5 team members</li>
                    <li>✅ Unlimited missed calls</li>
                    <li>✅ Custom branding</li>
                    <li>✅ Advanced analytics</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Free Plan</h3>
                  <p className="text-2xl font-bold">$0/month</p>
                  <p className="text-sm text-gray-600 mb-4">Downgrade option</p>
                  <ul className="text-sm space-y-1">
                    <li>✅ 1 team member</li>
                    <li>✅ 20 missed calls/month</li>
                    <li>❌ Custom branding</li>
                    <li>❌ Advanced analytics</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Manage Subscription</Button>
                <Button variant="outline">View Usage</Button>
                <Button variant="outline">Download Invoice</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage user access and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Dr. Sarah Wilson</div>
                    <div className="text-sm text-gray-600">admin@downtownmedical.com</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">Admin</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Jennifer Lopez</div>
                    <div className="text-sm text-gray-600">jennifer@downtownmedical.com</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">Staff</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
