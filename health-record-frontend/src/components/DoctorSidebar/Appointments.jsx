

// import Sidebar from '../DoctorDashboard/Sidebar'; // 🔥 ADD THIS IMPORT
// import {
//   Search,
//   Bell,
//   Eye,
//   Calendar,
//   Video,
//   FileText,
//   MessageSquare,
// } from "lucide-react";

// // ... your existing appointments & stats data
// const appointments = [
//   {
//     patient: "Sarah Johnson",
//     type: "Consultation",
//     time: "09:00 AM",
//     status: "Confirmed",
//   },
//   {
//     patient: "Michael Brown",
//     type: "Follow-up",
//     time: "10:00 AM",
//     status: "Confirmed",
//   },
//   {
//     patient: "Emily Davis",
//     type: "Consultation",
//     time: "11:30 AM",
//     status: "Pending",
//   },
//   {
//     patient: "David Wilson",
//     type: "New Patient",
//     time: "01:00 PM",
//     status: "Cancelled",
//   },
// ];

// const stats = [
//   {
//     title: "Today's Appointments",
//     value: "24",
//     color: "from-blue-500 to-indigo-700",
//   },
//   {
//     title: "Confirmed",
//     value: "18",
//     color: "from-emerald-500 to-teal-700",
//   },
//   {
//     title: "Pending",
//     value: "4",
//     color: "from-orange-500 to-amber-700",
//   },
//   {
//     title: "Cancelled",
//     value: "2",
//     color: "from-pink-500 to-rose-700",
//   },
// ];

// export default function AppointmentPage() {
//   return (
//     <div className="flex min-h-screen">
//       {/* 🔥 SIDEBAR - Fixed left */}
//       <Sidebar />
      
//       {/* 🔥 MAIN CONTENT - Takes remaining space */}
//       <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-10">
//           <div>
//             <h1 className="text-4xl font-bold text-[#111827]">
//               Appointments Overview 👋
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage your daily schedule and appointments.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
//               <input
//                 type="text"
//                 placeholder="Search appointments..."
//                 className="outline-none flex-1"
//               />
//               <Search className="text-gray-500" />
//             </div>

//             <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
//               <Bell />
//             </button>

//             <img
//               src="https://i.pravatar.cc/150?img=47"
//               alt="Doctor Profile"
//               className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
//             />
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//           {stats.map((card, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
//             >
//               <h1 className="text-4xl font-bold">{card.value}</h1>
//               <p className="mt-2 text-gray-200">{card.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-12 gap-6">
          
//           {/* LEFT: Calendar + Table (8/12 columns) */}
//           <div className="col-span-12 xl:col-span-8 space-y-6">

//             {/* WEEKLY SCHEDULE */}
//             <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
//               <h2 className="text-3xl font-bold mb-8">Weekly Schedule</h2>
//               <div className="space-y-4">
//                 {appointments.map((item, index) => (
//                   <div
//                     key={index}
//                     className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-200 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="bg-purple-500/20 p-4 rounded-2xl">
//                         <Calendar size={24} />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">
//                           {item.patient}
//                         </h3>
//                         <p className="text-gray-400">{item.type}</p>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <h3 className="font-bold text-lg">{item.time}</h3>
//                       <span
//                         className={`px-3 py-1 rounded-xl text-sm font-medium ${
//                           item.status === "Confirmed"
//                             ? "bg-green-500/20 text-green-300"
//                             : item.status === "Pending"
//                             ? "bg-orange-500/20 text-orange-300"
//                             : "bg-red-500/20 text-red-300"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ALL APPOINTMENTS TABLE */}
//             <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
//               <h2 className="text-3xl font-bold mb-8">All Appointments</h2>
//                   <table className="w-full">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-white/10">
//                   <th className="pb-4">Patient</th>
//                   <th>Type</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {appointments.map((item, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-white/5 hover:bg-white/5"
//                   >
//                     <td className="py-5 flex items-center gap-4">
//                       <img
//                         src={`https://i.pravatar.cc/100?img=${index + 30}`}
//                         alt=""
//                         className="w-12 h-12 rounded-full"
//                       />

//                       <h3>{item.patient}</h3>
//                     </td>

//                     <td>{item.type}</td>

//                     <td>{item.time}</td>

//                     <td>
//                       <span
//                         className={`px-3 py-1 rounded-xl text-sm ${
//                           item.status === "Confirmed"
//                             ? "bg-green-500/20 text-green-300"
//                             : item.status === "Pending"
//                             ? "bg-orange-500/20 text-orange-300"
//                             : "bg-red-500/20 text-red-300"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>

//                     <td>
//                       <div className="flex gap-3">
//                         <button className="bg-white/10 p-3 rounded-xl">
//                           <Eye size={18} />
//                         </button>

//                         <button className="bg-white/10 p-3 rounded-xl">
//                           <Video size={18} />
//                         </button>

//                         <button className="bg-white/10 p-3 rounded-xl">
//                           <MessageSquare size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             </div>
//           </div>

//           {/* RIGHT: Sidebar panels (4/12 columns) */}
//           <div className="col-span-12 xl:col-span-4 space-y-6">

