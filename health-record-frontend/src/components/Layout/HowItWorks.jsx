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