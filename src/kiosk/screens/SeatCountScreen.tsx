import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function SeatCountScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const [count, setCount] = useState(booking.seatCount || 2);

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Users size={64} className="text-primary mx-auto mb-8" strokeWidth={1.5} />
          <h1 className="text-h1 mb-4">How many seats?</h1>
          <p className="text-body-l text-text-secondary mb-16">Select the number of tickets</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-4 max-w-[600px] w-full mb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <motion.button
              key={n}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: n * 0.03 }}
              onClick={() => setCount(n)}
              className={`h-[88px] flex items-center justify-center text-h2 font-bold border-2 transition-all ${count === n
                ? 'bg-primary border-primary text-foreground scale-105'
                : 'border-border text-text-secondary hover:border-primary'
                }`}
            >
              {n}
            </motion.button>
          ))}
        </div>

        {/* Price estimate */}
        <div className="bg-surface border-2 border-border p-6 w-full max-w-[600px]">
          <div className="flex justify-between items-center">
            <span className="text-body-m text-text-secondary">{count} × ₹{booking.showtime?.price || 300}</span>
            <span className="text-h2">₹{count * (booking.showtime?.price || 300)}</span>
          </div>
        </div>
      </div>

      <KioskFooter
        ctaLabel="Select Seats"
        onCta={() => {
          updateBooking({ seatCount: count });
          goTo('seatSelection');
        }}
        leftContent={
          <div>
            <span className="text-body-s text-text-secondary">{count} tickets</span>
            <span className="text-h3 ml-3">₹{count * (booking.showtime?.price || 300)}</span>
          </div>
        }
      />
    </div>
  );
}
