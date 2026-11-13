import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Timer } from 'lucide-react';
import { Wrap, Reveal, Eyebrow, Btn } from './Shared';
import DashboardMock from './Dashboardmock';

const signals = [
  [ShieldCheck, 'Role-based access'],
  [Lock, 'Hashed credentials'],
  [Timer, 'Expiring record sharing'],
];

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section id="home" className="scroll-mt-24 overflow-hidden">
      <Wrap className="grid items-center gap-16 pb-24 pt-10 lg:grid-cols-12 lg:pb-32 lg:pt-16">
        <div className="lg:col-span-6">
          <Reveal><Eyebrow>Health record management</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-serif text-[2.9rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Your health records, <em className="text-[var(--mc-teal)]">always within reach.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--mc-muted)]">
              One secure place for patients, doctors and facilities to store, share and act on health records, without the paperwork.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
            <Btn onClick={() => navigate('/Auth')}>Get Started <ArrowRight size={16} /></Btn>
            <a href="#how-it-works"><Btn variant="ghost" tabIndex={-1}>See how it works</Btn></a>
          </Reveal>
          <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-[var(--mc-line)] pt-6">
            {signals.map(([Icon, label]) => (
              <span key={label} className="flex items-center gap-2 text-[13px] text-[var(--mc-muted)]">
                <Icon size={15} className="text-[var(--mc-teal)]" /> {label}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative lg:col-span-6 lg:-mr-16 xl:-mr-28">
          <div className="rounded-xl border border-[var(--mc-line)] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(23,42,53,0.35)]">
            <div className="overflow-hidden rounded-lg"><DashboardMock /></div>
          </div>
          <div className="absolute -top-5 right-6 flex items-center gap-2.5 rounded-lg border border-[var(--mc-line)] bg-white px-3.5 py-3 text-xs shadow-lg">
            <CheckCircle2 size={16} className="text-[var(--mc-teal)]" />
            <span><b className="block font-semibold">Appointment confirmed</b><span className="text-[var(--mc-muted)]">Tomorrow, 09:00</span></span>
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-2.5 rounded-lg border border-[var(--mc-line)] bg-white px-3.5 py-3 text-xs shadow-lg sm:-left-8">
            <Lock size={16} className="text-[var(--mc-teal)]" />
            <span><b className="block font-semibold">Shared with your doctor</b><span className="text-[var(--mc-muted)]">Access expires in 7 days</span></span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}