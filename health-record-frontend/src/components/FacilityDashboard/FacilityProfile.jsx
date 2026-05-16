const FacilityProfile = () => {
  return (
    <div className="bg-[#111c5a] rounded-3xl p-6 text-center text-white">
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200"
        alt=""
        className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 object-cover"
      />

      <h2 className="text-3xl font-semibold mt-5">
        City Hospital
      </h2>

      <p className="text-gray-300 mt-2">
        Healthcare Facility
      </p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-white/10 rounded-2xl p-3">
          <h1 className="text-2xl font-bold">245</h1>
          <p className="text-sm text-gray-300">Beds</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-3">
          <h1 className="text-2xl font-bold">12</h1>
          <p className="text-sm text-gray-300">Departments</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-3">
          <h1 className="text-2xl font-bold">850+</h1>
          <p className="text-sm text-gray-300">Staff</p>
        </div>
      </div>

      <button className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-2xl">
        View Facility Profile
      </button>
    </div>
  );
};

export default FacilityProfile;