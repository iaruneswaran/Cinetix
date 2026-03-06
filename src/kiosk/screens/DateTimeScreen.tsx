import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';
import { SHOWTIMES } from '../types';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    day: d.toLocaleDateString('en', { weekday: 'short' }),
    date: d.getDate(),
    month: d.toLocaleDateString('en', { month: 'short' }),
    full: d.toISOString().split('T')[0],
    isToday: i === 0,
  };
});

export default function DateTimeScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const [selectedDate, setSelectedDate] = useState(DATES[0].full);
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null);

  const availabilityBadge = (a: string) => {
    if (a === 'fast-filling') return <span className="text-[13px] font-bold text-warning">FAST FILLING</span>;
    if (a === 'almost-full') return <span className="text-[13px] font-bold text-destructive">ALMOST FULL</span>;
    return null;
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-6 pt-6">
        {/* Movie mini banner */}
        <div className="flex items-center gap-4 p-4 bg-surface border-2 border-border mb-8">
          <div className="w-16 h-24 shrink-0" style={{ backgroundColor: booking.movie?.posterColor }} />
          <div>
            <h3 className="text-h3 mb-1">{booking.movie?.title}</h3>
            <p className="text-body-s text-text-secondary">{booking.movie?.format} • {booking.movie?.language} • {booking.movie?.duration}</p>
          </div>
        </div>

        {/* Date rail */}
        <h2 className="text-h3 mb-4">Select Date</h2>
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {DATES.map(d => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`min-w-[120px] h-[100px] flex flex-col items-center justify-center border-2 shrink-0 transition-all ${selectedDate === d.full
                ? 'bg-primary border-primary text-foreground'
                : 'border-border text-text-secondary hover:border-primary'
                }`}
            >
              <span className="text-label">{d.isToday ? 'Today' : d.day}</span>
              <span className="text-h2">{d.date}</span>
              <span className="text-label">{d.month}</span>
            </button>
          ))}
        </div>

        {/* Showtimes */}
        <h2 className="text-h3 mb-2">Select Showtime</h2>
        <p className="text-body-s text-text-secondary mb-4">CINETIX Multiplex • Screen Assigned at Booking</p>

        <div className="grid grid-cols-2 gap-4">
          {SHOWTIMES.map((st, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedShowtime(i)}
              className={`min-h-[100px] p-5 border-2 text-left transition-all ${selectedShowtime === i
                ? 'bg-primary border-primary'
                : st.availability === 'almost-full'
                  ? 'border-destructive/40 hover:border-primary'
                  : 'border-border hover:border-primary'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-h3">{st.time}</span>
                {availabilityBadge(st.availability)}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-label text-text-secondary">{st.format}</span>
                <span className="text-label text-text-secondary">•</span>
                <span className="text-label text-text-secondary">{st.screen}</span>
              </div>
              <div className="mt-2">
                <span className="text-body-m font-semibold">₹{st.price}</span>
                <span className="text-body-s text-text-secondary ml-1">onwards</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <KioskFooter
        ctaLabel="Continue"
        ctaDisabled={selectedShowtime === null}
        onCta={() => {
          if (selectedShowtime !== null) {
            updateBooking({ date: selectedDate, showtime: SHOWTIMES[selectedShowtime] });
            goTo('seatCount');
          }
        }}
        leftContent={
          selectedShowtime !== null ? (
            <div>
              <span className="text-body-s text-text-secondary">{SHOWTIMES[selectedShowtime].time}</span>
              <span className="text-h3 ml-3">₹{SHOWTIMES[selectedShowtime].price}</span>
            </div>
          ) : null
        }
      />
    </div>
  );
}
