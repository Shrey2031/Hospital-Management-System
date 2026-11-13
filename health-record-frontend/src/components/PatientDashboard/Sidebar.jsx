// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import logo from '../../images/icon.avif'
// import {
//   FaHome,
//   FaFileMedical,
//   FaCalendarAlt,
//   FaPrescriptionBottleAlt,
//   FaFlask,
//   FaHeartbeat,
//   FaFile,
//   FaMoneyBill,
//   FaEnvelope,
//   FaCog,
  
// } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menus = [
//     { name: "Dashboard", path: "/patient-dashboard", icon: <FaHome /> },
//     { name: "My Records", path: "/records", icon: <FaFileMedical /> },
//     { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
//     { name: "Prescriptions", path: "/prescriptions", icon: <FaPrescriptionBottleAlt /> },
//     // { name: "Lab Reports", path: "/lab-reports", icon: <FaFlask /> },
//     // { name: "Health Summary", path: "/health-summary", icon: <FaHeartbeat /> },
//     { name: "Billing", path: "/billing", icon: <FaMoneyBill /> },
//     { name: "Messages", path: "/messages", icon: <FaEnvelope /> },
//     { name: "Settings", path: "/settings", icon: <FaCog /> },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="w-[250px] bg-[#020b36] text-white min-h-screen p-5 flex flex-col justify-between">
//       <div>

//         <div className="flex items-center gap-3 mb-10">
  
  
//   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//   <FaHeartbeat className="text-white text-3xl" />
// </div>

//   {/* TEXT */}
//   <div>
//     <h1 className="text-3xl font-bold text-white leading-none">
//       MediCare+
//     </h1>

//     <p className="text-gray-400 text-sm mt-1">
//       Health Records
//     </p>
//   </div>

// </div>

//         <div className="space-y-3">
//           {menus.map((menu, index) => (
//             <div
//               key={index}
//               onClick={() => handleNavigation(menu.path)}
//               className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all group hover:bg-white/10 ${
//                 location.pathname === menu.path
//                   ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                   : ""
//               }`}
//             >
//               <div className={`p-2 rounded-xl transition-all ${
//                 location.pathname === menu.path
//                   ? "bg-white/20"
//                   : "group-hover:bg-white/20"
//               }`}>
//                 {React.cloneElement(menu.icon, {
//                   className: `w-5 h-5 ${location.pathname === menu.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`
//                 })}
//               </div>
//               <span className={`font-medium transition-all ${
//                 location.pathname === menu.path ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white'
//               }`}>
//                 {menu.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-gradient-to-br from-[#2c1b75] to-[#6b46ff] p-5 rounded-3xl hover:shadow-2xl transition-all">
//         <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
//         <p className="text-gray-300 text-sm mb-4">
//           Our support team is here to help you
//         </p>
//         <button 
//           onClick={() => navigate('/support')}
//           className="bg-white text-black w-full py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
//         >
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
  FileText,
  Calendar,
  Pill,
  Receipt,
  Mail,
  Settings,
  Heart,
  LifeBuoy,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/patient-dashboard", icon: Home },
    { name: "My Records", path: "/records", icon: FileText },
    { name: "Appointments", path: "/appointments", icon: Calendar },
    { name: "Prescriptions", path: "/prescriptions", icon: Pill },
    { name: "Billing", path: "/billing", icon: Receipt },
    { name: "Messages", path: "/messages", icon: Mail },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[250px] bg-[#12181B] text-white min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-10 px-1">
          <div className="w-11 h-11 rounded-xl bg-[#0E6B64] flex items-center justify-center">
            <Heart className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-semibold text-white leading-none">
              MediCare<span className="text-[#5FD9C9]">+</span>
            </h1>
            <p className="text-[#8A929B] text-xs mt-1">Health Records</p>
          </div>
        </div>

        <div className="space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = location.pathname === menu.path;
            return (
              <div
                key={menu.name}
                onClick={() => handleNavigation(menu.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNavigation(menu.path); }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-colors group ${
                  active ? "bg-[#0E6B64]" : "hover:bg-white/5"
                }`}
              >
                <Icon
                  size={17}
                  className={active ? "text-white" : "text-[#8A929B] group-hover:text-white transition-colors"}
                />
                <span className={`text-sm transition-colors ${
                  active ? "text-white font-semibold" : "text-[#B8BEC4] group-hover:text-white font-medium"
                }`}>
                  {menu.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
        <LifeBuoy size={20} className="text-[#5FD9C9] mb-3" />
        <h2 className="text-base font-semibold text-white mb-1">Need Help?</h2>
        <p className="text-[#8A929B] text-xs mb-4 leading-relaxed">
          Our support team is here to help you
        </p>
        <button
          onClick={() => navigate('/support')}
          className="bg-white text-[#12181B] w-full py-2.5 rounded-lg text-sm font-semibold hover:bg-[#F7F6F2] transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


