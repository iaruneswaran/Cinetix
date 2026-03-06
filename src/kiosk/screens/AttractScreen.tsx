import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MOVIES } from '../types';

interface Props {
  goTo: (s: any) => void;
}

// Preload all movie poster images at module load time
const preloadedImages: HTMLImageElement[] = [];
MOVIES.forEach(movie => {
  if (movie.posterUrl) {
    const img = new Image();
    img.src = movie.posterUrl;
    preloadedImages.push(img);
  }
});

export default function AttractScreen({ goTo }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % MOVIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const movie = MOVIES[current];

  return (
    <div
      className="w-full h-full relative overflow-hidden cursor-pointer"
      onClick={() => goTo('language')}
    >
      {/* Background poster simulation */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{ backgroundColor: movie.posterColor }}
      >
        {movie.posterUrl && (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Animated red line accents */}
      <div className="absolute top-[400px] left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="h-full bg-primary w-[300px]"
          animate={{ x: [-300, 1380] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="absolute top-[1200px] left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="h-full bg-primary w-[200px]"
          animate={{ x: [1080, -200] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-12 pb-24">
        {/* Movie info */}
        <motion.div
          key={`info-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-2 border-2 border-primary text-primary text-label">{movie.format}</span>
            <span className="px-4 py-2 border-2 border-border text-text-secondary text-label">{movie.language}</span>
            <span className="px-4 py-2 border-2 border-border text-text-secondary text-label">{movie.rating}</span>
          </div>
          <h1 className="text-display leading-tight mb-4">{movie.title}</h1>
          <p className="text-body-l text-text-secondary mb-6">{movie.genre} • {movie.duration}</p>
        </motion.div>

        {/* Now Showing label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-3 h-3 bg-primary" />
          <span className="text-label text-text-secondary tracking-[4px] uppercase">Now Showing</span>
        </div>

        {/* Dots */}
        <div className="flex gap-3 mb-16">
          {MOVIES.map((_, i) => (
            <div
              key={i}
              className={`h-[4px] transition-all duration-300 ${i === current ? 'w-12 bg-primary' : 'w-4 bg-border'
                }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="bg-primary text-foreground text-button-l py-6 px-16 inline-block">
            TAP ANYWHERE TO START
          </div>
        </motion.div>
      </div>

      {/* Brand */}
      <div className="absolute top-12 left-12">
        <span className="text-h2 font-bold tracking-wider text-primary">CINE<span className="text-foreground">TIX</span></span>
      </div>
    </div>
  );
}
