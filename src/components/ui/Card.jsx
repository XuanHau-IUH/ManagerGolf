export default function Card({ children, className = '', hover = false, glass = false, padding = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-2xl border',
        glass
          ? 'bg-white/10 backdrop-blur-md border-white/20 shadow-glass'
          : 'bg-white border-slate-100 shadow-card',
        padding ? 'p-5' : '',
        hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`mt-4 pt-4 border-t border-slate-100 ${className}`}>{children}</div>;
}
