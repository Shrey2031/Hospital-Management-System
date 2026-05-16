const OverviewCard = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-700 rounded-3xl p-8 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Practice Overview
        </h2>

        <h1 className="text-6xl font-bold">85%</h1>

        <p className="text-lg mt-3 text-gray-200">
          Practice Efficiency Excellent
        </p>

        <button className="mt-6 bg-[#0c133f] px-6 py-3 rounded-2xl">
          View Analytics
        </button>
      </div>

      <div className="space-y-6 w-[300px]">
        {[
          "Appointments",
          "Consultations",
          "Prescriptions",
          "Follow-ups",
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
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