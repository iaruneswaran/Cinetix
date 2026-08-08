import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Printer, RotateCcw, Check, Clock } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';

interface Props {
  booking: any;
  resetBooking: () => void;
  goTo: (s: any) => void;
}

export default function SuccessScreen({ booking, resetBooking }: Props) {
  const orderId = booking.orderId || 'CTX8HK39M2';
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Auto-download ticket on mount
  useEffect(() => {
    const autoDownloadTimer = setTimeout(() => {
      handleDownload();
    }, 1000);
    return () => clearTimeout(autoDownloadTimer);
  }, []);

  // 30-second countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      resetBooking();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, resetBooking]);

  const handleDownload = () => {
    const movieTitle = booking.movie?.title || 'Movie';
    const showtime = booking.showtime?.time || '';
    const seats = booking.seats?.map((s: any) => `${s.row}${s.col}`).join(', ') || 'N/A';
    const content = `=================================\n       CINETIX MOVIE TICKET      \n=================================\nOrder ID: ${orderId}\nMovie: ${movieTitle}\nDate & Time: ${booking.date || 'Today'} • ${showtime}\nScreen: ${booking.showtime?.screen || 'Screen 1'}\nSeats: ${seats}\nTotal Paid: ₹${booking.total || 0}\n=================================\nShow this ticket QR at entry gate.\nThank you for choosing Cinetix!\n=================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CINETIX_Ticket_${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    toast.success(`Ticket downloaded as CINETIX_Ticket_${orderId}.txt`);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShare = async () => {
    const movieTitle = booking.movie?.title || 'Movie';
    const showtime = booking.showtime?.time || '';
    const seats = booking.seats?.map((s: any) => `${s.row}${s.col}`).join(', ') || 'N/A';
    const text = `CINETIX Movie Ticket\nOrder ID: ${orderId}\nMovie: ${movieTitle}\nSeats: ${seats}\nShowtime: ${showtime}\nTotal Paid: ₹${booking.total || 0}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cinetix Ticket',
          text: text,
        });
        toast.success('Ticket shared successfully!');
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShared(true);
        toast.success('Ticket details copied to clipboard!');
        setTimeout(() => setShared(false), 3000);
      } catch (err) {
        toast.error('Failed to copy ticket details.');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full bg-background flex flex-col items-center px-3 sm:px-6 pt-4 sm:pt-6 overflow-auto max-w-[600px] mx-auto">
      {/* Success icon with animated red stroke checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-2 sm:mb-3 flex items-center justify-center"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 border border-primary flex items-center justify-center">
          <svg viewBox="0 0 50 50" className="w-8 h-8 sm:w-10 sm:h-10 text-primary">
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 14 26 L 22 34 L 36 16"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-lg sm:text-xl font-bold text-center mb-0.5">Booking Confirmed!</h1>
        <p className="text-xs text-text-secondary text-center mb-3 sm:mb-4">Your tickets are ready</p>
      </motion.div>

      {/* Order details card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-surface border border-border p-3.5 sm:p-4 mb-3"
      >
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <span className="text-[11px] text-text-secondary">Order ID</span>
            <p className="text-xs sm:text-sm font-bold font-mono">{orderId}</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-text-secondary">Total Paid</span>
            <p className="text-sm sm:text-base font-bold text-primary">₹{booking.total}</p>
          </div>
        </div>

        <div className="h-[1px] bg-border mb-3" />

        <div className="grid grid-cols-2 gap-y-2 mb-3 text-xs">
          <div>
            <span className="text-text-secondary block text-[11px]">Movie</span>
            <p className="font-semibold truncate">{booking.movie?.title}</p>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Date & Time</span>
            <p className="font-semibold">{booking.showtime?.time}</p>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Screen</span>
            <p className="font-semibold">{booking.showtime?.screen}</p>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Seats</span>
            <p className="font-semibold">{booking.seats.map((s: any) => `${s.row}${s.col}`).join(', ')}</p>
          </div>
        </div>

        {/* QR code */}
        <div className="flex justify-center">
          <div className="bg-white p-2.5 sm:p-3 border border-border">
            <QRCodeCanvas
              value={orderId}
              size={110}
              level="M"
              includeMargin={false}
            />
          </div>
        </div>
        <p className="text-center text-[10px] sm:text-[11px] text-text-secondary mt-2">Show this QR at the entry gate</p>
      </motion.div>

      {/* 30s Countdown Timer Bar */}
      <div className="w-full bg-surface border border-border p-2.5 sm:p-3 mb-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock size={15} className="text-primary shrink-0" />
          <span className="text-[11px] sm:text-xs">Returning home in</span>
        </div>
        <span className="font-mono font-bold text-primary text-xs sm:text-sm">{timeLeft}s</span>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full flex flex-col gap-2 pb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            className="h-10 bg-primary text-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
          >
            {downloaded ? <Check size={16} strokeWidth={2.5} /> : <Download size={16} strokeWidth={2} />}
            {downloaded ? 'Downloaded' : 'Download Ticket'}
          </button>
          <button
            onClick={handleShare}
            className="h-10 border border-primary text-primary text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-foreground transition-colors"
          >
            {shared ? <Check size={16} strokeWidth={2.5} /> : <Share2 size={16} strokeWidth={2} />}
            {shared ? 'Copied Link' : 'Share Ticket'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
