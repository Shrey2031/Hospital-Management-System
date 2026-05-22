import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, loading: authLoading } = useAuth();

  // Get user name function (like patient Topbar)
  const getUserName = () => {
    if (authLoading) return 'Doctor';
    if (!user) return 'Emily'; // Default fallback
    
    const name = user.fullname || user.name || user.email?.split('@')[0] || 'Emily';
    return name.split(' ')[0]; // Show first name only
  };

  const doctorName = getUserName();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#111827]">
          Good morning, Dr. {doctorName} 👋
        </h1>

        <p className="text-gray-600 mt-1">
          Here's your practice overview for today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-lg w-[350px]">
          <input
            type="text"
            placeholder="Search patients..."
            className="outline-none flex-1 text-gray-700"
          />
          <Search className="text-gray-500" />
        </div>

        <button className="bg-white p-4 rounded-2xl shadow-lg">
          <Bell className="text-[#111827]" />
        </button>

        {/* Show user avatar with gradient background */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-white overflow-hidden">
          {user?.fullname ? (
            <span className="text-white font-bold text-lg uppercase">
              {user.fullname.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          ) : (
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;