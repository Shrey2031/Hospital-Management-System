

// import Sidebar from '../DoctorDashboard/Sidebar';
// import { Search, Bell, Eye, MessageSquare, MoreVertical, Filter, Plus } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext"; // Add this import

// export default function PatientsPage() {
//   const { token } = useAuth();
//   const API_BASE_URL = "http://localhost:3000/api/v1";

//   // ✅ Fetch REAL patients from appointments (same API as AppointmentCard)
//   const { data: appointments, isLoading, error } = useQuery({
//     queryKey: ["doctorPatients"],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${API_BASE_URL}/appointments/my`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data.appointments;
//     },
//   });

//   // ✅ Transform appointments data to match your patients table format
//   const patients = appointments?.map((appointment) => ({
//     id: appointment._id,
//     name: appointment.patientId?.fullname || "Unknown Patient",
//     age: appointment.patientId?.age || "N/A",
//     disease: appointment.type || "General Checkup", // Use appointment type as disease
//     status: appointment.status === "CONFIRMED" ? "Active" : 
//             appointment.status === "PENDING" ? "Follow-up" : "Inactive",
//     appointment: appointment, // Keep full appointment data for actions
//   })) || [];

//   // Calculate stats from real data
//   const stats = [
//     {
//       title: "Total Patients",
//       value: patients.length.toString(),
//       color: "from-emerald-500 to-teal-700",
//     },
//     {
//       title: "Critical Cases",
//       value: "18", // You can calculate this from real data later
//       color: "from-pink-500 to-rose-700",
//     },
//     {
//       title: "Follow-ups",
//       value: patients.filter(p => p.status === "Follow-up").length.toString(),
//       color: "from-blue-500 to-indigo-700",
//     },
//     {
//       title: "New Patients",
//       value: "14", // You can calculate this from real data later
//       color: "from-purple-500 to-violet-700",
//     },
//   ];

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
//           <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
//             <p>Loading patients...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
// // Error state - CORRECTED VERSION
// if (error) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
//         <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
//           <p className="text-red-400">Failed to load patients</p>
//         </div>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="flex min-h-screen">
//       {/* 🔥 SIDEBAR */}
//       <Sidebar />
      
//       {/* 🔥 MAIN CONTENT */}
//       <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-10">
//           <div>
//             <h1 className="text-4xl font-bold text-[#111827]">
//               Good morning, Dr. Emily 👋
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage your patients and medical records.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
//               <input
//                 type="text"
//                 placeholder="Search patients..."
//                 className="outline-none flex-1"
//               />
//               <Search className="text-gray-500" />
//             </div>

//             <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//               <Bell />
//             </button>

//             <img
//               src="https://i.pravatar.cc/150?img=47"
//               alt="Doctor Profile"
//               className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
//             />
//           </div>
//         </div>

//         {/* STATS - Now using real data */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//           {stats.map((card, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
//             >
//               <h1 className="text-4xl font-bold">{card.value}</h1>
//               <p className="mt-2 text-gray-200">{card.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* MAIN SECTION */}
//         <div className="grid grid-cols-12 gap-6">
//           {/* TABLE */}
//           <div className="col-span-12 xl:col-span-9 bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-3xl font-semibold">All Patients</h2>
//               <div className="flex gap-4">
//                 <button className="bg-white/10 px-5 py-3 rounded-2xl flex items-center gap-2">
//                   <Filter size={18} />
//                   Filter
//                 </button>
//                 <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-2xl flex items-center gap-2">
//                   <Plus size={18} />
//                   Add Patient
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[600px]">
//                 <thead>
//                   <tr className="text-left text-gray-400 border-b border-white/10">
//                     <th className="pb-4">Patient</th>
//                     <th>Age</th>
//                     <th>Disease</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {patients.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="py-12 text-center text-gray-400">
//                         No patients found
//                       </td>
//                     </tr>
//                   ) : (
//                     patients.map((patient, index) => (
//                       <tr
//                         key={patient.id}
//                         className="border-b border-white/5 hover:bg-white/5 transition"
//                       >
//                         <td className="py-5 flex items-center gap-4">
//                           <img
//                             src={`https://i.pravatar.cc/100?img=${index + 10}`}
//                             alt=""
//                             className="w-12 h-12 rounded-full"
//                           />
//                           <div>
//                             <h3 className="font-semibold">{patient.name}</h3>
//                             <p className="text-gray-400 text-sm">
//                               ID: {patient.id.slice(-6)}
//                             </p>
//                           </div>
//                         </td>

//                         <td>{patient.age}</td>

//                         <td>
//                           <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-xl text-sm">
//                             {patient.disease}
//                           </span>
//                         </td>

//                         <td>
//                           <span
//                             className={`px-3 py-1 rounded-xl text-sm ${
//                               patient.status === "Active"
//                                 ? "bg-green-500/20 text-green-300"
//                                 : patient.status === "Follow-up"
//                                 ? "bg-orange-500/20 text-orange-300"
//                                 : "bg-red-500/20 text-red-300"
//                             }`}
//                           >
//                             {patient.status}
//                           </span>
//                         </td>

