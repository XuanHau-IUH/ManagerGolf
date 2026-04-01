import { Flag, Users, Car, PersonStanding, UtensilsCrossed, Tag } from 'lucide-react';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ADDONS } from '../../data/mockData';
import { COURSE_INFO } from '../../data/mockData';

export default function OrderSummary() {
  const { teeTime, players, date, buggies, caddies, fnbVouchers, proShopItems, total } = useCart();
  const { user } = useAuth();

  const memberDiscount = user?.discount ?? 0;
  const discountAmount = Math.round((total * memberDiscount) / 100);
  const finalTotal     = total - discountAmount;

  const displayDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Today';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-5 py-4">
        <h3 className="font-display font-semibold text-white text-lg">Order Summary</h3>
        <p className="text-primary-200 text-sm mt-0.5">{COURSE_INFO.name}</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Tee time */}
        {teeTime && (
          <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Flag className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-800">{teeTime.time} — {teeTime.holes} Holes</span>
                <Badge variant={teeTime.tier}>{teeTime.priceLabel.label}</Badge>
              </div>
              <p className="text-sm text-slate-500">{displayDate}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-sm text-slate-600">{players} {players === 1 ? 'player' : 'players'}</span>
                <span className="text-slate-300">·</span>
                <span className="text-sm font-medium text-slate-800">${teeTime.price} × {players}</span>
              </div>
            </div>
            <span className="font-bold text-slate-900 flex-shrink-0">${teeTime.price * players}</span>
          </div>
        )}

        {/* Add-ons */}
        {(buggies > 0 || caddies > 0 || fnbVouchers > 0) && (
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wide">Add-ons</p>
            {buggies > 0 && (
              <SummaryRow icon={<Car className="w-3.5 h-3.5" />} label={`${ADDONS.buggy.label} × ${buggies}`} value={buggies * ADDONS.buggy.price} />
            )}
            {caddies > 0 && (
              <SummaryRow icon={<PersonStanding className="w-3.5 h-3.5" />} label={`${ADDONS.caddy.label} × ${caddies}`} value={caddies * ADDONS.caddy.price} />
            )}
            {fnbVouchers > 0 && (
              <SummaryRow icon={<UtensilsCrossed className="w-3.5 h-3.5" />} label={`F&B Voucher × ${fnbVouchers}`} value={fnbVouchers * ADDONS.fnbVoucher.price} />
            )}
          </div>
        )}

        {/* Pro shop */}
        {proShopItems.length > 0 && (
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wide">Pro Shop</p>
            {proShopItems.map(({ product, qty }) => (
              <SummaryRow key={product.id} icon={<Tag className="w-3.5 h-3.5" />} label={`${product.name} × ${qty}`} value={product.price * qty} />
            ))}
          </div>
        )}

        {/* Discount */}
        {memberDiscount > 0 && (
          <div className="flex items-center justify-between text-sm text-primary-600 font-medium">
            <span>🏅 Member discount ({memberDiscount}%)</span>
            <span className="font-bold">-${discountAmount}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className="font-display font-bold text-slate-900 text-lg">Total Due</span>
          <div className="text-right">
            {memberDiscount > 0 && (
              <p className="text-xs text-slate-400 line-through">${total}</p>
            )}
            <p className="font-display font-bold text-2xl text-primary-600">${finalTotal}</p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[
            { icon: '🔒', label: 'SSL Secured' },
            { icon: '↩️', label: 'Free Cancel' },
            { icon: '⚡', label: 'Instant Confirm' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center text-center p-2 bg-slate-50 rounded-xl">
              <span className="text-lg mb-1">{s.icon}</span>
              <span className="text-xs text-slate-500 font-medium leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-slate-600">
        <span className="text-slate-400">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-medium text-slate-800">${value}</span>
    </div>
  );
}
