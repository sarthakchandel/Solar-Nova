export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  image: string;
  professionalId: string;
  popular?: boolean;
}

export interface Professional {
  id: string;
  slug: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: string;
  completedJobs: number;
  verified: boolean;
  specialties: string[];
  bio: string;
  services: { id: string; name: string; price: number; duration: string }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  serviceId: string;
  proId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface Booking {
  id: string;
  service: string;
  pro: string;
  date: string;
  time: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  state?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface BookingState {
  serviceId: string | null;
  professionalId: string | null;
  date: string;
  time: string;
  address: Address;
  paymentMethod: "card" | "upi" | "cod";
  step: number;
}

export interface ServiceFilters {
  category: string;
  search: string;
  location?: string;
  minRating: number;
  maxPrice: number;
  sort: "popular" | "price-asc" | "price-desc" | "rating";
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
