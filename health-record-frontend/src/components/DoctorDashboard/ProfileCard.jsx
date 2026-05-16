const ProfileCard = () => {
  return (
    <div className="bg-[#111c5a] rounded-3xl p-6 text-center">
      <img
        src="https://i.pravatar.cc/150?img=47"
        alt=""
        className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500"
      />

      <h2 className="text-2xl font-semibold mt-4">
        Dr. Emily Watson
      </h2>

      <p className="text-gray-300 mt-1">
        Cardiologist
      </p>

      <button className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-2xl">
        View Profile
      </button>
    </div>
  );
};

export default ProfileCard;