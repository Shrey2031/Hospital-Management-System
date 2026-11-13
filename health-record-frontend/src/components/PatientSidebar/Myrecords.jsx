import React, { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import {
  Search, Eye, Download, FileText, FlaskConical,
  Pill, ImageIcon, ChevronLeft, Upload
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const inputClass = "w-full bg-[#F7F6F2] border border-[#E4E1D8] rounded-xl px-4 py-3 text-[#12181B] placeholder-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#0E6B64]/25 focus:border-[#0E6B64] transition-all";
const labelClass = "block text-sm font-medium text-[#5B6470] mb-2";

const categoryStyles = {
  REPORT: 'bg-[#E4F1EF] text-[#0B4F4A]',
  IMAGE: 'bg-[#FBEAE4] text-[#B8442B]',
  PRESCRIPTION: 'bg-[#FBF0E0] text-[#8A5A16]',
  DOCUMENT: 'bg-[#EFEDE6] text-[#5B6470]',
  NOTE: 'bg-[#F3E8FB] text-[#7A3FA0]',
  default: 'bg-[#EFEDE6] text-[#5B6470]',
};

const statusStyles = {
  completed: 'bg-[#E4F1EF] text-[#0B4F4A]',
  reviewed: 'bg-[#E7EEFB] text-[#2B5FB8]',
  default: 'bg-[#FBF0E0] text-[#8A5A16]',
};

const MyRecordsPage = () => {
  const { user, token } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  // NOTE: default category fixed to match an actual <option> value below —
  // the original default ('Lab Report') didn't match any option, so the
  // select would silently submit a mismatched category on first upload.
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'REPORT',
    doctorId: '',
    notes: ''
  });
  const [file, setFile] = useState(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

  const recordsQuery = useQuery({
    queryKey: ['my-records', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/records/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.records || []),
    enabled: !!user?._id && !!token,
  });

  const statsQuery = useQuery({
    queryKey: ['records-stats', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/records/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

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
      setUploadForm({ title: '', category: 'REPORT', doctorId: '', notes: '' });
      setFile(null);
      recordsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Upload failed');
    }
  });

  const records = recordsQuery.data || [];
  const stats = statsQuery.data || { totalRecords: 0 };

  // Defensive lookup — backend category keys are inconsistent casing
  // ('lab-report' vs 'REPORT', 'imaging' vs 'IMAGE'). This checks both
  // conventions so the cards don't silently show 0; the real fix is
  // aligning category naming between the upload form and the stats endpoint.
  const labReportsCount = stats.byCategory?.['lab-report'] ?? stats.byCategory?.REPORT ?? 0;
  const prescriptionsCount = stats.byCategory?.prescription ?? stats.byCategory?.PRESCRIPTION ?? 0;
  const imagingCount = stats.byCategory?.imaging ?? stats.byCategory?.IMAGE ?? 0;

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

  if (recordsQuery.isLoading) {
    return (
      <div className="flex min-h-screen bg-[#F7F6F2]">
        <Sidebar />
        <div className="flex-1 p-8 animate-pulse space-y-6">
          <div className="h-9 w-72 bg-[#E4E1D8] rounded-lg"></div>
          <div className="grid grid-cols-4 gap-5">
            {Array(4).fill().map((_, i) => (
              <div key={i} className="h-32 bg-white border border-[#E4E1D8] rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Records', value: stats.totalRecords || 0, icon: FileText, accent: '#0E6B64', accentBg: '#E4F1EF' },
    { label: 'Lab Reports', value: labReportsCount, icon: FlaskConical, accent: '#D98C2B', accentBg: '#FBF0E0' },
    { label: 'Prescriptions', value: prescriptionsCount, icon: Pill, accent: '#E8623F', accentBg: '#FBEAE4' },
    { label: 'Imaging Reports', value: imagingCount, icon: ImageIcon, accent: '#5B6470', accentBg: '#EFEDE6' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F6F2]">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-medium text-[#12181B]">My Medical Records</h1>
            <p className="text-[#5B6470] mt-1.5 text-sm">Manage your medical records and stay informed</p>
          </div>
          <div className="flex items-center gap-2.5 bg-white border border-[#E4E1D8] px-4 py-3 rounded-xl w-full sm:w-[300px] focus-within:ring-2 focus-within:ring-[#0E6B64]/25 focus-within:border-[#0E6B64] transition-all">
            <Search className="text-[#8A929B]" size={16} />
            <input type="text" placeholder="Search records..." className="bg-transparent outline-none w-full text-sm text-[#12181B] placeholder-[#8A929B]" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((card) => (
                <div key={card.label} className="bg-white border border-[#E4E1D8] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: card.accentBg }}>
                    <card.icon size={18} style={{ color: card.accent }} />
                  </div>
                  <h2 className="text-3xl font-serif font-semibold text-[#12181B]">{card.value}</h2>
                  <p className="mt-1.5 text-sm text-[#5B6470]">{card.label}</p>
                  <button className="mt-4 text-xs font-semibold" style={{ color: card.accent }}>View all →</button>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-xl font-serif font-medium text-[#12181B]">All Records</h2>
                <button className="text-sm text-[#0E6B64] font-medium hover:text-[#0B4F4A] transition-colors">Filter: All Records</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-[#E4E1D8]">
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Record Name</th>
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Category</th>
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Date</th>
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Provider</th>
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Status</th>
                    <th className="pb-4 text-xs font-semibold text-[#8A929B] uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsQuery.isError ? (
                    <tr><td colSpan="6" className="py-12 text-center text-[#E8623F] text-sm">Failed to load records</td></tr>
                  ) : records.length === 0 ? (
                    <tr><td colSpan="6" className="py-12 text-center text-[#8A929B] text-sm">No records found</td></tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record._id} className="border-b border-[#E4E1D8] hover:bg-[#F7F6F2] transition-colors">
                        <td className="py-4 font-medium text-[#12181B] text-sm">{record.title}</td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[record.category] || categoryStyles.default}`}>
                            {record.category}
                          </span>
                        </td>
                        <td className="text-[#5B6470] text-sm">{format(new Date(record.createdAt), 'MMM dd, yyyy')}</td>
                        <td className="text-[#5B6470] text-sm">{record.metadata?.provider || 'Self'}</td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[record.status] || statusStyles.default}`}>
                            {record.status?.toUpperCase() || 'PENDING'}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <a href={record.fileUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center hover:border-[#0E6B64]/40 transition-colors">
                              <Eye size={15} className="text-[#5B6470]" />
                            </a>
                            <a href={record.fileUrl} download className="w-9 h-9 rounded-lg bg-[#F7F6F2] border border-[#E4E1D8] flex items-center justify-center hover:border-[#0E6B64]/40 transition-colors">
                              <Download size={15} className="text-[#5B6470]" />
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

          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-serif font-medium text-[#12181B]">Recent Uploads</h2>
                <button className="text-[#0E6B64] text-xs font-semibold hover:text-[#0B4F4A] transition-colors">View all</button>
              </div>
              <div className="space-y-3">
                {records.slice(0, 4).map((record) => (
                  <div key={record._id} className="bg-[#F7F6F2] rounded-xl p-3.5 flex items-start justify-between border border-[#E4E1D8]">
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm text-[#12181B] truncate">{record.title}</h3>
                      <p className="text-[#8A929B] text-xs mt-1">
                        {format(new Date(record.createdAt), 'MMM dd')} • {format(new Date(record.createdAt), 'hh:mm a')}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#0E6B64] mt-1.5 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#0E6B64] hover:bg-[#0B4F4A] rounded-2xl p-6 text-white w-full transition-colors"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Upload New Record</h3>
                  <p className="text-white/75 text-xs mt-1">Securely upload your medical records</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#12181B]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl border border-[#E4E1D8]" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-[#E4E1D8] p-6 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-[#F7F6F2] rounded-lg transition-all">
                  <ChevronLeft size={20} className="text-[#5B6470]" />
                </button>
                <h2 className="text-lg font-serif font-medium text-[#12181B]">Upload Record</h2>
              </div>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleUpload} className="space-y-5">
                <div>
                  <label className={labelClass}>File *</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*,.pdf"
                    className="w-full border border-[#E4E1D8] rounded-xl px-4 py-3 text-sm text-[#12181B] file:bg-[#E4F1EF] file:border-0 file:text-[#0B4F4A] file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:cursor-pointer file:font-medium hover:file:bg-[#0E6B64] hover:file:text-white transition-colors"
                    required
                  />
                  {file && <p className="text-sm text-[#0E6B64] mt-1.5">{file.name}</p>}
                </div>

                <div>
                  <label className={labelClass}>Title *</label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., Blood Test Report"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Category *</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className={inputClass}
                  >
                    <option value="REPORT">Report</option>
                    <option value="IMAGE">Image</option>
                    <option value="PRESCRIPTION">Prescription</option>
                    <option value="DOCUMENT">Document</option>
                    <option value="NOTE">Note</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Notes</label>
                  <textarea
                    value={uploadForm.notes}
                    onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-vertical`}
                    placeholder="Additional details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadMutation.isPending}
                  className="w-full bg-[#0E6B64] hover:bg-[#0B4F4A] disabled:opacity-60 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold text-sm text-white transition-colors"
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