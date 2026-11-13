import { Check, Minus, KeyRound, Lock, ShieldCheck, Timer } from 'lucide-react';
import { Wrap, Reveal, Eyebrow } from './Shared';

const facts = [
  [Lock, 'Passwords are stored hashed, never in plain text.'],
  [KeyRound, 'Sessions use signed tokens delivered through httpOnly cookies.'],
  [ShieldCheck, 'Protected routes check your role before returning data.'],
  [Timer, 'Shared records carry an expiry date set when you share.'],
];

const matrix = [
  ['Upload and view own records', true, false, false],
  ['Share a record for a limited time', true, false, false],
  ['View records shared with them', false, true, false],
  ['Book and manage appointments', true, true, false],
  ['Write prescriptions', false, true, false],
  ['Manage facility profile and doctors', false, false, true],
];

const Cell = ({ on }) => (
  <td className="py-3.5 text-center">
    {on ? <Check size={16} className="mx-auto text-[#5FD9C9]" /> : <Minus size={14} className="mx-auto text-white/25" />}
  </td>
);

export default function SecuritySection() {
  return (
    <section className="bg-[var(--mc-ink)] py-24 text-white">
      <Wrap className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow light>Security</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">Access you can reason about.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Every account has a role, and every request is checked against it. Records stay private to the patient unless they choose to share.
          </p>
          <ul className="mt-8 space-y-4">
            {facts.map(([Icon, text]) => (
              <li key={text} className="flex gap-3 text-[15px] text-white/80">
                <Icon size={18} className="mt-0.5 shrink-0 text-[#5FD9C9]" /> {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-x-auto rounded-xl border border-white/15 p-6">
            <table className="w-full min-w-[460px] text-sm">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                  <th className="pb-4 text-left font-normal">What each role can do</th>
                  <th className="pb-4 font-normal">Patient</th>
                  <th className="pb-4 font-normal">Doctor</th>
                  <th className="pb-4 font-normal">Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {matrix.map(([label, ...cells]) => (
                  <tr key={label}>
                    <td className="py-3.5 pr-4 text-white/85">{label}</td>
                    {cells.map((on, i) => <Cell key={i} on={on} />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}