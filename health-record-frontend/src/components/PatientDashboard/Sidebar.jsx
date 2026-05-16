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
//   const menus = [
//     "Dashboard",
//     "My Records",
//     "Appointments",
//     "Prescriptions",
//     "Health Summary",
//     "Billing",
//     "Messages",
//     "Settings",
//   ];

//   const icons = [
//     <FaHome />,
//     <FaFileMedical />,
//     <FaCalendarAlt />,
//     <FaPrescriptionBottleAlt />,
//     <FaFlask />,
//     <FaHeartbeat />,
//     <FaFile />,
//     <FaFile />,
//     <FaMoneyBill />,
//     <FaEnvelope />,
//     <FaCog />,
//   ];

//   return (
//     <div className="w-[250px] bg-[#020b36] text-white min-h-screen p-5 flex flex-col justify-between">
//       <div>
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-blue-400">
//             MediCare+
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Health Records
//           </p>
//         </div>

//         <div className="space-y-3">
//           {menus.map((menu, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition ${
//                 index === 0
//                   ? "bg-gradient-to-r from-blue-600 to-purple-600"
//                   : "hover:bg-white/10"
//               }`}
//             >
//               {icons[index]}
//               <span>{menu}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-gradient-to-br from-[#2c1b75] to-[#6b46ff] p-5 rounded-3xl">
//         <h2 className="text-2xl font-bold">Need Help?</h2>

//         <p className="text-gray-300 mt-2 text-sm">
//           Our support team is here to help you
//         </p>

//         <button className="mt-5 bg-white text-black w-full py-3 rounded-xl font-semibold">
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
  FaHome,
  FaFileMedical,
  FaCalendarAlt,
  FaPrescriptionBottleAlt,
  FaFlask,
  FaHeartbeat,
  FaFile,
  FaMoneyBill,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/patient-dashboard", icon: <FaHome /> },
    { name: "My Records", path: "/records", icon: <FaFileMedical /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "Prescriptions", path: "/prescriptions", icon: <FaPrescriptionBottleAlt /> },
    // { name: "Lab Reports", path: "/lab-reports", icon: <FaFlask /> },
    // { name: "Health Summary", path: "/health-summary", icon: <FaHeartbeat /> },
    { name: "Billing", path: "/billing", icon: <FaMoneyBill /> },
    { name: "Messages", path: "/messages", icon: <FaEnvelope /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[250px] bg-[#020b36] text-white min-h-screen p-5 flex flex-col justify-between">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-400">
            MediCare+
          </h1>
          <p className="text-gray-400 text-sm">
            Health Records
          </p>
        </div>

        <div className="space-y-3">
          {menus.map((menu, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(menu.path)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all group hover:bg-white/10 ${
                location.pathname === menu.path
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : ""
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${
                location.pathname === menu.path
                  ? "bg-white/20"
                  : "group-hover:bg-white/20"
              }`}>
                {React.cloneElement(menu.icon, {
                  className: `w-5 h-5 ${location.pathname === menu.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`
                })}
              </div>
              <span className={`font-medium transition-all ${
                location.pathname === menu.path ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white'
              }`}>
                {menu.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2c1b75] to-[#6b46ff] p-5 rounded-3xl hover:shadow-2xl transition-all">
        <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
        <p className="text-gray-300 text-sm mb-4">
          Our support team is here to help you
        </p>
        <button 
          onClick={() => navigate('/support')}
          className="bg-white text-black w-full py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;