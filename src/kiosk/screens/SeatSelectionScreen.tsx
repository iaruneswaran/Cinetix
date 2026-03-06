import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
    if (avail.length === 0) return;

    // Pick center seats from middle rows (Row E, F, G are usually middle)
    const preferredRows = ['E', 'F', 'G', 'D', 'H'];
    const sortedAvail = [...avail].sort((a, b) => {
      const aRowIdx = preferredRows.indexOf(a.row);
      const bRowIdx = preferredRows.indexOf(b.row);
      if (aRowIdx !== bRowIdx) return (aRowIdx === -1 ? 99 : aRowIdx) - (bRowIdx === -1 ? 99 : bRowIdx);
      return Math.abs(a.col - 7.5) - Math.abs(b.col - 7.5);
    });

    setSelected(sortedAvail.slice(0, maxSeats).map(s => `${s.row}${s.col}`));
  };

  const TheaterSeat = ({ seat, isSelected, onClick }: { seat: Seat; isSelected: boolean; onClick: () => void }) => {
    const isBooked = seat.status === 'booked';
    const isPremium = seat.status === 'premium';
    const isAccessible = seat.status === 'accessible';

    let baseColor = "border-text-secondary/30 bg-transparent text-text-secondary hover:border-primary";
    if (isSelected) baseColor = "bg-primary border-primary text-foreground shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]";
    else if (isBooked) baseColor = "bg-surface-alt/50 border-surface-alt text-disabled cursor-not-allowed";
    else if (isPremium) baseColor = "border-premium/50 text-premium hover:border-premium";
    else if (isAccessible) baseColor = "border-accessible/50 text-accessible hover:border-accessible";

    return (
      <motion.button
        onClick={onClick}
        disabled={isBooked}
        whileHover={!isBooked ? { scale: 1.1, y: -2 } : {}}
        whileTap={!isBooked ? { scale: 0.95 } : {}}
        animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
        className={`relative w-10 h-10 transition-all duration-200 group ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {/* Seat Top (Rounded) */}
        <div className={`absolute inset-x-[2px] top-0 h-[80%] rounded-t-xl border-2 transition-colors ${baseColor.split(' ')[0]} ${baseColor.split(' ')[1]}`}>
          {/* Armrests */}
          <div className={`absolute -left-[2px] top-1/2 w-[4px] h-[40%] rounded-full border-l-2 border-y-2 ${baseColor.split(' ')[0]}`} />
          <div className={`absolute -right-[2px] top-1/2 w-[4px] h-[40%] rounded-full border-r-2 border-y-2 ${baseColor.split(' ')[0]}`} />

          <div className="flex items-center justify-center h-full text-[11px] font-bold">
            {isSelected ? seat.col : (isBooked ? '' : '')}
            {isAccessible && !isSelected && !isBooked && <span className="text-[10px]">♿</span>}
          </div>
        </div>
        {/* Seat Bottom Cushion */}
        <div className={`absolute inset-x-0 bottom-0 h-[30%] rounded-b-lg border-2 border-t-0 transition-colors ${baseColor.split(' ')[0]} ${baseColor.split(' ')[1]}`} />
      </motion.button>
    );
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-4 pt-4">
        {/* Category tabs + best available */}
        <div className="flex items-center gap-3 mb-4">
          {(['All', 'Silver', 'Gold'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 h-12 text-label border-2 transition-all ${category === c ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary'
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
        <div className="relative flex flex-col items-center mb-12 mt-4">
          <div className="w-[80%] h-12 relative">
            <svg viewBox="0 0 800 40" className="w-full h-full drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
              <path
                d="M 10,35 Q 400,5 790,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-primary/40"
              />
              <path
                d="M 10,35 Q 400,5 790,35"
                fill="none"
                stroke="url(#screenGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-label text-text-secondary tracking-[8px] mt-[-10px] opacity-50 uppercase">Cinema Screen</span>
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

            return (
              <div key={rowLabel} className="flex items-center gap-[10px]">
                <div className="w-8 text-center text-label text-text-secondary/60 font-medium mr-2">{rowLabel}</div>
                {seats.map((seat, i) => {
                  const key = `${seat.row}${seat.col}`;
                  const isSelected = selected.includes(key);
                  return (
                    <div key={key} className="flex items-center">
                      {i === 7 && <div className="w-10" />}
                      <TheaterSeat
                        seat={seat}
                        isSelected={isSelected}
                        onClick={() => toggleSeat(seat.row, seat.col)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Category labels */}
          {category === 'All' && (
            <div className="w-full flex items-center gap-4 mt-6 mb-2 px-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[11px] font-bold tracking-[3px] text-premium uppercase opacity-80">Gold Section — ₹450</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-8 justify-center mt-12 mb-6 px-4">
          {[
            { label: 'Available', type: 'available' },
            { label: 'Selected', type: 'selected' },
            { label: 'Booked', type: 'booked' },
            { label: 'Premium', type: 'premium' },
            { label: 'Accessible', type: 'accessible' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-3">
              <div className="scale-75 origin-left">
                <TheaterSeat
                  seat={{ row: '', col: 0, status: l.type as any, price: 0, category: '' }}
                  isSelected={l.type === 'selected'}
                  onClick={() => { }}
                />
              </div>
              <span className="text-[12px] font-medium text-text-secondary/80 uppercase tracking-wider">{l.label}</span>
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