//             {/* APPOINTMENT REQUESTS */}
//             <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
//               <h2 className="text-2xl font-bold mb-6">Appointment Requests</h2>
//               <div className="space-y-5">
//                 {[1, 2].map((item) => (
//                   <div key={item} className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition">
//                     <h3 className="font-semibold">Olivia Martinez</h3>
//                     <p className="text-gray-400 text-sm mt-1">Consultation Request</p>
//                     <div className="flex gap-3 mt-4">
//                       <button className="flex-1 bg-green-500/80 hover:bg-green-500 text-white py-2 rounded-xl font-medium transition">
//                         Accept
//                       </button>
//                       <button className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-2 rounded-xl font-medium transition">
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
//               <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
//               <div className="space-y-4">
//                 <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
//                   <Calendar size={20} />
//                   Add Appointment
//                 </button>
//                 <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
//                   <Video size={20} />
//                   Video Consultation
//                 </button>
//                 <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
//                   <FileText size={20} />
//                   Generate Prescription
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import Sidebar from '../DoctorDashboard/Sidebar';
import {
  Search,
  Bell,
  Eye,
  Calendar,
  Video,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentPage() {
  const { token } = useAuth();
  const API_BASE_URL = "http://localhost:3000/api/v1";

  // ✅ Fetch REAL appointments from API
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["doctorAppointments"],
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

  // ✅ Transform appointments data for display
  const allAppointments = appointments?.map((appointment) => ({
    id: appointment._id,
    patient: appointment.patientId?.fullname || "Unknown Patient",
    type: appointment.type || "General",
    time: appointment.slot?.startTime || "N/A",
    date: appointment.slot?.date ? new Date(appointment.slot.date).toLocaleDateString() : "N/A",
    status: appointment.status === "CONFIRMED" ? "Confirmed" : 
            appointment.status === "PENDING" ? "Pending" : 
            appointment.status === "CANCELLED" ? "Cancelled" : appointment.status,
    notes: appointment.notes || "",
    patientId: appointment.patientId?._id,
  })) || [];

  // ✅ Calculate stats from real data
  const stats = [
    {
      title: "Today's Appointments",
      value: allAppointments.length.toString(),
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "Confirmed",
      value: allAppointments.filter(a => a.status === "Confirmed").length.toString(),
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Pending",
      value: allAppointments.filter(a => a.status === "Pending").length.toString(),
      color: "from-orange-500 to-amber-700",
    },
    {
      title: "Cancelled",
      value: allAppointments.filter(a => a.status === "Cancelled").length.toString(),
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
            <p className="text-xl">Loading appointments...</p>
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
            <p className="text-red-400 text-xl">Failed to load appointments</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* 🔥 SIDEBAR - Fixed left */}
      <Sidebar />
      
      {/* 🔥 MAIN CONTENT - Takes remaining space */}
      <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Appointments Overview 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your daily schedule and appointments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
              <input
                type="text"
                placeholder="Search appointments..."
                className="outline-none flex-1"
              />
              <Search className="text-gray-500" />
            </div>

            <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Bell />
            </button>

            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Doctor Profile"
              className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* STATS - Now using real data */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((card, index) => (
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
          
          {/* LEFT: Calendar + Table (8/12 columns) */}
          <div className="col-span-12 xl:col-span-8 space-y-6">

            {/* WEEKLY SCHEDULE */}
            <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-8">Weekly Schedule</h2>
              <div className="space-y-4">
                {allAppointments.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No appointments found</p>
                ) : (
                  allAppointments.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-500/20 p-4 rounded-2xl">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {item.patient}
                          </h3>
                          <p className="text-gray-400">{item.type} - {item.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <h3 className="font-bold text-lg">{item.time}</h3>
                        <span
                          className={`px-3 py-1 rounded-xl text-sm font-medium ${
                            item.status === "Confirmed"
                              ? "bg-green-500/20 text-green-300"
                              : item.status === "Pending"
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ALL APPOINTMENTS TABLE */}
            <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-8">All Appointments</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">Patient</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    allAppointments.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-5 flex items-center gap-4">
                          <img
                            src={`https://i.pravatar.cc/100?img=${index + 30}`}
                            alt=""
                            className="w-12 h-12 rounded-full"
                          />

                          <div>
                            <h3>{item.patient}</h3>
                            <p className="text-gray-400 text-sm">{item.notes}</p>
                          </div>
                        </td>

                        <td>
                          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-xl text-sm">
                            {item.type}
                          </span>
                        </td>

                        <td>
                          <div>
                            <p className="font-medium">{item.time}</p>
                            <p className="text-gray-400 text-sm">{item.date}</p>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-xl text-sm ${
                              item.status === "Confirmed"
                                ? "bg-green-500/20 text-green-300"
                                : item.status === "Pending"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="flex gap-3">
                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <Eye size={18} />
                            </button>

                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <Video size={18} />
                            </button>

                            <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                              <MessageSquare size={18} />
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

          {/* RIGHT: Sidebar panels (4/12 columns) */}
          <div className="col-span-12 xl:col-span-4 space-y-6">

            {/* APPOINTMENT REQUESTS - Filtered for PENDING */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Appointment Requests</h2>
              <div className="space-y-5">
                {allAppointments.filter(a => a.status === "Pending").length === 0 ? (
                  <p className="text-gray-400">No pending requests</p>
                ) : (
                  allAppointments
                    .filter(a => a.status === "Pending")
                    .slice(0, 2)
                    .map((appointment) => (
                      <div key={appointment.id} className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition">
                        <h3 className="font-semibold">{appointment.patient}</h3>
                        <p className="text-gray-400 text-sm mt-1">{appointment.type} - {appointment.time}</p>
                        <div className="flex gap-3 mt-4">
                          <button className="flex-1 bg-green-500/80 hover:bg-green-500 text-white py-2 rounded-xl font-medium transition">
                            Accept
                          </button>
                          <button className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-2 rounded-xl font-medium transition">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Calendar size={20} />
                  Add Appointment
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Video size={20} />
                  Video Consultation
                </button>
                <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200">
                  <FileText size={20} />
                  Generate Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}