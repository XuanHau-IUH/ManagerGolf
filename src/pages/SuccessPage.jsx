import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Calendar } from 'lucide-react';
import ETicket from '../components/checkout/ETicket';
import Button from '../components/ui/Button';

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  // Guard — if no booking data, redirect home
  if (!state?.booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-16 px-4">
        <p className="text-slate-500">No booking found.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const { booking } = state;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="section-container max-w-2xl mx-auto">
        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-5 shadow-glow"
          >
            <CheckCircle className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3"
          >
            Booking Confirmed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-lg max-w-md"
          >
            Your tee time is locked in. Your e-ticket and confirmation details have been sent via email.
          </motion.p>
        </motion.div>

        {/* E-Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ETicket booking={booking} />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
        >
          <Button
            id="book-another-btn"
            onClick={() => navigate('/tee-sheet')}
            variant="outline"
            size="lg"
            icon={<Calendar className="w-5 h-5" />}
          >
            Book Another Round
          </Button>
          <Button
            id="go-home-btn"
            onClick={() => navigate('/')}
            variant="primary"
            size="lg"
            icon={<Home className="w-5 h-5" />}
          >
            Back to Home
          </Button>
        </motion.div>

        {/* Helpful tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { emoji: '🏌️', title: 'Arrive Early', desc: 'Check in 30 minutes before your tee time at the pro shop.' },
            { emoji: '📱', title: 'Bring Your Ticket', desc: 'Show the QR code at check-in — no printing required.' },
            { emoji: '🌤️', title: 'Course Conditions', desc: 'Check the weather app on your booking day. Course opens in all conditions.' },
          ].map(tip => (
            <div key={tip.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
              <span className="text-3xl">{tip.emoji}</span>
              <h3 className="font-semibold text-slate-800 text-sm mt-2 mb-1">{tip.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
