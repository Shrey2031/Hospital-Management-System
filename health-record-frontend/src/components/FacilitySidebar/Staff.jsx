import {
  Search,
  Bell,
  Users,
  UserCheck,
  Stethoscope,
  Clock3,
  Eye,
  MessageSquare,
  MoreVertical,
  Plus,
} from "lucide-react";

import Sidebar from "../FacilityDashboard/Sidebar";

const staff = [
  {
    name: "Dr. Emily Watson",
    role: "Cardiologist",
    department: "Cardiology",
    shift: "09:00 AM - 05:00 PM",
    status: "On Duty",
  },
  {
    name: "Dr. James Wilson",
    role: "Neurologist",
    department: "Neurology",
    shift: "10:00 AM - 06:00 PM",
    status: "Off Duty",
  },
  {
    name: "Nurse Olivia",
    role: "Senior Nurse",
    department: "Emergency",
    shift: "08:00 AM - 04:00 PM",
    status: "On Duty",
  },
  {
    name: "Dr. Robert Smith",
    role: "Orthopedic",
    department: "Orthopedics",
    shift: "11:00 AM - 07:00 PM",
    status: "On Leave",
  },
];

const stats = [
  {
    title: "Total Staff",
    value: "850+",
    icon: <Users />,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Doctors",
    value: "145",
    icon: <Stethoscope />,
    color: "from-purple-500 to-violet-700",
  },
  {
    title: "Nurses",
    value: "320",
    icon: <UserCheck />,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "On Duty",
    value: "520",
    icon: <Clock3 />,
    color: "from-orange-500 to-amber-700",
  },
];

export default function FacilityStaffPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">

      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Staff Management 👋
            </h1>

            <p className="text-gray-600 mt-2">
              Manage all medical staff and hospital teams.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[350px] shadow-lg">
              <input
                type="text"
                placeholder="Search staff..."
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
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl text-white`}
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

          {/* TABLE */}
          <div className="col-span-12 xl:col-span-9 bg-[#07113d] rounded-3xl p-6 text-white">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-semibold">
                Hospital Staff
              </h2>

              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-2xl flex items-center gap-2">
                <Plus size={18} />
                Add Staff
              </button>
            </div>

            <table className="w-full">

              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="pb-4">Staff</th>
                  <th>Department</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {staff.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

                    <td className="py-5 flex items-center gap-4">

                      <img
                        src={`https://i.pravatar.cc/100?img=${index + 20}`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {member.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {member.role}
                        </p>
                      </div>
                    </td>

                    <td>
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-xl text-sm">
                        {member.department}
                      </span>
                    </td>

                    <td>{member.shift}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-xl text-sm ${
                          member.status === "On Duty"
                            ? "bg-green-500/20 text-green-300"
                            : member.status === "Off Duty"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td>

                      <div className="flex gap-3">

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
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 xl:col-span-3 space-y-6">

            {/* ATTENDANCE */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Staff Attendance
              </h2>

              <div className="flex justify-center">

                <div className="w-44 h-44 rounded-full border-[14px] border-purple-500 flex items-center justify-center">

                  <div className="text-center">
                    <h1 className="text-5xl font-bold">
                      812
                    </h1>

                    <p className="text-gray-400 mt-2">
                      Present
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Absent
                  </span>

                  <span>38</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    On Leave
                  </span>

                  <span>12</span>
                </div>
              </div>
            </div>

            {/* SHIFTS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Upcoming Shifts
              </h2>

              <div className="space-y-5">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white/5 rounded-2xl p-4"
                  >

                    <h3 className="font-semibold">
                      Dr. Emily Watson
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Emergency Shift
                    </p>

                    <div className="mt-3 text-purple-400 text-sm">
                      08:00 PM
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}