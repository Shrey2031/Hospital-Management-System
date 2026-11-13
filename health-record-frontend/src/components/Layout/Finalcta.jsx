import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Wrap, Reveal, Btn } from './Shared';

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-[var(--mc-teal-deep)] py-28 text-white">
      <svg className="absolute inset-x-0 bottom-8 w-full" height="28" viewBox="0 0 600 28" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0 14 H220 L235 4 L250 24 L262 14 L272 14 L282 2 L292 26 L302 14 H600"
          fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <Wrap className="relative">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Bring your health records into one place.</h2>
          <p className="mt-5 text-[17px] text-white/70">Create an account and add your first record in minutes.</p>
          <Btn variant="light" className="mt-9" onClick={() => navigate('/Auth')}>Get Started <ArrowRight size={16} /></Btn>
        </Reveal>
      </Wrap>
    </section>
  );
}