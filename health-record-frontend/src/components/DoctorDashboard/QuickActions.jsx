// const actions = [
//   "Add  Patients",
//   "Today Appointment",
//   "Write Prescription",
//   "Order Lab Test",
// ];

// const QuickActions = () => {
//   return (
//     <div className="bg-[#07113d] rounded-3xl p-6">
//       <h2 className="text-2xl font-semibold mb-6">
//         Quick Actions
//       </h2>

//       <div className="grid grid-cols-2 gap-4">
//         {actions.map((action, index) => (
//           <button
//             key={index}
//             className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500 hover:to-blue-500 transition rounded-2xl p-5"
//           >
//             {action}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuickActions;

import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Calendar,
  FileText,
  TestTube,
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add Patients",
      path: "/doctor-patients",
      icon: UserPlus,
      color: "purple"
    },
    {
      label: "Today's Appointments", 
      path: "/doctor-appointments",
      icon: Calendar,
      color: "blue"
    },
    {
      label: "Write Prescription",
      path: "/doctor-prescriptions",
      icon: FileText,
      color: "indigo"
    },
    {
      label: "Order Lab Test",
      path: "/doctor-medical-records",
      icon: TestTube,
      color: "pink"
    },
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#07113d] rounded-3xl p-6"> {/* SAME PADDING */}
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4"> {/* SAME GAP */}
        {actions.map((action) => (
          <button
            key={action.path}
            onClick={() => handleActionClick(action.path)}
            className={`w-full flex items-center gap-3 p-5 rounded-2xl transition-all duration-300 group
              bg-gradient-to-r from-${action.color}-500/20 to-${action.color}-500/20 
              hover:from-${action.color}-500 hover:to-${action.color}-600 
              hover:shadow-lg hover:shadow-${action.color}-500/25 
              border border-${action.color}-500/20 hover:border-${action.color}-400/40
              hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-${action.color}-500/50`}
          >
            {/* Compact Icon */}
            <action.icon size={18} className="group-hover:scale-110 transition-transform flex-shrink-0" />
            
            {/* Compact Text */}
            <span className="font-medium text-sm leading-tight group-hover:text-white">
              {action.label}
            </span>
            
            {/* Subtle Arrow */}
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all text-xs">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

