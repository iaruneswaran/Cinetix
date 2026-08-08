import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function PaymentUPIScreen({ booking, goTo, goBack, resetBooking }: Props) {
  const [status, setStatus] = useState<'waiting' | 'confirmed'>('waiting');

  const upiId = "iaruneswaran@upi";
  const payeeName = "Cinetix";
  const amount = booking.total.toFixed(2);
  const upiUri = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;

  // Simulate payment
  useEffect(() => {
    const t = setTimeout(() => {
      setStatus('confirmed');
      setTimeout(() => goTo('success'), 800);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
        {/* CINETIX Branding */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base sm:text-lg font-black tracking-widest text-primary uppercase">CINETIX</span>
          <span className="text-xs text-text-secondary border-l border-border pl-2 uppercase font-medium">Express UPI Pay</span>
        </div>

        <h1 className="text-lg sm:text-xl font-bold mb-1">Scan & Pay</h1>
        <p className="text-xs text-text-secondary mb-4 sm:mb-6 text-center max-w-[300px]">Scan the QR code using any UPI app (GPay, PhonePe, Paytm)</p>

        {/* QR Code Container with 1px border */}
        <div className="bg-white p-3 sm:p-4 mb-4 border border-border">
          <QRCodeCanvas
            value={upiUri}
            size={180}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Amount */}
        <div className="text-[11px] sm:text-xs text-text-secondary mb-0.5 uppercase tracking-wider font-semibold">Total Amount</div>
        <div className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-5">₹{booking.total}</div>

        {/* Status */}
        <div className="flex items-center gap-2.5 bg-surface border border-border px-5 py-2.5">
          {status === 'waiting' ? (
            <>
              <Loader2 size={18} className="animate-spin text-primary" />
              <span className="text-xs text-text-secondary font-medium">Waiting for payment...</span>
            </>
          ) : (
            <>
              <CheckCircle size={18} className="text-success" />
              <span className="text-xs text-success font-medium">Payment received!</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
