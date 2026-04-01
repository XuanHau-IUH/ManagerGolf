import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Drawer — slides in from right (default) or left.
 */
export default function Drawer({ isOpen, onClose, title, children, side = 'right', width = 'w-full sm:w-[440px]' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const initial  = side === 'right' ? { x: '100%' } : { x: '-100%' };
  const animate  = { x: 0 };
  const exitAnim = side === 'right' ? { x: '100%' } : { x: '-100%' };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            key="drawer-panel"
            initial={initial}
            animate={animate}
            exit={exitAnim}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={[
              'fixed top-0 bottom-0 z-50 flex flex-col bg-white shadow-2xl',
              side === 'right' ? 'right-0' : 'left-0',
              width,
            ].join(' ')}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
              <h2 className="text-lg font-display font-semibold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
