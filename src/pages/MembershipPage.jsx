import { motion } from 'framer-motion';
import { Check, Crown, Trophy, TrendingUp } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-16 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="section-container relative py-20 text-center">
        <Badge variant="emerald" className="mb-6 uppercase tracking-widest text-[10px] font-bold">VIP Access</Badge>
        <h1 className="font-display font-bold text-4xl sm:text-6xl text-white mb-6">
          Elevate Your <span className="text-primary-400">Status</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Join the elite ranks of GreenLinks Members. Enjoy priority tee times, exclusive discounts up to 30%, and unforgettable luxury on every fairway.
        </p>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
          {[
            { icon: Crown, value: 'Tier Details', label: 'Tailored for Your Lifestyle' },
            { icon: Trophy, value: 'Priority', label: '90-Day Advance Booking' },
            { icon: TrendingUp, value: 'Up to 30%', label: 'Discount on Rounds & Gear' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity:0, y: 15 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="flex flex-col items-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <stat.icon className="w-8 h-8 text-primary-400 mb-3" />
              <span className="font-display font-bold text-2xl text-white mb-1">{stat.value}</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`bg-slate-800 rounded-[2rem] p-8 text-left border relative ${tier.featured ? 'border-primary-500 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]' : 'border-slate-700'}`}
            >
              {tier.featured && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Recommended Spec
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1">{tier.name}</h3>
                  <div className={`px-2.5 py-1 rounded w-max text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${tier.color} text-white`}>
                    {tier.discount}
                  </div>
                </div>
              </div>

              <div className="mb-8 border-b border-slate-700 pb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl leading-none">${tier.price.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm">/{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1 h-[220px]">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className={`w-4 h-4 ${tier.iconColor}`} />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth size="lg" variant={tier.featured ? 'primary' : 'outline'}>
                Apply for {tier.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
