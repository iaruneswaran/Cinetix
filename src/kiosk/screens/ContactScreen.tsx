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

      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Smartphone size={56} className="text-primary mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="text-h1 mb-3">Send tickets to your phone</h1>
          <p className="text-body-l text-text-secondary">Enter your mobile number for e-ticket</p>
        </motion.div>

        {/* Phone display */}
        <div className="w-full max-w-[500px] h-20 border-2 border-border bg-surface flex items-center px-6 mb-8">
          <span className="text-h3 text-text-secondary mr-3">+91</span>
          <span className="text-h2 tracking-[4px] flex-1">{phone || <span className="text-disabled">Enter number</span>}</span>
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[500px] mb-8">
          {KEYS.map((k, i) => (
            <button
              key={i}
              onClick={() => k && handleKey(k)}
              disabled={!k}
              className={`h-[72px] text-h2 font-semibold transition-all ${!k ? '' :
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
        <div className="flex gap-4">
          <button
            onClick={() => goTo('paymentUPI')}
            className="flex-1 h-[72px] border-2 border-border text-text-secondary text-button-l hover:border-primary transition-colors"
          >
            Skip
          </button>
          <button
            onClick={() => {
              updateBooking({ contactPhone: phone });
              goTo('paymentUPI');
            }}
            disabled={phone.length !== 10}
            className={`flex-1 h-[72px] text-button-l transition-all ${phone.length === 10
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
