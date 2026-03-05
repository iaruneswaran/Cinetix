import { motion } from 'framer-motion';
import { CheckCircle, QrCode, Printer, MessageSquare, RotateCcw } from 'lucide-react';

interface Props {
  booking: any;
  resetBooking: () => void;
  goTo: (s: any) => void;
}

export default function SuccessScreen({ booking, resetBooking }: Props) {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center px-8 pt-16 overflow-auto">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="w-28 h-28 bg-success flex items-center justify-center">
          <CheckCircle size={64} strokeWidth={2} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-h1 text-center mb-2">Booking Confirmed!</h1>
        <p className="text-body-l text-text-secondary text-center mb-10">Your tickets are ready</p>
      </motion.div>

      {/* Order details card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-surface border-2 border-border p-8 mb-6"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-label text-text-secondary">Order ID</span>
            <p className="text-h3 font-mono">{booking.orderId || 'CTX8HK39M2'}</p>
          </div>
          <div className="text-right">
            <span className="text-label text-text-secondary">Total Paid</span>
            <p className="text-h2 text-primary">₹{booking.total}</p>
          </div>
        </div>

        <div className="h-[2px] bg-border mb-6" />

        <div className="grid grid-cols-2 gap-y-4 mb-6">
          <div>
            <span className="text-label text-text-secondary">Movie</span>
            <p className="text-body-m">{booking.movie?.title}</p>
          </div>
          <div>
            <span className="text-label text-text-secondary">Date & Time</span>
            <p className="text-body-m">{booking.showtime?.time}</p>
          </div>
          <div>
            <span className="text-label text-text-secondary">Screen</span>
            <p className="text-body-m">{booking.showtime?.screen}</p>
          </div>
          <div>
            <span className="text-label text-text-secondary">Seats</span>
            <p className="text-body-m">{booking.seats.map((s: any) => `${s.row}${s.col}`).join(', ')}</p>
          </div>
        </div>

        {/* QR code */}
        <div className="flex justify-center">
          <div className="w-[200px] h-[200px] bg-foreground p-4">
            <div className="w-full h-full bg-background flex items-center justify-center">
              <QrCode size={100} className="text-foreground" strokeWidth={0.5} />
            </div>
          </div>
        </div>
        <p className="text-center text-body-s text-text-secondary mt-3">Show this QR at the entry gate</p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full flex flex-col gap-3 pb-8"
      >
        <button className="w-full h-[72px] bg-primary text-foreground text-button-l flex items-center justify-center gap-3 hover:bg-primary-hover transition-colors">
          <Printer size={28} strokeWidth={2} />
          Print Tickets
        </button>
        <button className="w-full h-[72px] border-2 border-primary text-primary text-button-l flex items-center justify-center gap-3 hover:bg-primary hover:text-foreground transition-colors">
          <MessageSquare size={28} strokeWidth={2} />
          Send via SMS / Email
        </button>
        <button
          onClick={resetBooking}
          className="w-full h-[72px] border-2 border-border text-text-secondary text-button-l flex items-center justify-center gap-3 hover:border-primary transition-colors"
        >
          <RotateCcw size={28} strokeWidth={2} />
          New Booking
        </button>
      </motion.div>
    </div>
  );
}
