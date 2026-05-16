import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#111827]">
          Good morning, Dr. Emily 👋
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

        <img
          src="https://i.pravatar.cc/150?img=47"
          alt=""
          className="w-14 h-14 rounded-full border-4 border-purple-500"
        />
      </div>
    </div>
  );
};

export default Header;