//                         <td>
//                           <div className="flex items-center gap-3">
//                             <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
//                               <Eye size={18} />
//                             </button>
//                             <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
//                               <MessageSquare size={18} />
//                             </button>
//                             <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
//                               <MoreVertical size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="col-span-12 xl:col-span-3 space-y-6">
//             {/* Today's New Patients - Using real data */}
//             <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
//               <h2 className="text-2xl font-semibold mb-6">Today's New Patients</h2>
//               <div className="space-y-5">
//                 {patients.slice(0, 3).map((patient, index) => (
//                   <div key={patient.id} className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`https://i.pravatar.cc/100?img=${index + 20}`}
//                         alt=""
//                         className="w-12 h-12 rounded-full"
//                       />
//                       <div>
//                         <h3 className="font-semibold">{patient.name}</h3>
//                         <p className="text-sm text-gray-400">{patient.disease}</p>
//                       </div>
//                     </div>
//                     <span className="text-green-400 text-sm">09:30</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Quick Notes */}
//             <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
//               <h2 className="text-2xl font-semibold mb-6">Quick Notes</h2>
//               <textarea
//                 placeholder="Add patient notes..."
//                 className="w-full h-32 bg-white/5 rounded-2xl p-4 outline-none resize-none"
//               />
//               <button className="w-full mt-5 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-2xl">
//                 Save Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Sidebar from '../DoctorDashboard/Sidebar';
import { Search, Bell, Eye, MessageSquare, MoreVertical, Filter, Plus, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function PatientsPage() {
  const { token } = useAuth();
  const API_BASE_URL = "http://localhost:3000/api/v1";
  const queryClient = useQueryClient();
  
  // 🔥 Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  
  // 🔥 Form state
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    medicalHistory: ""
  });

  // ✅ Fetch REAL patients from appointments
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["doctorPatients"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE_URL}/appointments/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.appointments;
    },
  });

  // ✅ Add patient mutation
  const addPatientMutation = useMutation({
    mutationFn: async (patientData) => {
      const res = await axios.post(
        `${API_BASE_URL}/doctors/patients/add`,
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorPatients"]);
      setShowAddModal(false);
      setFormData({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        address: "",
        medicalHistory: ""
      });
      alert("Patient added successfully!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to add patient");
    }
  });

  // ✅ Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addPatientMutation.mutate(formData);
  };

  // ✅ Transform appointments data
  const patients = appointments?.map((appointment) => ({
    id: appointment._id,
    name: appointment.patientId?.fullname || "Unknown Patient",
    age: appointment.patientId?.age || "N/A",
    disease: appointment.type || "General Checkup",
    status: appointment.status === "CONFIRMED" ? "Active" : 
            appointment.status === "PENDING" ? "Follow-up" : "Inactive",
    appointment: appointment,
  })) || [];

  // ✅ Stats
  const stats = [
    {
      title: "Total Patients",
      value: patients.length.toString(),
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Critical Cases",
      value: "18",
      color: "from-pink-500 to-rose-700",
    },
    {
      title: "Follow-ups",
      value: patients.filter(p => p.status === "Follow-up").length.toString(),
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "New Patients",
      value: "14",
      color: "from-purple-500 to-violet-700",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <p>Loading patients...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <p className="text-red-400">Failed to load patients</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* 🔥 SIDEBAR */}
      <Sidebar />
      
      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
             Patients Overview 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your Patients Overview .
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
              <input
                type="text"
                placeholder="Search patients..."
                className="outline-none flex-1"
              />
              <Search className="text-gray-500" />
            </div>

            <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Bell />
            </button>

            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Doctor Profile"
              className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              <h1 className="text-4xl font-bold">{card.value}</h1>
              <p className="mt-2 text-gray-200">{card.title}</p>
            </div>
          ))}
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-12 gap-6">
          {/* TABLE */}
          <div className="col-span-12 xl:col-span-9 bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-semibold">All Patients</h2>
              <div className="flex gap-4">
                <button className="bg-white/10 px-5 py-3 rounded-2xl flex items-center gap-2">
                  <Filter size={18} />
                  Filter
                </button>
                {/* ✅ Add Patient Button - Opens Modal */}
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-2xl flex items-center gap-2 hover:shadow-xl transition-all"
                >
                  <Plus size={18} />
                  Add Patient
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">Patient</th>
                    <th>Age</th>
                    <th>Disease</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        No patients found
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient, index) => (
                      <tr
                        key={patient.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-5 flex items-center gap-4">
                          <img
                            src={`https://i.pravatar.cc/100?img=${index + 10}`}
                            alt=""
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-gray-400 text-sm">
                              ID: {patient.id.slice(-6)}
                            </p>
                          </div>
                        </td>

                        <td>{patient.age}</td>

                        <td>
                          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-xl text-sm">
                            {patient.disease}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-xl text-sm ${
                              patient.status === "Active"
                                ? "bg-green-500/20 text-green-300"
                                : patient.status === "Follow-up"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {patient.status}
                          </span>
                        </td>

                        <td>
                          <div className="flex items-center gap-3">
                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <Eye size={18} />
                            </button>
                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <MessageSquare size={18} />
                            </button>
                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <MoreVertical size={18} />
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

          {/* RIGHT PANEL */}
          <div className="col-span-12 xl:col-span-3 space-y-6">
            {/* Today's New Patients */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6">Today's New Patients</h2>
              <div className="space-y-5">
                {patients.slice(0, 3).map((patient, index) => (
                  <div key={patient.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/100?img=${index + 20}`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-sm text-gray-400">{patient.disease}</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">09:30</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Notes */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6">Quick Notes</h2>
              <textarea
                placeholder="Add patient notes..."
                className="w-full h-32 bg-white/5 rounded-2xl p-4 outline-none resize-none"
              />
              <button className="w-full mt-5 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-2xl">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ADD PATIENT MODAL POPUP */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Add New Patient</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name & Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Row 3: Password */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter password"
                />
              </div>

              {/* Row 4: DOB & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
                           {/* Row 5: Blood Group */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Row 6: Address */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="2"
                  placeholder="Enter address"
                />
              </div>

              {/* Row 7: Medical History */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                  placeholder="Enter medical history ( allergies, ongoing treatments, etc.)"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white/10 py-4 rounded-xl hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addPatientMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {addPatientMutation.isPending ? "Adding..." : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}