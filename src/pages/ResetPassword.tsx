
import React from 'react';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Phone } from 'lucide-react';

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Callet</h1>
            <p className="text-sm text-muted-foreground">Call Management System</p>
          </div>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
