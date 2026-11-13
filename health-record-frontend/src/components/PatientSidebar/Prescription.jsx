import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import {
  Pill, Search, Download, ShieldCheck, Plus
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

const statusStyles = {
  active: 'bg-[#E4F1EF] text-[#0B4F4A]',
  Active: 'bg-[#E4F1EF] text-[#0B4F4A]',
  completed: 'bg-[#E7EEFB] text-[#2B5FB8]',
  Completed: 'bg-[#E7EEFB] text-[#2B5FB8]',
  default: 'bg-[#FBF0E0] text-[#8A5A16]',
};

export default function PrescriptionsPage() {
  const { user, token } = useAuth();
  const [search, setSearch] = useState('');

  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

  const prescriptionsQuery = useQuery({
    queryKey: ['patient-prescriptions', user?._id, search],
    queryFn: () => axios.get(`${API_BASE_URL}/prescriptions/patient/prescriptions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  const prescriptions = prescriptionsQuery.data?.prescriptions || [];
  const stats = prescriptionsQuery.data?.stats || { active: 0, completed: 0, total: 0 };

  if (prescriptionsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex">
        <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 p-8 animate-pulse space-y-6">
          <div className="h-9 w-56 bg-[#E4E1D8] rounded-lg"></div>
          <div className="h-44 bg-white border border-[#E4E1D8] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-medium text-[#12181B]">Prescriptions</h1>
              <p className="text-[#5B6470] mt-1.5 text-sm">Track medications and prescription history.</p>
            </div>
            {/* NOTE: no handler was wired to this button in the source file —
                left as-is rather than inventing behavior; needs a modal/route
                the same way "Book Appointment" or "Upload Record" have one. */}
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0E6B64] hover:bg-[#0B4F4A] text-white text-sm font-semibold transition-colors">
              <Plus size={17} /> Add Prescription
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl bg-gradient-to-r from-[#0E6B64] to-[#0B4F4A] p-6 text-white lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-medium">Medication Overview</h2>
                  <p className="text-[#CFEDE9] mt-1.5 text-sm">Manage your ongoing and completed medications.</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Pill size={26} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-2xl font-serif font-semibold">{stats.total || 0}</h3>
                  <p className="text-xs text-[#CFEDE9] mt-1">Total Medicines</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-2xl font-serif font-semibold">{stats.active || 0}</h3>
                  <p className="text-xs text-[#CFEDE9] mt-1">Active</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-2xl font-serif font-semibold">{stats.completed || 0}</h3>
                  <p className="text-xs text-[#CFEDE9] mt-1">Completed</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-2xl font-serif font-semibold">98%</h3>
                  <p className="text-xs text-[#CFEDE9] mt-1">Adherence</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif font-medium text-[#12181B]">Health Safety</h2>
                <ShieldCheck size={17} className="text-[#0E6B64]" />
              </div>
              <div className="space-y-3">
                <div className="bg-[#F7F6F2] rounded-xl p-4 border border-[#E4E1D8]">
                  <p className="text-[#8A929B] text-xs">Refill Reminder</p>
                  <h3 className="font-semibold mt-1 text-sm text-[#12181B]">Vitamin D3 in 3 days</h3>
                </div>
                <div className="bg-[#F7F6F2] rounded-xl p-4 border border-[#E4E1D8]">
                  <p className="text-[#8A929B] text-xs">Drug Interactions</p>
                  <h3 className="font-semibold mt-1 text-sm text-[#0E6B64]">No issues detected</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-serif font-medium text-[#12181B]">Prescription History</h2>
              <div className="flex items-center gap-2.5 bg-[#F7F6F2] border border-[#E4E1D8] px-4 py-3 rounded-xl w-full md:w-[300px]">
                <Search className="text-[#8A929B]" size={16} />
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm text-[#12181B] placeholder-[#8A929B] w-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              {prescriptionsQuery.isError ? (
                <div className="text-center py-12 text-[#E8623F] text-sm">Failed to load prescriptions</div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-12 text-[#8A929B]">
                  <Pill size={40} className="mx-auto mb-4 opacity-60" />
                  <p className="text-sm">No prescriptions found</p>
                </div>
              ) : (
                prescriptions.map((prescription) => {
                  const firstMedicine = prescription.medicines?.[0] || {};
                  const doctorName = prescription.doctorId?.fullName || 'Doctor';
                  const statusClass = statusStyles[prescription.status] || statusStyles.default;

                  return (
                    <div
                      key={prescription._id}
                      className="bg-[#F7F6F2] border border-[#E4E1D8] rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:border-[#0E6B64]/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#FBEAE4] flex items-center justify-center text-[#E8623F] shrink-0">
                          <Pill size={19} />
                        </div>
                        <div>
                          <h3 className="text-[#12181B] font-semibold text-sm">
                            {firstMedicine.name || firstMedicine.medicine || 'Prescription'}
                          </h3>
                          <p className="text-[#8A929B] text-xs mt-0.5">
                            Prescribed by {doctorName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 text-xs">
                        <div>
                          <p className="text-[#8A929B]">Dosage</p>
                          <h4 className="text-[#12181B] mt-1 font-medium">
                            {firstMedicine.dosage || firstMedicine.instructions || 'As prescribed'}
                          </h4>
                        </div>
                        <div>
                          <p className="text-[#8A929B]">Duration</p>
                          <h4 className="text-[#12181B] mt-1 font-medium">
                            {prescription.duration || 'As needed'}
                          </h4>
                        </div>
                        <div>
                          <p className="text-[#8A929B]">Status</p>
                          <span className={`inline-flex mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                            {prescription.status?.toUpperCase() || 'ACTIVE'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {prescription.fileUrl && (
                          <a href={prescription.fileUrl} target="_blank" rel="noreferrer" className="bg-white border border-[#E4E1D8] hover:border-[#0E6B64]/40 px-4 py-2.5 rounded-xl text-[#12181B] text-xs font-medium transition-colors">
                            View PDF
                          </a>
                        )}
                        <button className="flex items-center gap-1.5 bg-white border border-[#E4E1D8] hover:border-[#0E6B64]/40 transition-colors px-4 py-2.5 rounded-xl text-[#12181B] text-xs font-medium">
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}