export type KioskScreen =
  | 'attract'
  | 'language'
  | 'home'
  | 'movieDetails'
  | 'dateTime'
  | 'seatCount'
  | 'seatSelection'
  | 'addons'
  | 'review'
  | 'contact'
  | 'payment'
  | 'paymentUPI'
  | 'paymentCard'
  | 'processing'
  | 'success'
  | 'failure'
  | 'timeout';

export interface Movie {
  id: number;
  title: string;
  duration: string;
  rating: string;
  language: string;
  format: string;
  genre: string;
  posterColor: string;
  posterUrl?: string;
}

export interface Showtime {
  time: string;
  format: string;
  screen: string;
  price: number;
  availability: 'available' | 'fast-filling' | 'almost-full';
}

export interface Seat {
  row: string;
  col: number;
  status: 'available' | 'selected' | 'booked' | 'premium' | 'accessible';
  price: number;
  category: string;
}

export interface Addon {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isCombo: boolean;
  savings?: string;
}

export interface BookingState {
  movie: Movie | null;
  date: string;
  showtime: Showtime | null;
  seatCount: number;
  seats: Seat[];
  addons: { addon: Addon; qty: number }[];
  promoCode: string;
  contactPhone: string;
  contactEmail: string;
  paymentMethod: string;
  orderId: string;
  total: number;
}

export const MOVIES: Movie[] = [
  { id: 1, title: 'Sisu: Road to Revenge', duration: '1h 31m', rating: 'A', language: 'English', format: 'Standard', genre: 'Action', posterColor: '#1a1a1a', posterUrl: '/assets/sisu-road-to-revenge.jpg' },
  { id: 2, title: 'Avatar 3: Fire and Ash', duration: '3h 10m', rating: 'U/A', language: 'English', format: '3D', genre: 'Sci-Fi', posterColor: '#004d40', posterUrl: '/assets/avatar-3-fire-and-ash.jpg' },
  { id: 3, title: 'Formula 1', duration: '2h 15m', rating: 'U/A', language: 'English', format: 'IMAX', genre: 'Drama', posterColor: '#b71c1c', posterUrl: '/assets/formula-1.jpg' },
  { id: 4, title: 'Kraven the Hunter', duration: '2h 10m', rating: 'A', language: 'English', format: 'Standard', genre: 'Action', posterColor: '#3e2723', posterUrl: '/assets/kraven-the-hunter.jpg' },
  { id: 5, title: 'John Wick', duration: '1h 41m', rating: 'A', language: 'English', format: 'Standard', genre: 'Action', posterColor: '#212121', posterUrl: '/assets/john-wick.jpg' },
  { id: 6, title: 'Michael', duration: '2h 35m', rating: 'U/A', language: 'English', format: 'IMAX', genre: 'Biography', posterColor: '#ff8f00', posterUrl: '/assets/michael.jpg' },
];

export const SHOWTIMES: Showtime[] = [
  { time: '10:30 AM', format: 'IMAX', screen: 'Screen 1', price: 350, availability: 'available' },
  { time: '1:45 PM', format: 'IMAX', screen: 'Screen 1', price: 400, availability: 'fast-filling' },
  { time: '4:30 PM', format: '4DX', screen: 'Screen 3', price: 500, availability: 'available' },
  { time: '7:15 PM', format: 'IMAX', screen: 'Screen 1', price: 450, availability: 'almost-full' },
  { time: '10:00 PM', format: 'Standard', screen: 'Screen 5', price: 250, availability: 'available' },
];

export const ADDONS: Addon[] = [
  { id: 1, title: 'Classic Combo', description: 'Large Popcorn + 2 Cokes', price: 399, image: '🍿', isCombo: true, savings: 'Save 20%' },
  { id: 2, title: 'Premium Combo', description: 'Cheese Popcorn + 2 Drinks + Nachos', price: 599, image: '🎬', isCombo: true, savings: 'Save 25%' },
  { id: 3, title: 'Large Popcorn', description: 'Butter / Caramel / Cheese', price: 280, image: '🍿', isCombo: false },
  { id: 4, title: 'Cold Drink', description: 'Coke / Sprite / Fanta 500ml', price: 150, image: '🥤', isCombo: false },
  { id: 5, title: 'Nachos', description: 'With salsa & cheese dip', price: 220, image: '🧀', isCombo: false },
  { id: 6, title: 'Hot Dog', description: 'Classic with mustard', price: 180, image: '🌭', isCombo: false },
];

export function generateSeats(): Seat[] {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seats: Seat[] = [];
  const bookedSeats = new Set(['B3', 'B4', 'C7', 'C8', 'D5', 'E2', 'E3', 'F10', 'G6', 'G7', 'H1', 'H2', 'H8', 'J4', 'J5', 'K3']);

  for (const row of rows) {
    const isPremium = row >= 'H';
    const isAccessible = row === 'A';
    for (let col = 1; col <= 14; col++) {
      const key = `${row}${col}`;
      const isBooked = bookedSeats.has(key);
      seats.push({
        row,
        col,
        status: isBooked ? 'booked' : isAccessible ? 'accessible' : isPremium ? 'premium' : 'available',
        price: isPremium ? 450 : 300,
        category: isPremium ? 'Gold' : 'Silver',
      });
    }
  }
  return seats;
}
