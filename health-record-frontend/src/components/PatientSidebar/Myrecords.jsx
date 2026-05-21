// import React from "react";
// import {
//   Search,
//   Bell,
//   Eye,
//   Download,
//   FileText,
//   FlaskConical,
//   Pill,
//   ImageIcon,
// } from "lucide-react";
// import Sidebar from "../PatientDashboard/Sidebar";

// const records = [
//   {
//     name: "Blood Test Report",
//     category: "Lab Report",
//     date: "May 18, 2024",
//     provider: "City Lab",
//     status: "Completed",
//   },
//   {
//     name: "Chest X-Ray",
//     category: "Imaging",
//     date: "May 10, 2024",
//     provider: "City Hospital",
//     status: "Completed",
//   },
//   {
//     name: "General Checkup Summary",
//     category: "Visit Summary",
//     date: "Apr 30, 2024",
//     provider: "City Clinic",
//     status: "Reviewed",
//   },
//   {
//     name: "Prescription - Antibiotics",
//     category: "Prescription",
//     date: "Apr 30, 2024",
//     provider: "Dr. Emily Watson",
//     status: "Completed",
//   },
//   {
//     name: "ECG Report",
//     category: "Lab Report",
//     date: "Apr 20, 2024",
//     provider: "City Lab",
//     status: "Pending",
//   },
// ];

// const uploads = [
//   {
//     title: "MRI Scan",
//     date: "May 20, 2024",
//     time: "10:30 AM",
//   },
//   {
//     title: "Blood Test Report",
//     date: "May 18, 2024",
//     time: "08:45 AM",
//   },
//   {
//     title: "Chest X-Ray",
//     date: "May 10, 2024",
//     time: "02:15 PM",
//   },
//   {
//     title: "Prescription",
//     date: "Apr 30, 2024",
//     time: "11:20 AM",
//   },
// ];

// const statCards = [
//   {
//     title: "Total Records",
//     value: "24",
//     icon: <FileText size={22} />,
//     gradient: "from-teal-500 to-emerald-600",
//   },
//   {
//     title: "Lab Reports",
//     value: "12",
//     icon: <FlaskConical size={22} />,
//     gradient: "from-indigo-500 to-purple-600",
//   },
//   {
//     title: "Prescriptions",
//     value: "8",
//     icon: <Pill size={22} />,
//     gradient: "from-orange-500 to-red-500",
//   },
//   {
//     title: "Imaging Reports",
//     value: "4",
//     icon: <ImageIcon size={22} />,
//     gradient: "from-pink-500 to-fuchsia-600",
//   },
// ];

// const MyRecordsPage = () => {
//   return (
//     <div className="flex min-h-screen bg-[#E9EDF8]">
//       {/* SIDEBAR */}
//      <Sidebar/>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 p-8">
//         {/* TOPBAR */}
//          <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-4xl font-bold text-[#081028]">
//               My Medical Records
//             </h1>

//             <p className="text-gray-600 mt-2">
//               Manage Your Medical Records and Stay Informed
//             </p>
//           </div>

//           <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-md w-[320px]">
//             <Search className="text-gray-400" size={18} />

//             <input
//               type="text"
//               placeholder="Search records..."
//               className="bg-transparent outline-none w-full"
//             />
//           </div>
//         </div>

//         {/* CONTENT GRID */}
//         <div className="grid grid-cols-12 gap-6">
//           {/* LEFT */}
//           <div className="col-span-9 space-y-6">
//             {/* STATS */}
//             <div className="grid grid-cols-4 gap-5">
//               {statCards.map((card, i) => (
//                 <div
//                   key={i}
//                   className={`bg-gradient-to-r ${card.gradient} rounded-[28px] p-6 text-white shadow-lg`}
//                 >
//                   <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
//                     {card.icon}
//                   </div>

//                   <h2 className="text-4xl font-bold">{card.value}</h2>

//                   <p className="mt-2 text-white/80">{card.title}</p>

//                   <button className="mt-6 text-sm">
//                     View all →
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* TABLE */}
//             <div className="bg-[#071B4A] rounded-[32px] p-8 text-white shadow-xl">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold">All Records</h2>

//                 <button className="text-[#8EA2FF]">
//                   Filter: All Records
//                 </button>
//               </div>

