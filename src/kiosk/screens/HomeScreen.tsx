import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Star, Zap } from 'lucide-react';
import { MOVIES } from '../types';

interface Props {
  goTo: (s: any) => void;
  updateBooking: (u: any) => void;
  resetBooking: () => void;
}

const FORMATS = ['All', 'IMAX', '4DX', '3D', 'Standard'];

export default function HomeScreen({ goTo, updateBooking, resetBooking }: Props) {
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const filtered = MOVIES.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchFormat = selectedFormat === 'All' || m.format === selectedFormat;
    return matchSearch && matchFormat;
  });

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-6 pt-6 pb-6">
        {/* Search */}
        <div className="relative mb-8">
          <Search size={28} className="absolute left-5 top-1/2 -translate-y-1/2 text-disabled" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-16 bg-surface border-2 border-border text-body-l pl-16 pr-6 text-foreground placeholder:text-disabled focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button className="flex items-center gap-3 bg-primary text-foreground px-6 h-14 text-label font-semibold">
            <Zap size={22} strokeWidth={2.5} />
            Quick Book
          </button>
          <button className="flex items-center gap-3 border-2 border-border bg-surface text-foreground px-6 h-14 text-label hover:border-primary transition-colors">
            <Clock size={22} strokeWidth={2} />
            Next Show
          </button>
        </div>

        {/* Format filter chips */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {FORMATS.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFormat(f)}
              className={`px-6 h-12 text-label font-medium border-2 shrink-0 transition-all ${selectedFormat === f
                ? 'bg-primary border-primary text-foreground'
                : 'border-border text-text-secondary hover:border-primary'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Section title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-primary" />
          <h2 className="text-h2">Now Showing</h2>
          <span className="text-body-m text-text-secondary ml-auto">{filtered.length} movies</span>
        </div>

        {/* Movie grid */}
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((movie, i) => (
            <motion.button
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                updateBooking({ movie });
                goTo('movieDetails');
              }}
              className="text-left group"
            >
              {/* Poster */}
              <div
                className="w-full aspect-[2/3] mb-3 relative overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors"
                style={{ backgroundColor: movie.posterColor }}
              >
                {movie.posterUrl && (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <Star size={18} className="text-warning mb-1" fill="currentColor" />
                  <span className="text-label text-foreground">{movie.rating}</span>
                </div>
                {/* Format badge */}
                <div className="absolute top-3 right-3 bg-primary text-foreground text-[13px] font-bold px-3 py-1">
                  {movie.format}
                </div>
              </div>
              <h3 className="text-label font-semibold leading-tight mb-1 line-clamp-2">{movie.title}</h3>
              <p className="text-[14px] text-text-secondary">{movie.genre} • {movie.duration}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
