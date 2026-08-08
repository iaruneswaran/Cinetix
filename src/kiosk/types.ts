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
  posterUrl: string;
  trailerId: string;
  director: string;
  cast: string[];
  synopsis: string;
  releaseDate: string;
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
  {
    id: 1,
    title: 'Michael',
    duration: '2h 35m',
    rating: 'U/A',
    language: 'English',
    format: 'IMAX 2D',
    genre: 'Biography / Music',
    posterColor: '#ff8f00',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_Michael.jpg',
    trailerId: '3zOLzsbOleM',
    director: 'Antoine Fuqua',
    cast: ['Jaafar Jackson', 'Nia Long', 'Laura Harrier', 'Colman Domingo', 'Miles Teller'],
    synopsis: 'The official biographical drama chronicling the extraordinary life, legendary music career, and complex personal journey of the King of Pop, Michael Jackson, from his early childhood rise in the Jackson 5 to global solo stardom.',
    releaseDate: 'April 2026'
  },
  {
    id: 2,
    title: 'Project Hail Mary',
    duration: '2h 40m',
    rating: 'U/A',
    language: 'English',
    format: 'IMAX 3D',
    genre: 'Sci-Fi / Adventure',
    posterColor: '#004d40',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_Project_Hail_Mary.jpg',
    trailerId: 'm08TxIsFTRI',
    director: 'Phil Lord & Christopher Miller',
    cast: ['Ryan Gosling', 'Sandra Hüller', 'Milana Vayntrub', 'James Ortiz'],
    synopsis: 'Ryland Grace, a sole surviving astronaut on a desperate interstellar space mission, must save Earth from an extinction-level event while forming an unexpected alliance with an intelligent alien engineer.',
    releaseDate: 'March 2026'
  },
  {
    id: 3,
    title: 'Spider-Man: Brand New Day',
    duration: '2h 25m',
    rating: 'U/A',
    language: 'English',
    format: 'IMAX 3D',
    genre: 'Action / Sci-Fi',
    posterColor: '#b71c1c',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_Spider-Man_Brand_New_Day.jpg',
    trailerId: '62bIsvRcPv0',
    director: 'Destin Daniel Cretton',
    cast: ['Tom Holland', 'Zendaya', 'Jacob Batalon', 'Sadie Sink', 'Jon Bernthal'],
    synopsis: 'Operating anonymously as a street-level hero in New York City after everyone forgot Peter Parker, Spider-Man faces dangerous new street syndicates and dark villainous forces threatening the city.',
    releaseDate: 'July 2026'
  },
  {
    id: 4,
    title: 'Supergirl: Woman of Tomorrow',
    duration: '2h 15m',
    rating: 'U/A',
    language: 'English',
    format: 'IMAX 3D',
    genre: 'Action / Fantasy',
    posterColor: '#3e2723',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_Supergirl.jpg',
    trailerId: 's1-pfiVMKAs',
    director: 'Craig Gillespie',
    cast: ['Milly Alcock', 'Matthias Schoenaerts', 'Eve Ridley'],
    synopsis: 'Kara Zor-El travels across the cosmos alongside Krypto the Superdog on a cosmic quest for vengeance and justice, discovering her true strength and destiny as the Woman of Tomorrow.',
    releaseDate: 'June 2026'
  },
  {
    id: 5,
    title: 'The End of Oak Street',
    duration: '2h 10m',
    rating: 'A',
    language: 'English',
    format: 'Standard',
    genre: 'Mystery / Thriller',
    posterColor: '#212121',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_The_End_of_Oak_Street.jpg',
    trailerId: '3oB9AxspVow',
    director: 'David Lynch',
    cast: ['Oscar Isaac', 'Florence Pugh', 'Willem Dafoe', 'Paul Dano'],
    synopsis: 'In a quiet suburban town, a series of mysterious events at the end of Oak Street unveils decades of dark secrets, psychological twists, and surreal truths buried deep beneath the surface.',
    releaseDate: 'October 2026'
  },
  {
    id: 6,
    title: 'The Odyssey',
    duration: '3h 15m',
    rating: 'U/A',
    language: 'English',
    format: 'IMAX 70MM',
    genre: 'Epic / Drama',
    posterColor: '#1a1a1a',
    posterUrl: '/assets/IMAX_Exclusive_Artwork_The_Odyssey.jpg',
    trailerId: 'JLEDwlSZcAI',
    director: 'Christopher Nolan',
    cast: ['Ralph Fiennes', 'Cillian Murphy', 'Florence Pugh', 'Tom Hardy', 'Javier Bardem'],
    synopsis: 'Christopher Nolan\'s epic cinematic adaptation of Homer\'s ancient Greek myth. Odysseus embarks on a decade-long voyage home after the fall of Troy, battling mythological monsters and gods.',
    releaseDate: 'December 2026'
  },
];

export const SHOWTIMES: Showtime[] = [
  { time: '10:30 AM', format: 'IMAX', screen: 'Screen 1', price: 350, availability: 'available' },
  { time: '1:45 PM', format: 'IMAX', screen: 'Screen 1', price: 400, availability: 'fast-filling' },
  { time: '4:30 PM', format: '4DX', screen: 'Screen 3', price: 500, availability: 'available' },
  { time: '7:15 PM', format: 'IMAX', screen: 'Screen 1', price: 450, availability: 'almost-full' },
  { time: '10:00 PM', format: 'Standard', screen: 'Screen 5', price: 250, availability: 'available' },
];

export const ADDONS: Addon[] = [
  { id: 1, title: 'Classic Combo', description: 'Large Popcorn + 2 Cokes', price: 399, image: 'combo', isCombo: true, savings: 'Save 20%' },
  { id: 2, title: 'Premium Combo', description: 'Cheese Popcorn + 2 Drinks + Nachos', price: 599, image: 'combo', isCombo: true, savings: 'Save 25%' },
  { id: 3, title: 'Large Popcorn', description: 'Butter / Caramel / Cheese', price: 280, image: 'popcorn', isCombo: false },
  { id: 4, title: 'Cold Drink', description: 'Coke / Sprite / Fanta 500ml', price: 150, image: 'drink', isCombo: false },
  { id: 5, title: 'Nachos', description: 'With salsa & cheese dip', price: 220, image: 'snack', isCombo: false },
  { id: 6, title: 'Hot Dog', description: 'Classic with mustard', price: 180, image: 'snack', isCombo: false },
];

export function generateSeats(): Seat[] {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'];
  const seats: Seat[] = [];
  const bookedSeats = new Set([
    'A5', 'A6', 'B3', 'B4', 'B12', 'B13', 'C7', 'C8', 'C9', 'D5', 'D6', 'D14', 'D15',
    'E2', 'E3', 'E8', 'E9', 'F10', 'F11', 'F12', 'G6', 'G7', 'G15', 'H1', 'H2', 'H8', 'H9',
    'J4', 'J5', 'J10', 'J11', 'K3', 'K4', 'L7', 'L8', 'M5', 'M6', 'N9', 'N10'
  ]);

  for (const row of rows) {
    const isVIP = row >= 'L';
    const isGold = row >= 'F' && row <= 'K';
    for (let col = 1; col <= 18; col++) {
      const key = `${row}${col}`;
      const isBooked = bookedSeats.has(key);
      seats.push({
        row,
        col,
        status: isBooked ? 'booked' : 'available',
        price: isVIP ? 500 : isGold ? 350 : 250,
        category: isVIP ? 'VIP' : isGold ? 'Gold' : 'Silver',
      });
    }
  }
  return seats;
}
