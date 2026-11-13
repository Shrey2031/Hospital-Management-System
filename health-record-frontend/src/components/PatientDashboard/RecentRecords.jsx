
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../../context/AuthContext';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { Download, FileText, Calendar, Eye } from 'lucide-react';

// const RecentRecords = () => {
//   const { user, token, loading: authLoading } = useAuth();
//   const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


//   const recordsQuery = useQuery({
//     queryKey: ['patient-records', user?._id],
//     queryFn: () => axios.get(`${API_BASE_URL}/records/my/`, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => res.data),
//     enabled: !!user?._id && !!token && !authLoading,
//     staleTime: 5 * 60 * 1000,
//     onSuccess: (data) => {
//       console.log('📁 Records loaded:', data);
//     },
//     onError: (err) => {
//       console.error('Records error:', err.response?.data);
//       toast.error('Failed to load medical records');
//     }
//   });

//   const rawRecordsData = recordsQuery.data;
//   const realRecords = Array.isArray(rawRecordsData)
//     ? rawRecordsData
//     : rawRecordsData?.records || rawRecordsData?.data?.records || [];

//   // Sort by createdAt (newest first)
//   const recentRecords = realRecords
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5); // Show top 5 recent

//   console.log('📋 Recent Records:', recentRecords);

//   if (authLoading || recordsQuery.isLoading) {
//     return (
//       <div className="bg-[#09153d] text-white rounded-3xl p-8 animate-pulse">
//         <div className="h-10 bg-white/20 rounded-lg w-64 mb-8"></div>
//         <div className="space-y-4">
//           {Array(3).fill().map((_, i) => (
//             <div key={i} className="h-20 bg-white/10 rounded-xl"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   const getCategoryIcon = (category) => {
//     const icons = {
//       'REPORT': '📋',
//       'LAB': '🧪',
//       'IMAGING': '📷',
//       'PRESCRIPTION': '💊',
//       'SUMMARY': '📄'
//     };
//     return icons[category] || '📄';
//   };

//   const downloadRecord = (fileUrl, title) => {
//     window.open(fileUrl, '_blank');
//   };

//   return (
//     <div className="bg-[#09153d] text-white rounded-3xl p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold flex items-center space-x-3">
//           <FileText className="w-8 h-8" />
//           <span>Recent Records</span>
//         </h2>
//         <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center space-x-2">
//           <span>View all</span>
//           <span>({realRecords.length})</span>
//         </button>
//       </div>

