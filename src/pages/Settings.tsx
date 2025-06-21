
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Save, User, Phone, Link } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [name, setName] = useState('');
  const [bookingLink, setBookingLink] = useState('');

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your business settings have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your business information and preferences</p>
        </div>
      </div>

      {/* Business Information */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Business Information
          </CardTitle>
          <CardDescription>Update your business details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-name">Owner Name</Label>
              <Input
                id="owner-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-link">Booking Link</Label>
            <div className="flex">
              <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md">
                <Link className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="booking-link"
                placeholder="https://your-booking-site.com"
                value={bookingLink}
                onChange={(e) => setBookingLink(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-500" />
            SMS Settings
          </CardTitle>
          <CardDescription>Configure your automated SMS responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-template">Default SMS Template</Label>
            <textarea
              id="sms-template"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Hi {name}, thanks for calling! We'd love to schedule an appointment with you. Click here to book: {booking_link}"
              defaultValue="Hi {name}, thanks for calling! We'd love to schedule an appointment with you. Click here to book: {booking_link}"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
