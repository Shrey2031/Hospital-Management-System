import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import doctor from "../../images/doctor.jpeg";
import patient from "../../images/ptnet.avif";
import hospital from "../../images/hospital-feature.webp";

const RoleCards = () => {
  const roles = [
    {
      id: "for-patients",
      title: "For Patients",
      subtitle: "Complete health control",
      features: ["Store records", "Book appointments", "Track prescriptions", "Share securely"],
      icon: "👩‍⚕️",
      image: patient,
    },
    {
      id: "for-doctors",
      title: "For Doctors",
      subtitle: "Smarter patient care",
      features: ["Patient history", "Prescriptions", "Lab tests", "Secure chat"],
      icon: "👨‍⚕️",
      image: doctor,
    },
    {
      id: "for-facilities",
      title: "For Facilities",
      subtitle: "Streamlined operations",
      features: ["Record management", "Doctor coordination", "Reports", "Data security"],
      icon: "🏥",
      image: hospital,
    },
  ];

  return (
    <section id="roles" className="py-20 px-6 md:px-8 lg:px-16 bg-[#EFEDE6] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-[#0E6B64] tracking-wide mb-2">
            ONE PLATFORM
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#12181B] mb-4">
            Three Experiences
          </h2>
          <p className="text-base md:text-lg text-[#5B6470] max-w-sm mx-auto leading-relaxed">
            Unified healthcare solution for all.
          </p>
        </div>

        {/* Same image-card format for every role — consistent overlay
            treatment instead of one card looking visually unrelated to the other two */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              id={role.id}
              className="group relative h-[400px] w-full rounded-2xl overflow-hidden border border-[#E4E1D8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 scroll-mt-24"
            >
              <img
                src={role.image}
                alt={role.title}
                className="w-full h-full object-cover absolute inset-0 grayscale-[25%] contrast-105 saturate-75 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
              />

              {/* Brand-tinted overlay so three differently-sourced photos read as one cohesive set */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B4F4A]/90 via-[#12181B]/55 to-[#12181B]/15" />
              <div className="absolute inset-0 bg-[#0E6B64]/10 mix-blend-multiply" />

              <div className="relative z-10 h-full p-6 lg:p-7 flex flex-col">
                <div className="w-11 h-11 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/25 mb-4 self-start">
                  <span className="text-lg">{role.icon}</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-serif font-medium text-white leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm text-white/85 mt-1 mb-4">{role.subtitle}</p>

                  <ul className="space-y-2">
                    {role.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2.5 text-sm text-white/90"
                      >
                        <CheckCircle2 size={15} className="text-[#5FD9C9] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-6 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md px-5 py-2.5 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleCards;