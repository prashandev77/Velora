export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
}

export interface Package {
  id: string;
  slug: string;
  category: 'luxury' | 'honeymoon' | 'wellness' | 'adventure';
  title: string;
  location: string;
  days: number;
  image_url: string;
  itinerary: ItineraryDay[];
  description?: string;
  tag?: string;
  highlights?: string[];
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
}
