// import { UserPlus, FileText, Stethoscope, ShieldCheck } from "lucide-react";

// const steps = [
//   {
//     icon: UserPlus,
//     title: "Create your account",
//     desc: "Sign up as a patient, doctor, or facility in under two minutes.",
//   },
//   {
//     icon: FileText,
//     title: "Add your records",
//     desc: "Upload existing records or start fresh — everything stays organized.",
//   },
//   {
//     icon: Stethoscope,
//     title: "Connect with care",
//     desc: "Book appointments and share access with doctors or facilities.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Stay in control",
//     desc: "Manage who sees what, with full visibility into every share.",
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <section id="how-it-works" className="py-20 px-6 md:px-8 lg:px-16 bg-[#EFEDE6] scroll-mt-24">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <p className="text-sm font-medium text-[#0E6B64] tracking-wide mb-2">
//             HOW IT WORKS
//           </p>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#12181B]">
//             Get started in four simple steps
//           </h2>
//         </div>

//         <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
//           {/* connecting line, desktop only */}
//           <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-[#E4E1D8]" />

//           {steps.map((step, i) => (
//             <div key={step.title} className="relative flex flex-col items-center text-center">
//               <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0E6B64] text-white font-serif font-semibold mb-5">
//                 {i + 1}
//               </div>
//               <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#E4E1D8] mb-4">
//                 <step.icon size={18} className="text-[#0E6B64]" />
//               </span>
//               <h3 className="font-semibold text-[#12181B]">{step.title}</h3>
//               <p className="text-sm text-[#5B6470] mt-2 max-w-[220px] leading-relaxed">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

import { motion } from 'framer-motion';
import { Wrap, Reveal, Eyebrow } from './Shared';

const steps = [
  ['Create an account', 'Sign up as a patient, doctor or facility.'],
  ['Add medical records', 'Upload reports, scans and prescriptions and organise them by category.'],
  ['Connect with providers', "Book appointments and message the doctors you've seen."],
  ['Manage and share securely', 'Share a record for a limited time and stay in control of who can see it.'],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24">
      <Wrap>
        <Reveal className="mb-16 max-w-xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Four steps from sign-up to shared care.</h2>
        </Reveal>

        <div className="relative grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="absolute bottom-2 left-5 top-2 w-px bg-[var(--mc-line)] md:hidden" />
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--mc-line)] md:block" />
          <motion.div
            className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-[var(--mc-teal)] md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.1} className="relative pl-14 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mc-teal)] bg-[var(--mc-bg)] font-mono text-sm text-[var(--mc-teal)]">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--mc-muted)]">{desc}</p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}