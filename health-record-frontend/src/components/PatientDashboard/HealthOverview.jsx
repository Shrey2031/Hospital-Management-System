const HealthOverview = () => {
  return (
    <div className="grid grid-cols-9 gap-6">
      {/* HEALTH SCORE */}
      <div className="col-span-9 bg-gradient-to-r from-[#9b5cff] to-[#3562ff] rounded-3xl p-8 text-white">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Your Health Score
            </h2>

            <h1 className="text-6xl font-bold mt-6">
              Excellent ✅
            </h1>

            <p className="mt-5 text-lg text-gray-200 max-w-sm">
              You're doing great! Keep maintaining your
              healthy lifestyle.
            </p>

            <button className="mt-8 bg-[#0f172a] px-6 py-4 rounded-2xl">
              View Health Summary
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border-[16px] border-cyan-300 flex items-center justify-center text-6xl font-bold">
              78
            </div>

            <p className="mt-5 bg-white/20 px-4 py-2 rounded-full">
              ↑ 8 points from last month
            </p>
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      {/* <div className="col-span-4 bg-[#1a1f63] rounded-3xl p-8 text-white flex flex-col items-center justify-center">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="w-32 h-32 rounded-full border-4 border-white"
        />

        <h2 className="text-3xl font-bold mt-5">
          Sarah Johnson
        </h2>

        <p className="text-gray-300 mt-2">
          sarah.johnson@email.com
        </p>

        <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-2xl">
          View Profile
        </button>
      </div> */}
    </div>
  );
};

export default HealthOverview;