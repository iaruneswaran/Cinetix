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

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* CINETIX Branding */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-black tracking-widest text-primary uppercase">CINETIX</span>
          <span className="text-xs text-text-secondary border-l border-border pl-2 uppercase font-medium">Express UPI Pay</span>
        </div>

        <h1 className="text-xl font-bold mb-1">Scan & Pay</h1>
        <p className="text-xs text-text-secondary mb-6">Scan the QR code using any UPI app (GPay, PhonePe, Paytm)</p>

        {/* QR Code Container with 1px border */}
        <div className="bg-white p-4 mb-4 border border-border">
          <QRCodeCanvas
            value={upiUri}
            size={210}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Amount */}
        <div className="text-xs text-text-secondary mb-1 uppercase tracking-wider font-semibold">Total Amount</div>
        <div className="text-2xl font-bold text-primary mb-5">₹{booking.total}</div>

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
