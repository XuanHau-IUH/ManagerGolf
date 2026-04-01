import { motion } from 'framer-motion';
import { Clock, Users, Plus } from 'lucide-react';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';

const TIER_BADGE = {
  prime:    'prime',
  discount: 'discount',
  standard: 'standard',
};

export default function SlotCard({ slot }) {
  const { teeTime, setTeeTime, players } = useCart();
  const isSelected = teeTime?.id === slot.id;
  const isSoldOut  = slot.openSlots === 0;

  const handleSelect = () => {
    if (!isSoldOut) setTeeTime(slot);
  };

  return (
    <motion.div
      layout
      whileHover={!isSoldOut ? { scale: 1.015, y: -2 } : {}}
      transition={{ duration: 0.2 }}
      onClick={handleSelect}
      className={[
        'relative rounded-2xl border-2 overflow-hidden transition-all duration-200',
        isSoldOut
          ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
          : isSelected
            ? 'border-primary-500 bg-primary-50 shadow-glow cursor-pointer'
            : 'border-slate-100 bg-white cursor-pointer hover:border-primary-200 hover:shadow-card',
      ].join(' ')}
    >
      {/* Selected ribbon */}
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
      )}

      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center
              ${isSelected ? 'bg-primary-100' : 'bg-slate-100'}`}>
              <Clock className={`w-4 h-4 ${isSelected ? 'text-primary-600' : 'text-slate-500'}`} />
            </div>
            <div>
              <p className={`font-display font-bold text-xl leading-none ${isSelected ? 'text-primary-700' : 'text-slate-800'}`}>
                {slot.time}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{slot.holes} holes</p>
            </div>
          </div>
          <Badge variant={TIER_BADGE[slot.tier]}>{slot.priceLabel.label}</Badge>
        </div>

        {/* Availability bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {slot.openSlots} / {slot.totalSlots} open
            </span>
            {slot.openSlots === 1 && (
              <span className="text-orange-500 font-semibold animate-pulse">Last spot!</span>
            )}
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                slot.tier === 'prime' ? 'bg-red-400' :
                slot.tier === 'discount' ? 'bg-primary-500' : 'bg-slate-400'
              }`}
              style={{ width: `${(slot.openSlots / slot.totalSlots) * 100}%` }}
            />
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-display font-bold text-lg ${isSelected ? 'text-primary-600' : 'text-slate-900'}`}>
              ${slot.price}
            </span>
            <span className="text-slate-400 text-xs ml-1">/ player</span>
          </div>
          <button
            disabled={isSoldOut}
            id={`slot-select-${slot.id}`}
            className={[
              'flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200',
              isSoldOut
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isSelected
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white',
            ].join(' ')}
          >
            {isSoldOut ? 'Full' : isSelected ? '✓ Selected' : (
              <><Plus className="w-3.5 h-3.5" />Select</>
            )}
          </button>
        </div>

        {/* Total for selected players */}
        {isSelected && players > 1 && (
          <div className="mt-3 pt-3 border-t border-primary-100">
            <p className="text-xs text-primary-600 font-medium">
              Total for {players} players: <span className="font-bold">${slot.price * players}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
