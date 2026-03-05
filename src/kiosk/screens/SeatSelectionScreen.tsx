import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';
import KioskFooter from '../components/KioskFooter';
import { generateSeats, Seat } from '../types';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function SeatSelectionScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const allSeats = useMemo(() => generateSeats(), []);
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState<'All' | 'Silver' | 'Gold'>('All');
  const maxSeats = booking.seatCount || 2;

  const rows = useMemo(() => {
    const map = new Map<string, Seat[]>();
    allSeats.forEach(s => {
      if (!map.has(s.row)) map.set(s.row, []);
      map.get(s.row)!.push(s);
    });
    return Array.from(map.entries());
  }, [allSeats]);

  const toggleSeat = (row: string, col: number) => {
    const key = `${row}${col}`;
    const seat = allSeats.find(s => s.row === row && s.col === col);
    if (!seat || seat.status === 'booked') return;

    if (selected.includes(key)) {
      setSelected(prev => prev.filter(k => k !== key));
    } else if (selected.length < maxSeats) {
      setSelected(prev => [...prev, key]);
    }
  };

  const getSeatColor = (seat: Seat, key: string) => {
    if (selected.includes(key)) return 'bg-primary border-primary text-foreground';
    if (seat.status === 'booked') return 'bg-surface-alt border-surface-alt text-disabled cursor-not-allowed';
    if (seat.status === 'premium') return 'border-premium text-text-secondary hover:border-primary cursor-pointer';
    if (seat.status === 'accessible') return 'border-accessible text-text-secondary hover:border-primary cursor-pointer';
    return 'border-text-secondary text-text-secondary hover:border-primary cursor-pointer';
  };

  const totalPrice = selected.reduce((sum, key) => {
    const seat = allSeats.find(s => `${s.row}${s.col}` === key);
    return sum + (seat?.price || 0);
  }, 0);

  const bestAvailable = () => {
    const avail = allSeats.filter(s => s.status !== 'booked' && !selected.includes(`${s.row}${s.col}`));
    // Pick center seats from middle rows
    const mid = Math.floor(avail.length / 2);
    const best = avail.slice(Math.max(0, mid - Math.floor(maxSeats / 2)), mid + Math.ceil(maxSeats / 2));
    setSelected(best.slice(0, maxSeats).map(s => `${s.row}${s.col}`));
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <KioskHeader step={2} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 overflow-auto px-4 pt-4">
        {/* Category tabs + best available */}
        <div className="flex items-center gap-3 mb-4">
          {(['All', 'Silver', 'Gold'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 h-12 text-label border-2 transition-all ${
                category === c ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary'
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={bestAvailable}
            className="ml-auto flex items-center gap-2 px-5 h-12 border-2 border-primary text-primary text-label hover:bg-primary hover:text-foreground transition-all"
          >
            <Sparkles size={20} strokeWidth={2} />
            Best Available
          </button>
        </div>

        {/* Screen indicator */}
        <div className="text-center mb-6">
          <div className="mx-auto w-[600px] h-[4px] bg-gradient-to-r from-transparent via-text-secondary to-transparent mb-2" />
          <span className="text-label text-text-secondary tracking-[3px]">SCREEN</span>
        </div>

        {/* Seat map */}
        <div className="flex flex-col items-center gap-[6px]">
          {/* Column numbers */}
          <div className="flex items-center gap-[6px] mb-1">
            <div className="w-8" />
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} className="w-9 h-5 flex items-center justify-center text-[12px] text-disabled">
                {i + 1}
              </div>
            ))}
          </div>

          {rows.map(([rowLabel, seats]) => {
            const showRow = category === 'All' ||
              (category === 'Gold' && rowLabel >= 'H') ||
              (category === 'Silver' && rowLabel < 'H');
            if (!showRow) return null;

            // Aisle gap after column 7
            return (
              <div key={rowLabel} className="flex items-center gap-[6px]">
                <div className="w-8 text-center text-label text-text-secondary font-medium">{rowLabel}</div>
                {seats.map((seat, i) => {
                  const key = `${seat.row}${seat.col}`;
                  const isSelected = selected.includes(key);
                  return (
                    <>
                      {i === 7 && <div className="w-5" />}
                      <motion.button
                        key={key}
                        onClick={() => toggleSeat(seat.row, seat.col)}
                        disabled={seat.status === 'booked'}
                        animate={isSelected ? { scale: 1.06 } : { scale: 1 }}
                        transition={{ duration: 0.12 }}
                        className={`w-9 h-9 border-2 flex items-center justify-center text-[12px] font-medium transition-colors ${getSeatColor(seat, key)}`}
                      >
                        {isSelected ? seat.col : ''}
                      </motion.button>
                    </>
                  );
                })}
              </div>
            );
          })}

          {/* Category labels */}
          {category === 'All' && (
            <>
              <div className="w-full flex items-center gap-3 mt-2 mb-1 px-10">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-label text-premium">GOLD — ₹450</span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mt-8 mb-4">
          {[
            { label: 'Available', cls: 'border-text-secondary' },
            { label: 'Selected', cls: 'bg-primary border-primary' },
            { label: 'Booked', cls: 'bg-surface-alt border-surface-alt' },
            { label: 'Premium', cls: 'border-premium' },
            { label: 'Accessible', cls: 'border-accessible' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-6 h-6 border-2 ${l.cls}`} />
              <span className="text-label text-text-secondary">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Selected seats pill list */}
        {selected.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
            <span className="text-body-s text-text-secondary mr-2">Selected:</span>
            {selected.map(s => (
              <span key={s} className="bg-primary text-foreground px-4 py-2 text-label font-semibold">{s}</span>
            ))}
          </div>
        )}
      </div>

      <KioskFooter
        ctaLabel="Continue"
        ctaDisabled={selected.length === 0}
        onCta={() => {
          const selectedSeats = selected.map(k => allSeats.find(s => `${s.row}${s.col}` === k)!);
          updateBooking({ seats: selectedSeats, total: totalPrice });
          goTo('addons');
        }}
        leftContent={
          <div>
            <span className="text-body-s text-text-secondary">{selected.length}/{maxSeats} seats</span>
            <span className="text-h3 ml-3">₹{totalPrice}</span>
          </div>
        }
      />
    </div>
  );
}
