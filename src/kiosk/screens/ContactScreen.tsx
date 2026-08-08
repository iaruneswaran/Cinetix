import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Mail } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function ContactScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  const [phone, setPhone] = useState('');

  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  const handleKey = (k: string) => {
    if (k === '⌫') setPhone(prev => prev.slice(0, -1));
    else if (k && phone.length < 10) setPhone(prev => prev + k);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5">
          <Smartphone size={32} className="text-primary mx-auto mb-3" strokeWidth={1.5} />
          <h1 className="text-xl font-bold mb-1">Send tickets to your phone</h1>
          <p className="text-xs text-text-secondary">Enter your mobile number for e-ticket</p>
        </motion.div>

        {/* Phone display */}
        <div className="w-full max-w-[400px] h-12 border-2 border-border bg-surface flex items-center px-4 mb-4">
          <span className="text-sm text-text-secondary mr-2">+91</span>
          <span className="text-base font-bold tracking-[3px] flex-1">{phone || <span className="text-disabled text-xs font-normal">Enter number</span>}</span>
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] mb-4">
          {KEYS.map((k, i) => (
            <button
              key={i}
              onClick={() => k && handleKey(k)}
              disabled={!k}
              className={`h-[46px] text-lg font-bold transition-all ${!k ? '' :
                k === '⌫'
                  ? 'border-2 border-border text-text-secondary hover:border-primary'
                  : 'border-2 border-border bg-surface hover:border-primary hover:bg-surface-alt active:bg-primary active:border-primary'
                }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex gap-3 max-w-[400px] mx-auto">
          <button
            onClick={() => goTo('paymentUPI')}
            className="flex-1 h-10 border-2 border-border text-text-secondary text-sm font-semibold hover:border-primary transition-colors"
          >
            Skip
          </button>
          <button
            onClick={() => {
              updateBooking({ contactPhone: phone });
              goTo('paymentUPI');
            }}
            disabled={phone.length !== 10}
            className={`flex-1 h-10 text-sm font-semibold transition-all ${phone.length === 10
              ? 'bg-primary text-foreground hover:bg-primary-hover'
              : 'bg-border text-disabled cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
