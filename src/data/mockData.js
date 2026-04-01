// ============================================================
//  Mock Data — GreenLinks Golf Booking Platform
// ============================================================

export const COURSE_INFO = {
  name: 'BRG Da Nang Golf Resort',
  location: 'Da Nang, Vietnam',
  rating: 4.8,
  reviews: 1247,
  holes: 18,
  par: 72,
  designer: 'Luke Donald',
  image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=85',
  heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=90',
};

// ------------------------------------------------------------
//  Services (Four-card grid & route links)
// ------------------------------------------------------------
export const SERVICES = [
  {
    id: 'tee-times',
    icon: 'Flag',
    title: 'Tee Times',
    description: 'Book your preferred tee time with real-time availability & dynamic pricing.',
    color: 'from-primary-600 to-primary-800',
    badge: 'Most Popular',
    href: '/tee-sheet',
  },
  {
    id: 'stay-play',
    icon: 'Hotel',
    title: 'Stay & Play',
    description: 'Exclusive golf resort packages combining luxury stays with unlimited rounds.',
    color: 'from-slate-700 to-slate-900',
    badge: 'Best Value',
    href: '/stay-and-play',
  },
  {
    id: 'caddy-buggy',
    icon: 'Car',
    title: 'Caddy & Buggy',
    description: 'Professional caddies and electric buggies for an elevated course experience.',
    color: 'from-gold-600 to-gold-500',
    badge: 'Add-on',
    href: '/caddy-buggy',
  },
  {
    id: 'fnb',
    icon: 'UtensilsCrossed',
    title: 'F&B Vouchers',
    description: 'Pre-paid dining at the clubhouse restaurant and 19th hole bar.',
    color: 'from-orange-500 to-orange-700',
    badge: 'New',
    href: '/fnb',
  },
];

// ------------------------------------------------------------
//  Tee Times
// ------------------------------------------------------------
const PRICING_TIERS = {
  prime:    { label: 'Prime',    color: 'prime',    multiplier: 1.4 },
  standard: { label: 'Standard', color: 'standard', multiplier: 1.0 },
  discount: { label: 'Discount', color: 'discount', multiplier: 0.75 },
};

const BASE_PRICE_9  = 55;
const BASE_PRICE_18 = 95;

function makeSlot(time, holes, openSlots, tier) {
  const base   = holes === 18 ? BASE_PRICE_18 : BASE_PRICE_9;
  const price  = Math.round(base * PRICING_TIERS[tier].multiplier);
  return { id: `${time}-${holes}h`, time, holes, totalSlots: 4, openSlots, tier, price, priceLabel: PRICING_TIERS[tier] };
}

export const TEE_TIMES = [
  makeSlot('06:00',  9, 4, 'discount'), makeSlot('06:30', 18, 4, 'discount'),
  makeSlot('07:00',  9, 3, 'standard'), makeSlot('07:00', 18, 2, 'standard'),
  makeSlot('07:30',  9, 4, 'standard'), makeSlot('07:30', 18, 1, 'prime'),
  makeSlot('08:00',  9, 2, 'prime'),    makeSlot('08:00', 18, 3, 'prime'),
  makeSlot('08:30',  9, 4, 'standard'), makeSlot('08:30', 18, 4, 'standard'),
  makeSlot('09:00',  9, 1, 'prime'),    makeSlot('09:00', 18, 2, 'prime'),
  makeSlot('09:30',  9, 3, 'discount'), makeSlot('09:30', 18, 4, 'discount'),
  makeSlot('10:00',  9, 4, 'discount'), makeSlot('10:00', 18, 3, 'discount'),
  makeSlot('14:00',  9, 4, 'discount'), makeSlot('14:00', 18, 4, 'discount'),
  makeSlot('14:30',  9, 2, 'standard'), makeSlot('14:30', 18, 3, 'standard'),
  makeSlot('15:00',  9, 1, 'prime'),    makeSlot('15:00', 18, 2, 'prime'),
  makeSlot('15:30',  9, 4, 'standard'), makeSlot('15:30', 18, 4, 'standard'),
];

