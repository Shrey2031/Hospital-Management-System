// import { FaBell, FaSearch } from "react-icons/fa";

// const Topbar = () => {
//   return (
//     <div className="flex justify-between items-center">
//       <div>
//         <h1 className="text-5xl font-bold text-[#0f172a]">
//           Good morning, Sarah! 👋
//         </h1>

//         <p className="text-gray-500 mt-2 text-lg">
//           Here's your health overview for today.
//         </p>
//       </div>

//       <div className="flex items-center gap-5">
//         <div className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3 w-[400px] shadow-sm">
//           <FaSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search records, doctors..."
//             className="outline-none w-full"
//           />
//         </div>

//         <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm relative">
//           <FaBell />

//           <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
//             3
//           </div>
//         </div>

//         <img
//           src="https://randomuser.me/api/portraits/women/44.jpg"
//           alt=""
//           className="w-14 h-14 rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Topbar;

import React from 'react';
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext'; // 🔥 Adjust path to your AuthContext

const Topbar = () => {
  const { user, loading: authLoading } = useAuth();

  // 🔥 Get first name or fallback
  const getUserName = () => {
    if (authLoading) return 'User';
    if (!user) return 'Guest';
    
    const name = user.fullname || user.name || user.email?.split('@')[0] || 'User';
    return name.split(' ')[0]; // Show first name only
  };

  const userName = getUserName();

  if (authLoading) {
    return (
      <div className="flex justify-between items-center animate-pulse">
        <div>
          <div className="h-12 w-96 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-6 w-80 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-white px-5 py-4 rounded-2xl w-[400px] shadow-sm flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-full bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
          <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className={`text-5xl font-bold text-[#0f172a] ${!user ? 'animate-pulse' : ''}`}>
          Good morning, <span className="text-[#1e40af]">{userName}</span>! 👋
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Here's your health overview for today.
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3 w-[400px] shadow-sm">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search records, doctors..."
            className="outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm relative hover:bg-gray-50 transition-colors cursor-pointer group">
          <FaBell className="text-gray-600 group-hover:text-gray-800 text-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg">
            3
          </div>
        </div>

        {/* 🔥 USER AVATAR WITH ICON (No backend avatar needed!) */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-white/50 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
          <FaUser className="w-7 h-7 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
          
          {/* 🔥 User initials fallback */}
          {user?.fullname && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs uppercase tracking-widest drop-shadow-md">
                {user.fullname.split(' ').map(n => n[0]).join('').slice(0,2)}
              </span>
            </div>
          )}
          
          {/* Name tooltip */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-2xl text-xs font-semibold text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 border border-gray-200">
            {user?.fullname || user?.email || 'User Profile'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;