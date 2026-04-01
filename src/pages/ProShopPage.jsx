import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Star, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import Badge from '../components/ui/Badge';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const CATEGORIES = ['All', 'Clubs', 'Golf Balls', 'Apparel', 'Bags', 'Accessories'];

export default function ProShopPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const { addProShop } = useCart();

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeTab === 'All' || p.category === activeTab;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-200">
        <div className="section-container py-12 text-center">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3">The Pro Shop</h1>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">Premium golf gear, apparel, and accessories to elevate your game on the course.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeTab === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-card transition-shadow"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest rounded-lg">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <ShoppingBag className="w-4 h-4 text-slate-700" />
                  </div>
                </div>

                <div className="p-5 flex flex-col h-full">
                  <span className="text-primary-600 text-[10px] font-bold uppercase tracking-wider mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1 leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    <span className="text-xs text-slate-400 ml-1">({Math.floor(Math.random()*50)+12})</span>
                  </div>

                  {item.specs && (
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{item.specs}</p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-dashed border-slate-100">
                    <div className="flex flex-col">
                      {item.originalPrice && <span className="text-slate-400 text-xs line-through mb-0.5">${item.originalPrice}</span>}
                      <span className="font-display font-bold text-lg text-slate-900 leading-none">${item.price}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addProShop(item)}
                      icon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
