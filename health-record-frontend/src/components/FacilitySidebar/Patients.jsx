import {
  Search,
  Bell,
  Filter,
  Plus,
  Eye,
  MessageSquare,
  MoreVertical,
  Users,
  Activity,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import Sidebar from "../FacilityDashboard/Sidebar";

const patients = [
  {
    name: "Sarah Johnson",
    age: 28,
    department: "Cardiology",
    doctor: "Dr. Emily Watson",
    status: "Stable",
  },
  {
    name: "Michael Brown",
    age: 45,
    department: "Orthopedics",
    doctor: "Dr. Smith",
    status: "Critical",
  },
  {
    name: "Emma Wilson",
    age: 34,
    department: "Neurology",
    doctor: "Dr. James",
    status: "Stable",
  },
  {
    name: "David Miller",
    age: 52,
    department: "Emergency",
    doctor: "Dr. Robert",
    status: "Observation",
  },
];

const stats = [
  {
    title: "Total Patients",
    value: "1,248",
    icon: <Users />,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Critical Cases",
    value: "86",
    icon: <AlertCircle />,
    color: "from-pink-500 to-rose-700",
  },
  {
    title: "Active Cases",
    value: "924",
    icon: <Activity />,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "New Admissions",
    value: "42",
    icon: <UserPlus />,
    color: "from-purple-500 to-violet-700",
  },
];

export default function FacilityPatientsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">

      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Patients Management 👋
            </h1>

            <p className="text-gray-600 mt-2">
              Manage all hospital patients and medical records.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[350px] shadow-lg">
              <input
                type="text"
                placeholder="Search patients..."
                className="outline-none flex-1 text-gray-700"
              />

              <Search className="text-gray-500" />
            </div>

            <button className="bg-white p-4 rounded-2xl shadow-lg">
              <Bell className="text-[#111827]" />
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

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-12 gap-6 mt-8">

          {/* TABLE */}
          <div className="col-span-12 xl:col-span-9 bg-[#07113d] rounded-3xl p-6 text-white">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-semibold">
                All Patients
              </h2>

              <div className="flex gap-4">

                <button className="bg-white/10 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-white/20 transition">
                  <Filter size={18} />
                  Filter
                </button>

                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition">
                  <Plus size={18} />
                  Add Patient
                </button>
              </div>
            </div>

            <table className="w-full">

              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="pb-4">Patient</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {patients.map((patient, index) => (
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
                          {patient.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          Age: {patient.age}
                        </p>
                      </div>
                    </td>

                    <td>
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-xl text-sm">
                        {patient.department}
                      </span>
                    </td>

                    <td>{patient.doctor}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-xl text-sm ${
                          patient.status === "Stable"
                            ? "bg-green-500/20 text-green-300"
                            : patient.status === "Critical"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-orange-500/20 text-orange-300"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td>

                      <div className="flex items-center gap-3">

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                          <Eye size={18} />
                        </button>

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                          <MessageSquare size={18} />
                        </button>

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-12 xl:col-span-3 space-y-6">

            {/* ADMISSIONS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                New Admissions
              </h2>

              <div className="space-y-5">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={`https://i.pravatar.cc/100?img=${item + 50}`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">
                          Olivia Smith
                        </h3>

                        <p className="text-sm text-gray-400">
                          Emergency Unit
                        </p>
                      </div>
                    </div>

                    <span className="text-green-400 text-sm">
                      10:30
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK NOTES */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Quick Notes
              </h2>

              <textarea
                placeholder="Add facility note..."
                className="w-full h-32 bg-white/5 rounded-2xl p-4 outline-none resize-none"
              />

              <button className="w-full mt-5 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-2xl hover:scale-105 transition">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}