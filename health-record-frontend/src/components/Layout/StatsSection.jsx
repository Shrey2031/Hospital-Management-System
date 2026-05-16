const stats = [
  "10K+ Happy Users",
  "500K+ Records",
  "99.9% Uptime",
  "1K+ Hospitals",
  "4.8/5 Rating",
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;