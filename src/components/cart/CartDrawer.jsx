import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flag, Users, Trash2, ShoppingBag } from 'lucide-react';
import Drawer from '../ui/Drawer';
import CountdownTimer from './CountdownTimer';
import UpsellSection from './UpsellSection';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ADDONS } from '../../data/mockData';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    isCartOpen, closeCart, teeTime, players, date,
    buggies, caddies, fnbVouchers, proShopItems,
    holdExpiresAt, total, itemCount, setTeeTime, clearCart,
  } = useCart();
  const { openAuthModal, isAuthenticated, user } = useAuth();

  const memberDiscount = user?.discount ?? 0;
  const discountAmount = Math.round((total * memberDiscount) / 100);
  const finalTotal     = total - discountAmount;

  const displayDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Today';

  function handleCheckout() {
    closeCart();
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      navigate('/checkout');
    }
  }

  return (
    <Drawer isOpen={isCartOpen} onClose={closeCart} title="Your Booking" side="right">
      <div className="flex flex-col h-full">

        {/* Empty state */}
        {!teeTime ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-400">Select a tee time to get started.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { closeCart(); navigate('/tee-sheet'); }}>
              Browse Tee Times
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* ── Countdown ── */}
              <div className="px-5 pt-5 pb-3">
                <CountdownTimer holdExpiresAt={holdExpiresAt} />
              </div>

              {/* ── Selected Tee Time ── */}
              <div className="px-5 pb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Selected Tee Time</p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Flag className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-slate-900 text-lg leading-none">{teeTime.time}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{displayDate} · {teeTime.holes} holes</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={teeTime.tier}>{teeTime.priceLabel.label}</Badge>
                      <button
                        onClick={() => setTeeTime(null)}
                        className="text-slate-300 hover:text-red-400 transition-colors"
                        aria-label="Remove tee time"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{players} {players === 1 ? 'player' : 'players'}</span>
                    </div>
                    <span className="text-slate-300">·</span>
                    <span className="font-semibold text-slate-900">${teeTime.price} × {players} = ${teeTime.price * players}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-2 bg-slate-50 border-y border-slate-100 my-1" />

              {/* ── Upsells ── */}
              <UpsellSection />

              {/* ── Pro Shop Items ── */}
              <AnimatePresence>
                {proShopItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-100 overflow-hidden"
                  >
                    <div className="px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Pro Shop</p>
                      <div className="space-y-2">
                        {proShopItems.map(({ product, qty }) => (
                          <div key={product.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700 flex-1 truncate">{product.name}</span>
                            <span className="text-slate-400 mx-2">×{qty}</span>
                            <span className="font-semibold text-slate-900">${product.price * qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Sticky Footer ── */}
            <div className="flex-shrink-0 border-t border-slate-100 bg-white px-5 py-4 space-y-3">
              {/* Subtotals */}
              <div className="space-y-1.5 text-sm">
                {teeTime && (
                  <LineItem label={`Tee time × ${players}`} value={teeTime.price * players} />
                )}
                {buggies > 0  && <LineItem label={`${ADDONS.buggy.label} × ${buggies}`}  value={buggies  * ADDONS.buggy.price}       />}
                {caddies > 0  && <LineItem label={`${ADDONS.caddy.label} × ${caddies}`}  value={caddies  * ADDONS.caddy.price}       />}
                {fnbVouchers > 0 && <LineItem label={`F&B Voucher × ${fnbVouchers}`}     value={fnbVouchers * ADDONS.fnbVoucher.price} />}
                {proShopItems.map(({ product, qty }) => (
                  <LineItem key={product.id} label={product.name} value={product.price * qty} />
                ))}
              </div>

              {/* Member discount */}
              {memberDiscount > 0 && (
                <div className="flex items-center justify-between text-sm text-primary-600 font-medium border-t border-slate-100 pt-2">
                  <span className="flex items-center gap-1.5">
                    🏅 Member discount ({memberDiscount}%)
                  </span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-display font-bold text-slate-900 text-lg">Total</span>
                <div className="text-right">
                  {memberDiscount > 0 && (
                    <p className="text-xs text-slate-400 line-through text-right">${total}</p>
                  )}
                  <p className="font-display font-bold text-2xl text-slate-900">${finalTotal}</p>
                </div>
              </div>

              {/* Checkout CTA */}
              <Button
                id="checkout-btn"
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                className="bg-gradient-to-r from-primary-600 to-primary-700"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>

              {!isAuthenticated && (
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors py-1"
                >
                  Continue as Guest
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}

function LineItem({ label, value }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span className="truncate flex-1 mr-2">{label}</span>
      <span className="font-medium text-slate-800 flex-shrink-0">${value}</span>
    </div>
  );
}
