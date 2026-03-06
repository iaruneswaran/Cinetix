import { ArrowLeft, X, Globe } from 'lucide-react';
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
    <div className="h-[100px] bg-surface border-b-2 border-border flex items-center px-6 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4 w-[200px]">
        {onBack && (
          <button
            onClick={onBack}
            className="w-16 h-16 flex items-center justify-center border-2 border-border hover:border-primary transition-colors"
          >
            <ArrowLeft size={28} strokeWidth={2} />
          </button>
        )}
        <div className="text-h3 font-bold tracking-wider text-primary">CINE<span className="text-foreground">TIX</span></div>
      </div>

      {/* Center: stepper */}
      {showStepper && step !== undefined && (
        <div className="flex-1 flex items-center justify-center gap-1">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-label font-bold border-2 transition-colors ${i < step ? 'bg-primary border-primary text-foreground' :
                      i === step ? 'border-primary text-primary' :
                        'border-border text-disabled'
                    }`}
                >
                  {i + 1}
                </div>
                <span className={`text-[11px] mt-1 ${i <= step ? 'text-foreground' : 'text-disabled'}`}>
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`w-8 h-[2px] mx-1 mt-[-16px] ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-3 w-[200px] justify-end ml-auto">
        <button className="w-12 h-12 flex items-center justify-center border-2 border-border hover:border-primary transition-colors">
          <Globe size={24} strokeWidth={2} />
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-12 h-12 flex items-center justify-center border-2 border-destructive text-destructive hover:bg-destructive hover:text-foreground transition-colors"
          >
            <X size={24} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
