// const QuickActions = () => {
//   return (
//     <div className="bg-[#09153d] rounded-3xl p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">
//         Quick Actions
//       </h2>

//       <div className="grid grid-cols-4 gap-5">
//         <div className="bg-white/10 p-5 rounded-2xl">
//           Upload Records
//         </div>

//         <div className="bg-white/10 p-5 rounded-2xl">
//           Book Appointment
//         </div>

//         <div className="bg-white/10 p-5 rounded-2xl">
//           View Reports
//         </div>

//         <div className="bg-white/10 p-5 rounded-2xl">
//           Prescriptions
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;

import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Calendar, 
  FileText, 
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Upload Records',
      icon: UploadCloud,
      path: '/records'
    },
    {
      title: 'Book Appointment',
      icon: Calendar,
      path: '/appointments'
    },
    {
      title: 'View Reports',
      icon: FileText,
      path: '/records'
    },
    {
      title: 'Prescriptions',
      icon: FileText,
      path: '/prescriptions'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#09153d] rounded-3xl p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <div
              key={index}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-white/30 flex flex-col items-center gap-3 text-center"
              onClick={() => handleActionClick(action.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleActionClick(action.path);
                }
              }}
            >
              <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <IconComponent 
                  size={24} 
                  className="text-white group-hover:text-blue-300 transition-colors duration-300"
                />
              </div>
              <span className="font-medium text-sm leading-tight group-hover:text-blue-200 transition-colors duration-300">
                {action.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;