//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-400 border-b border-white/10">
//                     <th className="pb-5">Record Name</th>
//                     <th className="pb-5">Category</th>
//                     <th className="pb-5">Date</th>
//                     <th className="pb-5">Provider</th>
//                     <th className="pb-5">Status</th>
//                     <th className="pb-5">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {records.map((record, i) => (
//                     <tr
//                       key={i}
//                       className="border-b border-white/5 hover:bg-white/5 transition"
//                     >
//                       <td className="py-5">{record.name}</td>

//                       <td className="text-gray-300">
//                         {record.category}
//                       </td>

//                       <td className="text-gray-300">{record.date}</td>

//                       <td className="text-gray-300">
//                         {record.provider}
//                       </td>

//                       <td>
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             record.status === "Completed"
//                               ? "bg-green-500/20 text-green-400"
//                               : record.status === "Reviewed"
//                               ? "bg-blue-500/20 text-blue-400"
//                               : "bg-yellow-500/20 text-yellow-300"
//                           }`}
//                         >
//                           {record.status}
//                         </span>
//                       </td>

//                       <td>
//                         <div className="flex items-center gap-3">
//                           <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20">
//                             <Eye size={18} />
//                           </button>

//                           <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20">
//                             <Download size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="col-span-3 space-y-6">
//             {/* RECENT UPLOADS */}
//             <div className="bg-[#071B4A] rounded-[32px] p-6 text-white shadow-xl">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Recent Uploads</h2>

