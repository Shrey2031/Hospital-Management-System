import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Wrap } from './Shared';

// 'auth' links send visitors to the login/register page. The '#' links under
// Support are placeholders: point them at real pages once they exist.
const cols = [
  ['Product', [['Features', '#features'], ['For Patients', '#for-patients'], ['For Doctors', '#for-doctors'], ['For Facilities', '#for-facilities'], ['How It Works', '#how-it-works']]],
  ['Patients', [['Medical records', 'auth'], ['Appointments', 'auth'], ['Prescriptions', 'auth'], ['Messages', 'auth']]],
  ['Doctors', [['Dashboard', 'auth'], ['Patient records', 'auth'], ['Prescriptions', 'auth'], ['Secure chat', 'auth']]],
  ['Support', [['Help Center', '#'], ['Contact', '#'], ['Privacy Policy', '#'], ['Terms of Service', '#']]],
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-[var(--mc-line)] pt-16">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--mc-teal)]"><Heart size={17} className="text-white" strokeWidth={2.5} /></span>
              <span className="font-serif text-xl font-semibold">MediCare<span className="text-[var(--mc-teal)]">+</span></span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--mc-muted)]">A digital health record platform for patients, doctors and medical facilities.</p>
          </div>
          {cols.map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mc-ink)]">{title}</p>
              <ul className="space-y-2.5 text-sm text-[var(--mc-muted)]">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href === 'auth'
                      ? <button onClick={() => navigate('/Auth')} className="transition-colors hover:text-[var(--mc-teal)]">{label}</button>
                      : <a href={href} className="transition-colors hover:text-[var(--mc-teal)]">{label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-[var(--mc-line)] py-6 text-xs text-[var(--mc-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} MediCare+. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </Wrap>
    </footer>
  );
}