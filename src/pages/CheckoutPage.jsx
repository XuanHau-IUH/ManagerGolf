import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function generateBookingRef() {
  return 'GRL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cart = useCart();
  const { user, guestInfo } = useAuth();

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(r => setTimeout(r, 1800));
      const bookingRef = generateBookingRef();
      const memberDiscount = user?.discount ?? 0;
      const discountAmount = Math.round((cart.total * memberDiscount) / 100);
      const finalTotal = cart.total - discountAmount;

      const { teeTime, players, date, buggies, caddies, fnbVouchers, proShopItems, total } = cart;

      navigate('/success', {
        state: {
          booking: {
            teeTime, players, date, buggies, caddies, fnbVouchers, proShopItems, total,
            formData,
            bookingRef,
            finalTotal,
            guestInfo,
            user,
          },
        },
      });
      cart.clearCart();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="section-container py-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display font-bold text-2xl sm:text-3xl text-slate-900"
            >
              Checkout
            </motion.h1>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100">
              <Shield className="w-3 h-3" />
              Secure
            </div>
          </div>
          {/* Progress steps */}
          <div className="flex items-center gap-2 mt-4 text-xs">
            {['Cart', 'Details', 'Payment', 'Confirm'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs
                  ${i <= 1 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {i + 1}
                </div>
                <span className={i <= 1 ? 'text-primary-600 font-medium' : 'text-slate-400'}>{step}</span>
                {i < 3 && <div className={`h-px w-6 ${i < 1 ? 'bg-primary-400' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-col layout */}
      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100"
          >
            <h2 className="font-display font-semibold text-xl text-slate-900 mb-6">Your Details</h2>
            <CheckoutForm onSubmit={handleSubmit} loading={loading} />
          </motion.div>

          {/* Right — summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
