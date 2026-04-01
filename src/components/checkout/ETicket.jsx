import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Flag, MapPin, Calendar, Users, Car, PersonStanding, UtensilsCrossed, Download, Share2 } from 'lucide-react';
import { COURSE_INFO, ADDONS } from '../../data/mockData';

export default function ETicket({ booking }) {
  const { teeTime, players, date, buggies, caddies, fnbVouchers, proShopItems, finalTotal, bookingRef, guestInfo, user } = booking;
  const ticketRef = useRef(null);

  const guestName = user?.name ?? guestInfo?.email ?? 'Guest';
  const displayDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    : 'Today';

  const qrData = JSON.stringify({ ref: bookingRef, course: COURSE_INFO.name, time: teeTime?.time, date });

  return (
    <motion.div
      ref={ticketRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
      aria-label="Golf E-Ticket"
    >
      {/* ── Boarding-pass Card ── */}
      <div className="rounded-3xl overflow-hidden shadow-2xl">

        {/* Top — green header */}
        <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 px-6 pt-7 pb-14 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
          <div className="absolute top-4 right-16 w-16 h-16 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-white text-xl">GreenLinks</span>
              </div>
              <span className="text-primary-200 text-sm font-mono"># {bookingRef}</span>
            </div>

            <h2 className="font-display font-bold text-white text-3xl leading-tight mb-2">{COURSE_INFO.name}</h2>
            <div className="flex items-center gap-1.5 text-primary-200 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{COURSE_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Tear perforation */}
        <div className="relative bg-slate-100 h-5 flex items-center">
          <div className="absolute -left-4 w-8 h-8 bg-slate-50 rounded-full border-r border-slate-200" />
          <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-5" />
          <div className="absolute -right-4 w-8 h-8 bg-slate-50 rounded-full border-l border-slate-200" />
        </div>

        {/* Bottom — white body */}
        <div className="bg-white px-6 py-6">
          {/* Main info grid */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <InfoCell
              icon={<Calendar className="w-4 h-4 text-primary-500" />}
              label="Date"
              value={displayDate}
            />
            <InfoCell
              icon={<span className="text-primary-500 font-bold text-base">⏰</span>}
              label="Tee Time"
              value={teeTime?.time ?? '—'}
            />
            <InfoCell
              icon={<Users className="w-4 h-4 text-primary-500" />}
              label="Players"
              value={`${players} ${players === 1 ? 'player' : 'players'}`}
            />
            <InfoCell
              icon={<Flag className="w-4 h-4 text-primary-500" />}
              label="Course"
              value={`${teeTime?.holes} holes`}
            />
          </div>

          {/* Add-ons pills */}
          {(buggies > 0 || caddies > 0 || fnbVouchers > 0) && (
            <div className="flex flex-wrap gap-2 mb-5">
              {buggies > 0 && (
                <Pill icon={<Car className="w-3.5 h-3.5" />} label={`Buggy × ${buggies}`} />
              )}
              {caddies > 0 && (
                <Pill icon={<PersonStanding className="w-3.5 h-3.5" />} label={`Caddy × ${caddies}`} />
              )}
              {fnbVouchers > 0 && (
                <Pill icon={<UtensilsCrossed className="w-3.5 h-3.5" />} label={`F&B × ${fnbVouchers}`} />
              )}
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between py-3 border-t border-b border-dashed border-slate-200 mb-6">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Guest</p>
              <p className="font-semibold text-slate-800 text-sm">{guestName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Total Paid</p>
              <p className="font-display font-bold text-primary-600 text-2xl">${finalTotal}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm inline-block">
              <QRCodeSVG
                value={qrData}
                size={140}
                level="H"
                marginSize={0}
                fgColor="#059669"
                bgColor="#ffffff"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Scan at the clubhouse check-in</p>
              <p className="font-mono font-bold text-slate-600 text-sm tracking-widest mt-1">{bookingRef}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoCell({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function Pill({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100">
      {icon}
      {label}
    </span>
  );
}
