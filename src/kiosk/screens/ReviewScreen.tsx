import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Check } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function ReviewScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const [promo, setPromo] = useState('');
  const [agreed, setAgreed] = useState(false);

  const ticketPrice = booking.seats.reduce((s: number, seat: any) => s + seat.price, 0);
  const addonsPrice = booking.addons.reduce((s: number, a: any) => s + a.addon.price * a.qty, 0);
  const convenienceFee = Math.round(ticketPrice * 0.05);
  const gst = Math.round((ticketPrice + convenienceFee) * 0.18);
  const total = ticketPrice + addonsPrice + convenienceFee + gst;

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-6 pt-5 pb-6">
        <h1 className="text-xl font-bold mb-4">Review & Summary</h1>

        {/* Movie */}
        <div className="bg-surface border border-border p-3.5 mb-3">
          <div className="flex items-start gap-4">
            <div className="w-16 h-20 shrink-0 relative overflow-hidden border border-border" style={{ backgroundColor: booking.movie?.posterColor }}>
              {booking.movie?.posterUrl && (
                <img
                  src={booking.movie.posterUrl}
                  alt={booking.movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold mb-1">{booking.movie?.title}</h2>
              <p className="text-xs text-text-secondary">{booking.movie?.format} • {booking.movie?.language}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                {booking.date} • {booking.showtime?.time}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {booking.showtime?.screen} • CINETIX Multiplex
              </p>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className="bg-surface border border-border p-3.5 mb-3">
          <h3 className="text-sm font-semibold mb-2">Seats ({booking.seats.length})</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {booking.seats.map((s: any) => (
              <span key={`${s.row}${s.col}`} className="bg-primary text-foreground px-3 py-1 text-xs font-semibold">
                {s.row}{s.col}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-text-secondary">Ticket subtotal</span>
            <span className="text-sm font-semibold">₹{ticketPrice}</span>
          </div>
        </div>

        {/* Add-ons */}
        {booking.addons.length > 0 && (
          <div className="bg-surface border border-border p-3.5 mb-3">
            <h3 className="text-sm font-semibold mb-2">Add-ons</h3>
            {booking.addons.map((a: any) => (
              <div key={a.addon.id} className="flex justify-between mb-1 text-xs">
                <span className="text-text-secondary">{a.addon.title} ×{a.qty}</span>
                <span>₹{a.addon.price * a.qty}</span>
              </div>
            ))}
          </div>
        )}

        {/* Promo code */}
        <div className="bg-surface border border-border p-3.5 mb-3">
          <div className="flex gap-2.5">
            <div className="flex-1 relative">
              <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled" />
              <input
                type="text"
                placeholder="Enter promo code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
                className="w-full h-9 bg-background border border-border pl-9 pr-3 text-xs text-foreground placeholder:text-disabled focus:border-primary focus:outline-none"
              />
            </div>
            <button className="h-9 px-5 border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-foreground transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-surface border border-border p-6 mb-4">
          <div className="flex justify-between mb-3">
            <span className="text-body-m text-text-secondary">Tickets</span>
            <span className="text-body-m">₹{ticketPrice}</span>
          </div>
          {addonsPrice > 0 && (
            <div className="flex justify-between mb-3">
              <span className="text-body-m text-text-secondary">Add-ons</span>
              <span className="text-body-m">₹{addonsPrice}</span>
            </div>
          )}
          <div className="flex justify-between mb-3">
            <span className="text-body-m text-text-secondary">Convenience Fee</span>
            <span className="text-body-m">₹{convenienceFee}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-body-m text-text-secondary">GST (18%)</span>
            <span className="text-body-m">₹{gst}</span>
          </div>
          <div className="h-[1px] bg-border my-4" />
          <div className="flex justify-between">
            <span className="text-h3">Total</span>
            <span className="text-h2 text-primary">₹{total}</span>
          </div>
        </div>

        {/* T&C */}
        <button
          onClick={() => setAgreed(!agreed)}
          className="flex items-center gap-4 p-4 mb-4"
        >
          <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${agreed ? 'bg-primary border-primary text-foreground' : 'border-border'}`}>
            {agreed && <Check size={16} strokeWidth={3} />}
          </div>
          <span className="text-xs text-text-secondary text-left">I agree to the Terms & Conditions and Cancellation Policy</span>
        </button>
      </div>

      <KioskFooter
        ctaLabel="Proceed to Pay"
        ctaDisabled={!agreed}
        onCta={() => {
          updateBooking({ total });
          goTo('paymentUPI');
        }}
        leftContent={<span className="text-h2 text-primary">₹{total}</span>}
      />
    </div>
  );
}
