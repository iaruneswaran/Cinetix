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
    <div className="h-[64px] bg-surface border-b border-border flex items-center px-6 shrink-0 justify-between">
      {/* Left section (fixed width for perfect symmetry) */}
      <div className="flex items-center gap-3 w-[200px] shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
        )}
        <div className="text-lg font-bold tracking-wider text-primary">CINE<span className="text-foreground">TIX</span></div>
      </div>

      {/* Center section: Stepper navigation */}
      {showStepper && step !== undefined && (
        <div className="flex-1 flex items-center justify-center max-w-[680px] mx-auto px-2">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-initial">
              {/* Step node (number badge with text below) */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-xs font-bold border transition-all ${
                    i < step
                      ? 'bg-primary border-primary text-foreground'
                      : i === step
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'border-border text-disabled bg-surface-alt/40'
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

              {/* Connecting line aligned with badge center */}
              {i < stepLabels.length - 1 && (
                <div className="flex-1 min-w-[16px] mx-2 mb-4">
                  <div className={`h-[1px] w-full transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Right section (fixed width matching left for perfect symmetry) */}
      <div className="flex items-center justify-end w-[200px] shrink-0">
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center border border-destructive text-destructive hover:bg-destructive hover:text-foreground transition-colors"
            title="Cancel"
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
