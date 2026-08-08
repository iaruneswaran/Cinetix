import { ChevronRight } from 'lucide-react';

interface Props {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
}

export default function KioskFooter({ leftContent, centerContent, ctaLabel, onCta, ctaDisabled = false }: Props) {
  return (
    <div className="h-[60px] sm:h-[64px] bg-surface border-t border-border flex items-center px-3 sm:px-6 gap-2 sm:gap-4 shrink-0 select-none">
      <div className="flex-1 min-w-0">
        {leftContent}
      </div>
      {centerContent && (
        <div className="hidden sm:block text-xs text-text-secondary text-center truncate">
          {centerContent}
        </div>
      )}
      <button
        onClick={onCta}
        disabled={ctaDisabled}
        className={`h-10 px-3.5 sm:px-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold transition-all shrink-0 active:scale-95 ${
          ctaDisabled
            ? 'bg-border text-disabled cursor-not-allowed'
            : 'bg-primary text-foreground hover:bg-primary-hover active:bg-primary-pressed'
        }`}
      >
        <span>{ctaLabel}</span>
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
