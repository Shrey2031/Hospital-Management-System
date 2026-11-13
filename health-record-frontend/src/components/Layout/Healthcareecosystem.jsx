import { motion } from 'framer-motion';
import { Wrap, Reveal, Eyebrow } from './Shared';

const Line = ({ x1, y1, x2, y2, strong }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    className={strong ? 'stroke-[var(--mc-muted)]' : 'stroke-[var(--mc-teal)]'}
    strokeWidth="1.25"
    strokeOpacity={strong ? 0.6 : 0.5}
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: 'easeOut' }}
  />
);

const Node = ({ x, y, title, sub }) => (
  <g>
    <rect x={x} y={y} width="190" height="84" rx="10" className="fill-white stroke-[var(--mc-line)]" />
    <text x={x + 20} y={y + 38} className="fill-[var(--mc-ink)] font-serif text-[19px]">{title}</text>
    <text x={x + 20} y={y + 60} className="fill-[var(--mc-muted)] font-mono text-[11px]">{sub}</text>
  </g>
);

const Pill = ({ x, y, w, text }) => (
  <g>
    <rect x={x - w / 2} y={y - 12} width={w} height="24" rx="12" className="fill-[var(--mc-bg)] stroke-[var(--mc-line)]" />
    <text x={x} y={y + 4} textAnchor="middle" className="fill-[var(--mc-muted)] font-mono text-[10px]">{text}</text>
  </g>
);

export default function HealthcareEcosystem() {
  return (
    <section className="py-24">
      <Wrap className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>The ecosystem</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Everyone in the care loop, connected.</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--mc-muted)]">
            <p><b className="text-[var(--mc-ink)]">Patients</b> keep their records and book appointments.</p>
            <p><b className="text-[var(--mc-ink)]">Doctors</b> see what's been shared with them and write prescriptions.</p>
            <p><b className="text-[var(--mc-ink)]">Facilities</b> manage their profile and the doctors who practise there.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <svg viewBox="0 0 640 440" className="w-full" role="img" aria-label="Patients, doctors and facilities connected through MediCare+">
            <Line x1={135} y1={102} x2={505} y2={102} strong />
            <Line x1={505} y1={102} x2={320} y2={372} strong />
            <Line x1={320} y1={215} x2={135} y2={102} />
            <Line x1={320} y1={215} x2={505} y2={102} />
            <Line x1={320} y1={215} x2={320} y2={372} />
            <Node x={40} y={60} title="Patient" sub="records · appointments" />
            <Node x={410} y={60} title="Doctor" sub="care · prescriptions" />
            <Node x={225} y={330} title="Facility" sub="profile · doctor roster" />
            <Pill x={320} y={102} w={118} text="book · message" />
            <Pill x={412} y={237} w={104} text="doctor roster" />
            <circle cx="320" cy="215" r="52" className="fill-[var(--mc-teal)]" />
            <text x="320" y="221" textAnchor="middle" className="fill-white font-serif text-[16px]">MediCare+</text>
          </svg>
        </Reveal>
      </Wrap>
    </section>
  );
}