// src/components/PatientSidebar.jsx
import React from 'react';
import { 
  Calendar, FileText, MessageCircle, Stethoscope, Pill, 
  Settings, LogOut, Home, Heart, Clock, User 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { useActiveTab } from '../../hooks/useActiveTab';

const PatientSidebar = ({ 
  // activeTab, 
  // setActiveTab, 
  sidebarOpen, 
  setSidebarOpen,
  className = '' 
}) => {
  const { logout } = useAuth();
   const navigate = useNavigate(); 
    //  const { activeTab } = useActiveTab();


    const handleMenuClick = (item) => {
    setSidebarOpen(false); // Close mobile sidebar
    
    if (item.path) {
      navigate(item.path); // 🔥 GO TO PAGE
    // } else {
    //   setActiveTab(item.id); // 🔥 Stay in dashboard tab
    }
  };


  // const menuItems = [
  //   { id: 'dashboard', label: 'Dashboard', icon: Home, count: null },
  //   { id: 'appointments', label: 'Appts', icon: Calendar, count: 3 },
  //   { id: 'records', label: 'Records', icon: FileText, count: 8 },
  //   { id: 'messages', label: 'Messages', icon: MessageCircle, count: 2 },
  //   { id: 'doctors', label: 'Doctors', icon: Stethoscope, count: 4 },
  //   { id: 'prescriptions', label: 'Rx', icon: Pill, count: 5 },
  // ];
  // PatientSidebar.jsx - UPDATE menuItems:
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/patient-dashboard', icon: Home, count: null },
  { id: 'appointments', label: 'Appts', path: '/appointments', icon: Calendar, count: 3 },
  { id: 'records', path: '/records', label: 'Records', icon: FileText, count: 8 },
  { id: 'messages', path: '/messages', label: 'Messages', icon: MessageCircle, count: 2 },
  { id: 'doctors', path: '/my-doctors', label: 'Doctors', icon: Stethoscope, count: 4 },
  { id: 'prescriptions', path: '/prescriptions', label: 'Rx', icon: Pill, count: 5 },
];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white/95 backdrop-blur-2xl shadow-2xl border-r border-sky-100/50 transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}>
      {/* Header */}
      {/* <div className="p-8 border-b border-sky-100/50 bg-gradient-to-b from-sky-50/50 to-transparent">
         <h3 className="text-2xl font-black bg-gradient-to-r from-sky-700 to-blue-700 bg-clip-text text-transparent mb-2">
          Quick Menu
        </h3> 
        <p className="text-lg text-sky-600 font-semibold">Patient Portal</p>
      </div> */}

      {/* Navigation */}
      {/* <nav className="p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            // onClick={() => {
            //   setActiveTab(item.id);
            //   setSidebarOpen(false);
            // }}
             onClick={() => handleMenuClick(item)}

            className={`w-full flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all duration-300 group shadow-sm border-2 hover:shadow-xl hover:-translate-y-0.5 hover:border-sky-300 backdrop-blur-sm ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-2xl border-sky-400 scale-[1.02]'
                : 'text-gray-700 hover:bg-sky-50/80 hover:text-sky-800 border-transparent hover:border-sky-200'
            }`}
          >
            <item.icon className={`w-7 h-7 flex-shrink-0 ${activeTab === item.id ? 'text-white drop-shadow-lg' : 'text-sky-500 group-hover:scale-110 transition-transform'}`} />
            <span className="text-lg font-bold flex-1 text-left tracking-tight">{item.label}</span>
            {item.count && (
              <span className={`px-3 py-1.5 rounded-xl text-sm font-black shadow-md ${
                activeTab === item.id
                  ? 'bg-white/40 backdrop-blur-sm text-white'
                  : 'bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 shadow-sky-200/50'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav> */}

          {/* Navigation */}
      <nav className="p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)} // Line 71 ✅
            className={`w-full flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all duration-300 group shadow-sm border-2 hover:shadow-xl hover:-translate-y-0.5 hover:border-sky-300 backdrop-blur-sm ${
              // ✅ Simplified active state - use window location
              window.location.pathname.includes(item.path || item.id)
                ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-2xl border-sky-400 scale-[1.02]'
                : 'text-gray-700 hover:bg-sky-50/80 hover:text-sky-800 border-transparent hover:border-sky-200'
            }`}
          >
            <item.icon className={`w-7 h-7 flex-shrink-0 ${
              window.location.pathname.includes(item.path || item.id)
                ? 'text-white drop-shadow-lg' 
                : 'text-sky-500 group-hover:scale-110 transition-transform'
            }`} />
            <span className="text-lg font-bold flex-1 text-left tracking-tight">{item.label}</span>
            {item.count && (
              <span className={`px-3 py-1.5 rounded-xl text-sm font-black shadow-md ${
                window.location.pathname.includes(item.path || item.id)
                  ? 'bg-white/40 backdrop-blur-sm text-white'
                  : 'bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 shadow-sky-200/50'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Settings & Logout */}
      <div className="absolute bottom-8 left-8 right-8 space-y-3">
        <button className="w-full flex items-center space-x-5 px-6 py-5 text-gray-700 hover:bg-gray-50/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100">
          <Settings className="w-7 h-7 text-sky-500" />
          <span className="text-lg font-bold tracking-tight">Settings</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-5 px-6 py-5 text-rose-600 hover:bg-rose-50/80 rounded-2xl transition-all duration-300 font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-rose-100 group"
        >
          <LogOut className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="text-lg tracking-tight">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default PatientSidebar;