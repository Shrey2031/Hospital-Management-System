import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Wrap, Btn } from './Shared';

const links = [
  ['Home', '#home'],
  ['Features', '#features'],
  ['For Patients', '#for-patients'],
  ['For Doctors', '#for-doctors'],
  ['For Facilities', '#for-facilities'],
  ['How It Works', '#how-it-works'],
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-[var(--mc-line)] backdrop-blur-md' : 'border-transparent'
      }`}
      style={{ background: scrolled ? 'color-mix(in srgb, var(--mc-bg) 88%, transparent)' : 'var(--mc-bg)' }}
    >
      <Wrap className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--mc-teal)]">
            <Heart size={17} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[19px] font-semibold">
              MediCare<span className="text-[var(--mc-teal)]">+</span>
            </span>
            <span className="mt-1 hidden font-mono text-[10px] text-[var(--mc-muted)] sm:block">Health Record Management</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[13px] font-medium text-[var(--mc-muted)] transition-colors hover:text-[var(--mc-teal)]">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Btn variant="ghost" onClick={() => navigate('/Auth')}>Login</Btn>
          <Btn onClick={() => navigate('/Auth')}>Get Started</Btn>
        </div>

        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Wrap>

      {open && (
        <div className="border-t border-[var(--mc-line)] bg-[var(--mc-bg)] lg:hidden">
          <Wrap className="flex flex-col gap-1 py-4">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium">
                {label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Btn variant="ghost" onClick={() => navigate('/Auth')}>Login</Btn>
              <Btn onClick={() => navigate('/Auth')}>Get Started</Btn>
            </div>
          </Wrap>
        </div>
      )}
    </header>
  );
}