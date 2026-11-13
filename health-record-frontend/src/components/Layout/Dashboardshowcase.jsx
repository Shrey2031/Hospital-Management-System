import { Wrap, Reveal, Eyebrow } from './Shared';
import DashboardMock from './DashboardMock';

const notes = [
  ['Health overview', 'Your score and trend, front and centre.', 'left-[34%] top-[24%]'],
  ['At-a-glance counts', 'Records, appointments, lab reports and medications.', 'left-[34%] top-[48%]'],
  ['Recent records', 'Your latest uploads, one click from opening.', 'left-[34%] top-[70%]'],
  ['Upcoming appointments', 'Status and time for every visit.', 'left-[86%] top-[36%]'],
];

export default function DashboardShowcase() {
  return (
    <section className="bg-[var(--mc-sage)] py-24">
      <Wrap className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>The patient dashboard</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Your health, on one screen.</h2>
          <ol className="mt-8 space-y-5">
            {notes.map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--mc-teal)] font-mono text-[11px] text-white">{i + 1}</span>
                <span>
                  <b className="block font-semibold">{title}</b>
                  <span className="text-[15px] text-[var(--mc-muted)]">{desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="relative rounded-xl border border-[var(--mc-line)] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(23,42,53,0.3)]">
            <div className="overflow-hidden rounded-lg"><DashboardMock /></div>
            {notes.map(([title, , pos], i) => (
              <span key={title} className={`absolute ${pos} hidden h-6 w-6 items-center justify-center rounded-full bg-[var(--mc-teal)] font-mono text-[11px] text-white ring-4 ring-white sm:flex`}>
                {i + 1}
              </span>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-[var(--mc-muted)]">Sample data shown.</p>
        </Reveal>
      </Wrap>
    </section>
  );
}