//                 <button className="text-[#8EA2FF] text-sm">
//                   View all
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {uploads.map((upload, i) => (
//                   <div
//                     key={i}
//                     className="bg-white/5 rounded-2xl p-4 flex items-start justify-between"
//                   >
//                     <div>
//                       <h3 className="font-semibold">
//                         {upload.title}
//                       </h3>

//                       <p className="text-gray-400 text-sm mt-1">
//                         {upload.date} • {upload.time}
//                       </p>
//                     </div>

//                     <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* UPLOAD CARD */}
//             <div className="bg-gradient-to-br from-[#5B5FFB] to-[#9D4DFF] rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl">
//               <div className="relative z-10">
//                 <h2 className="text-3xl font-bold">
//                   Upload New Record
//                 </h2>

//                 <p className="text-white/80 mt-3 mb-6">
//                   Securely upload your medical records and reports.
//                 </p>

//                 <button className="bg-white text-[#5B5FFB] px-6 py-3 rounded-2xl font-semibold">
//                   Upload Record
//                 </button>
//               </div>

//               <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyRecordsPage;

import React, { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import {
  Search, Bell, Eye, Download, FileText, FlaskConical, 
  Pill, ImageIcon, Plus, ChevronLeft, Upload
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const MyRecordsPage = () => {
  const { user, token } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Lab Report',
    doctorId: '',
    notes: ''
  });
  const [file, setFile] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api/v1';

  // 🔥 1. MAIN RECORDS (your existing endpoint)
  const recordsQuery = useQuery({
    queryKey: ['my-records', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/records/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.records || []),
    enabled: !!user?._id && !!token,
  });

  // 🔥 2. STATS
  const statsQuery = useQuery({
    queryKey: ['records-stats', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/records/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

  // 🔥 3. UPLOAD MUTATION
  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`${API_BASE_URL}/records/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Record uploaded successfully!');
      setShowUploadModal(false);
      setUploadForm({ title: '', category: 'Lab Report', doctorId: '', notes: '' });
      setFile(null);
      recordsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Upload failed');
    }
  });

  const records = recordsQuery.data || [];
  const stats = statsQuery.data || { totalRecords: 0 };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !uploadForm.title) {
      toast.error('Please select a file and enter title');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', uploadForm.title);
    formData.append('category', uploadForm.category);
    formData.append('doctorId', uploadForm.doctorId);
    formData.append('metadata', JSON.stringify({ notes: uploadForm.notes }));
    
    uploadMutation.mutate(formData);
  };

  
  const categoryColors = {
    'REPORT': 'bg-green-500/20 text-green-400',
    'IMAGE': 'bg-blue-500/20 text-blue-400',
    'PRESCRIPTION': 'bg-orange-500/20 text-orange-400',
    'DOCUMENT': 'bg-purple-500/20 text-purple-400',
    'NOTE': 'bg-pink-500/20 text-pink-400',
    default: 'bg-gray-500/20 text-gray-400'
  };

  if (recordsQuery.isLoading) {
    return <div className="flex min-h-screen bg-[#E9EDF8]"><div className="flex-1 p-8">Loading...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-[#E9EDF8]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#081028]">My Medical Records</h1>
            <p className="text-gray-600 mt-2">Manage Your Medical Records and Stay Informed</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-md w-[320px]">
            <Search className="text-gray-400" size={18} />
            <input type="text" placeholder="Search records..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* STATS */}
          <div className="col-span-9 space-y-6">
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-[28px] p-6 text-white shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <FileText size={22} />
                </div>
                <h2 className="text-4xl font-bold">{stats.totalRecords || 0}</h2>
                <p className="mt-2 text-white/80">Total Records</p>
                <button className="mt-6 text-sm">View all →</button>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[28px] p-6 text-white shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <FlaskConical size={22} />
                </div>
                <h2 className="text-4xl font-bold">{stats.byCategory?.['lab-report'] || 0}</h2>
                <p className="mt-2 text-white/80">Lab Reports</p>
                <button className="mt-6 text-sm">View all →</button>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-[28px] p-6 text-white shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Pill size={22} />
                </div>
                <h2 className="text-4xl font-bold">{stats.byCategory?.prescription || 0}</h2>
                <p className="mt-2 text-white/80">Prescriptions</p>
                <button className="mt-6 text-sm">View all →</button>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-[28px] p-6 text-white shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <ImageIcon size={22} />
                </div>
                <h2 className="text-4xl font-bold">{stats.byCategory?.imaging || 0}</h2>
                <p className="mt-2 text-white/80">Imaging Reports</p>
                <button className="mt-6 text-sm">View all →</button>
              </div>
            </div>

            {/* RECORDS TABLE */}
            <div className="bg-[#071B4A] rounded-[32px] p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">All Records</h2>
                <button className="text-[#8EA2FF]">Filter: All Records</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-5">Record Name</th>
                    <th className="pb-5">Category</th>
                    <th className="pb-5">Date</th>
                    <th className="pb-5">Provider</th>
                    <th className="pb-5">Status</th>
                    <th className="pb-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsQuery.isError ? (
                    <tr><td colSpan="6" className="py-12 text-center text-red-400">Failed to load records</td></tr>
                  ) : records.length === 0 ? (
                    <tr><td colSpan="6" className="py-12 text-center text-gray-400">No records found</td></tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record._id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-5 font-medium">{record.title}</td>
                        <td className="text-gray-300">
                          <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[record.category] || categoryColors.default}`}>
                            {record.category}
                          </span>
                        </td>
                        <td className="text-gray-300">
                          {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                        </td>
                        <td className="text-gray-300">{record.metadata?.provider || 'Self'}</td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            record.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            record.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {record.status?.toUpperCase() || 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <a href={record.fileUrl} target="_blank" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20">
                              <Eye size={18} />
                            </a>
                            <a href={record.fileUrl} download className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20">
                              <Download size={18} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-3 space-y-6">
            {/* RECENT UPLOADS */}
            <div className="bg-[#071B4A] rounded-[32px] p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Uploads</h2>
                <button className="text-[#8EA2FF] text-sm">View all</button>
              </div>
              <div className="space-y-4">
                {records.slice(0, 4).map((record) => (
                  <div key={record._id} className="bg-white/5 rounded-2xl p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{record.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {format(new Date(record.createdAt), 'MMM dd')} • {format(new Date(record.createdAt), 'hh:mm a')}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* UPLOAD BUTTON */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-br from-[#5B5FFB] to-[#9D4DFF] rounded-[32px] p-6 text-white w-full relative overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Upload New Record</h3>
                  <p className="text-white/80 text-sm mt-1">Securely upload your medical records</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUploadModal(false)}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6 sticky top-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-white/10 rounded-xl">
                    <ChevronLeft size={24} />
                  </button>
                  <h2 className="text-2xl font-bold text-white">Upload Record</h2>
                </div>
              </div>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">File *</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*,.pdf"
                    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white file:bg-white/20 file:border-0 file:text-gray-700 file:rounded-lg file:px-4 file:py-2 file:cursor-pointer hover:file:bg-white/30"
                    required
                  />
                  {file && <p className="text-sm text-green-400 mt-1">{file.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Blood Test Report"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option> REPORT</option>
                    <option>IMAGE</option>
                    <option>PRESCRIPTION</option>
                    <option>DOCUMENT</option>
                    <option>NOTE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={uploadForm.notes}
                    onChange={(e) => setUploadForm({...uploadForm, notes: e.target.value})}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 py-4 rounded-2xl font-semibold shadow-xl transition-all"
                >
                  {uploadMutation.isPending ? 'Uploading...' : 'Upload Record'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecordsPage;