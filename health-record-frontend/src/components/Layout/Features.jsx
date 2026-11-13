import { ArrowUpRight } from 'lucide-react';
import { Wrap, Reveal, Eyebrow } from './Shared';

const items = [
  ['Medical record management', 'Upload reports, imaging and documents once and keep them organised by category.'],
  ['Appointment scheduling', 'Book in-person, video or phone visits and see what is coming next at a glance.'],
  ['Prescription management', 'Active and completed prescriptions, dosage details and refill requests in one list.'],
  ['Laboratory reports', 'Lab results sit alongside the rest of your history, ready to open or download.'],
  ['Secure record sharing', 'Share a record with a doctor for a set period. Access ends when it expires.'],
  ['Role-based access', 'Patients, doctors and facilities each get their own workspace and permissions.'],
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-y border-[var(--mc-line)] py-24">
      <Wrap className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Everything a record needs, nothing it doesn't.</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--mc-muted)]">The tools patients, doctors and facilities use every day, in one product.</p>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--mc-line)] border-y border-[var(--mc-line)] lg:col-span-8">
          {items.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.04}>
              <div className="group grid gap-2 py-7 md:grid-cols-[48px_1fr_1.1fr_24px] md:items-baseline md:gap-6">
                <span className="font-mono text-xs text-[var(--mc-muted)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--mc-teal)]">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--mc-muted)]">{desc}</p>
                <ArrowUpRight size={16} className="hidden text-[var(--mc-teal)] opacity-0 transition-opacity group-hover:opacity-100 md:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}