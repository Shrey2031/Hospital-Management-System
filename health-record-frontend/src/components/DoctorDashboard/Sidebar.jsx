import {
  Home,
  Users,
  Calendar,
  FileText,
  FlaskConical,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: Home },
  { name: "Patients", icon: Users },
  { name: "Appointments", icon: Calendar },
  { name: "Medical Records", icon: FileText },
  { name: "Lab Reports", icon: FlaskConical },
  { name: "Settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-[250px] bg-[#07113d] min-h-screen p-5 flex flex-col">
      <h1 className="text-3xl font-bold mb-10">
        MediCare<span className="text-purple-400">+</span>
      </h1>

      <div className="space-y-3">
        {menu.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              index === 0
                ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                : "hover:bg-white/10"
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-auto bg-gradient-to-br from-purple-600/40 to-indigo-500/30 p-4 rounded-2xl">
        <h2 className="font-semibold text-lg mb-2">Need Help?</h2>
        <p className="text-sm text-gray-300">
          Our support team is here for you.
        </p>

        <button className="mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl w-full">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;