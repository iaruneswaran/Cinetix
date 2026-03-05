import { motion } from 'framer-motion';
import { QrCode, CreditCard, Wallet, Banknote } from 'lucide-react';
import KioskHeader from '../components/KioskHeader';

interface Props {
  booking: any;
  updateBooking: (u: any) => void;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

const METHODS = [
  { key: 'upi', label: 'UPI / QR Pay', desc: 'Scan & pay with any UPI app', icon: QrCode, screen: 'paymentUPI' },
  { key: 'card', label: 'Card Payment', desc: 'Tap, Insert or Swipe your card', icon: CreditCard, screen: 'paymentCard' },
  { key: 'wallet', label: 'Digital Wallet', desc: 'Paytm, Amazon Pay, PhonePe', icon: Wallet, screen: 'paymentUPI' },
  { key: 'cash', label: 'Pay at Counter', desc: 'Get token and pay at cashier', icon: Banknote, screen: 'success' },
];

export default function PaymentScreen({ booking, updateBooking, goTo, goBack, resetBooking }: Props) {
  return (
    <div className="w-full h-full bg-background flex flex-col">
      <KioskHeader step={5} onBack={goBack} onCancel={resetBooking} />

      <div className="flex-1 flex flex-col px-8 pt-8">
        <h1 className="text-h1 mb-2">Payment</h1>
        <p className="text-body-l text-text-secondary mb-4">Select your payment method</p>

        {/* Total */}
        <div className="bg-surface border-2 border-primary p-6 mb-10 flex justify-between items-center">
          <span className="text-h3 text-text-secondary">Amount to Pay</span>
          <span className="text-display text-primary">₹{booking.total}</span>
        </div>

        {/* Methods */}
        <div className="flex flex-col gap-4">
          {METHODS.map((m, i) => (
            <motion.button
              key={m.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => {
                updateBooking({ paymentMethod: m.key });
                goTo(m.screen as any);
              }}
              className="flex items-center gap-6 p-6 bg-surface border-2 border-border hover:border-primary transition-all text-left"
            >
              <div className="w-16 h-16 border-2 border-border flex items-center justify-center shrink-0">
                <m.icon size={32} strokeWidth={1.5} className="text-primary" />
              </div>
              <div>
                <h3 className="text-h3 mb-1">{m.label}</h3>
                <p className="text-body-m text-text-secondary">{m.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
