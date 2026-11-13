import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Wrap, Reveal, Eyebrow } from './Shared';
import patientImg from '../../images/ptnet.avif';
import hospitalImg from '../../images/hospital-feature.webp';

const SCHEDULE = [['09:00', 'AK', 'Confirmed'], ['10:30', 'RS', 'Pending'], ['11:15', 'MP', 'Confirmed']];

export default function PlatformOverview() {
  const navigate = useNavigate();
  const go = () => navigate('/Auth');
  return (
    <section className="py-24">
      <Wrap>
        <Reveal className="mb-12 max-w-xl">
          <Eyebrow>One platform</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Three roles, one connected record.</h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="scroll-mt-24 lg:col-span-7 lg:row-span-2" >
            <article id="for-patients" className="scroll-mt-24 flex h-full flex-col overflow-hidden rounded-xl border border-[var(--mc-line)] bg-white">
              <img src={patientImg} alt="A patient reviewing their health records on a phone" className="h-72 w-full object-cover" />
              <div className="flex flex-1 flex-col p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mc-teal)]">For patients</p>
                <h3 className="mt-2 font-serif text-3xl">Complete control of your health.</h3>
                <ul className="mt-5 grid gap-x-8 gap-y-2 text-[15px] text-[var(--mc-muted)] sm:grid-cols-2">
                  {['Store every record in one place', 'Book appointments', 'Track prescriptions', 'Share with a doctor, for a limited time'].map((t) => (
                    <li key={t} className="border-l-2 border-[var(--mc-sage)] pl-3">{t}</li>
                  ))}
                </ul>
                <button onClick={go} className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-[var(--mc-teal)]">
                  Get started as a patient <ArrowRight size={14} />
                </button>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <article id="for-doctors" className="scroll-mt-24 h-full rounded-xl bg-[var(--mc-sage)] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mc-teal)]">For doctors</p>
              <h3 className="mt-2 font-serif text-3xl">Smarter patient care.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--mc-muted)]">Patient history, prescriptions and secure chat, with a schedule that stays in front of you.</p>
              <div className="mt-6 rounded-lg border border-[var(--mc-line)] bg-white p-4" aria-hidden="true">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--mc-muted)]">Today's schedule · sample</p>
                {SCHEDULE.map(([t, i, s]) => (
                  <div key={t} className="flex items-center gap-3 border-t border-[var(--mc-line)] py-2 text-xs first:border-0">
                    <span className="w-11 font-mono text-[var(--mc-muted)]">{t}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mc-sage)] text-[10px] font-semibold text-[var(--mc-teal-deep)]">{i}</span>
                    <span className="ml-auto text-[var(--mc-teal)]">{s}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-5">
            <article id="for-facilities" className="scroll-mt-24 grid h-full overflow-hidden rounded-xl border border-[var(--mc-line)] bg-white sm:grid-cols-5">
              <div className="p-8 sm:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mc-teal)]">For facilities</p>
                <h3 className="mt-2 font-serif text-2xl">Streamlined operations.</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--mc-muted)]">Manage your facility profile and the doctors who practise there.</p>
              </div>
              <img src={hospitalImg} alt="A hospital building" className="h-40 w-full object-cover sm:col-span-2 sm:h-full" />
            </article>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}