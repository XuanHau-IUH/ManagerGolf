import { motion } from 'framer-motion';
import { UtensilsCrossed, Plus, Clock } from 'lucide-react';
import { FNB_VOUCHERS } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useCart } from '../context/CartContext';
import Stepper from '../components/ui/Stepper';

export default function FnbVoucherPage() {
  const { fnbVouchers, setFnb } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      
      <div className="relative bg-orange-900 py-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80')] object-cover opacity-20" />
        <div className="relative z-10 section-container max-w-2xl mx-auto">
          <Badge variant="white" className="mb-4 text-orange-900"><UtensilsCrossed className="w-3 h-3 mr-1 inline" /> Premium Dining</Badge>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-orange-50">F&B Vouchers</h1>
          <p className="text-orange-200 text-lg leading-relaxed">
            Savor world-class culinary experiences before, during, or after your round. Purchase vouchers upfront for a seamless dining experience.
          </p>
        </div>
      </div>

      <div className="section-container py-16">
        {/* Unified Add-on */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-lg mx-auto p-6 rounded-3xl shadow-card border border-orange-100 flex items-center justify-between mb-16 relative top-[-60px] z-20"
        >
          <div>
            <span className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Standard Voucher</span>
            <span className="font-display font-bold text-2xl text-slate-900">$28 <span className="text-sm text-slate-500 font-medium">/ person</span></span>
          </div>
          <div className="bg-slate-50 p-1 rounded-2xl border border-slate-200">
            <Stepper value={fnbVouchers} onChange={setFnb} min={0} max={8} />
          </div>
        </motion.div>

        {/* Featured Dining Experiences */}
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl text-slate-900">Featured Dining Venues</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FNB_VOUCHERS.map((voucher, i) => (
            <motion.div
              key={voucher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-card transition-all"
            >
              <div className="relative h-48">
                <img src={voucher.image} alt={voucher.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur text-orange-600 border border-orange-100">
                    {voucher.location}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{voucher.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 h-16">{voucher.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200 text-sm">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-400"/> Value: ${voucher.price}</span>
                  <span className="text-orange-600 font-medium hover:text-orange-700 cursor-pointer flex items-center gap-1">View Menu</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
