import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#111827]">
          Good morning, City Hospital 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Here's your facility overview for today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[350px] shadow-lg">
          <input
            type="text"
            placeholder="Search patients, staff..."
            className="outline-none flex-1 text-gray-700"
          />

          <Search className="text-gray-500" />
        </div>

        <button className="bg-white p-4 rounded-2xl shadow-lg">
          <Bell className="text-[#111827]" />
        </button>

        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200"
          alt=""
          className="w-14 h-14 rounded-full border-4 border-purple-500 object-cover"
        />
      </div>
    </div>
  );
};

export default Header;