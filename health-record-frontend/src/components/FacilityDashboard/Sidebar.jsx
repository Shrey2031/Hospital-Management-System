// import {
//   Home,
//   Calendar,
//   Users,
//   UserCog,
//   Building2,
//   Bed,
//   Boxes,
//   BadgeDollarSign,
//   FileBarChart,
//   ShieldCheck,
//   MessageSquare,
//   Settings,
// } from "lucide-react";
// import { FaHeartbeat } from "react-icons/fa";

// const menu = [
//   { name: "Dashboard", icon: Home },
//   { name: "Appointments", icon: Calendar },
//   { name: "Patients", icon: Users },
//   { name: "Staff", icon: UserCog },
//   { name: "Departments", icon: Building2 },
//   { name: "Bed Management", icon: Bed },
//   // { name: "Inventory", icon: Boxes },
//   { name: "Billing & Claims", icon: BadgeDollarSign },
//   // { name: "Reports & Analytics", icon: FileBarChart },
//   // { name: "Quality & Compliance", icon: ShieldCheck },
//   { name: "Messages", icon: MessageSquare },
//   { name: "Settings", icon: Settings },
// ];

// const Sidebar = () => {
//   return (
//     <div className="w-[260px] min-h-screen bg-[#07113d] p-5 flex flex-col">
//       <div>
//         {/* <h1 className="text-3xl font-bold text-white mb-10">
//           MediCare<span className="text-purple-400">+</span>
//         </h1> */}

//               <div className="flex items-center gap-3 mb-10">
          
//           {/* LOGO */}
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//           <FaHeartbeat className="text-white text-3xl" />
//         </div>
        
//           {/* TEXT */}
//           <div>
//             <h1 className="text-3xl font-bold text-white leading-none">
//               MediCare+
//             </h1>
        
           
//           </div>
        
//         </div>

//         <div className="space-y-2">
//           {menu.map((item, index) => (
//             <button
//               key={index}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-white ${
//                 index === 0
//                   ? "bg-gradient-to-r from-purple-500 to-indigo-500"
//                   : "hover:bg-white/10"
//               }`}
//             >
//               <item.icon size={20} />
//               {item.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-auto bg-gradient-to-br from-purple-500/30 to-indigo-500/20 rounded-3xl p-5">
//         <h2 className="text-xl font-semibold text-white mb-2">
//           Need Help?
//         </h2>

//         <p className="text-gray-300 text-sm">
//           Our support team is here to help you.
//         </p>

//         <button className="mt-5 bg-purple-500 hover:bg-purple-600 transition w-full py-3 rounded-2xl text-white">
//           Contact Support
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  UserCog,
  Building2,
  Bed,
  Boxes,
  BadgeDollarSign,
  FileBarChart,
  ShieldCheck,
  MessageSquare,
  Settings,
} from "lucide-react";
import { FaHeartbeat } from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/facility-dashboard", icon: Home },
  { name: "Appointments", path: "/facility-appointments", icon: Calendar },
  { name: "Patients", path: "/facility-patients", icon: Users },
  { name: "Staff", path: "/facility-staff", icon: UserCog },
  { name: "Departments", path: "/facility-departments", icon: Building2 },
  { name: "Bed Management", path: "/facility-bed-management", icon: Bed },
  // { name: "Inventory", path: "/facility-inventory", icon: Boxes },
  { name: "Billing & Claims", path: "/facility-billing", icon: BadgeDollarSign },
  // { name: "Reports & Analytics", path: "/facility-reports", icon: FileBarChart },
  // { name: "Quality & Compliance", path: "/facility-compliance", icon: ShieldCheck },
  { name: "Messages", path: "/facility-messages", icon: MessageSquare },
  { name: "Settings", path: "/facility-settings", icon: Settings },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[260px] min-h-screen bg-[#07113d] p-5 flex flex-col">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10">
          
          {/* LOGO */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FaHeartbeat className="text-white text-3xl" />
          </div>
        
          {/* TEXT */}
          <div>
            <h1 className="text-3xl font-bold text-white leading-none">
              MediCare+
            </h1>
          </div>
        
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-white ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Need Help Section */}
      <div className="mt-auto bg-gradient-to-br from-purple-500/30 to-indigo-500/20 rounded-3xl p-5">
        <h2 className="text-xl font-semibold text-white mb-2">
          Need Help?
        </h2>

        <p className="text-gray-300 text-sm">
          Our support team is here to help you.
        </p>

        <button 
          onClick={() => handleNavigation('/facility-support')}
          className="mt-5 bg-purple-500 hover:bg-purple-600 transition w-full py-3 rounded-2xl text-white"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;