//       {recordsQuery.isError ? (
//         <div className="text-center py-12">
//           <p className="text-gray-400 text-lg mb-4">Failed to load records</p>
//           <button 
//             onClick={() => recordsQuery.refetch()}
//             className="bg-blue-500/50 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-medium transition-all"
//           >
//             Retry
//           </button>
//         </div>
//       ) : realRecords.length === 0 ? (
//         <div className="text-center py-16">
//           <FileText className="w-16 h-16 text-gray-500 mx-auto mb-6 opacity-50" />
//           <h3 className="text-xl font-bold text-gray-400 mb-2">No records yet</h3>
//           <p className="text-gray-500">Upload your first medical record</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[600px]">
//             <thead>
//               <tr className="border-b border-white/10">
//                 <th className="pb-6 text-left text-gray-400 font-medium w-2/5">Record</th>
//                 <th className="pb-6 text-left text-gray-400 font-medium text-center">Type</th>
//                 <th className="pb-6 text-left text-gray-400 font-medium w-32">Date</th>
//                 <th className="pb-6 text-left text-gray-400 font-medium w-32">Size</th>
//                 <th className="pb-6 text-right text-gray-400 font-medium w-24">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {recentRecords.map((record) => (
//                 <tr key={record._id} className="border-t border-white/10 hover:bg-white/10 transition-all group">
//                   <td className="py-6 pr-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">
//                         {getCategoryIcon(record.category)}
//                       </span>
//                       <div>
//                         <div className="font-semibold text-white truncate max-w-[200px]">
//                           {record.title}
//                         </div>
//                         <div className="text-gray-500 text-sm">
//                           {record.visitDate 
//                             ? format(new Date(record.visitDate), 'MMM dd, yyyy')
//                             : 'No visit date'
//                           }
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="py-6 text-center">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20`}>
//                       {record.category || 'Document'}
//                     </span>
//                   </td>
                  
//                   <td className="py-6">
//                     <div className="text-gray-400 text-sm">
//                       {record.createdAt 
//                         ? format(new Date(record.createdAt), 'MMM dd')
//                         : 'Recent'
//                       }
//                     </div>
//                   </td>
                  
//                   <td className="py-6">
//                     <div className="text-gray-400 text-sm">
//                       {(record.fileSize / 1024).toFixed(1)} KB
//                     </div>
//                   </td>
                  
//                   <td className="py-6">
//                     <button
//                       onClick={() => downloadRecord(record.fileUrl, record.title)}
//                       className="group-hover:opacity-100 opacity-70 p-2 hover:bg-white/20 rounded-xl transition-all flex mx-auto"
//                       title="View/Download"
//                     >
//                       <Download className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {realRecords.length > 5 && (
//         <div className="mt-6 pt-6 border-t border-white/10 text-center">
//           <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
//             Show all {realRecords.length} records →
//           </button>
//         </div>
//       )}
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
import { Download, FileText, ClipboardList, TestTube, Scan, Pill } from 'lucide-react';

const RecentRecords = () => {
  const { user, token, loading: authLoading } = useAuth();
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

  const recordsQuery = useQuery({
    queryKey: ['patient-records', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/records/my/`, {
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

  const recentRecords = realRecords
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  console.log('📋 Recent Records:', recentRecords);

  if (authLoading || recordsQuery.isLoading) {
    return (
      <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7 animate-pulse">
        <div className="h-7 bg-[#E4E1D8] rounded-lg w-52 mb-7"></div>
        <div className="space-y-3">
          {Array(3).fill().map((_, i) => (
            <div key={i} className="h-16 bg-[#F7F6F2] rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const categoryIcons = {
    REPORT: ClipboardList,
    LAB: TestTube,
    IMAGING: Scan,
    PRESCRIPTION: Pill,
    SUMMARY: FileText,
  };

  const getCategoryIcon = (category) => categoryIcons[category] || FileText;

  const downloadRecord = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-medium text-[#12181B] flex items-center gap-2.5">
          <FileText size={20} className="text-[#0E6B64]" />
          Recent Records
        </h2>
        <button className="text-[#0E6B64] hover:text-[#0B4F4A] text-sm font-semibold transition-colors">
          View all ({realRecords.length})
        </button>
      </div>

      {recordsQuery.isError ? (
        <div className="text-center py-10">
          <p className="text-[#5B6470] mb-4 text-sm">Failed to load records</p>
          <button
            onClick={() => recordsQuery.refetch()}
            className="bg-[#0E6B64] hover:bg-[#0B4F4A] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      ) : realRecords.length === 0 ? (
        <div className="text-center py-14">
          <FileText size={40} className="text-[#8A929B] mx-auto mb-4 opacity-60" />
          <h3 className="text-base font-semibold text-[#12181B] mb-1">No records yet</h3>
          <p className="text-sm text-[#8A929B]">Upload your first medical record</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E4E1D8]">
                <th className="pb-4 text-left text-xs font-semibold text-[#8A929B] uppercase tracking-wide w-2/5">Record</th>
                <th className="pb-4 text-center text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Type</th>
                <th className="pb-4 text-left text-xs font-semibold text-[#8A929B] uppercase tracking-wide w-28">Date</th>
                <th className="pb-4 text-left text-xs font-semibold text-[#8A929B] uppercase tracking-wide w-24">Size</th>
                <th className="pb-4 text-right text-xs font-semibold text-[#8A929B] uppercase tracking-wide w-20">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentRecords.map((record) => {
                const Icon = getCategoryIcon(record.category);
                return (
                  <tr key={record._id} className="border-t border-[#E4E1D8] hover:bg-[#F7F6F2] transition-colors group">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#E4F1EF] shrink-0">
                          <Icon size={16} className="text-[#0E6B64]" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-medium text-[#12181B] truncate max-w-[200px] text-sm">
                            {record.title}
                          </div>
                          <div className="text-[#8A929B] text-xs mt-0.5">
                            {record.visitDate
                              ? format(new Date(record.visitDate), 'MMM dd, yyyy')
                              : 'No visit date'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFEDE6] text-[#5B6470] border border-[#E4E1D8]">
                        {record.category || 'Document'}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="text-[#5B6470] text-sm">
                        {record.createdAt ? format(new Date(record.createdAt), 'MMM dd') : 'Recent'}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-[#5B6470] text-sm">
                        {(record.fileSize / 1024).toFixed(1)} KB
                      </div>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => downloadRecord(record.fileUrl, record.title)}
                        className="opacity-70 group-hover:opacity-100 p-2 hover:bg-[#E4F1EF] rounded-lg transition-all flex ml-auto"
                        title="View/Download"
                      >
                        <Download size={15} className="text-[#0E6B64]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {realRecords.length > 5 && (
        <div className="mt-5 pt-5 border-t border-[#E4E1D8] text-center">
          <button className="text-[#0E6B64] hover:text-[#0B4F4A] text-sm font-semibold transition-colors">
            Show all {realRecords.length} records →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentRecords;