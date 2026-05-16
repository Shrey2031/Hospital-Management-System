import React from 'react';
import { Calendar, Stethoscope, Users } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-8">
    <div className="text-center space-y-6 animate-pulse">
      <div className="flex items-center justify-center space-x-4 mb-8">
        <Calendar className="w-12 h-12 text-sky-500 animate-bounce" />
        <Stethoscope className="w-12 h-12 text-emerald-500 animate-bounce [animation-delay:0.1s]" />
        <Users className="w-12 h-12 text-purple-500 animate-bounce [animation-delay:0.2s]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
          Welcome to WellTrack
        </h2>
        <p className="text-xl text-gray-600">Loading your dashboard...</p>
      </div>
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;