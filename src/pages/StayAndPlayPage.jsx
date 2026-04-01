import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, MapPin, Check, ChevronRight } from 'lucide-react';
import { STAY_PACKAGES, COURSE_INFO } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function StayAndPlayPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero Header */}
      <div className="relative bg-slate-900 overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={STAY_PACKAGES[0].image} alt="Resort" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
        </div>
        <div className="relative section-container text-center max-w-3xl border-b-white/10 mx-auto">
          <Badge variant="white" className="mb-4">Stay & Play Packages</Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            A Perfect Golf Getaway
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg mx-auto"
          >
            Combine luxury accommodation at partner resorts with unlimited rounds at {COURSE_INFO.name}.
          </motion.p>
        </div>
      </div>

      {/* Package Grid */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STAY_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white rounded-3xl overflow-hidden shadow-card border-2 flex flex-col ${pkg.popular ? 'border-primary-500 shadow-glow relative' : 'border-slate-100 relative top-4'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 inset-x-0 bg-primary-500 text-white text-xs font-bold uppercase tracking-widest text-center py-1.5 z-10">
                  Most Popular Choice
                </div>
              )}
              
              {/* Image */}
              <div className={`relative h-56 w-full ${pkg.popular ? 'mt-7' : ''}`}>
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge variant="white"><Hotel className="w-3 h-3 mr-1 inline" /> {pkg.nights} Nights</Badge>
                  <Badge variant="white">⛳ {pkg.rounds} Rounds</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-primary-500" />
                  {pkg.hotel}
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">{pkg.title}</h3>
                
                <div className="flex items-end gap-2 mb-6 text-slate-900">
                  <span className="font-display font-bold text-3xl leading-none">${pkg.price}</span>
                  <span className="text-slate-500 text-sm font-medium mb-1">/ person</span>
                  {pkg.originalPrice && <span className="text-slate-400 text-sm line-through ml-1 mb-1">${pkg.originalPrice}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5 text-slate-600 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button fullWidth size="lg" iconRight={<ChevronRight className="w-4 h-4"/>} variant={pkg.popular ? 'primary' : 'outline'} className={pkg.popular ? "bg-gradient-to-r from-primary-600 to-primary-700" : ""}>
                  Enquire Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
