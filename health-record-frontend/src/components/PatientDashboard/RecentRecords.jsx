// const RecentRecords = () => {
//   return (
//     <div className="bg-[#09153d] text-white rounded-3xl p-8">
//       <div className="flex justify-between mb-8">
//         <h2 className="text-3xl font-bold">
//           Recent Records
//         </h2>

//         <button>View all</button>
//       </div>

//       <table className="w-full">
//         <thead className="text-left text-gray-400">
//           <tr>
//             <th className="pb-4">Record Name</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Provider</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="border-t border-white/10">
//             <td className="py-5">Blood Test Report</td>
//             <td>Lab Report</td>
//             <td>May 18, 2024</td>
//             <td>City Lab</td>
//             <td>⬇</td>
//           </tr>

//           <tr className="border-t border-white/10">
//             <td className="py-5">Chest X-Ray</td>
//             <td>Imaging</td>
//             <td>May 10, 2024</td>
//             <td>City Hospital</td>
//             <td>⬇</td>
//           </tr>

//           <tr className="border-t border-white/10">
//             <td className="py-5">
//               General Checkup Summary
//             </td>
//             <td>Visit Summary</td>
//             <td>Apr 30, 2024</td>
//             <td>City Clinic</td>
//             <td>⬇</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RecentRecords;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Download, FileText, Calendar, Eye } from 'lucide-react';

const RecentRecords = () => {
  const { user, token, loading: authLoading } = useAuth();

  const recordsQuery = useQuery({
    queryKey: ['patient-records', user?._id],
    queryFn: () => axios.get(`http://localhost:3000/api/v1/records/my/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token && !authLoading,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      console.log('📁 Records loaded:', data);
    },
    onError: (err) => {
      console.error('Records error:', err.response?.data);
      toast.error('Failed to load medical records');
    }
  });

  const rawRecordsData = recordsQuery.data;
  const realRecords = Array.isArray(rawRecordsData)
    ? rawRecordsData
    : rawRecordsData?.records || rawRecordsData?.data?.records || [];

  // Sort by createdAt (newest first)
  const recentRecords = realRecords
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5); // Show top 5 recent

  console.log('📋 Recent Records:', recentRecords);

  if (authLoading || recordsQuery.isLoading) {
    return (
      <div className="bg-[#09153d] text-white rounded-3xl p-8 animate-pulse">
        <div className="h-10 bg-white/20 rounded-lg w-64 mb-8"></div>
        <div className="space-y-4">
          {Array(3).fill().map((_, i) => (
            <div key={i} className="h-20 bg-white/10 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'REPORT': '📋',
      'LAB': '🧪',
      'IMAGING': '📷',
      'PRESCRIPTION': '💊',
      'SUMMARY': '📄'
    };
    return icons[category] || '📄';
  };

  const downloadRecord = (fileUrl, title) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="bg-[#09153d] text-white rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center space-x-3">
          <FileText className="w-8 h-8" />
          <span>Recent Records</span>
        </h2>
        <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center space-x-2">
          <span>View all</span>
          <span>({realRecords.length})</span>
        </button>
      </div>

      {recordsQuery.isError ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">Failed to load records</p>
          <button 
            onClick={() => recordsQuery.refetch()}
            className="bg-blue-500/50 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-medium transition-all"
          >
            Retry
          </button>
        </div>
      ) : realRecords.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-6 opacity-50" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No records yet</h3>
          <p className="text-gray-500">Upload your first medical record</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-6 text-left text-gray-400 font-medium w-2/5">Record</th>
                <th className="pb-6 text-left text-gray-400 font-medium text-center">Type</th>
                <th className="pb-6 text-left text-gray-400 font-medium w-32">Date</th>
                <th className="pb-6 text-left text-gray-400 font-medium w-32">Size</th>
                <th className="pb-6 text-right text-gray-400 font-medium w-24">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentRecords.map((record) => (
                <tr key={record._id} className="border-t border-white/10 hover:bg-white/10 transition-all group">
                  <td className="py-6 pr-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getCategoryIcon(record.category)}
                      </span>
                      <div>
                        <div className="font-semibold text-white truncate max-w-[200px]">
                          {record.title}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {record.visitDate 
                            ? format(new Date(record.visitDate), 'MMM dd, yyyy')
                            : 'No visit date'
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20`}>
                      {record.category || 'Document'}
                    </span>
                  </td>
                  
                  <td className="py-6">
                    <div className="text-gray-400 text-sm">
                      {record.createdAt 
                        ? format(new Date(record.createdAt), 'MMM dd')
                        : 'Recent'
                      }
                    </div>
                  </td>
                  
                  <td className="py-6">
                    <div className="text-gray-400 text-sm">
                      {(record.fileSize / 1024).toFixed(1)} KB
                    </div>
                  </td>
                  
                  <td className="py-6">
                    <button
                      onClick={() => downloadRecord(record.fileUrl, record.title)}
                      className="group-hover:opacity-100 opacity-70 p-2 hover:bg-white/20 rounded-xl transition-all flex mx-auto"
                      title="View/Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {realRecords.length > 5 && (
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Show all {realRecords.length} records →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentRecords;