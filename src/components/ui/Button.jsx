import { forwardRef } from 'react';

const variants = {
  primary:   'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-md hover:shadow-glow',
  secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm hover:shadow-card',
  ghost:     'bg-transparent hover:bg-slate-100 text-slate-700',
  danger:    'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  gold:      'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-md',
  outline:   'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
};

const sizes = {
  xs:  'px-3 py-1.5 text-xs rounded-lg',
  sm:  'px-4 py-2 text-sm rounded-xl',
  md:  'px-5 py-2.5 text-sm rounded-xl',
  lg:  'px-6 py-3 text-base rounded-xl',
  xl:  'px-8 py-4 text-lg rounded-2xl',
};

const Button = forwardRef(function Button(
  {
    children,
    variant  = 'primary',
    size     = 'md',
    className = '',
    disabled  = false,
    loading   = false,
    fullWidth = false,
    icon,
    iconRight,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
});

export default Button;
