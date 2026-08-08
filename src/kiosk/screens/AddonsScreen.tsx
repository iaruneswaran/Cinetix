import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Utensils, CupSoda, Popcorn } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';
import { ADDONS, Addon } from '../types';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function AddonsScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [tab, setTab] = useState<'combos' | 'snacks' | 'drinks'>('combos');

  const setQty = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(5, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const renderAddonIcon = (imageType: string) => {
    switch (imageType) {
      case 'drink': return <CupSoda size={24} className="text-primary" />;
      case 'popcorn': return <Popcorn size={24} className="text-warning" />;
      default: return <Utensils size={24} className="text-primary" />;
    }
  };

  const filtered = ADDONS.filter(a => {
    if (tab === 'combos') return a.isCombo;
    if (tab === 'drinks') return a.title.toLowerCase().includes('drink') || a.title.toLowerCase().includes('cold');
    return !a.isCombo;
  });

  const selectedAddons = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => ({
      addon: ADDONS.find(a => a.id === Number(id))!,
      qty,
    }));

  const ticketTotal = booking.total || 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.addon.price * a.qty, 0);

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-6">
        {/* Header */}
        <h1 className="text-lg sm:text-xl font-bold mb-1">Enhance Your Experience</h1>
        <p className="text-[11px] sm:text-xs text-text-secondary mb-4 sm:mb-5">Pre-order snacks and save time at the counter</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 sm:mb-5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: 'combos', label: 'Combos' },
            { key: 'snacks', label: 'Snacks' },
            { key: 'drinks', label: 'Beverages' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-3.5 sm:px-4 h-8 sm:h-9 text-xs font-medium border transition-all shrink-0 ${tab === t.key ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary hover:border-primary'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {filtered.map((addon, i) => {
            const qty = quantities[addon.id] || 0;
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-surface border border-border"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-surface-alt border border-border flex items-center justify-center shrink-0">
                  {renderAddonIcon(addon.image)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-sm font-semibold truncate">{addon.title}</h3>
                    {addon.savings && (
                      <span className="bg-success/20 text-success text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 shrink-0">{addon.savings}</span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-text-secondary mb-1 line-clamp-1">{addon.description}</p>
                  <span className="text-xs sm:text-sm font-semibold">₹{addon.price}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {qty > 0 ? (
                    <>
                      <button
                        onClick={() => setQty(addon.id, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="w-6 text-center text-xs sm:text-sm font-bold">{qty}</span>
                      <button
                        onClick={() => setQty(addon.id, 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setQty(addon.id, 1)}
                      className="px-3 sm:px-4 h-7 sm:h-8 bg-primary text-foreground text-xs font-semibold flex items-center gap-1 hover:bg-primary-hover transition-colors"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                      ADD
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <KioskFooter
        ctaLabel="Review Order"
        onCta={() => {
          const addonsList = Object.entries(quantities)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => ({ addon: ADDONS.find(a => a.id === Number(id))!, qty }));
          updateBooking({ addons: addonsList, total: ticketTotal + addonsTotal });
          goTo('review');
        }}
        leftContent={
          <div>
            <div className="text-[11px] sm:text-xs text-text-secondary truncate">
              Tickets ₹{ticketTotal}{addonsTotal > 0 && ` + Snacks ₹${addonsTotal}`}
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Total: ₹{ticketTotal + addonsTotal}</div>
          </div>
        }
      />
    </div>
  );
}
