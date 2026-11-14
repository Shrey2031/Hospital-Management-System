import { Building2 } from "lucide-react";

const TrustedCompanies = () => {
  const companies = [
    "CityCare",
    "LifePlus",
    "Green Valley",
    "Sunrise",
    "CareWell",
    "HealthFirst",
  ];

  return (
    <section className="py-20 bg-[#F7F6F2] border-y border-[#E4E1D8]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-[#0E6B64] tracking-wide mb-2">
          TRUSTED PARTNERS
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#12181B] mb-12">
          Trusted by Leading Healthcare Facilities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {companies.map((name) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#E4E1D8] bg-white px-4 py-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E6B64]/40 hover:shadow-md"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#E4F1EF] group-hover:bg-[#0E6B64] transition-colors">
                <Building2
                  size={18}
                  className="text-[#0E6B64] group-hover:text-white transition-colors"
                />
              </span>
              <span className="text-sm font-semibold text-[#12181B]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
