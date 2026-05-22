import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import {
  Pill, Search, Download, CalendarDays, Clock3, 
  ShieldCheck, Plus
} from "lucide-react";
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

export default function PrescriptionsPage() {
  const { user, token } = useAuth();
  const [search, setSearch] = useState('');


  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


  // 🔥 1. MAIN PRESCRIPTIONS + STATS (your existing endpoint)
  const prescriptionsQuery = useQuery({
    queryKey: ['patient-prescriptions', user?._id, search],
    queryFn: () => axios.get(`${API_BASE_URL}/prescriptions/my`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { search }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  const prescriptions = prescriptionsQuery.data?.prescriptions || [];
  const stats = prescriptionsQuery.data?.stats || { active: 0, completed: 0, total: 0 };

  if (prescriptionsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#dfe6f7] flex">
        <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dfe6f7] flex">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#081028]">Prescriptions</h1>
              <p className="text-gray-600 mt-2">Track medications and prescription history.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg">
              <Plus size={20} /> Add Prescription
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Medication Overview */}
            <div className="rounded-3xl bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] p-6 text-white shadow-xl lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Medication Overview</h2>
                  <p className="text-white/80 mt-2">Manage your ongoing and completed medications.</p>
                </div>
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                  <Pill size={40} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">{stats.total || 0}</h3>
                  <p className="text-sm text-white/70 mt-1">Total Medicines</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">{stats.active || 0}</h3>
                  <p className="text-sm text-white/70 mt-1">Active</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">{stats.completed || 0}</h3>
                  <p className="text-sm text-white/70 mt-1">Completed</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">98%</h3>
                  <p className="text-sm text-white/70 mt-1">Adherence</p>
                </div>
              </div>
            </div>

            {/* Health Safety */}
            <div className="bg-[#08153b] rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Health Safety</h2>
                <ShieldCheck className="text-green-400" />
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">Refill Reminder</p>
                  <h3 className="font-semibold mt-1">Vitamin D3 in 3 days</h3>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">Drug Interactions</p>
                  <h3 className="font-semibold mt-1 text-green-400">No issues detected</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription History */}
          <div className="bg-[#08153b] rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Prescription History</h2>
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl w-full md:w-[320px]">
                <Search className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
                />
              </div>
            </div>

            <div className="space-y-5">
              {prescriptionsQuery.isError ? (
                <div className="text-center py-12 text-red-400">Failed to load prescriptions</div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Pill className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No prescriptions found</p>
                </div>
              ) : (
                prescriptions.map((prescription) => {
                  const firstMedicine = prescription.medicines?.[0] || {};
                  const doctorName = prescription.doctorId?.fullName || 'Doctor';
                  
                  return (
                    <div
                      key={prescription._id}
                      className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                          <Pill />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {firstMedicine.name || firstMedicine.medicine || 'Prescription'}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Prescribed by {doctorName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <p className="text-gray-400">Dosage</p>
                          <h4 className="text-white mt-1">
                            {firstMedicine.dosage || firstMedicine.instructions || 'As prescribed'}
                          </h4>
                        </div>
                        <div>
                          <p className="text-gray-400">Duration</p>
                          <h4 className="text-white mt-1">
                            {prescription.duration || 'As needed'}
                          </h4>
                        </div>
                        <div>
                          <p className="text-gray-400">Status</p>
                          <span className={`inline-flex mt-1 px-3 py-1 rounded-full text-sm ${
                            prescription.status === 'active' || prescription.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : prescription.status === 'completed' || prescription.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {prescription.status?.toUpperCase() || 'Active'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {prescription.fileUrl && (
                          <a href={prescription.fileUrl} target="_blank" className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl text-white transition">
                            View PDF
                          </a>
                        )}
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-2xl text-white">
                          <Download size={18} />
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