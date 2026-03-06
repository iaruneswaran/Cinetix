import { motion } from 'framer-motion';
import { Clock, Star, Film, Globe, Play } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function MovieDetailsScreen({ booking, goTo, goBack, resetBooking }: Props) {
  const movie = booking.movie;
  if (!movie) return null;

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto">
        {/* Hero poster area */}
        <div className="relative h-[700px] overflow-hidden" style={{ backgroundColor: movie.posterColor }}>
          {movie.posterUrl && (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Play trailer button */}
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-foreground flex items-center justify-center bg-background/40 hover:bg-primary transition-colors">
            <Play size={40} strokeWidth={2} fill="currentColor" />
          </button>

          {/* Movie info overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-h1 mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 text-body-m text-text-secondary">
                  <Clock size={22} strokeWidth={2} />
                  {movie.duration}
                </div>
                <div className="flex items-center gap-2 text-body-m text-text-secondary">
                  <Star size={22} strokeWidth={2} className="text-warning" fill="currentColor" />
                  {movie.rating}
                </div>
                <div className="flex items-center gap-2 text-body-m text-text-secondary">
                  <Globe size={22} strokeWidth={2} />
                  {movie.language}
                </div>
                <div className="flex items-center gap-2 text-body-m text-text-secondary">
                  <Film size={22} strokeWidth={2} />
                  {movie.format}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-primary text-foreground text-label font-semibold">{movie.format}</span>
                <span className="px-4 py-2 border-2 border-border text-foreground text-label">{movie.genre}</span>
                <span className="px-4 py-2 border-2 border-border text-text-secondary text-label">{movie.language}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="px-8 py-8">
          <h2 className="text-h3 mb-4">Synopsis</h2>
          <p className="text-body-m text-text-secondary leading-relaxed">
            An epic cinematic experience that pushes the boundaries of storytelling.
            Witness breathtaking visuals and an unforgettable narrative that will keep you
            on the edge of your seat from start to finish.
          </p>

          <div className="mt-8 p-6 bg-surface border-2 border-border">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-label text-text-secondary block mb-1">Director</span>
                <span className="text-body-m">Christopher Nolan</span>
              </div>
              <div>
                <span className="text-label text-text-secondary block mb-1">Cast</span>
                <span className="text-body-m">Multiple Stars</span>
              </div>
              <div>
                <span className="text-label text-text-secondary block mb-1">Release</span>
                <span className="text-body-m">March 2026</span>
              </div>
              <div>
                <span className="text-label text-text-secondary block mb-1">Certificate</span>
                <span className="text-body-m">{movie.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <KioskFooter
        ctaLabel="Book Tickets"
        onCta={() => goTo('dateTime')}
        leftContent={
          <div>
            <span className="text-body-s text-text-secondary">Starting from</span>
            <span className="text-h3 text-foreground ml-3">₹250</span>
          </div>
        }
      />
    </div>
  );
}
