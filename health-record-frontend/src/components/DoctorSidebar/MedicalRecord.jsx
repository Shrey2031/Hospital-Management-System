import Sidebar from '../DoctorDashboard/Sidebar';
import {
  Search,
  Bell,
  Eye,
  FileText,
  Download,
  Filter,
  Plus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function MedicalReportsPage() {
  const { token } = useAuth();
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


  // ✅ Fetch REAL reports shared with doctor
  const { data: reportsData, isLoading, error } = useQuery({
    queryKey: ["medicalRecords"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE_URL}/records/doctor/records`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  const records = reportsData?.records || [];
  const stats = reportsData?.stats || { total: 0, ready: 0, processing: 0, pending: 0 };

  // Transform data for display
  // const allReports = records.map((record) => ({
  //   id: record._id,
  //   patient: record.patientId?.fullname || "Unknown Patient",
  //   type: record.category || "Medical Record",
  //   date: new Date(record.createdAt).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   }),
  //   status: record.status || "Ready",
  //   title: record.title || "",
  //   fileUrl: record.fileUrl || "",
  // }));
  const allReports = records.map((record) => ({
  id: record._id,
  // Change this line:
  patient: record.uploadedBy?.fullname || "Unknown Patient",
  type: record.category || "Medical Record",
  date: new Date(record.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  status: record.status || "Ready",
  title: record.title || "",
  fileUrl: record.fileUrl || "",
}));

  // Dynamic stats from API
  const statsData = [
    {
      title: "Total Reports",
      value: stats.total.toString(),
      color: "from-indigo-500 to-purple-700",
    },
    {
      title: "Ready to View",
      value: stats.ready.toString(),
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Processing",
      value: stats.processing.toString(),
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "Pending",
      value: stats.pending.toString(),
      color: "from-pink-500 to-rose-700",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <p className="text-xl">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Medical Reports 📋
            </h1>
            <p className="text-gray-600 mt-2">
              View patient lab reports & diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
              <input
                type="text"
                placeholder="Search reports..."
                className="outline-none flex-1"
              />
              <Search className="text-gray-500" />
            </div>
            <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Bell />
            </button>
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Doctor"
              className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statsData.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
            >
              <h1 className="text-4xl font-bold">{card.value}</h1>
              <p className="mt-2 text-gray-200">{card.title}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* LEFT: Reports List */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Recent Reports</h2>
                <div className="flex gap-4">
                  <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
                    <Filter size={18} />
                    Filter
                  </button>
                  <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus size={18} />
                    Request Report
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-4">Patient</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allReports.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          No medical reports found
                        </td>
                      </tr>
                    ) : (
                      allReports.map((report, index) => (
                        <tr key={report.id} className="border-b border-white/5 hover:bg-white/5 transition">
                          <td className="py-5 flex items-center gap-4">
                            <img
                              src={`https://i.pravatar.cc/100?img=${index + 40}`}
                              alt=""
                              className="w-12 h-12 rounded-full"
                            />
                            <h3 className="font-semibold">{report.patient}</h3>
                          </td>
                          <td>
                            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-xl text-sm">
                              {report.type}
                            </span>
                          </td>
                          <td>{report.date}</td>
                          <td>
                            <span
                              className={`px-3 py-1 rounded-xl text-sm font-medium ${
                                report.status === "Ready"
                                  ? "bg-green-500/20 text-green-300"
                                  : report.status === "Processing"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-emerald-500/20 text-emerald-300"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-3">
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <Eye size={18} />
                              </button>
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <Download size={18} />
                              </button>
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <FileText size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Actions */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Pending Actions</h2>
              <div className="space-y-4">
                {allReports.filter(r => r.status !== "Ready").slice(0, 2).map((report) => (
                  <div key={report.id} className="bg-white/5 p-4 rounded-2xl">
                    <h3 className="font-semibold mb-1">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{report.patient}</p>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-xl transition">
                      Review Now
                    </button>
                  </div>
                ))}
                {allReports.filter(r => r.status !== "Ready").length === 0 && (
                  <p className="text-gray-400">No pending reports</p>
                )}
              </div>
            </div>

            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Report Categories</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 px-4 rounded-2xl flex items-center gap-3 hover:from-emerald-600 hover:to-teal-600 transition shadow-lg hover:shadow-xl">
                  <FileText size={18} />
                  Blood Tests (45)
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-3 px-4 rounded-2xl flex items-center gap-3 hover:from-blue-600 hover:to-indigo-600 transition shadow-lg hover:shadow-xl">
                  <FileText size={18} />
                  Imaging (32)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}