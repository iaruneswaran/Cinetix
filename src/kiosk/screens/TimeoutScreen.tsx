import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface Props {
  resetBooking: () => void;
}

export default function TimeoutScreen({ resetBooking }: Props) {
  return (
    <div
      className="w-full h-full bg-background flex flex-col items-center justify-center px-12 cursor-pointer"
      onClick={resetBooking}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-10"
      >
        <div className="w-28 h-28 border-4 border-border flex items-center justify-center">
          <Clock size={64} className="text-text-secondary" strokeWidth={1.5} />
        </div>
      </motion.div>

      <h1 className="text-h1 text-center mb-4">Session Ended</h1>
      <p className="text-body-l text-text-secondary text-center mb-16 max-w-[500px]">
        Your session ended for your security. No payment was charged.
      </p>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-primary text-foreground text-button-l py-6 px-16">
          TAP TO START AGAIN
        </div>
      </motion.div>
    </div>
  );
}