// ------------------------------------------------------------
//  Pro Shop Products
// ------------------------------------------------------------
export const PRODUCTS = [
  { id: 'p1', name: 'Titleist Pro V1 (Dozen)', category: 'Golf Balls', price: 52, originalPrice: 65, image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=75', badge: 'Best Seller', specs: '3-Piece · Urethane Elastomer Cover' },
  { id: 'p2', name: 'Callaway Rogue ST Driver', category: 'Clubs', price: 289, originalPrice: 349, image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&q=75', badge: 'Sale', specs: '10.5° Loft · Stiff Flex Shaft' },
  { id: 'p4', name: 'Premium Cabretta Leather Glove', category: 'Accessories', price: 22, originalPrice: 30, image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=75', badge: null, specs: '100% Genuine Leather · Breathable' },
  { id: 'p6', name: 'TaylorMade Tour Stand Bag', category: 'Bags', price: 195, originalPrice: 220, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=75', badge: 'New', specs: '4-Way Top · Waterproof' },
  { id: 'p7', name: 'Nike Dri-FIT Polo Shirt', category: 'Apparel', price: 65, originalPrice: null, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=75', badge: null, specs: 'Moisture Absorbing · UPF 30' },
  { id: 'p8', name: 'FootJoy Pro|SL Golf Shoes', category: 'Apparel', price: 160, originalPrice: 190, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75', badge: 'Popular', specs: 'Spikeless · 1-Year Waterproof Warranty' },
];

// ------------------------------------------------------------
//  Add-on Pricing (Used in Cart)
// ------------------------------------------------------------
export const ADDONS = {
  buggy:  { label: 'Electric Buggy', price: 25, unit: 'per buggy' },
  caddy:  { label: 'Professional Caddy', price: 18, unit: 'per caddy' },
  fnbVoucher: { label: 'F&B Voucher', price: 28, unit: 'per person' },
};

// ------------------------------------------------------------
//  Stay & Play Packages
// ------------------------------------------------------------
export const STAY_PACKAGES = [
  {
    id: 'sp1',
    title: 'Weekend Escape',
    hotel: 'Sheraton Grand Resort',
    nights: 2,
    rounds: 2,
    price: 499,
    originalPrice: 650,
    features: ['Ocean-view Deluxe Room', 'Daily Buffet Breakfast', '2x 18-Holes Green Fee', 'Complimentary Airport Transfer'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    popular: true,
  },
  {
    id: 'sp2',
    title: 'The Ultimate Links',
    hotel: 'Pullman Beach Resort',
    nights: 3,
    rounds: 3,
    price: 780,
    originalPrice: 900,
    features: ['Private Villa with Pool', 'VIP Lounge Access', '3x 18-Holes Green Fee', '1x 60min Spa Session'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    popular: false,
  },
  {
    id: 'sp3',
    title: 'Daycation Special',
    hotel: 'Clubhouse Suites',
    nights: 1,
    rounds: 1,
    price: 195,
    originalPrice: 240,
    features: ['Overnight Clubhouse Suite', 'Breakfast at 19th Hole', '1x 18-Holes Green Fee', 'Late Checkout (2PM)'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    popular: false,
  }
];

// ------------------------------------------------------------
//  Membership Tiers
// ------------------------------------------------------------
export const MEMBERSHIP_TIERS = [
  {
    id: 'gold',
    name: 'Gold Member',
    price: 1500,
    period: 'per year',
    discount: '10% Off',
    features: ['10% discount on Tee Times', '14-day advance booking', 'Free Caddy upgrades', '10% Pro Shop discount'],
    color: 'from-amber-400 to-amber-600',
    iconColor: 'text-amber-500',
  },
  {
    id: 'platinum',
    name: 'Platinum Member',
    price: 3200,
    period: 'per year',
    discount: '15% Off',
    features: ['15% discount on Tee Times', '30-day advance booking', 'Unlimited free Buggy usage', '1 free guest pass/month', 'Priority locker assignment'],
    color: 'from-slate-400 to-slate-600',
    iconColor: 'text-slate-500',
    featured: true,
  },
  {
    id: 'diamond',
    name: 'Diamond VIP',
    price: 8500,
    period: 'lifetime',
    discount: '30% Off',
    features: ['30% discount on Tee Times', '90-day advance booking', 'VIP parking & private locker', 'Unlimited guest passes', 'Annual customized golf bag'],
    color: 'from-emerald-400 to-emerald-700',
    iconColor: 'text-emerald-600',
  }
];

// ------------------------------------------------------------
//  Caddies Profiles
// ------------------------------------------------------------
export const CADDIES = [
  { id: 'c1', name: 'Nguyen Thi Mai', rating: 4.9, reviews: 312, exp: '8 years', languages: ['🇻🇳 Vietnamese', '🇬🇧 English', '🇰🇷 Korean'], specialty: 'Green Reading & Strategy', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  { id: 'c2', name: 'Tran Van Bao', rating: 4.7, reviews: 185, exp: '5 years', languages: ['🇻🇳 Vietnamese', '🇬🇧 English'], specialty: 'Course Management', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { id: 'c3', name: 'Le Hoang Yen', rating: 4.8, reviews: 204, exp: '6 years', languages: ['🇻🇳 Vietnamese', '🇯🇵 Japanese'], specialty: 'Club Selection', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
];

// ------------------------------------------------------------
//  F&B Vouchers
// ------------------------------------------------------------
export const FNB_VOUCHERS = [
  { id: 'v1', title: 'Premium Buffet Lunch', location: 'The Eagle Restaurant', price: 35, desc: 'International buffet featuring fresh seafood, live grilling stations, and local Vietnamese specialties. Includes soft drinks.', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80' },
  { id: 'v2', title: '19th Hole Sunset Drinks', location: 'Fairway Lounge', price: 20, desc: 'Unwind after your round with 3 crafted cocktails or draft beers, accompanied by a platter of premium bar snacks.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80' },
  { id: 'v3', title: 'On-Course Refreshment Pack', location: 'Starting Tee Kiosk', price: 15, desc: 'Cooler box packed with iced waters, isotonic drinks, seasonal fresh fruits, and energy bars for 2 players.', image: 'https://images.unsplash.com/photo-1588675646184-601fbf2b6875?w=500&q=80' },
];

// ------------------------------------------------------------
//  Nav Links
// ------------------------------------------------------------
export const NAV_LINKS = [
  { label: 'Tee Times', href: '/tee-sheet' },
  { label: 'Stay & Play', href: '/stay-and-play' },
  { label: 'Pro Shop', href: '/pro-shop' },
  { label: 'Membership', href: '/membership' },
];
