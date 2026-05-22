import {
  Search,
  Bell,
  Building2,
  Users,
  Activity,
  BedDouble,
  Eye,
  BarChart3,
  Settings,
} from "lucide-react";

import Sidebar from "../FacilityDashboard/Sidebar";

const departments = [
  {
    name: "Cardiology",
    head: "Dr. Emily Watson",
    patients: 32,
    occupancy: "78%",
    status: "Normal",
  },
  {
    name: "Emergency",
    head: "Dr. Robert",
    patients: 45,
    occupancy: "91%",
    status: "Busy",
  },
  {
    name: "Neurology",
    head: "Dr. James",
    patients: 26,
    occupancy: "65%",
    status: "Normal",
  },
  {
    name: "Orthopedics",
    head: "Dr. Smith",
    patients: 19,
    occupancy: "52%",
    status: "Low",
  },
];

const stats = [
  {
    title: "Departments",
    value: "12",
    icon: <Building2 />,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Active Units",
    value: "10",
    icon: <Activity />,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Emergency Units",
    value: "3",
    icon: <BedDouble />,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Patients",
    value: "1,248",
    icon: <Users />,
    color: "from-purple-500 to-violet-700",
  },
];

export default function FacilityDepartmentsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff]">

      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Departments Overview 👋
            </h1>

            <p className="text-gray-600 mt-2">
              Monitor hospital departments and resources.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[350px] shadow-lg">

              <input
                type="text"
                placeholder="Search department..."
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

        {/* DEPARTMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-[#07113d] rounded-3xl p-6 text-white"
            >

              <div className="flex items-center justify-between">

                <div className="bg-purple-500/20 p-4 rounded-2xl">
                  <Building2 />
                </div>

                <span
                  className={`text-sm px-3 py-1 rounded-xl ${
                    dept.status === "Busy"
                      ? "bg-red-500/20 text-red-300"
                      : dept.status === "Normal"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {dept.status}
                </span>
              </div>

              <h2 className="text-2xl font-semibold mt-6">
                {dept.name}
              </h2>

              <p className="text-gray-400 mt-2">
                Head: {dept.head}
              </p>

              <div className="mt-5">

                <div className="flex justify-between mb-2">
                  <span>Occupancy</span>
                  <span>{dept.occupancy}</span>
                </div>

                <div className="w-full h-3 bg-white/10 rounded-full">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    style={{ width: dept.occupancy }}
                  />
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-2xl">
                View Department
              </button>
            </div>
          ))}
        </div>

        {/* TABLE + RIGHT */}
        <div className="grid grid-cols-12 gap-6 mt-8">

          {/* TABLE */}
          <div className="col-span-12 xl:col-span-8 bg-[#07113d] rounded-3xl p-6 text-white">

            <h2 className="text-3xl font-semibold mb-6">
              Department Analytics
            </h2>

            <table className="w-full">

              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="pb-4">Department</th>
                  <th>Head</th>
                  <th>Patients</th>
                  <th>Occupancy</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {departments.map((dept, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5"
                  >

                    <td className="py-5">
                      {dept.name}
                    </td>

                    <td>{dept.head}</td>

                    <td>{dept.patients}</td>

                    <td>{dept.occupancy}</td>

                    <td>

                      <div className="flex gap-3">

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                          <Eye size={18} />
                        </button>

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                          <BarChart3 size={18} />
                        </button>

                        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20">
                          <Settings size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 xl:col-span-4 space-y-6">

            {/* PERFORMANCE */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Department Performance
              </h2>

              <div className="flex justify-center">

                <div className="w-44 h-44 rounded-full border-[14px] border-purple-500 flex items-center justify-center">

                  <div className="text-center">

                    <h1 className="text-5xl font-bold">
                      87%
                    </h1>

                    <p className="text-gray-400 mt-2">
                      Efficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ALERTS */}
            <div className="bg-[#07113d] rounded-3xl p-6 text-white">

              <h2 className="text-2xl font-semibold mb-6">
                Emergency Alerts
              </h2>

              <div className="space-y-4">

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <h3 className="font-semibold text-red-300">
                    Emergency Unit Reaching Capacity
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Current occupancy is 91%
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
                  <h3 className="font-semibold text-orange-300">
                    ICU Beds Limited
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Only 4 ICU beds available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}