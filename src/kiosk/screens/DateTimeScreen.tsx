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

      <div className="flex-1 overflow-auto px-6 pt-6 pb-6">
        {/* Movie mini banner with Poster Image */}
        <div className="flex items-center gap-4 p-3 bg-surface border border-border mb-6">
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
            <h3 className="text-sm font-bold mb-1">{booking.movie?.title}</h3>
            <p className="text-xs text-text-secondary">{booking.movie?.format} • {booking.movie?.language} • {booking.movie?.duration}</p>
          </div>
        </div>

        {/* Date rail */}
        <h2 className="text-base font-bold mb-3">Select Date</h2>
        <div className="flex gap-2.5 mb-6 overflow-x-auto pb-1">
          {DATES.map(d => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`min-w-[90px] h-[64px] flex flex-col items-center justify-center border shrink-0 transition-all ${selectedDate === d.full
                ? 'bg-primary border-primary text-foreground'
                : 'border-border text-text-secondary hover:border-primary'
                }`}
            >
              <span className="text-[11px]">{d.isToday ? 'Today' : d.day}</span>
              <span className="text-base font-bold leading-none my-0.5">{d.date}</span>
              <span className="text-[10px]">{d.month}</span>
            </button>
          ))}
        </div>

        {/* Showtimes */}
        <h2 className="text-base font-bold mb-1">Select Showtime</h2>
        <p className="text-xs text-text-secondary mb-3">CINETIX Multiplex • Screen Assigned at Booking</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SHOWTIMES.map((st, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedShowtime(i)}
              className={`p-3 border text-left transition-all ${selectedShowtime === i
                ? 'bg-primary border-primary'
                : st.availability === 'almost-full'
                  ? 'border-destructive/40 hover:border-primary'
                  : 'border-border hover:border-primary'
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-bold">{st.time}</span>
                {availabilityBadge(st.availability)}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span>{st.format}</span>
                <span>•</span>
                <span>{st.screen}</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-semibold">₹{st.price}</span>
                <span className="text-[10px] text-text-secondary ml-1">onwards</span>
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
