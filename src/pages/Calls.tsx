
import React from 'react';
import CallsHeader from '@/components/calls/CallsHeader';
import CallsStats from '@/components/calls/CallsStats';
import CallsTable from '@/components/calls/CallsTable';
import { Call } from '@/types/calls';

const Calls = () => {
  const calls: Call[] = [
    { 
      id: 1, 
      phone: '+1 (555) 123-4567', 
      client: 'John Smith',
      status: 'missed',
      time: '2 hours ago',
      duration: '0:00',
      smsStatus: 'sent'
    },
    { 
      id: 2, 
      phone: '+1 (555) 987-6543', 
      client: 'Sarah Johnson',
      status: 'answered',
      time: '3 hours ago',
      duration: '5:23',
      smsStatus: null
    },
    { 
      id: 3, 
      phone: '+1 (555) 456-7890', 
      client: 'Mike Wilson',
      status: 'missed',
      time: '1 day ago',
      duration: '0:00',
      smsStatus: 'delivered'
    },
    { 
      id: 4, 
      phone: '+1 (555) 321-0987', 
      client: 'Emily Davis',
      status: 'voicemail',
      time: '2 days ago',
      duration: '1:45',
      smsStatus: 'sent'
    },
    { 
      id: 5, 
      phone: '+1 (555) 111-2222', 
      client: 'Unknown',
      status: 'missed',
      time: '3 days ago',
      duration: '0:00',
      smsStatus: 'failed'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <CallsHeader />
      <CallsStats 
        missedCount={23}
        answeredCount={87}
        voicemailCount={12}
        smsCount={19}
      />
      <CallsTable calls={calls} />
    </div>
  );
};

export default Calls;
