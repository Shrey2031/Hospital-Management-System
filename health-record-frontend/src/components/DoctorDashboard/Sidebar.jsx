// import {
//   Home,
//   Users,
//   Calendar,
//   FileText,
//   FlaskConical,
//   Settings,
// } from "lucide-react";

// const menu = [
//   { name: "Dashboard", path: "/doctor-dashboard",icon: Home },
//   { name: "Patients",path: "/doctor-patients", icon: Users },
//   { name: "Appointments",path: "/doctor-appointments", icon: Calendar },
//   { name: "Medical Records",path: "/doctor-medical-records", icon: FileText },
//   { name: "Lab Reports", path: "/doctor-lab-reports", icon: FlaskConical },
//   { name: "Settings", path: "/doctor-settings", icon: Settings },
// ];

// const Sidebar = () => {
//   return (
//     <div className="w-[250px] bg-[#07113d] min-h-screen p-5 flex flex-col">
//       <h1 className="text-3xl font-bold mb-10">
//         MediCare<span className="text-purple-400">+</span>
//       </h1>

//       <div className="space-y-3">
//         {menu.map((item, index) => (
//           <button
//             key={index}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//               index === 0
//                 ? "bg-gradient-to-r from-purple-500 to-indigo-500"
//                 : "hover:bg-white/10"
//             }`}
//           >
//             <item.icon size={20} />
//             {item.name}
//           </button>
//         ))}
//       </div>

//       <div className="mt-auto bg-gradient-to-br from-purple-600/40 to-indigo-500/30 p-4 rounded-2xl">
//         <h2 className="font-semibold text-lg mb-2">Need Help?</h2>
//         <p className="text-sm text-gray-300">
//           Our support team is here for you.
//         </p>

//         <button className="mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl w-full">
//           Contact Support
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, FileText, FlaskConical, Settings, MessageCircleIcon } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/doctor-dashboard", icon: Home },
  { name: "Patients", path: "/doctor-patients", icon: Users },
  { name: "Appointments", path: "/doctor-appointments", icon: Calendar },
  { name: "Medical Records", path: "/doctor-medical-records", icon: FileText },
  { name: "Prescriptions", path: "/doctor-prescriptions", icon: FlaskConical },
    { name: "Messages", path: "/doctor-messages", icon: MessageCircleIcon },
  { name: "Settings", path: "/doctor-settings", icon: Settings },

];



const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // For active state

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[250px] bg-[#07113d] min-h-screen p-5 flex flex-col">
      <h1 className="text-3xl font-bold mb-10">
        MediCare<span className="text-purple-400">+</span>
      </h1>

      <div className="space-y-3">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path} // ✅ Use path as key (unique!)
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'group-hover:text-purple-400'
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Support section */}
      <div className="mt-auto bg-gradient-to-br from-purple-600/40 to-indigo-500/30 p-4 rounded-2xl">
        <h2 className="font-semibold text-lg mb-2 text-white">Need Help?</h2>
        <p className="text-sm text-gray-300 mb-4">
          Our support team is here for you.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl w-full transition-all duration-200 font-medium">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;