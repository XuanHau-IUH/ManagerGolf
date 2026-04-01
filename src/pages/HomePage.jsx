import HeroSearch from '../components/home/HeroSearch';
import ServicesGrid from '../components/home/ServicesGrid';
import ProShopCarousel from '../components/home/ProShopCarousel';
import WeatherWidget from '../components/home/WeatherWidget';
import { motion } from 'framer-motion';
import { Star, Award, Shield, Globe } from 'lucide-react';
import { COURSE_INFO } from '../data/mockData';

const STATS = [
  { icon: Star,   value: '4.8★',  label: 'Average Rating'  },
  { icon: Award,  value: '#1',    label: 'Da Nang Golf'     },
  { icon: Shield, value: '100%',  label: 'Secure Booking'   },
  { icon: Globe,  value: '50+',   label: 'Countries Served' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroSearch />

      {/* Stats band */}
      <div className="bg-white border-y border-slate-100 py-10">
        <div className="section-container grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-slate-900 leading-none">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services */}
      <ServicesGrid />

      {/* Course highlight */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={COURSE_INFO.image}
            alt="Course aerial view"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
        </div>
        <div className="relative section-container">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Featured Course
              </span>
              <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-6 leading-tight">
                {COURSE_INFO.name}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Designed by Luke Donald, this world-class 18-hole links-style course overlooks the stunning East Sea. 
                Rated Vietnam's #1 golf destination with pristine fairways and the best caddy service in Southeast Asia.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  `Par ${COURSE_INFO.par}`,
                  `${COURSE_INFO.holes} Holes`,
                  `Designed by ${COURSE_INFO.designer}`,
                  `★ ${COURSE_INFO.rating} (${COURSE_INFO.reviews.toLocaleString()} reviews)`,
                ].map(badge => (
                  <span key={badge} className="px-4 py-1.5 border border-white/20 rounded-full text-white text-sm backdrop-blur-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Weather card inset */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <WeatherWidget />
          </motion.div>
        </div>
      </section>

      {/* Pro Shop */}
      <ProShopCarousel />

      {/* Testimonials strip */}
      <section className="py-16 bg-slate-50 overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-slate-900 mb-2">Loved by Golfers Worldwide</h2>
            <p className="text-slate-500">Join over 1,200 satisfied guests who booked with us.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'James T.',
                country: '🇬🇧 United Kingdom',
                text: 'Effortless booking — had our tee time, buggies and F&B sorted in under 3 minutes. The caddy assigned to us was exceptional.',
                stars: 5,
              },
              {
                name: 'Yuki M.',
                country: '🇯🇵 Japan',
                text: 'The dynamic pricing meant we got a great early-morning discount. The e-ticket QR scan at the pro shop was totally seamless.',
                stars: 5,
              },
              {
                name: 'Nguyen P.',
                country: '🇻🇳 Vietnam',
                text: "As a member, the 10% automatic discount applied instantly at checkout. GreenLinks is the only platform I use for Da Nang.",
                stars: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-card border border-slate-100"
              >
                <div className="flex mb-3">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{review.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
