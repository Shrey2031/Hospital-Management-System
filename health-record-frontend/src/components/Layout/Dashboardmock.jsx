import { useEffect, useRef, useState } from 'react';
import { Heart, FileText, Calendar, FlaskConical, Pill } from 'lucide-react';

// Renders the real patient-dashboard layout at a fixed 900px design width
// and scales it to fit its container, so it stays crisp at any size.
function Scaled({ width = 900, children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [state, setState] = useState({ scale: 1, height: 560 });

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      const scale = entry.contentRect.width / width;
      setState({ scale, height: (inner.current?.offsetHeight || 560) * scale });
    });
    ro.observe(outer.current);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="relative w-full overflow-hidden" style={{ height: state.height }}>
      <div ref={inner} style={{ width, transform: `scale(${state.scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  );
}

const NAV = ['Dashboard', 'My Records', 'Appointments', 'Prescriptions', 'Billing', 'Messages', 'Settings'];
const STATS = [
  ['Total Records', '12', FileText, '#0D7169', '#DCEBE6'],
  ['Appointments', '2', Calendar, '#E8623F', '#FBEAE4'],
  ['Lab Reports', '4', FlaskConical, '#D98C2B', '#FBF0E0'],
  ['Medications', '3', Pill, '#5B6A72', '#EFEDE6'],
];
const RECORDS = [['Blood test report', 'REPORT'], ['Chest X-ray', 'IMAGE'], ['Discharge summary', 'DOCUMENT']];
const APPTS = [['Dr. Mehta', 'Cardiology', 'CONFIRMED', 'Jun 18 · 09:00'], ['Dr. Rao', 'General', 'PENDING', 'Jun 24 · 11:30'], ['Dr. Iyer', 'Dermatology', 'CONFIRMED', 'Jul 02 · 16:00']];

export default function DashboardMock() {
  return (
    <Scaled width={900}>
      <div className="flex h-[540px] bg-[var(--mc-bg)] text-[var(--mc-ink)]" aria-hidden="true">
        <aside className="flex w-[176px] shrink-0 flex-col bg-[var(--mc-ink)] p-4 text-white">
          <div className="mb-6 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--mc-teal)]"><Heart size={15} /></span>
            <span className="font-serif text-[15px]">MediCare<span className="text-[#5FD9C9]">+</span></span>
          </div>
          {NAV.map((n, i) => (
            <div key={n} className={`mb-1 rounded-lg px-3 py-2 text-[12px] ${i === 0 ? 'bg-[var(--mc-teal)] font-semibold' : 'text-white/60'}`}>{n}</div>
          ))}
        </aside>

        <main className="flex-1 p-5">
          <p className="font-serif text-[22px]">Good morning, <span className="text-[var(--mc-teal)]">Alex</span></p>
          <p className="text-[11px] text-[var(--mc-muted)]">Here's your health overview for today.</p>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[var(--mc-teal)] to-[var(--mc-teal-deep)] p-5 text-white">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#CFEDE9]">Your health score</p>
                  <p className="mt-2 font-serif text-[30px] leading-none">Excellent</p>
                  <p className="mt-2 text-[11px] text-[#DCEFEC]">Keep maintaining your healthy lifestyle.</p>
                </div>
                <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full border-[7px] border-[#5FD9C9] font-serif text-[24px]">78</div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {STATS.map(([label, value, Icon, c, bg]) => (
                  <div key={label} className="rounded-xl border border-[var(--mc-line)] bg-white p-3">
                    <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: bg }}><Icon size={14} style={{ color: c }} /></span>
                    <p className="font-serif text-[20px] font-semibold leading-none">{value}</p>
                    <p className="mt-1 text-[10px] text-[var(--mc-muted)]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[var(--mc-line)] bg-white p-4">
                <p className="mb-2 font-serif text-[14px]">Recent Records</p>
                {RECORDS.map(([t, c]) => (
                  <div key={t} className="flex items-center justify-between border-t border-[var(--mc-line)] py-2 text-[11px]">
                    <span className="font-medium">{t}</span>
                    <span className="rounded-full border border-[var(--mc-line)] bg-[#EFEDE6] px-2 py-0.5 text-[9px] text-[var(--mc-muted)]">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--mc-line)] bg-white p-4">
              <p className="mb-3 font-serif text-[14px]">Appointments</p>
              {APPTS.map(([d, s, st, when]) => (
                <div key={d} className="mb-2.5 rounded-lg border border-[var(--mc-line)] bg-[var(--mc-bg)] p-3">
                  <p className="text-[12px] font-semibold">{d}</p>
                  <p className="text-[10px] text-[var(--mc-muted)]">{s}</p>
                  <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ${st === 'CONFIRMED' ? 'bg-[var(--mc-sage)] text-[var(--mc-teal-deep)]' : 'bg-[#FBF0E0] text-[#8A5A16]'}`}>{st}</span>
                  <p className="mt-1.5 text-[10px] text-[var(--mc-muted)]">{when}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Scaled>
  );
}