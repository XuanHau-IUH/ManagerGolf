import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';
import { PRODUCTS } from '../../data/mockData';

// Unsplash golf images mapped to each product slot
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&auto=format&fit=crop',
];

export default function ProShopCarousel() {
  const scrollRef = useRef(null);
  const { addProShop } = useCart();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white" aria-label="Pro Shop">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Pro Shop & F&B
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Gear Up & Dine Well
            </h2>
            <p className="text-slate-500 mt-2">Add to your round — equipment, vouchers & more.</p>
          </div>
          {/* Scroll arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4 snap-x snap-mandatory"
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex-shrink-0 w-[240px] bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden snap-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.badge === 'Sale' ? 'prime' : product.badge === 'Best Seller' ? 'gold' : 'primary'}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-slate-600">
                  {product.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-3 line-clamp-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-display font-bold text-slate-900 text-lg">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-slate-400 text-sm line-through">${product.originalPrice}</span>
                      <Badge variant="prime" className="text-[10px]">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    </>
                  )}
                </div>

                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={() => addProShop(product)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-4" />
        </div>

        {/* Promo banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-white">
            <Tag className="w-6 h-6 text-primary-200 flex-shrink-0" />
            <div>
              <p className="font-semibold">Member Exclusive: 15% off Pro Shop</p>
              <p className="text-primary-200 text-sm">Log in or join as a member to unlock member pricing.</p>
            </div>
          </div>
          <a
            href="#"
            className="flex-shrink-0 px-5 py-2.5 bg-white text-primary-700 font-semibold text-sm rounded-xl hover:bg-primary-50 transition-colors"
          >
            Join GreenLinks
          </a>
        </motion.div>
      </div>
    </section>
  );
}
