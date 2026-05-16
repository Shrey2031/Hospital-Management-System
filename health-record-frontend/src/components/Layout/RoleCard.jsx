// const roles = [
//   {
//     title: "For Patients",
//     desc: "Store and access your health records securely.",
//     color: "from-blue-700 to-blue-500",
//   },
//   {
//     title: "For Doctors",
//     desc: "Access patient history and prescriptions.",
//     color: "from-cyan-700 to-cyan-500",
//   },
//   {
//     title: "For Facilities",
//     desc: "Manage hospital operations efficiently.",
//     color: "from-purple-700 to-purple-500",
//   },
// ];

// const RoleCards = () => {
//   return (
//     <section className="bg-[#081336] py-24">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-5xl font-bold text-center mb-16">
//           One Platform, Three Experiences
//         </h2>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {roles.map((role, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br ${role.color} p-[1px] rounded-3xl`}
//             >
//               <div className="bg-[#09142f] rounded-3xl p-8 h-full">
//                 <h3 className="text-3xl font-bold mb-4">
//                   {role.title}
//                 </h3>

//                 <p className="text-gray-300 leading-7">
//                   {role.desc}
//                 </p>

//                 <button className="mt-8 bg-white/10 px-5 py-3 rounded-xl">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RoleCards;




import React from "react";
import doctor from "../../images/doctor.jpeg";
import patient from "../../images/ptnet.avif";
import hospital from "../../images/hospital-feature.webp";

const RoleCards = () => {
  const roles = [
    {
      title: "For Patients",
      subtitle: "Complete health control",
      features: ["Store records", "Book appointments", "Track prescriptions", "Share securely"],
      gradient: "from-blue-600/20 to-blue-700/20",
      overlayGradient: "from-slate-900/80 via-slate-900/85 to-slate-900/90",
      borderGradient: "from-blue-500/70 to-blue-600/70",
      icon: "👩‍⚕️",
      image: patient,
    },
    {
      title: "For Doctors",
      subtitle: "Smarter patient care",
      features: ["Patient history", "Prescriptions", "Lab tests", "Secure chat"],
      gradient: "from-cyan-500/20 to-teal-600/20",
      overlayGradient: "from-slate-900/80 via-slate-900/85 to-slate-900/90",
      borderGradient: "from-cyan-400/70 to-teal-500/70",
      icon: "👨‍⚕️",
      image: doctor,
    },
    {
      title: "For Facilities",
      subtitle: "Streamlined operations",
      features: ["Record management", "Doctor coordination", "Reports", "Data security"],
      gradient: "from-purple-600/20 to-violet-700/20",
      overlayGradient: "from-slate-900/80 via-slate-900/85 to-slate-900/90",
      borderGradient: "from-purple-500/70 to-violet-600/70",
      icon: "🏥",
      image: hospital,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-900/95 via-blue-950/30 to-slate-900/95">
      {/* Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -right-1/4 w-[36rem] h-[36rem] bg-gradient-to-br from-blue-500/2 to-cyan-500/2 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -left-1/4 w-[32rem] h-[32rem] bg-gradient-to-br from-purple-500/2 to-violet-500/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full">
        {/* Compact Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight bg-gradient-to-r from-white via-blue-50/90 to-blue-200 bg-clip-text text-transparent mb-3">
            One Platform,
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Three Experiences
          </h2>
          <p className="text-base md:text-lg text-gray-400/85 font-light max-w-sm mx-auto leading-relaxed">
            Unified healthcare solution for all.
          </p>
        </div>

        {/* CRISP Image Fill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {roles.map((role, index) => (
            <div
              key={index}
              className="group relative h-[380px] lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.15)] transition-all duration-600 hover:-translate-y-2 border border-white/10"
            >
              {/* FULL SHARP Image - NO BLUR */}
              <img
                src={role.image}
                alt={role.title}
                className="w-full h-full object-cover absolute inset-0 brightness-75 contrast-110 hover:brightness-90 group-hover:contrast-115 transition-all duration-500"
              />
              
              {/* Perfect Overlay Gradient - NO BLUR */}
              <div className={`absolute inset-0 ${role.overlayGradient}`}></div>

              {/* Border Glow */}
              <div className={`absolute inset-0 ${role.borderGradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full p-6 lg:p-8 flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-lg mb-4 self-start">
                  <span className="text-xl drop-shadow-lg">{role.icon}</span>
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-between mb-6 space-y-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-blue-50/90 bg-clip-text text-transparent leading-tight drop-shadow-2xl line-clamp-1">
                      {role.title}
                    </h3>
                    <p className="text-sm lg:text-base text-white/95 font-medium leading-tight drop-shadow-lg line-clamp-1">
                      {role.subtitle}
                    </p>
                    <ul className="space-y-2 pt-2">
                      {role.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm lg:text-base text-white/90 leading-tight drop-shadow-md">
                          <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400/90 to-white rounded-full shadow-lg flex-shrink-0"></div>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <button className="group self-start px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-semibold text-sm lg:text-base shadow-2xl hover:shadow-blue-500/50 hover:border-white/50 hover:bg-white/30 transition-all duration-500 transform hover:-translate-y-1 w-fit drop-shadow-2xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                  <span className="relative flex items-center gap-1.5 drop-shadow-lg">
                    Learn More →
                  </span>
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