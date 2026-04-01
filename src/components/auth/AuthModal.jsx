import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, Tag, Eye, EyeOff, ChevronRight } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'guest',  label: 'Guest Checkout' },
  { id: 'member', label: 'Member Login'   },
];

export default function AuthModal() {
  const { isModalOpen, closeAuthModal, login, guestCheckout, authError } = useAuth();
  const [activeTab,   setActiveTab]   = useState('guest');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const navigate = useNavigate();

  // Guest form state
  const [guestEmail, setGuestEmail]   = useState('');
  const [guestPhone, setGuestPhone]   = useState('');

  // Member form state
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPass,  setMemberPass]  = useState('');

  async function handleGuestSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    guestCheckout(guestEmail, guestPhone);
    setLoading(false);
    navigate('/checkout');
  }

  async function handleMemberSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(memberEmail, memberPass);
    setLoading(false);
    if (ok) navigate('/checkout');
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeAuthModal} size="sm">
      {/* Tabs */}
      <div className="flex bg-slate-50 border-b border-slate-100">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              'flex-1 py-3.5 text-sm font-semibold transition-all duration-200 relative',
              activeTab === tab.id
                ? 'text-primary-600 bg-white'
                : 'text-slate-500 hover:text-slate-700',
            ].join(' ')}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Guest Tab ── */}
        {activeTab === 'guest' && (
          <motion.div
            key="guest"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="font-semibold text-slate-900">Quick Guest Checkout</h3>
              <p className="text-sm text-slate-500 mt-1">No account needed. Just email & phone.</p>
            </div>

            <form onSubmit={handleGuestSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="guest-email"
                  type="email"
                  required
                  placeholder="Email address"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="form-field pl-10"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="guest-phone"
                  type="tel"
                  required
                  placeholder="Phone number (WhatsApp / Zalo)"
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  className="form-field pl-10"
                />
              </div>

              <p className="text-xs text-slate-400 text-center">Your booking confirmation will be sent here.</p>

              <Button type="submit" fullWidth loading={loading} size="lg" iconRight={<ChevronRight className="w-4 h-4" />}>
                Continue to Checkout
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setActiveTab('member')} className="text-sm text-primary-600 hover:underline font-medium">
                Have a membership? Login for discounts →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Member Tab ── */}
        {activeTab === 'member' && (
          <motion.div
            key="member"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Tag className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Member Login</h3>
              <p className="text-sm text-slate-500 mt-1">Auto-apply your exclusive discounts.</p>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="success">Up to 15% off</Badge>
                <Badge variant="primary">Priority booking</Badge>
              </div>
            </div>

            <form onSubmit={handleMemberSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="member-email"
                  type="email"
                  required
                  placeholder="Member email"
                  value={memberEmail}
                  onChange={e => setMemberEmail(e.target.value)}
                  className="form-field pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="member-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={memberPass}
                  onChange={e => setMemberPass(e.target.value)}
                  className="form-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Hint */}
              <div className="px-3 py-2 bg-slate-50 rounded-xl text-xs text-slate-500">
                💡 Demo: <strong>member@greenlinks.vn</strong> / <strong>golf2024</strong>
              </div>

              {authError && (
                <p className="text-center text-sm text-red-500 font-medium">{authError}</p>
              )}

              <Button type="submit" fullWidth loading={loading} size="lg" iconRight={<ChevronRight className="w-4 h-4" />}>
                Login & Checkout
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-between text-sm">
              <a href="#" className="text-primary-600 hover:underline">Forgot password?</a>
              <a href="#" className="text-slate-500 hover:text-primary-600">Join GreenLinks</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
