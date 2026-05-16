const cards = [
  {
    title: "Total Patients",
    value: "236",
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Appointments",
    value: "24",
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Lab Reports",
    value: "18",
    color: "from-orange-500 to-amber-700",
  },
  {
    title: "Prescriptions",
    value: "16",
    color: "from-purple-500 to-pink-700",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl`}
        >
          <h1 className="text-4xl font-bold">{card.value}</h1>
          <p className="mt-2 text-gray-200">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;