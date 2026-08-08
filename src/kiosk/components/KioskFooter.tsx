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
    <div className="h-[64px] bg-surface border-t border-border flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1 min-w-0">
        {leftContent}
      </div>
      {centerContent && (
        <div className="text-body-s text-text-secondary text-center">
          {centerContent}
        </div>
      )}
      <button
        onClick={onCta}
        disabled={ctaDisabled}
        className={`h-10 px-6 flex items-center gap-2 text-sm font-semibold transition-all shrink-0 ${
          ctaDisabled
            ? 'bg-border text-disabled cursor-not-allowed'
            : 'bg-primary text-foreground hover:bg-primary-hover active:bg-primary-pressed active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]'
        }`}
      >
        {ctaLabel}
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
