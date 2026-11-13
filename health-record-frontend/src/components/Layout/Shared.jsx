import { motion } from 'framer-motion';

export const Wrap = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>
);

export const Reveal = ({ children, delay = 0, y = 18, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, light = false }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${light ? 'text-[var(--mc-sage)]' : 'text-[var(--mc-teal)]'}`}>
    {children}
  </p>
);

export const Btn = ({ variant = 'primary', className = '', children, ...props }) => {
  const styles = {
    primary: 'bg-[var(--mc-teal)] text-white hover:bg-[var(--mc-teal-deep)]',
    ghost: 'border border-[var(--mc-line)] text-[var(--mc-ink)] hover:bg-white',
    light: 'bg-white text-[var(--mc-ink)] hover:bg-[var(--mc-sage)]',
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mc-teal)] ${styles} ${className}`}
    >
      {children}
    </button>
  );
};