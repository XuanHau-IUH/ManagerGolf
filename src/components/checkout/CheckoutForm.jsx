import { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

export default function CheckoutForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    country: 'Vietnam', city: '',
    specialRequests: '',
  });

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal info */}
      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-widest mb-4">
          <User className="w-4 h-4 text-primary-500" />
          Personal Information
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-slate-500 mb-1.5">First Name *</label>
            <input id="firstName" required value={form.firstName} onChange={set('firstName')} placeholder="Nguyen" className="form-field" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-slate-500 mb-1.5">Last Name *</label>
            <input id="lastName" required value={form.lastName} onChange={set('lastName')} placeholder="Van An" className="form-field" />
          </div>
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-widest mb-4">
          <Mail className="w-4 h-4 text-primary-500" />
          Contact Details
        </legend>
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="checkout-email"
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              placeholder="Email for e-ticket"
              className="form-field pl-10"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="checkout-phone"
              type="tel"
              required
              value={form.phone}
              onChange={set('phone')}
              placeholder="+84 · WhatsApp / Zalo"
              className="form-field pl-10"
            />
          </div>
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-widest mb-4">
          <MapPin className="w-4 h-4 text-primary-500" />
          Location
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="country" className="block text-xs font-medium text-slate-500 mb-1.5">Country *</label>
            <select id="country" value={form.country} onChange={set('country')} className="form-field appearance-none">
              {['Vietnam', 'Thailand', 'Singapore', 'Malaysia', 'United Kingdom', 'Australia', 'United States', 'Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-xs font-medium text-slate-500 mb-1.5">City</label>
            <input id="city" value={form.city} onChange={set('city')} placeholder="Da Nang" className="form-field" />
          </div>
        </div>
      </fieldset>

      {/* Special requests */}
      <div>
        <label htmlFor="specialRequests" className="block text-xs font-medium text-slate-500 mb-1.5">Special Requests (optional)</label>
        <textarea
          id="specialRequests"
          rows={3}
          value={form.specialRequests}
          onChange={set('specialRequests')}
          placeholder="Left-handed clubs, buggy with sunshade, dietary requirements..."
          className="form-field resize-none"
        />
      </div>

      {/* Payment notice */}
      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <CreditCard className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-slate-700">Secure Payment</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Payment processed by Stripe. Card details entered on the next step. SSL encrypted.
          </p>
        </div>
      </div>

      <Button
        id="place-order-btn"
        type="submit"
        size="xl"
        fullWidth
        loading={loading}
        className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-glow"
        iconRight={loading ? undefined : <CreditCard className="w-5 h-5" />}
      >
        {loading ? 'Processing...' : 'Place Order & Pay'}
      </Button>
    </form>
  );
}
