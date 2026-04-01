import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import WeatherWidget from '../home/WeatherWidget';
import { NAV_LINKS } from '../../data/mockData';

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const { itemCount, openCart }          = useCart();
  const { isAuthenticated, displayName, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-header border-b border-slate-100'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="GreenLinks Home">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md
                ${scrolled ? 'bg-primary-600' : 'bg-white/20 backdrop-blur-sm border border-white/30'}`}>
                <Flag className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-white'}`} />
              </div>
              <span className={`font-display font-700 text-xl tracking-tight
                ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Green<span className="text-primary-500">Links</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    scrolled
                      ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/15',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* Weather */}
              <div className="hidden md:block">
                <WeatherWidget compact scrolled={scrolled} />
              </div>

              {/* Cart */}
              <button
                id="cart-btn"
                onClick={openCart}
                aria-label={`Cart — ${itemCount} items`}
                className={[
                  'relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200',
                  scrolled ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/15 text-white',
                ].join(' ')}
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center gap-2">
                  <span className={`text-sm font-medium ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                    {displayName}
                  </span>
                  <button
                    onClick={logout}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                      ${scrolled ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/15 text-white/80'}`}
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="login-btn"
                  onClick={openAuthModal}
                  className={[
                    'hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold',
                    'transition-all duration-200',
                    scrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                      : 'bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm',
                  ].join(' ')}
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                  ${scrolled ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/15 text-white'}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-20 bg-white border-b border-slate-100 shadow-lg px-4 py-4"
          >
            <nav className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <WeatherWidget compact scrolled />
              {!isAuthenticated && (
                <button
                  onClick={() => { openAuthModal(); setMobileOpen(false); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold"
                >
                  <User className="w-4 h-4" />
                  Login / Guest
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
