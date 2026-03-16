// ─── User & Auth ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  notifications?: { email: boolean; sms: boolean };
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ─── Destination ─────────────────────────────────────────────────────────────

export interface Destination {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews?: number;
  category: 'hotel' | 'restaurant' | 'attraction' | 'ride' | 'guide';
  amenities: string[];
  safetyRating: number;
  womenFriendly: boolean;
  safetyFeatures?: string[];
  featured?: boolean;
  createdAt?: string;
}

export interface DestinationState {
  destinations: Destination[];
  featuredHotels: Destination[];
  featuredRestaurants: Destination[];
  featuredAttractions: Destination[];
  selectedDestination: Destination | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    search: string;
    womenFriendly: boolean;
    minPrice: number | null;
    maxPrice: number | null;
    sort: string;
  };
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface Booking {
  _id?: string;
  id?: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'ride' | 'guide' | 'vehicle';
  itemId?: string;
  itemName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  guests?: number;
  destination?: Destination;
}

// ─── Legacy mock types ────────────────────────────────────────────────────────

export interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  originalPrice?: number;
  reviews: number;
  amenities: string[];
  description: string;
  rooms: Room[];
  safetyRating: number;
  womenFriendly: boolean;
  safetyFeatures: string[];
}

export interface Room {
  id: string;
  type: string;
  price: number;
  features: string[];
  available: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  cuisine: string;
  priceRange: string;
  reviews: number;
  description: string;
  features: string[];
  safetyRating: number;
  womenFriendly: boolean;
  safetyFeatures: string[];
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  category: string;
  reviews: number;
  description: string;
  duration: string;
  safetyRating: number;
  womenFriendly: boolean;
  safetyFeatures: string[];
}

export interface Vehicle {
  id: string;
  type: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  capacity: number;
  features: string[];
  description: string;
  safetyRating: number;
  womenFriendly: boolean;
  safetyFeatures: string[];
  driverVerified: boolean;
  gpsTracking: boolean;
}

export interface Guide {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  languages: string[];
  experience: number;
  specialties: string[];
  reviews: number;
  description: string;
  safetyRating: number;
  womenFriendly: boolean;
  verified: boolean;
  backgroundChecked: boolean;
  emergencyContact: boolean;
  groupToursOnly?: boolean;
}

export type BookingCategory = 'all' | 'hotels' | 'restaurants' | 'attractions' | 'rides' | 'guides';

export interface SafetyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}
