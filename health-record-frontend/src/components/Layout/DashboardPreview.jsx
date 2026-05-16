// import React from "react";
// import logo from "../../images/patientDsb1.png";

// const DashboardPreview = () => {
//   return (
//     <section className="pb-24">
//       <div className="bg-gradient-to-r from-[#09153d] to-[#111d55] rounded-3xl border border-blue-900 p-8">
//         <img
//         //   src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
//             src={logo}
//           alt=""
//           className="rounded-2xl"
//         />
//       </div>
//     </section>
//   );
// };

// export default DashboardPreview;






// import React from "react";
// import logo from "../../images/patientDsb1.png";

// const DashboardPreview = () => {
//   return (
//     <section className="relative overflow-hidden py-12 px-4 md:px-8 lg:px-16">
//       {/* Subtle Background Glows */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-8">
//         {/* Left - Tighter Marketing Section */}
//         <div className="space-y-4 lg:space-y-6 lg:max-w-lg">
//           {/* Badge */}
//           <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
//             <span className="text-base font-semibold text-blue-300 tracking-wide">
//               Smart. Secure. Simplified.
//             </span>
//           </div>

//           {/* Headline */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
//             <span className="bg-gradient-to-r from-slate-100 via-blue-100 to-blue-300 bg-clip-text text-transparent">
//               Your Health Records,
//             </span>
//             <br />
//             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
//               Always Within Reach.
//             </span>
//           </h1>

//           {/* Description - Less space below */}
//           <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-md mb-2">
//             Securely access, manage, and share your health records from anywhere. 
//             Designed for patients, doctors, and healthcare facilities with enterprise-grade security.
//           </p>

//           {/* CTA Buttons - Less space above */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 border border-blue-500/30 backdrop-blur-sm">
//               <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></span>
//               <span className="relative flex items-center gap-2">
//                 Get Started Now
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </span>
//             </button>
//             <button className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Right - Full Image Visible */}
//         <div>
//           <img
//             src={logo}
//             alt="MediCare+ Patient Dashboard"
//             className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[650px] h-auto rounded-3xl shadow-2xl border border-slate-800/50 hover:shadow-blue-500/30 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DashboardPreview;

import React from "react";
import logo from "../../images/patientDsb1.png";

const DashboardPreview = () => {
  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      {/* Premium Layered Background */}
      <div className="absolute inset-0">
        {/* Main glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Subtle secondary glows */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-blue-400/4 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-purple-400/4 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
        {/* Left - Premium Marketing */}
        <div className="space-y-6 lg:space-y-8 lg:max-w-lg pt-4 lg:pt-0">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-3xl bg-white/5/90 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 hover:ring-white/15 transition-all duration-300">
            <span className="text-sm font-medium tracking-wide text-blue-300/90 uppercase">
              Smart. Secure. Simplified.
            </span>
          </div>

          {/* Elegant Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.95] tracking-tight">
            <span className="block font-extrabold bg-gradient-to-r from-white via-blue-50 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
              Your Health Records,
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              Always Within Reach.
            </span>
          </h1>

          {/* Refined Description */}
          <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed max-w-md font-light mb-6">
            Securely access, manage, and share your health records from anywhere. 
            Enterprise-grade security for patients, doctors, and healthcare facilities.
          </p>

          {/* Premium Glassmorphism Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative px-10 py-4 bg-white/3 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] ring-1 ring-white/10 hover:ring-blue-500/30">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-3 font-semibold text-lg text-white/95 backdrop-blur-sm">
                Get Started Now
                <svg className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="px-10 py-4 bg-white/2 backdrop-blur-xl border border-white/10 text-white/90 font-semibold text-lg rounded-3xl hover:bg-white/5 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 ring-1 ring-white/5">
              Learn More
            </button>
          </div>
        </div>

        {/* Right - Premium Full Image Showcase */}
        <div className="lg:-mr-8 xl:-mr-16 pt-2 lg:pt-0">
          <div className="relative group">
            {/* Floating glassmorphism frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm animate-pulse"></div>
            <img
              src={logo}
              alt="MediCare+ Patient Dashboard"
              className="w-[480px] md:w-[580px] lg:w-[680px] xl:w-[780px] h-auto max-h-[520px] md:max-h-[620px] lg:max-h-[720px] xl:max-h-[800px] object-contain rounded-3xl shadow-2xl border border-white/5 hover:border-blue-500/40 transition-all duration-700 transform group-hover:scale-[1.02] group-hover:-translate-y-2 origin-top bg-gradient-to-br from-slate-900/50 to-blue-950/50 backdrop-blur-md p-6 lg:p-8"
            />
            {/* Bottom glow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;