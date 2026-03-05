import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Check } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';
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
      <KioskHeader step={4} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 overflow-auto px-6 pt-6">
        <h1 className="text-h1 mb-8">Review & Summary</h1>

        {/* Movie */}
        <div className="bg-surface border-2 border-border p-6 mb-4">
          <div className="flex items-start gap-5">
            <div className="w-20 h-28 shrink-0" style={{ backgroundColor: booking.movie?.posterColor }} />
            <div>
              <h2 className="text-h3 mb-2">{booking.movie?.title}</h2>
              <p className="text-body-m text-text-secondary">{booking.movie?.format} • {booking.movie?.language}</p>
              <p className="text-body-m text-text-secondary mt-1">
                {booking.date} • {booking.showtime?.time}
              </p>
              <p className="text-body-m text-text-secondary mt-1">
                {booking.showtime?.screen} • CINETIX Multiplex
              </p>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className="bg-surface border-2 border-border p-6 mb-4">
          <h3 className="text-h3 mb-3">Seats ({booking.seats.length})</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {booking.seats.map((s: any) => (
              <span key={`${s.row}${s.col}`} className="bg-primary text-foreground px-4 py-2 text-label font-semibold">
                {s.row}{s.col}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            <span className="text-body-m text-text-secondary">Ticket subtotal</span>
            <span className="text-body-l font-semibold">₹{ticketPrice}</span>
          </div>
        </div>

        {/* Add-ons */}
        {booking.addons.length > 0 && (
          <div className="bg-surface border-2 border-border p-6 mb-4">
            <h3 className="text-h3 mb-3">Add-ons</h3>
            {booking.addons.map((a: any) => (
              <div key={a.addon.id} className="flex justify-between mb-2">
                <span className="text-body-m text-text-secondary">{a.addon.title} ×{a.qty}</span>
                <span className="text-body-m">₹{a.addon.price * a.qty}</span>
              </div>
            ))}
          </div>
        )}

        {/* Promo code */}
        <div className="bg-surface border-2 border-border p-6 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Tag size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-disabled" />
              <input
                type="text"
                placeholder="Enter promo code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
                className="w-full h-14 bg-background border-2 border-border pl-12 pr-4 text-body-m text-foreground placeholder:text-disabled focus:border-primary focus:outline-none"
              />
            </div>
            <button className="h-14 px-8 border-2 border-primary text-primary text-label font-semibold hover:bg-primary hover:text-foreground transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-surface border-2 border-border p-6 mb-4">
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
          <div className="h-[2px] bg-border my-4" />
          <div className="flex justify-between">
            <span className="text-h3">Total</span>
            <span className="text-h2 text-primary">₹{total}</span>
          </div>
        </div>

        {/* T&C */}
        <button
          onClick={() => setAgreed(!agreed)}
          className="flex items-center gap-4 p-4 mb-8"
        >
          <div className={`w-8 h-8 border-2 flex items-center justify-center transition-colors ${agreed ? 'bg-primary border-primary' : 'border-border'}`}>
            {agreed && <Check size={20} strokeWidth={3} />}
          </div>
          <span className="text-body-s text-text-secondary text-left">I agree to the Terms & Conditions and Cancellation Policy</span>
        </button>
      </div>

      <KioskFooter
        ctaLabel="Proceed to Pay"
        ctaDisabled={!agreed}
        onCta={() => {
          updateBooking({ total });
          goTo('contact');
        }}
        leftContent={<span className="text-h2 text-primary">₹{total}</span>}
      />
    </div>
  );
}
