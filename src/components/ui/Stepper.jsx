import { Minus, Plus } from 'lucide-react';

export default function Stepper({ value, min = 0, max = 10, onChange, label, disabled = false }) {
  const dec = () => { if (value > min) onChange(value - 1); };
  const inc = () => { if (value < max) onChange(value + 1); };

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-slate-600 flex-1">{label}</span>}
      <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button
          onClick={dec}
          disabled={disabled || value <= min}
          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
          aria-label="Decrease"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-slate-800 border-x border-slate-200 select-none">
          {value}
        </span>
        <button
          onClick={inc}
          disabled={disabled || value >= max}
          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
          aria-label="Increase"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
