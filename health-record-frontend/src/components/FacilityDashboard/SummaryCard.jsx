const SummaryCard = () => {
  return (
    <div className="bg-[#07113d] rounded-3xl p-6 text-white">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Today's Summary
        </h2>

        <span className="text-blue-400">
          View report
        </span>
      </div>

      <div className="space-y-4">
        {[
          ["New Admissions", 18],
          ["Discharges", 12],
          ["Surgeries Scheduled", 8],
          ["Lab Tests", 56],
          ["Walk-ins", 24],
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-white/10 pb-3"
          >
            <span>{item[0]}</span>
            <span>{item[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;