import {
  Search,
  Bell,
  Calendar,
  Video,
  Eye,
  MessageSquare,
  Plus,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";

import Sidebar from "../FacilityDashboard/Sidebar";

const appointments = [
  {
    patient: "Sarah Johnson",
    department: "Cardiology",
    doctor: "Dr. Emily",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    patient: "Michael Brown",
    department: "Neurology",
    doctor: "Dr. James",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    patient: "Emma Wilson",
    department: "Orthopedics",
    doctor: "Dr. Smith",
    time: "11:15 AM",
    status: "Confirmed",
  },
  {
    patient: "David Miller",
    department: "Emergency",
    doctor: "Dr. Robert",
    time: "01:00 PM",
    status: "Cancelled",
  },
];

const stats = [
  {
    title: "Today's Appointments",
    value: "248",
    icon: <Calendar />,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Confirmed",
    value: "186",
    icon: <CheckCircle />,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Pending",
    value: "42",
    icon: <Clock3 />,
    color: "from-orange-500 to-amber-700",
  },
  {
    title: "Cancelled",
    value: "20",
    icon: <XCircle />,
    color: "from-pink-500 to-rose-700",
  },
];

export default function FacilityAppointmentsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">

      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Appointments Overview 👋
            </h1>

            <p className="text-gray-600 mt-2">
              Manage hospital appointments and schedules.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[350px] shadow-lg">

              <input
                type="text"
                placeholder="Search appointments..."
                className="outline-none flex-1"
              />

              <Search className="text-gray-500" />
            </div>

            <button className="bg-white p-4 rounded-2xl shadow-lg">
              <Bell />
            </button>

            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="w-14 h-14 rounded-full border-4 border-purple-500"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {stats.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <h1 className="text-4xl font-bold">
                    {card.value}
                  </h1>

                  <p className="mt-2 text-gray-200">
                    {card.title}
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-2xl">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-12 gap-6 mt-8">

          {/* LEFT */}
          <div className="col-span-12 xl:col-span-8 space-y-6">

            {/* SCHEDULE */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-semibold">
                  Today's Schedule
                </h2>

                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-2xl flex items-center gap-2">
                  <Plus size={18} />
                  Add Appointment
                </button>
              </div>

              <div className="space-y-4">

                {appointments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="bg-purple-500/20 p-4 rounded-2xl">
                        <Calendar />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">
                          {item.patient}
                        </h3>

                        <p className="text-gray-400">
                          {item.department} • {item.doctor}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <h3 className="font-semibold">
                        {item.time}
                      </h3>

                      <span
                        className={`text-sm ${
                          item.status === "Confirmed"
                            ? "text-green-400"
                            : item.status === "Pending"
                            ? "text-orange-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TABLE */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-3xl font-semibold mb-6">
                All Appointments
              </h2>

              <table className="w-full">

                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">Patient</th>
                    <th>Department</th>
                    <th>Doctor</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {appointments.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >

                      <td className="py-5 flex items-center gap-4">

                        <img
                          src={`https://i.pravatar.cc/100?img=${index + 60}`}
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />

                        <h3>{item.patient}</h3>
                      </td>

                      <td>{item.department}</td>

                      <td>{item.doctor}</td>

                      <td>{item.time}</td>

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

                          <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                            <Eye size={18} />
                          </button>

                          <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                            <Video size={18} />
                          </button>

                          <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                            <MessageSquare size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 xl:col-span-4 space-y-6">

            {/* REQUESTS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Appointment Requests
              </h2>

              <div className="space-y-5">

                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="bg-white/5 rounded-2xl p-4"
                  >

                    <h3 className="font-semibold">
                      Olivia Martinez
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Emergency Consultation
                    </p>

                    <div className="flex gap-3 mt-4">

                      <button className="flex-1 bg-green-500 py-2 rounded-xl">
                        Accept
                      </button>

                      <button className="flex-1 bg-red-500 py-2 rounded-xl">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-2xl flex items-center justify-center gap-3">
                  <Calendar />
                  Add Appointment
                </button>

                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-4 rounded-2xl flex items-center justify-center gap-3">
                  <Video />
                  Video Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}