import React, { useState, useEffect } from 'react';

const ScheduleTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;



  // ✅ Fetch real data from your API
  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ YOUR API ENDPOINT
      const response = await fetch(`${API_BASE_URL}/appointments/schedule/today`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Your auth token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setRows(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to fetch schedule');
      }
    } catch (err) {
      console.error('Schedule fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data on mount + auto-refresh every 2 minutes
  useEffect(() => {
    fetchSchedule(); // Initial load

    const interval = setInterval(fetchSchedule, 120000); // 2 minutes
    
    return () => clearInterval(interval);
  }, []);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="bg-[#07113d] rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-400 animate-pulse">
          Today's Schedule
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="bg-[#07113d] rounded-3xl p-6">
        <div className="text-red-400 text-center py-12">
          <p className="mb-4">⚠️ {error}</p>
          <button
            onClick={fetchSchedule}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#07113d] rounded-3xl p-6">
      {/* ✅ Header with Refresh */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Today's Schedule
          {rows.length > 0 && (
            <span className="ml-2 bg-blue-600 text-xs px-2 py-1 rounded-full">
              {rows.length}
            </span>
          )}
        </h2>
        <button
          onClick={fetchSchedule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all"
          disabled={loading}
        >
          <span>🔄</span>
          Refresh
        </button>
      </div>

      {/* ✅ No Appointments */}
      {rows.length === 0 ? (
        <div className="text-gray-400 text-center py-12 border-2 border-dashed border-gray-700 rounded-2xl">
          <div className="mb-2">📅</div>
          <p className="text-lg">No appointments today</p>
          <p className="text-sm mt-1">Check back later or refresh</p>
        </div>
      ) : (
        /* ✅ Your Original Table - Now with Real Data! */
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="pb-4">Time</th>
              <th className="w-1/3">Patient</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row._id || row.time} // ✅ Use _id from API
                className="border-t border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 font-mono text-sm">
                  {/* ✅ Format time if needed */}
                  {row.time?.includes('AM') || row.time?.includes('PM') 
                    ? row.time 
                    : `${row.time} AM`}
                </td>
                <td className="font-medium">{row.patient}</td>
                <td className="capitalize">{row.type}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    row.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    row.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    row.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleTable;