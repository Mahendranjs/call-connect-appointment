
export interface Call {
  id: number;
  phone: string;
  client: string;
  status: 'missed' | 'answered' | 'voicemail';
  time: string;
  duration: string;
  smsStatus: 'sent' | 'delivered' | 'failed' | null;
}

export interface CallsStatsProps {
  missedCount: number;
  answeredCount: number;
  voicemailCount: number;
  smsCount: number;
}
