// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Navbar = () => {
//    const navigate = useNavigate(); 
//   return (
//     <nav className="flex justify-between items-center px-8 py-6">
//       <div>
//         <h1 className="text-3xl font-bold text-blue-400">
//           MediCare+
//         </h1>
//         <p className="text-sm text-gray-400">
//           Health Record Management
//         </p>
//       </div>

//       <ul className="hidden lg:flex gap-10 text-gray-300">
//         <li className="hover:text-blue-400 cursor-pointer">Home</li>
//         <li className="hover:text-blue-400 cursor-pointer">Features</li>
//         <li className="hover:text-blue-400 cursor-pointer">For Patients</li>
//         <li className="hover:text-blue-400 cursor-pointer">For Doctors</li>
//         <li className="hover:text-blue-400 cursor-pointer">For Facilities</li>
//         <li className="hover:text-blue-400 cursor-pointer">How It Works</li>

//       </ul>

//       <div className="flex gap-4">
//         <button className="border border-blue-500 px-5 py-2 rounded-xl"
//          onClick={() => navigate('/Auth')}>
//           Login
//         </button>

//         <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl"
//          onClick={() => navigate('/Auth')}>
//           Get Started
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X, Heart } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const links = [
//     { label: "Home", href: "#home" },
//     { label: "Features", href: "#features" },
//     { label: "For Patients", href: "#for-patients" },
//     { label: "For Doctors", href: "#for-doctors" },
//     { label: "For Facilities", href: "#for-facilities" },
//     { label: "How It Works", href: "#how-it-works" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E4E1D8]">
//       <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
//         <a href="#home" className="flex items-center gap-3">
//           <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0E6B64]">
//             <Heart size={18} className="text-white" strokeWidth={2.5} />
//           </span>
//           <div>
//             <h1 className="text-xl font-semibold font-serif text-[#12181B] leading-none">
//               MediCare<span className="text-[#0E6B64]">+</span>
//             </h1>
//             <p className="text-xs text-[#8A929B]">Health Record Management</p>
//           </div>
//         </a>

//         <ul className="hidden lg:flex gap-8 text-[#3A4247] text-sm font-medium">
//           {links.map((item) => (
//             <li key={item.label}>
//               <a
//                 href={item.href}
//                 className="hover:text-[#0E6B64] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6B64] rounded"
//               >
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="hidden lg:flex gap-3">
//           <button
//             className="border border-[#E4E1D8] text-[#12181B] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#EFEDE6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E6B64]"
//             onClick={() => navigate("/Auth")}
//           >
//             Login
//           </button>

//           <button
//             className="bg-[#0E6B64] hover:bg-[#0B4F4A] text-white transition-colors px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B64]"
//             onClick={() => navigate("/Auth")}
//           >
//             Get Started
//           </button>
//         </div>

//         <button
//           className="lg:hidden p-2 text-[#12181B]"
//           onClick={() => setOpen(!open)}
//           aria-expanded={open}
//           aria-label={open ? "Close menu" : "Open menu"}
//         >
//           {open ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {open && (
//         <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 border-t border-[#E4E1D8]">
//           {links.map((item) => (
//             <a
//               key={item.label}
//               href={item.href}
//               onClick={() => setOpen(false)}
//               className="text-[#3A4247] text-sm font-medium pt-4"
//             >
//               {item.label}
//             </a>
//           ))}
//           <div className="flex flex-col gap-3 pt-2">
//             <button
//               className="border border-[#E4E1D8] text-[#12181B] px-5 py-2.5 rounded-xl text-sm font-semibold"
//               onClick={() => navigate("/Auth")}
//             >
//               Login
//             </button>
//             <button
//               className="bg-[#0E6B64] text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
//               onClick={() => navigate("/Auth")}
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Wrap, Btn } from './Shared';

const links = [
  ['Home', '#home'],
  ['Features', '#features'],
  ['For Patients', '#for-patients'],
  ['For Doctors', '#for-doctors'],
  ['For Facilities', '#for-facilities'],
  ['How It Works', '#how-it-works'],
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-[var(--mc-line)] backdrop-blur-md' : 'border-transparent'
      }`}
      style={{ background: scrolled ? 'color-mix(in srgb, var(--mc-bg) 88%, transparent)' : 'var(--mc-bg)' }}
    >
      <Wrap className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--mc-teal)]">
            <Heart size={17} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[19px] font-semibold">
              MediCare<span className="text-[var(--mc-teal)]">+</span>
            </span>
            <span className="mt-1 hidden font-mono text-[10px] text-[var(--mc-muted)] sm:block">Health Record Management</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[13px] font-medium text-[var(--mc-muted)] transition-colors hover:text-[var(--mc-teal)]">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Btn variant="ghost" onClick={() => navigate('/Auth')}>Login</Btn>
          <Btn onClick={() => navigate('/Auth')}>Get Started</Btn>
        </div>

        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Wrap>

      {open && (
        <div className="border-t border-[var(--mc-line)] bg-[var(--mc-bg)] lg:hidden">
          <Wrap className="flex flex-col gap-1 py-4">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium">
                {label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Btn variant="ghost" onClick={() => navigate('/Auth')}>Login</Btn>
              <Btn onClick={() => navigate('/Auth')}>Get Started</Btn>
            </div>
          </Wrap>
        </div>
      )}
    </header>
  );
}