// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const StatsCards = () => {
//   const { user, token, loading: authLoading } = useAuth();
//   const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


//   const statsQuery = useQuery({
//     queryKey: ['patient-stats-card', user?._id],
//     queryFn: () => axios.get(`${API_BASE_URL}/users/patient/stats`, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => res.data),
//     enabled: !!user?._id && !!token && !authLoading,
//     staleTime: 5 * 60 * 1000,
//     onSuccess: (data) => console.log('📊 Stats loaded:', data),
//     onError: (err) => {
//       console.error('Stats error:', err.response?.data);
//       toast.error('Failed to load stats');
//     }
//   });

//   const rawStatsData = statsQuery.data;
//   const statsData = rawStatsData?.data || rawStatsData || {};

//   // YOUR EXACT DESIGN - Just real data
//   // const cards = [
//   //   {
//   //     title: "Total Records",
//   //     value: statsData.recordsCount || 0,
//   //     color: "from-green-500 to-teal-600",
//   //   },
//   //   {
//   //     title: "Appointments",
//   //     value: statsData.appointmentsCount || 0,
//   //     color: "from-blue-500 to-indigo-600",
//   //   },
//   //   {
//   //     title: "Lab Reports",
//   //     value: statsData.labReportsCount || statsData.recordsCount || 0,
//   //     color: "from-orange-500 to-red-500",
//   //   },
//   //   {
//   //     title: "Medications",
//   //     value: statsData.prescriptionsCount || statsData.medicationsCount || 0,
//   //     color: "from-purple-500 to-pink-500",
//   //   },
//   // ];
//   const cards = [
//   {
//     title: "Total Records",
//     value: statsData.recordsCount ||  0,  // ✅ Uses your data
//     color: "from-green-500 to-teal-600",
//   },
//   {
//     title: "Appointments",
//     value: statsData.appointmentsCount || 0,  // ✅ Perfect match
//     color: "from-blue-500 to-indigo-600",
//   },
//   {
//     title: "Lab Reports", 
//     value: statsData.recordsCount || 0,       // ✅ Uses recordsCount
//     color: "from-orange-500 to-red-500",
//   },
//   {
//     title: "Medications",
//     value: statsData.prescriptionsCount || 0, // ✅ Perfect match
//     color: "from-purple-500 to-pink-500",
//   },
// ];

//   // Loading skeleton - YOUR design
//   if (authLoading || statsQuery.isLoading) {
//     const skeletonCards = [
//       { color: "from-gray-800 to-gray-700" },
//       { color: "from-gray-800 to-gray-700" },
//       { color: "from-gray-800 to-gray-700" },
//       { color: "from-gray-800 to-gray-700" },
//     ];

//     return (
//       <div className="grid grid-cols-4 gap-5">
//         {skeletonCards.map((card, index) => (
//           <div
//             key={index}
//             className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 animate-pulse`}
//           >
//             <div className="h-20 bg-white/20 rounded-xl mb-4 w-3/4"></div>
//             <div className="h-6 bg-white/20 rounded-lg w-1/2"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-4 gap-5">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
//         >
//           <h1 className="text-5xl font-bold">
//             {card.value}
//           </h1>

//           <p className="mt-3 text-lg">{card.title}</p>

//           <button className="mt-5 text-sm hover:underline transition-all">
//             View all →
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FileText, Calendar, FlaskConical, Pill, ArrowRight } from 'lucide-react';

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

  // Same data mapping as before — only the visual treatment changed.
  // One consistent white card shell, one accent color per stat from the
  // real brand palette, instead of four unrelated rainbow gradients.
  const cards = [
    {
      title: "Total Records",
      value: statsData.recordsCount || 0,
      icon: FileText,
      accent: "#0E6B64",
      accentBg: "#E4F1EF",
    },
    {
      title: "Appointments",
      value: statsData.appointmentsCount || 0,
      icon: Calendar,
      accent: "#E8623F",
      accentBg: "#FBEAE4",
    },
    {
      title: "Lab Reports",
      value: statsData.recordsCount || 0,
      icon: FlaskConical,
      accent: "#D98C2B",
      accentBg: "#FBF0E0",
    },
    {
      title: "Medications",
      value: statsData.prescriptionsCount || 0,
      icon: Pill,
      accent: "#5B6470",
      accentBg: "#EFEDE6",
    },
  ];

  if (authLoading || statsQuery.isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Array(4).fill().map((_, i) => (
          <div key={i} className="bg-white border border-[#E4E1D8] rounded-2xl p-6 animate-pulse">
            <div className="h-10 w-10 bg-[#E4E1D8] rounded-xl mb-5"></div>
            <div className="h-8 bg-[#E4E1D8] rounded-lg mb-3 w-1/2"></div>
            <div className="h-4 bg-[#E4E1D8] rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-[#E4E1D8] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
            style={{ background: card.accentBg }}
          >
            <card.icon size={18} style={{ color: card.accent }} />
          </div>

          <h1 className="text-3xl font-serif font-semibold text-[#12181B]">
            {card.value}
          </h1>

          <p className="mt-1.5 text-sm text-[#5B6470]">{card.title}</p>

          <button
            className="mt-4 text-xs font-semibold inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            style={{ color: card.accent }}
          >
            View all <ArrowRight size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;