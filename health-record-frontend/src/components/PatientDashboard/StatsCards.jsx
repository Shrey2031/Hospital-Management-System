import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StatsCards = () => {
  const { user, token, loading: authLoading } = useAuth();
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


  const statsQuery = useQuery({
    queryKey: ['patient-stats-card', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/users/patient/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token && !authLoading,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => console.log('📊 Stats loaded:', data),
    onError: (err) => {
      console.error('Stats error:', err.response?.data);
      toast.error('Failed to load stats');
    }
  });

  const rawStatsData = statsQuery.data;
  const statsData = rawStatsData?.data || rawStatsData || {};

  // YOUR EXACT DESIGN - Just real data
  // const cards = [
  //   {
  //     title: "Total Records",
  //     value: statsData.recordsCount || 0,
  //     color: "from-green-500 to-teal-600",
  //   },
  //   {
  //     title: "Appointments",
  //     value: statsData.appointmentsCount || 0,
  //     color: "from-blue-500 to-indigo-600",
  //   },
  //   {
  //     title: "Lab Reports",
  //     value: statsData.labReportsCount || statsData.recordsCount || 0,
  //     color: "from-orange-500 to-red-500",
  //   },
  //   {
  //     title: "Medications",
  //     value: statsData.prescriptionsCount || statsData.medicationsCount || 0,
  //     color: "from-purple-500 to-pink-500",
  //   },
  // ];
  const cards = [
  {
    title: "Total Records",
    value: statsData.recordsCount ||  0,  // ✅ Uses your data
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Appointments",
    value: statsData.appointmentsCount || 0,  // ✅ Perfect match
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Lab Reports", 
    value: statsData.recordsCount || 0,       // ✅ Uses recordsCount
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Medications",
    value: statsData.prescriptionsCount || 0, // ✅ Perfect match
    color: "from-purple-500 to-pink-500",
  },
];

  // Loading skeleton - YOUR design
  if (authLoading || statsQuery.isLoading) {
    const skeletonCards = [
      { color: "from-gray-800 to-gray-700" },
      { color: "from-gray-800 to-gray-700" },
      { color: "from-gray-800 to-gray-700" },
      { color: "from-gray-800 to-gray-700" },
    ];

    return (
      <div className="grid grid-cols-4 gap-5">
        {skeletonCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 animate-pulse`}
          >
            <div className="h-20 bg-white/20 rounded-xl mb-4 w-3/4"></div>
            <div className="h-6 bg-white/20 rounded-lg w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
        >
          <h1 className="text-5xl font-bold">
            {card.value}
          </h1>

          <p className="mt-3 text-lg">{card.title}</p>

          <button className="mt-5 text-sm hover:underline transition-all">
            View all →
          </button>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;