import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flag, ArrowLeft } from 'lucide-react';
import TeeSheetGrid from '../components/teesheet/TeeSheetGrid';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { COURSE_INFO } from '../data/mockData';

export default function TeeSheetPage() {
  const navigate = useNavigate();
  const { teeTime, openCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="section-container py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Flag className="w-5 h-5 text-primary-600" />
                </div>
                Tee Sheet
              </motion.h1>
              <p className="text-slate-500 text-sm mt-1">{COURSE_INFO.name} · Real-time availability</p>
            </div>

            {teeTime && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  id="view-cart-btn"
                  onClick={openCart}
                  variant="primary"
                  size="md"
                  className="shadow-glow"
                >
                  View Cart ({teeTime.time})
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing legend */}
      <div className="section-container mt-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-medium">Pricing:</span>
          {[
            { color: 'bg-red-500', label: 'Prime — Peak hours, highest demand' },
            { color: 'bg-slate-400', label: 'Standard — Regular pricing' },
            { color: 'bg-primary-500', label: 'Discount — Low demand, best value' },
          ].map(tier => (
            <div key={tier.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${tier.color}`} />
              <span className="text-slate-600">{tier.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tee Sheet */}
      <TeeSheetGrid />
    </div>
  );
}
