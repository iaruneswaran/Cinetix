import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Star, Zap, MapPin, Building2, ChevronDown, Check, X } from 'lucide-react';
import { MOVIES } from '../types';
import { toast } from 'sonner';

interface Props {
  goTo: (s: any) => void;
  updateBooking: (u: any) => void;
  resetBooking: () => void;
}

const FORMATS = ['All', 'IMAX', '4DX', '3D', 'Standard'];

const CITIES_DATA = [
  { name: 'Chennai', tag: 'Phoenix / VR Mall' },
  { name: 'Bengaluru', tag: 'Orion / Forum' },
  { name: 'Mumbai', tag: 'Palladium / Bandra' },
  { name: 'Delhi NCR', tag: 'Select Citywalk' },
  { name: 'Hyderabad', tag: 'Hitech City / Forum' },
  { name: 'Kochi', tag: 'Lulu Mall Edappally' },
];

const THEATERS: Record<string, string[]> = {
  'Chennai': ['CINETIX Phoenix Marketcity', 'CINETIX Express Avenue', 'CINETIX Forum Vijaya Mall', 'CINETIX VR Mall'],
  'Bengaluru': ['CINETIX Nexus Forum Mall', 'CINETIX Phoenix Marketcity', 'CINETIX Mantri Square', 'CINETIX Orion Mall'],
  'Mumbai': ['CINETIX High Street Phoenix', 'CINETIX R-City Mall', 'CINETIX Infiniti Malad', 'CINETIX Jio World'],
  'Delhi NCR': ['CINETIX Select CITYWALK', 'CINETIX DLF Mall of India', 'CINETIX Ambience Mall', 'CINETIX Pacific Mall'],
  'Hyderabad': ['CINETIX Inorbit Mall', 'CINETIX Forum Sujana Mall', 'CINETIX Sarath City Capital'],
  'Kochi': ['CINETIX Lulu Mall', 'CINETIX Centre Square Mall', 'CINETIX Forum Mall'],
};

