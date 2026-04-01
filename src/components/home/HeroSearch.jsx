import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Users, ChevronRight, Star, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { COURSE_INFO } from '../../data/mockData';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=90&auto=format&fit=crop';

export default function HeroSearch() {
  const navigate   = useNavigate();
  const { setDate, setPlayers } = useCart();

  const today = new Date().toISOString().split('T')[0];
  const [localDate,    setLocalDate]    = useState(today);
  const [localPlayers, setLocalPlayers] = useState(2);

  function handleBook() {
    setDate(localDate);
    setPlayers(localPlayers);
    navigate('/tee-sheet');
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="Hero — Book your tee time">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Da Nang Golf Course aerial view"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full section-container flex flex-col items-center text-center pt-24 pb-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium mb-6"
        >
          <span className="flex items-center gap-1 text-yellow-300">
            <Star className="w-3.5 h-3.5 fill-current" />
            {COURSE_INFO.rating}
          </span>
          <span className="text-white/50">·</span>
          <MapPin className="w-3.5 h-3.5 text-primary-300" />
          <span>{COURSE_INFO.location}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-4 text-balance"
        >
          Play Golf in<br />
          <span className="text-primary-400">Paradise</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/75 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Book tee times, buggies & caddies at {COURSE_INFO.name} — Vietnam's top-ranked resort course designed by Luke Donald.
        </motion.p>

        {/* ── Floating Quick Search Box ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl"
        >
          <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-2 shadow-glass">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

                {/* Date */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label htmlFor="hero-date" className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                      Date
                    </label>
                    <input
                      id="hero-date"
                      type="date"
                      min={today}
                      value={localDate}
                      onChange={e => setLocalDate(e.target.value)}
                      className="w-full text-slate-800 font-semibold text-sm bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Players */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="hero-players" className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                      Players
                    </label>
                    <select
                      id="hero-players"
                      value={localPlayers}
                      onChange={e => setLocalPlayers(Number(e.target.value))}
                      className="w-full text-slate-800 font-semibold text-sm bg-transparent focus:outline-none cursor-pointer appearance-none"
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Player' : 'Players'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-2">
                  <Button
                    id="hero-book-btn"
                    onClick={handleBook}
                    size="lg"
                    fullWidth
                    className="h-full min-h-[56px] !rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-glow"
                    iconRight={<ChevronRight className="w-5 h-5" />}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-6 text-white/70 text-sm">
            {[
              { label: 'Reviews', value: `${COURSE_INFO.reviews.toLocaleString()}+` },
              { label: 'Holes',   value: `${COURSE_INFO.holes} Holes` },
              { label: 'Par',     value: `Par ${COURSE_INFO.par}` },
              { label: 'Rating',  value: '★ 4.8' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-white font-semibold">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
