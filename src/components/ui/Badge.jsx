export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:  'bg-slate-100 text-slate-600',
    primary:  'bg-primary-100 text-primary-700',
    prime:    'bg-red-500 text-white',
    discount: 'bg-primary-500 text-white',
    standard: 'bg-slate-200 text-slate-600',
    gold:     'bg-gold-500 text-white',
    outline:  'border border-primary-500 text-primary-600',
    success:  'bg-emerald-100 text-emerald-700',
    warning:  'bg-amber-100 text-amber-700',
    info:     'bg-blue-100 text-blue-700',
    white:    'bg-white/20 text-white backdrop-blur-sm border border-white/30',
  };

  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide',
        variants[variant] ?? variants.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
