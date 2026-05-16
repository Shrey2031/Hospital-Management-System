const OverviewCard = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-700 rounded-3xl p-8 flex justify-between items-center">
      
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Facility Overview
        </h2>

        <p className="text-gray-200 mt-4">
          Overall Performance
        </p>

        <h1 className="text-6xl font-bold text-white mt-2">
          87
        </h1>

        <p className="text-lg text-gray-200 mt-3">
          Your facility is performing great.
        </p>

        <button className="mt-6 bg-[#0c133f] px-6 py-3 rounded-2xl text-white">
          View Report
        </button>
      </div>

      <div className="space-y-5 w-[320px]">
        {[
          "Bed Occupancy",
          "Patient Satisfaction",
          "Average Wait Time",
          "Staff Productivity",
        ].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-white mb-2">
              <span>{item}</span>
              <span>80%</span>
            </div>

            <div className="w-full h-3 bg-white/20 rounded-full">
              <div className="w-[80%] h-3 bg-cyan-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;