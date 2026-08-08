import { ArrowLeft, X } from 'lucide-react';
import { KioskScreen } from '../types';

interface Props {
  step?: number;
  totalSteps?: number;
  stepLabels?: string[];
  onBack?: () => void;
  onCancel?: () => void;
  showStepper?: boolean;
}

const STEPS = ['Movie', 'Time', 'Seats', 'Add-ons', 'Review', 'Pay'];

export default function KioskHeader({ step, totalSteps = 6, stepLabels = STEPS, onBack, onCancel, showStepper = true }: Props) {
  return (
    <div className="h-[60px] md:h-[64px] bg-surface border-b border-border flex items-center justify-between px-3 md:px-6 shrink-0 relative select-none">
      {/* Left section */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0 z-10">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-border hover:border-primary transition-colors active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
        )}
        <div className="text-base md:text-lg font-bold tracking-wider text-primary">CINE<span className="text-foreground">TIX</span></div>
      </div>

      {/* Mobile step indicator (visible on < md screens) */}
      {showStepper && step !== undefined && (
        <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 bg-surface-alt border border-border rounded-full text-xs font-semibold z-10 max-w-[180px] truncate">
          <span className="text-primary font-bold">{step + 1}/{totalSteps}</span>
          <span className="text-text-secondary">·</span>
          <span className="text-foreground truncate">{stepLabels[step]}</span>
        </div>
      )}

      {/* Center section: Desktop Stepper navigation (hidden on mobile) */}
      {showStepper && step !== undefined && (
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 items-center w-full max-w-[650px] px-4 pointer-events-none">
          <div className="w-full relative pointer-events-auto">
            {/* Background connector line segments (connecting badge centers) */}
            <div className="absolute top-[12px] left-[8.33%] right-[8.33%] h-[1px] -translate-y-1/2 z-0 flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-[1px] transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`}
                />
              ))}
            </div>

            {/* 6 Equal Grid Columns for Step Items */}
            <div className="grid grid-cols-6 relative z-10">
              {stepLabels.map((label, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-xs font-bold border transition-all ${
                      i < step
                        ? 'bg-primary border-primary text-foreground'
                        : i === step
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'border-border text-disabled bg-surface-alt'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[11px] font-semibold tracking-tight mt-1 whitespace-nowrap transition-colors text-center ${
                      i <= step ? 'text-foreground font-bold' : 'text-disabled'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right section */}
      <div className="flex items-center justify-end shrink-0 z-10">
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-destructive text-destructive hover:bg-destructive hover:text-foreground transition-colors active:scale-95"
            title="Cancel"
            aria-label="Cancel booking"
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
