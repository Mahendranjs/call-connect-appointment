
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from 'lucide-react';

const CallsHeader = () => {
  return (
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
  );
};

export default CallsHeader;
