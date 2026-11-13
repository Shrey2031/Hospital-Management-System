// import React from 'react';
// import { FaBell, FaSearch, FaUser } from "react-icons/fa";
// import { useAuth } from '../../context/AuthContext'; // 🔥 Adjust path to your AuthContext

// const Topbar = () => {
//   const { user, loading: authLoading } = useAuth();

//   // 🔥 Get first name or fallback
//   const getUserName = () => {
//     if (authLoading) return 'User';
//     if (!user) return 'Guest';
    
//     const name = user.fullname || user.name || user.email?.split('@')[0] || 'User';
//     return name.split(' ')[0]; // Show first name only
//   };

//   const userName = getUserName();

//   if (authLoading) {
//     return (
//       <div className="flex justify-between items-center animate-pulse">
//         <div>
//           <div className="h-12 w-96 bg-gray-200 rounded-lg mb-2"></div>
//           <div className="h-6 w-80 bg-gray-200 rounded"></div>
//         </div>
//         <div className="flex items-center gap-5">
//           <div className="bg-white px-5 py-4 rounded-2xl w-[400px] shadow-sm flex items-center gap-3">
//             <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
//             <div className="h-5 w-full bg-gray-300 rounded-full"></div>
//           </div>
//           <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
//           <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-between items-center">
//       <div>
//         <h1 className={`text-5xl font-bold text-[#0f172a] ${!user ? 'animate-pulse' : ''}`}>
//           Good morning, <span className="text-[#1e40af]">{userName}</span>! 👋
//         </h1>

//         <p className="text-gray-500 mt-2 text-lg">
//           Here's your health overview for today.
//         </p>
//       </div>

//       <div className="flex items-center gap-5">
//         {/* Search Bar */}
//         <div className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3 w-[400px] shadow-sm">
//           <FaSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search records, doctors..."
//             className="outline-none w-full"
//           />
//         </div>

//         {/* Notifications */}
//         <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm relative hover:bg-gray-50 transition-colors cursor-pointer group">
//           <FaBell className="text-gray-600 group-hover:text-gray-800 text-lg" />
//           <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg">
//             3
//           </div>
//         </div>

//         {/* 🔥 USER AVATAR WITH ICON (No backend avatar needed!) */}
//         <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-white/50 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
//           <FaUser className="w-7 h-7 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
          
//           {/* 🔥 User initials fallback */}
//           {user?.fullname && (
//             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//               <span className="text-white font-bold text-xs uppercase tracking-widest drop-shadow-md">
//                 {user.fullname.split(' ').map(n => n[0]).join('').slice(0,2)}
//               </span>
//             </div>
//           )}
          
//           {/* Name tooltip */}
//           <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-2xl text-xs font-semibold text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 border border-gray-200">
//             {user?.fullname || user?.email || 'User Profile'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const { user, loading: authLoading } = useAuth();

  const getUserName = () => {
    if (authLoading) return 'User';
    if (!user) return 'Guest';

    const name = user.fullname || user.name || user.email?.split('@')[0] || 'User';
    return name.split(' ')[0];
  };

  const userName = getUserName();

  if (authLoading) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 animate-pulse">
        <div>
          <div className="h-9 w-72 bg-[#E4E1D8] rounded-lg mb-2"></div>
          <div className="h-4 w-56 bg-[#E4E1D8] rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#E4E1D8] px-4 py-3 rounded-xl w-[320px] h-11"></div>
          <div className="w-11 h-11 bg-[#E4E1D8] rounded-full"></div>
          <div className="w-11 h-11 bg-[#E4E1D8] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
      <div>
        <h1 className="text-3xl font-serif font-medium text-[#12181B]">
          Good morning, <span className="text-[#0E6B64]">{userName}</span> 👋
        </h1>
        <p className="text-[#5B6470] mt-1.5 text-sm">
          Here's your health overview for today.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="bg-white border border-[#E4E1D8] px-4 py-3 rounded-xl flex items-center gap-2.5 flex-1 sm:w-[300px] focus-within:ring-2 focus-within:ring-[#0E6B64]/25 focus-within:border-[#0E6B64] transition-all">
          <Search size={16} className="text-[#8A929B] shrink-0" />
          <input
            type="text"
            placeholder="Search records, doctors..."
            className="outline-none w-full text-sm text-[#12181B] placeholder-[#8A929B] bg-transparent"
          />
        </div>

        {/* Notifications */}
        <button className="w-11 h-11 rounded-full bg-white border border-[#E4E1D8] flex items-center justify-center relative hover:border-[#0E6B64]/40 transition-colors shrink-0">
          <Bell size={16} className="text-[#5B6470]" />
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] px-1 bg-[#E8623F] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* User Avatar */}
        <div className="w-11 h-11 rounded-full bg-[#0E6B64] flex items-center justify-center shrink-0 cursor-pointer group relative">
          {user?.fullname ? (
            <span className="text-white font-semibold text-xs uppercase">
              {user.fullname.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          ) : (
            <User size={17} className="text-white" />
          )}

          <div className="absolute top-14 right-0 bg-white px-3 py-2 rounded-lg shadow-md border border-[#E4E1D8] text-xs font-medium text-[#12181B] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
            {user?.fullname || user?.email || 'User Profile'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;