export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
}

export interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface Package {
  id: string;
  slug: string;
  category: 'luxury' | 'honeymoon' | 'wellness' | 'adventure';
  title: string;
  location: string;
  days: number;
  /** Whole AUD; shown as “From AUD …” on journey detail. */
  priceFromAud?: number | null;
  image_url: string;
  itinerary: ItineraryDay[];
  description?: string;
  tag?: string;
  highlights?: string[];
  subtitle?: string;
  travelStyle?: string;
  route?: string[];
  routeCoords?: RoutePoint[];
  whySpecial?: string[];
  perfectFor?: string[];
  accommodation?: string;
  included?: string[];
  notIncluded?: string[];
  galleryImages?: string[];
}


export interface Booking {
  id: string;
  user_id: string;
  package_id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  travel_date: string;
  guest_count: number;
  special_requests?: string;
  guest_names?: string[];
}

export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  travelStyle?: string;
  priceFromAud?: number;
}

export type GuideBlock =
  | { type: 'hero'; image: string; title: string; subtitle?: string; author?: string }
  | { type: 'rich-text'; html: string }
  | { type: 'gallery'; layout: '1-up' | '2-up' | '3-up'; images: { url: string; caption?: string }[] }
  | { type: 'related-links'; links: { title: string; url: string; description?: string }[] };
