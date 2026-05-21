// const cards = [
//   {
//     title: "Total Patients",
//     value: "236",
//     color: "from-emerald-500 to-teal-700",
//   },
//   {
//     title: "Appointments",
//     value: "24",
//     color: "from-blue-500 to-indigo-700",
//   },
//   {
//     title: "Lab Reports",
//     value: "18",
//     color: "from-orange-500 to-amber-700",
//   },
//   {
//     title: "Prescriptions",
//     value: "16",
//     color: "from-purple-500 to-pink-700",
//   },
// ];

// const StatsCards = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl`}
//         >
//           <h1 className="text-4xl font-bold">{card.value}</h1>
//           <p className="mt-2 text-gray-200">{card.title}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

import React, { useState, useEffect } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointments: 0,
    labReports: 0,
    prescriptions: 0
  });
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://localhost:3000/api/v1';


  // ✅ Fetch real stats
  const fetchStats = async () => {
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/doctors/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch stats');

      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load on mount + refresh every 5 minutes
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toLocaleString(),
      color: "from-emerald-500 to-teal-700",
      icon: "👥"
    },
    {
      title: "Appointments",
      value: stats.appointments.toLocaleString(),
      color: "from-blue-500 to-indigo-700",
      icon: "📅"
    },
    {
      title: "Completed Today",
      value: stats.labReports.toLocaleString(),
      color: "from-orange-500 to-amber-700",
      icon: "✅"
    },
    {
      title: "Confirmed",
      value: stats.prescriptions.toLocaleString(),
      color: "from-purple-500 to-pink-700",
      icon: "🎯"
    }
  ];

  // ✅ Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((_, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 animate-pulse">
            <div className="h-8 w-20 bg-white/20 rounded-lg mb-4" />
            <div className="h-12 bg-white/20 rounded-xl w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border-0`}
        >
          {/* Icon */}
          <div className="text-2xl mb-3 opacity-90">{card.icon}</div>
          
          {/* Number */}
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold mb-2">
            {card.value}
          </h1>
          
          {/* Title */}
          <p className="text-gray-200 font-medium text-sm tracking-wide">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;