import { motion } from 'framer-motion';
import { ShoppingBag, Medal, Shield, Globe, Star } from 'lucide-react';
import { CADDIES, ADDONS } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Stepper from '../components/ui/Stepper';
import { useCart } from '../context/CartContext';

export default function CaddyBuggyPage() {
  const { buggies, caddies, setBuggies, setCaddies } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-200">
        <div className="section-container py-12 text-center max-w-3xl">
          <Badge className="mb-4">Enhance Your Round</Badge>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-4">Caddies & Buggies</h1>
          <p className="text-slate-500 text-lg">
            Experience Vietnam's pristine courses with professional support. Add electric buggies and elite caddies to your cart.
          </p>
        </div>
      </div>

      <div className="section-container py-12 max-w-5xl">
        
        {/* Quick Add Actions */}
        <div className="bg-primary-900 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1000&q=80')] opacity-10 mix-blend-overlay object-cover" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            
            {/* Buggy Add */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <h3 className="font-display font-bold text-xl mb-2">{ADDONS.buggy.label}</h3>
              <p className="text-slate-300 text-sm mb-4">Premium E-Z-GO electric cart. Maximum 2 players per buggy.</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-2xl">${ADDONS.buggy.price}</span>
                  <span className="text-xs text-slate-400">{ADDONS.buggy.unit}</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg">
                  <Stepper value={buggies} onChange={setBuggies} min={0} max={4} />
                </div>
              </div>
            </div>

            {/* Caddy Add */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <h3 className="font-display font-bold text-xl mb-2">{ADDONS.caddy.label}</h3>
              <p className="text-slate-300 text-sm mb-4">Highly trained caddies for green reading, distance control & pace.</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-2xl">${ADDONS.caddy.price}</span>
                  <span className="text-xs text-slate-400">{ADDONS.caddy.unit}</span>
                </div>
                <div className="bg-white rounded-xl shadow-lg">
                  <Stepper value={caddies} onChange={setCaddies} min={0} max={4} />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Caddy Profiles */}
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-2">Meet Our Elite Caddies</h2>
          <p className="text-slate-500">Over 200+ trained professionals ready to assist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CADDIES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-card transition-shadow"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary-50">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">{c.name}</h3>
              <div className="flex items-center gap-1.5 text-sm font-medium mb-4">
                <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full"><Star className="w-3.5 h-3.5 fill-current" />{c.rating}</span>
                <span className="text-slate-400">({c.reviews} reviews)</span>
              </div>
              
              <div className="w-full space-y-3 mt-auto">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="text-slate-400 flex items-center gap-1.5"><Medal className="w-3.5 h-3.5" />Experience</span>
                  <span className="font-bold text-slate-700">{c.exp}</span>
                </div>
                <div className="flex items-start justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="text-slate-400 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 mt-0.5" />Languages</span>
                  <div className="flex flex-col gap-1 items-end">
                    {c.languages.map(l => <span key={l} className="font-semibold text-slate-700">{l}</span>)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pb-2">
                  <span className="text-slate-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />Specialty</span>
                  <span className="font-semibold text-primary-600">{c.specialty}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
