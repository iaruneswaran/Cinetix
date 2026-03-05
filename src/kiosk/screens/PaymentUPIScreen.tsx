import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle, Loader2 } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function PaymentUPIScreen({ booking, goTo, goBack, resetBooking }: Props) {
  const [status, setStatus] = useState<'waiting' | 'received' | 'confirmed'>('waiting');

  // Simulate payment
  useEffect(() => {
    const t1 = setTimeout(() => setStatus('received'), 5000);
    const t2 = setTimeout(() => {
      setStatus('confirmed');
      setTimeout(() => goTo('processing'), 800);
    }, 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <KioskHeader step={5} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <h1 className="text-h1 mb-2">Scan & Pay</h1>
        <p className="text-body-l text-text-secondary mb-10">Scan the QR with your UPI app</p>

        {/* QR Code placeholder */}
        <motion.div
          animate={status === 'waiting' ? { boxShadow: ['0 0 20px hsl(357 91% 47% / 0.3)', '0 0 40px hsl(357 91% 47% / 0.6)', '0 0 20px hsl(357 91% 47% / 0.3)'] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[400px] h-[400px] bg-foreground p-8 mb-10"
        >
          <div className="w-full h-full bg-background flex items-center justify-center">
            <QrCode size={200} className="text-foreground" strokeWidth={0.5} />
          </div>
        </motion.div>

        {/* Amount */}
        <div className="text-h2 mb-8">₹{booking.total}</div>

        {/* Status */}
        <div className="flex items-center gap-4">
          {status === 'waiting' && (
            <>
              <Loader2 size={28} className="animate-spin text-primary" />
              <span className="text-body-l text-text-secondary">Waiting for payment...</span>
            </>
          )}
          {status === 'received' && (
            <>
              <Loader2 size={28} className="animate-spin text-warning" />
              <span className="text-body-l text-warning">Payment received, verifying...</span>
            </>
          )}
          {status === 'confirmed' && (
            <>
              <CheckCircle size={28} className="text-success" />
              <span className="text-body-l text-success">Payment confirmed!</span>
            </>
          )}
        </div>

        <button
          onClick={() => goTo('payment')}
          className="mt-12 h-14 px-8 border-2 border-border text-text-secondary text-label hover:border-primary transition-colors"
        >
          Change Payment Method
        </button>
      </div>
    </div>
  );
}
