import { useState, useMemo } from 'react';
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
  const [category, setCategory] = useState<'All' | 'Silver' | 'Gold' | 'VIP'>('All');
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

  const totalPrice = selected.reduce((sum, key) => {
    const seat = allSeats.find(s => `${s.row}${s.col}` === key);
    return sum + (seat?.price || 0);
  }, 0);

  const TheaterSeat = ({ seat, isSelected, onClick }: { seat: Seat; isSelected: boolean; onClick: () => void }) => {
    const isBooked = seat.status === 'booked';

    return (
      <button
        onClick={onClick}
        disabled={isBooked}
        className={`w-8 h-8 border flex items-center justify-center text-[10px] font-bold transition-all ${
          isSelected
            ? 'bg-primary border-primary text-foreground'
            : isBooked
            ? 'bg-surface-alt border-border text-disabled/40 cursor-not-allowed opacity-60'
            : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-foreground'
        }`}
      >
        <span>{isBooked ? '' : seat.col || ''}</span>
      </button>
    );
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-4 pt-4 pb-6">
        {/* Category tabs */}
        <div className="flex items-center gap-2.5 mb-4">
          {(['All', 'Silver', 'Gold', 'VIP'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 h-8 text-xs border transition-all ${category === c ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary'
                }`}
            >
              {c} {c === 'Silver' ? '(₹250)' : c === 'Gold' ? '(₹350)' : c === 'VIP' ? '(₹500)' : ''}
            </button>
          ))}
        </div>

        {/* Screen indicator */}
        <div className="relative flex flex-col items-center mb-8 mt-2">
          <div className="w-[80%] h-10 relative">
            <svg viewBox="0 0 800 40" className="w-full h-full">
              <path
                d="M 10,35 Q 400,5 790,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </div>
          <span className="text-xs text-text-secondary tracking-[6px] mt-[-8px] font-semibold uppercase">Cinema Screen</span>
        </div>

        {/* Seat map */}
        <div className="flex flex-col items-center gap-[5px] min-w-max pb-4 overflow-x-auto">
          {/* Column numbers */}
          <div className="flex items-center gap-[5px] mb-1">
            <div className="w-6" />
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="flex items-center">
                {i === 9 && <div className="w-6" />}
                <div className="w-8 h-5 flex items-center justify-center text-[11px] text-disabled">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {rows.map(([rowLabel, seats]) => {
            const isSilver = rowLabel <= 'E';
            const isGold = rowLabel >= 'F' && rowLabel <= 'K';
            const isVIP = rowLabel >= 'L';

            const showRow = category === 'All' ||
              (category === 'Silver' && isSilver) ||
              (category === 'Gold' && isGold) ||
              (category === 'VIP' && isVIP);
            if (!showRow) return null;

            return (
              <div key={rowLabel} className="w-full flex flex-col items-center">
                {/* Section headers */}
                {category === 'All' && rowLabel === 'A' && (
                  <div className="w-full flex items-center gap-3 my-2 max-w-[700px]">
                    <div className="h-[1px] flex-1 bg-border" />
                    <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">Silver Section — ₹250</span>
                    <div className="h-[1px] flex-1 bg-border" />
                  </div>
                )}
                {category === 'All' && rowLabel === 'F' && (
                  <div className="w-full flex items-center gap-3 my-3 max-w-[700px]">
                    <div className="h-[1px] flex-1 bg-amber-500/30" />
                    <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">Gold Section — ₹350</span>
                    <div className="h-[1px] flex-1 bg-amber-500/30" />
                  </div>
                )}
                {category === 'All' && rowLabel === 'L' && (
                  <div className="w-full flex items-center gap-3 my-3 max-w-[700px]">
                    <div className="h-[1px] flex-1 bg-primary/40" />
                    <span className="text-[11px] font-bold tracking-wider text-primary uppercase">VIP Recliner Section — ₹500</span>
                    <div className="h-[1px] flex-1 bg-primary/40" />
                  </div>
                )}

                <div className="flex items-center gap-[5px]">
                  <div className="w-6 text-center text-xs text-text-secondary font-semibold mr-1">{rowLabel}</div>
                  {seats.map((seat, i) => {
                    const key = `${seat.row}${seat.col}`;
                    const isSelected = selected.includes(key);
                    return (
                      <div key={key} className="flex items-center">
                        {i === 9 && <div className="w-6" />}
                        <TheaterSeat
                          seat={seat}
                          isSelected={isSelected}
                          onClick={() => toggleSeat(seat.row, seat.col)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mt-6 mb-4 px-4">
          {[
            { label: 'Available', type: 'available' },
            { label: 'Selected', type: 'selected' },
            { label: 'Booked', type: 'booked' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <TheaterSeat
                seat={{ row: '', col: 0, status: l.type as any, price: 0, category: '' }}
                isSelected={l.type === 'selected'}
                onClick={() => { }}
              />
              <span className="text-xs font-medium text-text-secondary">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Selected seats pill list */}
        {selected.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
            <span className="text-xs text-text-secondary mr-1">Selected:</span>
            {selected.map(s => (
              <span key={s} className="bg-primary text-foreground px-3 py-1 text-xs font-bold">{s}</span>
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
            <span className="text-xs text-text-secondary block">{selected.length}/{maxSeats} seats selected</span>
            <span className="text-sm font-bold text-foreground">₹{totalPrice}</span>
          </div>
        }
      />
    </div>
  );
}
