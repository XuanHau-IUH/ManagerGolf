import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

export default function CountdownTimer({ holdExpiresAt, compact = false }) {
  const { minutes, seconds, isExpired, totalSecondsLeft } = useCountdown(holdExpiresAt);

  if (!holdExpiresAt) return null;

  const isUrgent   = totalSecondsLeft < 120; // < 2 minutes
  const isCritical = totalSecondsLeft < 60;  // < 1 minute
  const pad = (n) => String(n).padStart(2, '0');

  if (compact) {
    return (
      <span className={`font-mono font-bold text-sm ${isCritical ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-primary-600'}`}>
        {isExpired ? 'Expired' : `${pad(minutes)}:${pad(seconds)}`}
      </span>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isExpired ? (
        <motion.div
          key="expired"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-semibold text-sm">Hold Expired</p>
            <p className="text-red-500 text-xs">Your tee time was released. Please re-select.</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="timer"
          className={[
            'flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors duration-500',
            isCritical
              ? 'bg-red-50 border-red-200'
              : isUrgent
                ? 'bg-orange-50 border-orange-200'
                : 'bg-primary-50 border-primary-100',
          ].join(' ')}
        >
          <motion.div
            animate={isCritical ? { scale: [1, 1.15, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <Clock className={`w-4 h-4 flex-shrink-0 ${isCritical ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-primary-600'}`} />
          </motion.div>
          <div className="flex-1">
            <p className={`text-xs font-medium mb-0.5 ${isCritical ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-primary-700'}`}>
              {isCritical ? '⚡ Hurry! Slot held for:' : isUrgent ? 'Running out — time left:' : 'Slot held for:'}
            </p>
            <p className={`font-mono font-bold text-2xl tabular-nums leading-none ${isCritical ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-primary-700'}`}>
              {pad(minutes)} : {pad(seconds)}
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-1 h-10 bg-slate-100 rounded-full overflow-hidden self-center">
            <motion.div
              className={`w-full rounded-full origin-bottom ${isCritical ? 'bg-red-400' : isUrgent ? 'bg-orange-400' : 'bg-primary-500'}`}
              style={{ height: `${(totalSecondsLeft / 600) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