const THEATER_DETAILS: Record<string, { address: string; formats: string[]; features: string[] }> = {
  'CINETIX Phoenix Marketcity': { address: 'Velachery Main Road, Velachery', formats: ['IMAX 4K', '4DX', '3D', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'LUXE Recliners'] },
  'CINETIX Express Avenue': { address: 'Whites Road, Royapettah', formats: ['IMAX 4K', '3D', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Forum Vijaya Mall': { address: 'Arcot Road, Vadapalani', formats: ['4DX', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX VR Mall': { address: 'Inner Ring Road, Anna Nagar', formats: ['IMAX 4K', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX Nexus Forum Mall': { address: 'Koramangala, Bengaluru', formats: ['IMAX 4K', '4DX', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX Mantri Square': { address: 'Sampige Road, Malleshwaram', formats: ['IMAX 4K', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Orion Mall': { address: 'Dr Rajkumar Road, Rajajinagar', formats: ['4DX', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX High Street Phoenix': { address: 'Lower Parel, Mumbai', formats: ['IMAX 4K', '4DX', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'LUXE Recliners'] },
  'CINETIX R-City Mall': { address: 'LBS Marg, Ghatkopar West', formats: ['IMAX 4K', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Infiniti Malad': { address: 'New Link Road, Malad West', formats: ['4DX', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Jio World': { address: 'Bandra Kurla Complex, Mumbai', formats: ['IMAX 4K', 'Dolby Cinema', 'LUXE'], features: ['M-Ticket', 'F&B Service', 'VIP Lounge'] },
  'CINETIX Select CITYWALK': { address: 'Saket District Centre, New Delhi', formats: ['IMAX 4K', '4DX', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX DLF Mall of India': { address: 'Sector 18, Noida', formats: ['IMAX 4K', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Ambience Mall': { address: 'NH 8, Gurugram', formats: ['4DX', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Pacific Mall': { address: 'Subhash Nagar, New Delhi', formats: ['IMAX 4K', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Inorbit Mall': { address: 'Hitech City, Hyderabad', formats: ['IMAX 4K', '4DX', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX Forum Sujana Mall': { address: 'Kukatpally, Hyderabad', formats: ['4DX', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Sarath City Capital': { address: 'Gachibowli, Hyderabad', formats: ['IMAX 4K', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
  'CINETIX Lulu Mall': { address: 'NH 47 Bypass, Edappally, Kochi', formats: ['IMAX 4K', '4DX', 'Dolby Atmos'], features: ['M-Ticket', 'F&B Service', 'LUXE Recliners'] },
  'CINETIX Centre Square Mall': { address: 'MG Road, Kochi', formats: ['3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] },
  'CINETIX Forum Mall': { address: 'Maradu, Kochi', formats: ['4DX', '3D', 'LUXE'], features: ['M-Ticket', 'F&B Service', 'Recliners'] },
};

export default function HomeScreen({ goTo, updateBooking, resetBooking }: Props) {
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [selectedTheater, setSelectedTheater] = useState('CINETIX Phoenix Marketcity');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTheaterModal, setShowTheaterModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [theaterSearch, setTheaterSearch] = useState('');

  const filtered = MOVIES.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchFormat = selectedFormat === 'All' || m.format === selectedFormat;
    return matchSearch && matchFormat;
  });

  return (
    <div className="w-full h-full bg-background flex flex-col">

      <div className="flex-1 overflow-auto px-6 pt-5 pb-6">
        {/* Location & Theater Selector Bar (Unwrapped) */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {/* Location Selector Button */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-2 px-3.5 h-9 bg-surface border border-border hover:border-primary transition-colors text-xs font-semibold"
          >
            <MapPin size={15} className="text-primary" />
            <span className="text-foreground">{selectedCity}</span>
            <ChevronDown size={14} className="text-text-secondary ml-1" />
          </button>

          {/* Theater Selector Button */}
          <button
            onClick={() => setShowTheaterModal(true)}
            className="flex items-center gap-2 px-3.5 h-9 bg-surface border border-border hover:border-primary transition-colors text-xs font-semibold flex-1 min-w-[220px]"
          >
            <Building2 size={15} className="text-primary shrink-0" />
            <span className="text-foreground truncate">{selectedTheater}</span>
            <ChevronDown size={14} className="text-text-secondary ml-auto shrink-0" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 bg-surface border border-border pl-10 pr-4 text-xs text-foreground placeholder:text-disabled focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Format Filter Bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {FORMATS.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFormat(f)}
              className={`px-4 h-8 text-xs font-medium border transition-all shrink-0 ${
                selectedFormat === f
                  ? 'bg-primary border-primary text-foreground'
                  : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Now Showing Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-[19px] bg-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Now Showing</h2>
          </div>
          <span className="text-xs text-text-secondary font-medium">
            {filtered.length} Movies
          </span>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              {/* Poster with 1px red stroke */}
              <div
                className="w-full aspect-[2/3] mb-2.5 relative overflow-hidden border border-primary transition-colors"
                style={{ backgroundColor: movie.posterColor }}
              >
                {movie.posterUrl && (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1">
                  <Star size={14} className="text-warning" fill="currentColor" />
                  <span className="text-xs font-medium text-foreground">{movie.rating}</span>
                </div>
                {/* Format badge */}
                <div className="absolute top-2.5 right-2.5 bg-primary text-foreground text-[11px] font-bold px-2 py-0.5">
                  {movie.format}
                </div>
              </div>
              <h3 className="text-sm font-semibold leading-snug mb-0.5 line-clamp-2">{movie.title}</h3>
              <p className="text-xs text-text-secondary">{movie.genre} • {movie.duration}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Location / City Selection Modal (BookMyShow Style) */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-surface border border-border p-8 max-w-[800px] w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-border">
              <div className="flex items-center gap-3">
                <MapPin size={22} className="text-primary" />
                <div>
                  <h3 className="text-lg font-bold">Select Your City</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Detecting location or select popular cities</p>
                </div>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-background border border-border transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* City Search Bar */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-disabled" />
              <input
                type="text"
                placeholder="Search for your city..."
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                className="w-full h-11 bg-background border border-border pl-11 pr-4 text-xs text-foreground placeholder:text-disabled focus:border-primary focus:outline-none"
              />
            </div>

            {/* Popular Cities Section */}
            <div>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-4">Popular Cities</span>
              <div className="grid grid-cols-3 gap-4">
                {CITIES_DATA.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase())).map(city => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setSelectedTheater(THEATERS[city.name][0]);
                      setShowLocationModal(false);
                      toast.success(`Location set to ${city.name}`);
                    }}
                    className={`p-4 text-left border flex flex-col justify-between h-[82px] transition-all group ${
                      selectedCity === city.name
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'border-border bg-background hover:border-primary hover:bg-surface-alt/50 text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-bold">{city.name}</span>
                      {selectedCity === city.name && <Check size={16} className="text-primary" />}
                    </div>
                    <span className="text-xs text-text-secondary/70 truncate">{city.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theater Selection Modal (BookMyShow Style) */}
      {showTheaterModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-surface border border-border p-8 max-w-[800px] w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-border">
              <div className="flex items-center gap-3">
                <Building2 size={22} className="text-primary" />
                <div>
                  <h3 className="text-lg font-bold">Select Theater in {selectedCity}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Multiplexes, screen formats, and available facilities</p>
                </div>
              </div>
              <button
                onClick={() => setShowTheaterModal(false)}
                className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-background border border-border transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Theater Search Bar */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-disabled" />
              <input
                type="text"
                placeholder={`Search for theaters in ${selectedCity}...`}
                value={theaterSearch}
                onChange={e => setTheaterSearch(e.target.value)}
                className="w-full h-11 bg-background border border-border pl-11 pr-4 text-xs text-foreground placeholder:text-disabled focus:border-primary focus:outline-none"
              />
            </div>

            {/* Theater List Section */}
            <div className="max-h-[360px] overflow-auto pr-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-4">Multiplexes ({selectedCity})</span>
              <div className="flex flex-col gap-3">
                {(THEATERS[selectedCity] || [])
                  .filter(th => th.toLowerCase().includes(theaterSearch.toLowerCase()))
                  .map(th => {
                    const info = THEATER_DETAILS[th] || { address: `${selectedCity} City Center`, formats: ['IMAX', '3D', 'Standard'], features: ['M-Ticket', 'F&B Service'] };
                    return (
                      <button
                        key={th}
                        onClick={() => {
                          setSelectedTheater(th);
                          setShowTheaterModal(false);
                          toast.success(`Theater set to ${th}`);
                        }}
                        className={`p-4 text-left border flex items-center justify-between transition-all group ${
                          selectedTheater === th
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'border-border bg-background hover:border-primary hover:bg-surface-alt/50 text-text-secondary hover:text-foreground'
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{th}</span>
                            {selectedTheater === th && <Check size={16} className="text-primary" />}
                          </div>
                          <span className="text-xs text-text-secondary/80">{info.address}</span>
                          
                          {/* Format and facility badges */}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {info.formats.map(f => (
                              <span key={f} className="px-2 py-0.5 border border-primary/40 bg-primary/10 text-primary text-[10px] font-bold">
                                {f}
                              </span>
                            ))}
                            {info.features.map(feat => (
                              <span key={feat} className="px-2 py-0.5 border border-border bg-surface text-text-secondary text-[10px] font-medium">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="px-3 py-1.5 border border-border bg-surface hover:border-primary text-xs font-semibold text-foreground">
                            {selectedTheater === th ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
