import { motion } from 'framer-motion';
import { Car, PersonStanding, UtensilsCrossed, Check } from 'lucide-react';
import Stepper from '../ui/Stepper';
import { useCart } from '../../context/CartContext';
import { ADDONS } from '../../data/mockData';

export default function UpsellSection() {
  const { players, buggies, caddies, fnbVouchers, setBuggies, setCaddies, setFnb } = useCart();

  return (
    <div className="px-5 py-4 space-y-1">
      {/* Add-ons header */}
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Enhance Your Round</p>

      {/* Buggy */}
      <UpsellItem
        icon={<Car className="w-4 h-4" />}
        color="text-blue-500 bg-blue-50"
        label={ADDONS.buggy.label}
        sublabel={`${ADDONS.buggy.unit} · max ${players}`}
        price={ADDONS.buggy.price}
        value={buggies}
        min={0}
        max={players}
        onChange={setBuggies}
      />

      {/* Caddy */}
      <UpsellItem
        icon={<PersonStanding className="w-4 h-4" />}
        color="text-amber-600 bg-amber-50"
        label={ADDONS.caddy.label}
        sublabel={`${ADDONS.caddy.unit} · max ${players}`}
        price={ADDONS.caddy.price}
        value={caddies}
        min={0}
        max={players}
        onChange={setCaddies}
      />

      {/* F&B divider */}
      <div className="pt-4 pb-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dining & F&B</p>
      </div>

      {/* F&B Voucher */}
      <UpsellItem
        icon={<UtensilsCrossed className="w-4 h-4" />}
        color="text-orange-500 bg-orange-50"
        label={ADDONS.fnbVoucher.label}
        sublabel={`${ADDONS.fnbVoucher.unit} · Clubhouse restaurant`}
        price={ADDONS.fnbVoucher.price}
        value={fnbVouchers}
        min={0}
        max={players}
        onChange={setFnb}
      />
    </div>
  );
}

function UpsellItem({ icon, color, label, sublabel, price, value, min, max, onChange }) {
  const isActive = value > 0;

  return (
    <motion.div
      layout
      className={[
        'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
        isActive ? 'border-primary-200 bg-primary-50/50' : 'border-slate-100 bg-white',
      ].join(' ')}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-slate-800 truncate">{label}</p>
          {isActive && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-2.5 h-2.5 text-white" />
            </motion.span>
          )}
        </div>
        <p className="text-xs text-slate-400 truncate">{sublabel}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-sm font-bold text-slate-900">${price}</span>
        <Stepper value={value} min={min} max={max} onChange={onChange} />
      </div>
    </motion.div>
  );
}
