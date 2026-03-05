import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Nfc, ArrowDown } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function PaymentCardScreen({ booking, goTo, goBack, resetBooking }: Props) {
  const [mode, setMode] = useState<'tap' | 'insert'>('tap');

  // Simulate detection
  useEffect(() => {
    const t = setTimeout(() => goTo('processing'), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <KioskHeader step={5} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <h1 className="text-h1 mb-2">Card Payment</h1>
        <p className="text-body-l text-text-secondary mb-6">₹{booking.total}</p>

        {/* Mode tabs */}
        <div className="flex gap-3 mb-16">
          <button
            onClick={() => setMode('tap')}
            className={`px-8 h-14 border-2 text-label font-medium transition-all ${mode === 'tap' ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary'}`}
          >
            Tap / NFC
          </button>
          <button
            onClick={() => setMode('insert')}
            className={`px-8 h-14 border-2 text-label font-medium transition-all ${mode === 'insert' ? 'bg-primary border-primary text-foreground' : 'border-border text-text-secondary'}`}
          >
            Insert Card
          </button>
        </div>

        {mode === 'tap' ? (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-48 h-48 border-4 border-primary flex items-center justify-center mb-10"
          >
            <Nfc size={80} className="text-primary" strokeWidth={1} />
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center mb-10"
          >
            <CreditCard size={80} className="text-primary mb-4" strokeWidth={1} />
            <ArrowDown size={40} className="text-text-secondary" />
          </motion.div>
        )}

        <p className="text-h3 text-text-secondary text-center">
          {mode === 'tap'
            ? 'Hold your card near the reader'
            : 'Insert your card and hold until prompted'
          }
        </p>

        <button
          onClick={() => goTo('payment')}
          className="mt-16 h-14 px-8 border-2 border-border text-text-secondary text-label hover:border-primary transition-colors"
        >
          Change Payment Method
        </button>
      </div>
    </div>
  );
}
