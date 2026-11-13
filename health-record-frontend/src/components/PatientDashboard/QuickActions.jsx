// import { useNavigate } from 'react-router-dom';
// import { 
//   UploadCloud, 
//   Calendar, 
//   FileText, 
// } from 'lucide-react';

// const QuickActions = () => {
//   const navigate = useNavigate();

//   const quickActions = [
//     {
//       title: 'Upload Records',
//       icon: UploadCloud,
//       path: '/records'
//     },
//     {
//       title: 'Book Appointment',
//       icon: Calendar,
//       path: '/appointments'
//     },
//     {
//       title: 'View Reports',
//       icon: FileText,
//       path: '/records'
//     },
//     {
//       title: 'Prescriptions',
//       icon: FileText,
//       path: '/prescriptions'
//     }
//   ];

//   const handleActionClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="bg-[#09153d] rounded-3xl p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">
//         Quick Actions
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//         {quickActions.map((action, index) => {
//           const IconComponent = action.icon;
          
//           return (
//             <div
//               key={index}
//               className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-white/30 flex flex-col items-center gap-3 text-center"
//               onClick={() => handleActionClick(action.path)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   handleActionClick(action.path);
//                 }
//               }}
//             >
//               <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
//                 <IconComponent 
//                   size={24} 
//                   className="text-white group-hover:text-blue-300 transition-colors duration-300"
//                 />
//               </div>
//               <span className="font-medium text-sm leading-tight group-hover:text-blue-200 transition-colors duration-300">
//                 {action.title}
//               </span>
//             </div>
//           );
//         })}
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
    <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
      <h2 className="text-xl font-serif font-medium text-[#12181B] mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;

          return (
            <div
              key={index}
              className="group bg-[#F7F6F2] hover:bg-[#E4F1EF] p-5 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-[#0E6B64]/30 flex flex-col items-center gap-3 text-center"
              onClick={() => handleActionClick(action.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleActionClick(action.path);
                }
              }}
            >
              <div className="w-11 h-11 bg-white group-hover:bg-[#0E6B64] rounded-xl flex items-center justify-center transition-colors duration-200 border border-[#E4E1D8] group-hover:border-transparent">
                <IconComponent
                  size={19}
                  className="text-[#0E6B64] group-hover:text-white transition-colors duration-200"
                />
              </div>
              <span className="font-medium text-sm text-[#12181B] group-hover:text-[#0B4F4A] transition-colors duration-200">
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