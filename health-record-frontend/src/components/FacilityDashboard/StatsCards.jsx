const stats = [
  {
    title: "Total Patients",
    value: "1,248",
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Appointments",
    value: "86",
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Total Beds",
    value: "176",
    color: "from-orange-500 to-amber-700",
  },
  {
    title: "Revenue",
    value: "$125K",
    color: "from-purple-500 to-pink-700",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl`}
        >
          <h1 className="text-4xl font-bold text-white">
            {card.value}
          </h1>

          <p className="mt-2 text-gray-200">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;