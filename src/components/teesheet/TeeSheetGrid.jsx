import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, CalendarDays, Users } from 'lucide-react';
import SlotCard from './SlotCard';
import { TEE_TIMES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

const FILTER_HOLES   = ['All', '9', '18'];
const FILTER_PRICING = ['All', 'Prime', 'Standard', 'Discount'];

export default function TeeSheetGrid() {
  const { date, players } = useCart();
  const [filterHoles,   setFilterHoles]   = useState('All');
  const [filterPricing, setFilterPricing] = useState('All');

  const displayDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'Today';

  const filtered = TEE_TIMES.filter(slot => {
    const holesOk   = filterHoles   === 'All' || slot.holes === Number(filterHoles);
    const pricingOk = filterPricing === 'All' || slot.tier  === filterPricing.toLowerCase();
    return holesOk && pricingOk;
  });

  return (
    <section className="py-8" aria-label="Available Tee Times">
      {/* Context bar */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-20 shadow-sm">
        <div className="section-container py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-primary-500" />
                <span className="font-medium">{displayDate}</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary-500" />
                <span>{players} {players === 1 ? 'Player' : 'Players'}</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <span className="hidden sm:block text-slate-400">{filtered.length} slots available</span>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400" />
              {/* Holes filter */}
              <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                {FILTER_HOLES.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterHoles(f)}
                    className={[
                      'px-3 py-1.5 text-xs font-semibold transition-colors',
                      filterHoles === f
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {f === 'All' ? 'All Holes' : `${f}H`}
                  </button>
                ))}
              </div>
              {/* Pricing filter */}
              <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                {FILTER_PRICING.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterPricing(f)}
                    className={[
                      'px-3 py-1.5 text-xs font-semibold transition-colors',
                      filterPricing === f
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="section-container mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">No tee times match your filters.</p>
            <button
              onClick={() => { setFilterHoles('All'); setFilterPricing('All'); }}
              className="mt-4 text-primary-600 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map(slot => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
