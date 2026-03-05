import { motion } from 'framer-motion';
import { XCircle, RotateCcw, CreditCard, X } from 'lucide-react';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  resetBooking: () => void;
}

export default function FailureScreen({ booking, goTo, resetBooking }: Props) {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center px-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="w-28 h-28 bg-destructive flex items-center justify-center">
          <XCircle size={64} strokeWidth={2} />
        </div>
      </motion.div>

      <h1 className="text-h1 text-center mb-3">Payment Failed</h1>
      <p className="text-body-l text-text-secondary text-center mb-4">
        Your payment could not be processed
      </p>
      <p className="text-body-m text-text-secondary text-center mb-16 max-w-[500px]">
        This could be due to insufficient funds, network issues, or card restrictions. 
        No amount has been charged.
      </p>

      <div className="w-full max-w-[500px] flex flex-col gap-4">
        <button
          onClick={() => goTo('payment')}
          className="w-full h-[72px] bg-primary text-foreground text-button-l flex items-center justify-center gap-3 hover:bg-primary-hover transition-colors"
        >
          <RotateCcw size={28} strokeWidth={2} />
          Retry Payment
        </button>
        <button
          onClick={() => goTo('payment')}
          className="w-full h-[72px] border-2 border-primary text-primary text-button-l flex items-center justify-center gap-3 hover:bg-primary hover:text-foreground transition-colors"
        >
          <CreditCard size={28} strokeWidth={2} />
          Change Payment Method
        </button>
        <button
          onClick={resetBooking}
          className="w-full h-[72px] border-2 border-border text-text-secondary text-button-l flex items-center justify-center gap-3 hover:border-primary transition-colors"
        >
          <X size={28} strokeWidth={2} />
          Cancel Booking
        </button>
      </div>
    </div>
  );
}
