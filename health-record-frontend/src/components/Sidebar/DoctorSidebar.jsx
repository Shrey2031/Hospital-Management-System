// import React from 'react';
// import { 
//   Calendar, Users, Pill, FileText, MessageCircle,
//   Settings, LogOut 
// } from 'lucide-react';

// const DoctorSidebar = ({ 
//   activeTab, 
//   setActiveTab, 
//   sidebarOpen, 
//   setSidebarOpen,
//   onLogout 
// }) => {
//   const sidebarItems = [
//     { id: 'appointments', label: "Today's Schedule", icon: Calendar, count: 8 },
//     { id: 'patients', label: 'Patients', icon: Users, count: 23 },
//     { id: 'prescriptions', label: 'Prescriptions', icon: Pill, count: 15 },
//     { id: 'records', label: 'Records Access', icon: FileText, count: 42 },
//     { id: 'messages', label: 'Messages', icon: MessageCircle, count: 5 },
//   ];

//   return (
//     <>
//       {/* 🆕 COMPACT SIDEBAR - IDENTICAL DESIGN */}
//       <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-emerald-100/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="p-6 border-b border-emerald-100/50">
//           <h3 className="text-lg font-black text-emerald-700 mb-1">Doctor Control</h3>
//           <p className="text-sm text-emerald-600">Manage your practice</p>
//         </div>
        
//         <nav className="p-4 space-y-1">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveTab(item.id);
//                 setSidebarOpen(false);
//               }}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
//                 activeTab === item.id
//                   ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
//                   : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200'
//               }`}
//             >
//               <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'text-emerald-500'}`} />
//               <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
//               {item.count && (
//                 <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
//                   activeTab === item.id ? 'bg-white/30' : 'bg-emerald-100'
//                 }`}>
//                   {item.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Settings & Logout */}
//         <div className="absolute bottom-6 left-6 right-6 space-y-2">
//           <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
//             <Settings className="w-5 h-5" />
//             <span className="font-semibold text-sm">Settings</span>
//           </button>
//           <button
//             onClick={onLogout}
//             className="w-full flex items-center space-x-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-semibold"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="text-sm">Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default DoctorSidebar;

import React from 'react';
import { 
  Calendar, Users, Pill, FileText, MessageCircle,
  Settings, LogOut 
} from 'lucide-react';

const DoctorSidebar = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen,
  onLogout 
}) => {
  const sidebarItems = [
    { id: 'appointments', label: "Today's Schedule", icon: Calendar, count: 8 },
    { id: 'patients', label: 'Patients', icon: Users, count: 23 },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill, count: 15 },
    { id: 'records', label: 'Records Access', icon: FileText, count: 42 },
    { id: 'messages', label: 'Messages', icon: MessageCircle, count: 5 },
  ];

  return (
    <>
      {/* 🆕 LARGER PREMIUM SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-emerald-100/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* 👆 WIDER: w-72 (288px) instead of w-64 (256px) */}
        
        <div className="p-8 border-b border-emerald-100/50"> 
           {/* <h3 className="text-2xl font-black text-emerald-700 mb-2 leading-tight"> 
            Doctor Control
          </h3>
          <p className="text-base text-emerald-600 font-medium"> 
            Manage your practice
          </p>  */}
        </div>
        
        <nav className="p-6 space-y-2"> {/* 👆 LARGER PADDING + SPACE */}
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all group hover:shadow-lg duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl scale-[1.02]'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent hover:shadow-md'
              }`}
            >
              {/* 👆 LARGER: space-x-4, px-6 py-4, rounded-2xl */}
              <item.icon className={`w-7 h-7 flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'text-emerald-500'}`} />
              {/* 👆 LARGER ICONS: w-7 h-7 */}
              <span className="font-bold text-base flex-1 text-left tracking-tight"> {/* 👆 LARGER + BOLDER */}
                {item.label}
              </span>
              {item.count && (
                <span className={`px-3 py-1 rounded-xl text-sm font-bold shadow-sm ${
                  activeTab === item.id 
                    ? 'bg-white/40 backdrop-blur-sm' 
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                }`}>
                  {item.count}
                </span>
              )}
              {/* 👆 LARGER BADGE: px-3 py-1, rounded-xl */}
            </button>
          ))}
        </nav>

        {/* 👇 LARGER BOTTOM SECTION */}
        <div className="absolute bottom-8 left-8 right-8 space-y-3"> {/* 👆 LARGER SPACING */}
          <button className="w-full flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-gray-50 rounded-2xl transition-all hover:shadow-md group">
            <Settings className="w-7 h-7 text-gray-500 group-hover:text-emerald-500" /> {/* 👆 LARGER ICON */}
            <span className="font-bold text-base tracking-tight">Settings</span> {/* 👆 LARGER TEXT */}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 text-rose-600 hover:bg-rose-50 rounded-2xl transition-all font-bold shadow-md hover:shadow-lg hover:scale-[1.02] border border-rose-100"
          >
            <LogOut className="w-7 h-7" />
            <span className="text-base tracking-tight">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DoctorSidebar;