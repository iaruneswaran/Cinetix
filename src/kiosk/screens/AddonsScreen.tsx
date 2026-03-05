import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';
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

  const filtered = ADDONS.filter(a => {
    if (tab === 'combos') return a.isCombo;
    if (tab === 'drinks') return a.title.toLowerCase().includes('drink') || a.title.toLowerCase().includes('cold');
    return !a.isCombo;
  });

  const addonsTotal = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const addon = ADDONS.find(a => a.id === Number(id));
    return sum + (addon?.price || 0) * qty;
  }, 0);

  const ticketTotal = booking.total || 0;

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <KioskHeader step={3} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 overflow-auto px-6 pt-6">
        <h1 className="text-h1 mb-2">Add Snacks & Drinks</h1>
        <p className="text-body-m text-text-secondary mb-6">Make your movie experience better</p>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { key: 'combos', label: 'Combos' },
            { key: 'snacks', label: 'Snacks' },
            { key: 'drinks', label: 'Drinks' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-6 h-14 text-label font-medium border-2 transition-all ${
                tab === t.key ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary hover:border-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4">
          {filtered.map((addon, i) => {
            const qty = quantities[addon.id] || 0;
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-5 p-5 bg-surface border-2 border-border"
              >
                <div className="w-20 h-20 bg-surface-alt flex items-center justify-center text-[40px] shrink-0">
                  {addon.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-h3">{addon.title}</h3>
                    {addon.savings && (
                      <span className="bg-success/20 text-success text-[13px] font-bold px-3 py-1">{addon.savings}</span>
                    )}
                  </div>
                  <p className="text-body-s text-text-secondary mb-2">{addon.description}</p>
                  <span className="text-body-l font-semibold">₹{addon.price}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {qty > 0 && (
                    <>
                      <button
                        onClick={() => setQty(addon.id, -1)}
                        className="w-12 h-12 border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                      >
                        <Minus size={24} strokeWidth={2.5} />
                      </button>
                      <span className="w-10 text-center text-h3">{qty}</span>
                    </>
                  )}
                  <button
                    onClick={() => setQty(addon.id, 1)}
                    className="w-12 h-12 bg-primary flex items-center justify-center hover:bg-primary-hover transition-colors"
                  >
                    <Plus size={24} strokeWidth={2.5} />
                  </button>
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
            <span className="text-body-s text-text-secondary">Tickets ₹{ticketTotal}</span>
            {addonsTotal > 0 && <span className="text-body-s text-text-secondary"> + Snacks ₹{addonsTotal}</span>}
            <div className="text-h3">₹{ticketTotal + addonsTotal}</div>
          </div>
        }
      />
    </div>
  );
}
