import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flag, Hotel, Car, UtensilsCrossed, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { SERVICES } from '../../data/mockData';

const ICONS = { Flag, Hotel, Car, UtensilsCrossed };

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ServicesGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-50" aria-label="Our Services">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Everything You Need
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Your Complete Golf Experience
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From tee time to the 19th hole — book everything in one seamless experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(service.href)}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                {/* Decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />

                {/* Content */}
                <div className="relative p-6 pt-7 pb-8 flex flex-col gap-4 min-h-[200px]">
                  {/* Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      {Icon && <Icon className="w-5 h-5 text-white" />}
                    </div>
                    <Badge variant="white">{service.badge}</Badge>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display font-semibold text-xl text-white mb-2">{service.title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{service.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 text-white/70 group-hover:text-white group-hover:gap-2.5 transition-all duration-200 text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
