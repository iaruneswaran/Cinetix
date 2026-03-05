import { motion } from 'framer-motion';

interface Props {
  goTo: (s: any) => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export default function LanguageScreen({ goTo }: Props) {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="text-h2 font-bold tracking-wider text-primary mb-4">CINE<span className="text-foreground">TIX</span></div>
        <h1 className="text-h1 mb-4">Select Language</h1>
        <p className="text-body-l text-text-secondary">Choose your preferred language</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-[700px]">
        {LANGUAGES.map((lang, i) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => goTo('home')}
            className="h-[160px] border-2 border-border bg-surface hover:border-primary hover:bg-surface-alt transition-all flex flex-col items-center justify-center gap-2 active:bg-primary active:border-primary"
          >
            <span className="text-h2">{lang.native}</span>
            <span className="text-body-m text-text-secondary">{lang.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
