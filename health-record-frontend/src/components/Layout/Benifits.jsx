import { Wrap, Reveal, Eyebrow } from './Shared';

const items = [
  ['One timeline', 'Records, appointments and prescriptions live together, so nothing depends on a folder in a drawer.'],
  ['A workspace for each role', "Patients, doctors and facilities see what's relevant to them, and nothing more."],
  ['Sharing with an end date', 'Give a doctor access to a record for a set period instead of emailing attachments.'],
];

export default function Benefits() {
  return (
    <section className="border-t border-[var(--mc-line)] py-24">
      <Wrap>
        <Reveal className="mb-12"><Eyebrow>Why MediCare+</Eyebrow></Reveal>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--mc-line)]">
          {items.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.08} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="font-serif text-2xl leading-snug">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--mc-muted)]">{desc}</p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}