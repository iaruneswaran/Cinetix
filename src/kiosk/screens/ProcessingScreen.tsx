import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Loader2 } from 'lucide-react';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  updateBooking: (u: any) => void;
}

const STEPS = [
  'Verifying payment...',
  'Confirming seats...',
  'Generating tickets...',
  'Almost done...',
];

export default function ProcessingScreen({ booking, goTo, updateBooking }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const intervals = STEPS.map((_, i) =>
      setTimeout(() => setStep(i), i * 1200)
    );
    const finish = setTimeout(() => {
      updateBooking({ orderId: 'CTX' + Math.random().toString(36).substring(2, 10).toUpperCase() });
      goTo('success');
    }, STEPS.length * 1200);
    return () => { intervals.forEach(clearTimeout); clearTimeout(finish); };
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center px-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="mb-12"
      >
        <Shield size={80} className="text-primary" strokeWidth={1} />
      </motion.div>

      <h1 className="text-h1 mb-4">Processing Payment</h1>
      <p className="text-body-l text-warning mb-16">Do not remove your card</p>

      <div className="w-full max-w-[500px]">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={i <= step ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-5"
          >
            {i < step ? (
              <div className="w-8 h-8 bg-success flex items-center justify-center shrink-0"><Check size={20} strokeWidth={3} /></div>
            ) : i === step ? (
              <Loader2 size={28} className="animate-spin text-primary shrink-0" />
            ) : (
              <div className="w-8 h-8 border-2 border-border shrink-0" />
            )}
            <span className={`text-body-l ${i <= step ? 'text-foreground' : 'text-disabled'}`}>{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
