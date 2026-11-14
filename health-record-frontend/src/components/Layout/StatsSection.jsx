const stats = [
  "10K+ Happy Users",
  "500K+ Records",
  "99.9% Uptime",
  "1K+ Hospitals",
  "4.8/5 Rating",
];

const StatsSection = () => {
  return (
    <section className="py-14 bg-[#0E6B64]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {stats.map((item, index) => {
            const [value, ...labelParts] = item.split(" ");
            const label = labelParts.join(" ");
            return (
              <div key={index}>
                <p className="text-2xl md:text-3xl font-serif font-semibold text-white">
                  {value}
                </p>
                <p className="text-xs md:text-sm text-[#CFEDE9] mt-1">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;