import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { KioskScreen, BookingState, MOVIES } from './types';
import AttractScreen from './screens/AttractScreen';
import LanguageScreen from './screens/LanguageScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import DateTimeScreen from './screens/DateTimeScreen';
import SeatCountScreen from './screens/SeatCountScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen';
import AddonsScreen from './screens/AddonsScreen';
import ReviewScreen from './screens/ReviewScreen';
import ContactScreen from './screens/ContactScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentUPIScreen from './screens/PaymentUPIScreen';
import PaymentCardScreen from './screens/PaymentCardScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import SuccessScreen from './screens/SuccessScreen';
import FailureScreen from './screens/FailureScreen';
import TimeoutScreen from './screens/TimeoutScreen';

import KioskHeader from './components/KioskHeader';

const initialBooking: BookingState = {
  movie: null,
  date: '',
  showtime: null,
  seatCount: 2,
  seats: [],
  addons: [],
  promoCode: '',
  contactPhone: '',
  contactEmail: '',
  paymentMethod: 'upi',
  orderId: '',
  total: 0,
};

const FLOW_SCREENS: KioskScreen[] = [
  'attract', 'language', 'home', 'movieDetails', 'dateTime',
  'seatCount', 'seatSelection', 'addons', 'review', 'contact',
  'paymentUPI', 'processing', 'success',
];

export default function KioskShell() {
  const [screen, setScreen] = useState<KioskScreen>('attract');
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [direction, setDirection] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inactivityTimer, setInactivityTimer] = useState<number | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Calculate scale
  useEffect(() => {
    function updateScale() {
      const sw = window.innerWidth / 1080;
      const sh = window.innerHeight / 1920;
      setScale(Math.min(sw, sh));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Inactivity timer (disabled on attract/processing/success)
  useEffect(() => {
    if (['attract', 'processing', 'success', 'timeout'].includes(screen)) return;

    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowTimeout(false);
      timeoutRef.current = setTimeout(() => {
        setShowTimeout(true);
        setTimeout(() => {
          goTo('timeout');
          setShowTimeout(false);
        }, 5000);
      }, 60000); // 60s for demo
    };

    resetTimer();
    window.addEventListener('pointerdown', resetTimer);
    return () => {
      window.removeEventListener('pointerdown', resetTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [screen]);

  const goTo = useCallback((s: KioskScreen) => {
    const curIdx = FLOW_SCREENS.indexOf(screen);
    const newIdx = FLOW_SCREENS.indexOf(s);
    setDirection(newIdx >= curIdx ? 1 : -1);
    setScreen(s);
  }, [screen]);

  const goBack = useCallback(() => {
    const idx = FLOW_SCREENS.indexOf(screen);
    if (idx > 0) {
      setDirection(-1);
      setScreen(FLOW_SCREENS[idx - 1]);
    }
  }, [screen]);

  const resetBooking = useCallback(() => {
    setBooking(initialBooking);
    setDirection(1);
    setScreen('attract');
  }, []);

  const updateBooking = useCallback((updates: Partial<BookingState>) => {
    setBooking(prev => ({ ...prev, ...updates }));
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 1080 : -1080, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -1080 : 1080, opacity: 0 }),
  };

  const screenProps = { booking, updateBooking, goTo, goBack, resetBooking };

  const renderScreen = () => {
    switch (screen) {
      case 'attract': return <AttractScreen {...screenProps} />;
      case 'language': return <LanguageScreen {...screenProps} />;
      case 'home': return <HomeScreen {...screenProps} />;
      case 'movieDetails': return <MovieDetailsScreen {...screenProps} />;
      case 'dateTime': return <DateTimeScreen {...screenProps} />;
      case 'seatCount': return <SeatCountScreen {...screenProps} />;
      case 'seatSelection': return <SeatSelectionScreen {...screenProps} />;
      case 'addons': return <AddonsScreen {...screenProps} />;
      case 'review': return <ReviewScreen {...screenProps} />;
      case 'contact': return <ContactScreen {...screenProps} />;
      case 'payment': return <PaymentScreen {...screenProps} />;
      case 'paymentUPI': return <PaymentUPIScreen {...screenProps} />;
      case 'paymentCard': return <PaymentCardScreen {...screenProps} />;
      case 'processing': return <ProcessingScreen {...screenProps} />;
      case 'success': return <SuccessScreen {...screenProps} />;
      case 'failure': return <FailureScreen {...screenProps} />;
      case 'timeout': return <TimeoutScreen {...screenProps} />;
      default: return <AttractScreen {...screenProps} />;
    }
  };

  // Header configuration
  const getHeaderProps = () => {
    const noHeaderScreens: KioskScreen[] = ['attract', 'language', 'processing', 'success', 'failure', 'timeout'];
    if (noHeaderScreens.includes(screen)) return null;

    const props: any = {
      onCancel: resetBooking,
      showStepper: true,
    };

    if (screen === 'home') {
      props.showStepper = false;
    } else {
      props.onBack = goBack;
    }

    // Step indices
    const stepMap: Record<string, number> = {
      'movieDetails': 0,
      'dateTime': 1,
      'seatCount': 2,
      'seatSelection': 2,
      'addons': 3,
      'review': 4,
      'contact': 4,
      'payment': 5,
      'paymentUPI': 5,
      'paymentCard': 5,
    };

    if (stepMap[screen] !== undefined) {
      props.step = stepMap[screen];
    }

    return props;
  };

  const headerProps = getHeaderProps();

  return (
    <div ref={containerRef} className="w-screen h-screen bg-background overflow-hidden relative">
      <div
        className="kiosk-frame flex flex-col"
        style={{ transform: `scale(${scale})` }}
      >
        {headerProps && <KioskHeader {...headerProps} />}

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeout warning overlay */}
        {showTimeout && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
            <div className="bg-surface border-2 border-primary p-16 text-center">
              <p className="text-h2 mb-8">Are you still there?</p>
              <p className="text-body-l text-text-secondary mb-12">Session will end in 5 seconds</p>
              <button
                onClick={() => setShowTimeout(false)}
                className="bg-primary text-foreground text-button-l px-16 py-5 hover:bg-primary-hover active:bg-primary-pressed transition-colors"
              >
                I'm here
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
