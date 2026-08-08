import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Film, Globe, Volume2, VolumeX } from 'lucide-react';
import KioskFooter from '../components/KioskFooter';

interface Props {
  booking: any;
  goTo: (s: any) => void;
  goBack: () => void;
  resetBooking: () => void;
}

export default function MovieDetailsScreen({ booking, goTo, goBack, resetBooking }: Props) {
  const movie = booking.movie;
  const [isMuted, setIsMuted] = useState(true);

  if (!movie) return null;

  // YouTube trailer ID for Sisu: Road to Revenge (https://www.youtube.com/watch?v=VmStqCXIgio)
  const videoId = movie.trailerId || 'VmStqCXIgio';

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto pb-6">
        {/* Auto-playing Background Trailer (Full Width & Cover Cropped) */}
        <div className="relative w-full h-[380px] bg-black overflow-hidden border-b border-border">
          {/* Full-width Cover Video Wrapper */}
          <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100%] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0 pointer-events-none scale-105"
            />
          </div>

          {/* Gradient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20 pointer-events-none z-10" />

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-primary text-foreground border border-border px-3 py-1.5 flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-colors"
          >
            {isMuted ? <VolumeX size={16} strokeWidth={2} /> : <Volume2 size={16} strokeWidth={2} />}
            <span>{isMuted ? 'UNMUTE SOUND' : 'MUTE SOUND'}</span>
          </button>

          {/* Movie info overlay on top of playing trailer */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-bold mb-2 drop-shadow-md">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mb-3">
                <div className="flex items-center gap-1.5 bg-background/60 px-2 py-1 border border-border/50">
                  <Clock size={16} strokeWidth={2} />
                  {movie.duration}
                </div>
                <div className="flex items-center gap-1.5 bg-background/60 px-2 py-1 border border-border/50">
                  <Star size={16} strokeWidth={2} className="text-warning" fill="currentColor" />
                  {movie.rating}
                </div>
                <div className="flex items-center gap-1.5 bg-background/60 px-2 py-1 border border-border/50">
                  <Globe size={16} strokeWidth={2} />
                  {movie.language}
                </div>
                <div className="flex items-center gap-1.5 bg-background/60 px-2 py-1 border border-border/50">
                  <Film size={16} strokeWidth={2} />
                  {movie.format}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary text-foreground text-[11px] font-semibold">{movie.format}</span>
                <span className="px-3 py-1 border border-border bg-background/80 text-foreground text-[11px] font-medium">{movie.genre}</span>
                <span className="px-3 py-1 border border-border bg-background/80 text-text-secondary text-[11px] font-medium">{movie.language}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Synopsis & details */}
        <div className="px-6 py-6 max-w-[900px]">
          <h2 className="text-base font-bold mb-2">Synopsis</h2>
          <p className="text-xs text-text-secondary leading-relaxed mb-6">
            {movie.synopsis || "An epic cinematic experience that pushes the boundaries of storytelling."}
          </p>

          <div className="p-4 bg-surface border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-text-secondary block mb-0.5">Director</span>
                <span className="font-semibold">{movie.director || 'Christopher Nolan'}</span>
              </div>
              <div>
                <span className="text-text-secondary block mb-0.5">Cast</span>
                <span className="font-semibold">{Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast || 'Starring Cast'}</span>
              </div>
              <div>
                <span className="text-text-secondary block mb-0.5">Release</span>
                <span className="font-semibold">{movie.releaseDate || '2026'}</span>
              </div>
              <div>
                <span className="text-text-secondary block mb-0.5">Certificate</span>
                <span className="font-semibold">{movie.rating}</span>
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
            <span className="text-xs text-text-secondary block">Starting from</span>
            <span className="text-sm font-bold text-foreground">₹250</span>
          </div>
        }
      />
    </div>
  );
}
