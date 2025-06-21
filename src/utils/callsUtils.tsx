
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall, PhoneMissed, Voicemail } from 'lucide-react';

export const getStatusIcon = (status: string) => {
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

export const getStatusBadge = (status: string) => {
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

export const getSMSBadge = (smsStatus: string | null) => {
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
