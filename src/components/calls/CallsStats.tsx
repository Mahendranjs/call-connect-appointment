
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneMissed, PhoneCall, Voicemail, MessageSquare } from 'lucide-react';
import { CallsStatsProps } from '@/types/calls';

const CallsStats = ({ missedCount, answeredCount, voicemailCount, smsCount }: CallsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
          <PhoneMissed className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{missedCount}</div>
          <p className="text-xs text-gray-600">This week</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Answered Calls</CardTitle>
          <PhoneCall className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
          <p className="text-xs text-gray-600">This week</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Voicemails</CardTitle>
          <Voicemail className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{voicemailCount}</div>
          <p className="text-xs text-gray-600">This week</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{smsCount}</div>
          <p className="text-xs text-gray-600">For missed calls</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallsStats;
