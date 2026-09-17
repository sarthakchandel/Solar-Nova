import type { Booking, Category, Professional, Review, Service, Testimonial } from "@/types";

export const categories: Category[] = [
  { id: "insta-help", name: "Insta Help", icon: "Zap", count: 24 },
  { id: "ac-appliance", name: "AC & Appliance Repair", icon: "Wind", count: 32 },
  { id: "trades", name: "Electrician, Plumber & Carpenter", icon: "Wrench", count: 48 },
  { id: "maid-help", name: "Maid Help", icon: "Sparkles", count: 36 },
];

export const services: Service[] = [
  {
    id: "s1",
    slug: "quick-errands",
    title: "Quick Errands",
    description: "On-demand help for groceries, pickups, and small tasks within 60 minutes.",
    categoryId: "insta-help",
    categoryName: "Insta Help",
    price: 299,
    duration: "1 hr",
    rating: 4.8,
    reviewCount: 1820,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    professionalId: "p1",
    popular: true,
  },
  {
    id: "s2",
    slug: "same-day-assistance",
    title: "Same-Day Assistance",
    description: "Instant support for urgent household needs — available today.",
    categoryId: "insta-help",
    categoryName: "Insta Help",
    price: 399,
    duration: "2 hrs",
    rating: 4.9,
    reviewCount: 940,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    professionalId: "p1",
    popular: true,
  },
  {
    id: "s3",
    slug: "ac-service-repair",
    title: "AC Service & Repair",
    description: "Complete AC servicing with gas check, filter cleaning, and cooling optimization.",
    categoryId: "ac-appliance",
    categoryName: "AC & Appliance Repair",
    price: 599,
    duration: "1 hr",
    rating: 4.7,
    reviewCount: 1560,
    image: "https://images.unsplash.com/photo-1631545806609-65c90e1f2f52?w=600&h=400&fit=crop",
    professionalId: "p2",
    popular: true,
  },
  {
    id: "s4",
    slug: "appliance-repair",
    title: "Appliance Repair",
    description: "Repair for washing machines, refrigerators, microwaves, and home appliances.",
    categoryId: "ac-appliance",
    categoryName: "AC & Appliance Repair",
    price: 499,
    duration: "1.5 hrs",
    rating: 4.6,
    reviewCount: 780,
    image: "https://images.unsplash.com/photo-1581094794329-cd2ce763daa9?w=600&h=400&fit=crop",
    professionalId: "p2",
  },
  {
    id: "s5",
    slug: "plumbing-repair",
    title: "Plumbing Repair",
    description: "Fix leaks, blockages, tap installations, and pipe repairs.",
    categoryId: "trades",
    categoryName: "Electrician, Plumber & Carpenter",
    price: 299,
    duration: "1 hr",
    rating: 4.8,
    reviewCount: 1120,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop",
    professionalId: "p3",
    popular: true,
  },
  {
    id: "s6",
    slug: "electrical-wiring",
    title: "Electrical Wiring",
    description: "Safe wiring, switchboard repair, fan installation, and MCB setup.",
    categoryId: "trades",
    categoryName: "Electrician, Plumber & Carpenter",
    price: 499,
    duration: "2 hrs",
    rating: 4.7,
    reviewCount: 890,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    professionalId: "p3",
  },
  {
    id: "s7",
    slug: "carpenter-work",
    title: "Carpenter Work",
    description: "Furniture assembly, door repair, shelf fitting, and custom woodwork.",
    categoryId: "trades",
    categoryName: "Electrician, Plumber & Carpenter",
    price: 449,
    duration: "2 hrs",
    rating: 4.6,
    reviewCount: 560,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
    professionalId: "p3",
  },
  {
    id: "s8",
    slug: "deep-home-cleaning",
    title: "Deep Home Cleaning",
    description: "Full deep cleaning for 2BHK homes — kitchen, bathrooms, and living areas.",
    categoryId: "maid-help",
    categoryName: "Maid Help",
    price: 2499,
    duration: "4 hrs",
    rating: 4.9,
    reviewCount: 2340,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    professionalId: "p4",
    popular: true,
  },
  {
    id: "s9",
    slug: "part-time-maid",
    title: "Part-Time Maid",
    description: "Daily or weekly maid service for dishes, laundry, and home upkeep.",
    categoryId: "maid-help",
    categoryName: "Maid Help",
    price: 899,
    duration: "3 hrs",
    rating: 4.8,
    reviewCount: 1670,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
    professionalId: "p4",
    popular: true,
  },
];

export const professionals: Professional[] = [
  {
    id: "p1",
    slug: "arjun-verma",
    name: "Arjun Verma",
    title: "Insta Help Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 4.9,
    reviewCount: 1240,
    experience: "5 yrs",
    completedJobs: 3200,
    verified: true,
    specialties: ["Quick Errands", "Same-Day"],
    bio: "Fast, reliable on-demand help for urgent everyday tasks.",
    services: [
      { id: "s1", name: "Quick Errands", price: 299, duration: "1 hr" },
      { id: "s2", name: "Same-Day Assistance", price: 399, duration: "2 hrs" },
    ],
  },
  {
    id: "p2",
    slug: "suresh-kumar",
    name: "Suresh Kumar",
    title: "AC & Appliance Expert",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 4.8,
    reviewCount: 980,
    experience: "8 yrs",
    completedJobs: 4100,
    verified: true,
    specialties: ["AC Repair", "Appliances"],
    bio: "Certified technician for AC units and all major home appliances.",
    services: [
      { id: "s3", name: "AC Service & Repair", price: 599, duration: "1 hr" },
      { id: "s4", name: "Appliance Repair", price: 499, duration: "1.5 hrs" },
    ],
  },
  {
    id: "p3",
    slug: "ramesh-iyer",
    name: "Ramesh Iyer",
    title: "Trades Professional",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 4.8,
    reviewCount: 1560,
    experience: "10 yrs",
    completedJobs: 5200,
    verified: true,
    specialties: ["Plumbing", "Electrical", "Carpentry"],
    bio: "Licensed electrician, plumber, and carpenter with a decade of experience.",
    services: [
      { id: "s5", name: "Plumbing Repair", price: 299, duration: "1 hr" },
      { id: "s6", name: "Electrical Wiring", price: 499, duration: "2 hrs" },
      { id: "s7", name: "Carpenter Work", price: 449, duration: "2 hrs" },
    ],
  },
  {
    id: "p4",
    slug: "priya-sharma",
    name: "Priya Sharma",
    title: "Maid & Cleaning Expert",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 4.9,
    reviewCount: 2100,
    experience: "6 yrs",
    completedJobs: 4800,
    verified: true,
    specialties: ["Deep Cleaning", "Part-Time Maid"],
    bio: "Trusted maid services with premium cleaning standards.",
    services: [
      { id: "s8", name: "Deep Home Cleaning", price: 2499, duration: "4 hrs" },
      { id: "s9", name: "Part-Time Maid", price: 899, duration: "3 hrs" },
    ],
  },
];

export const reviews: Review[] = [
  { id: "r1", userName: "Ananya R.", userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", rating: 5, comment: "Insta help arrived in 30 minutes. Incredibly fast!", serviceId: "s1", proId: "p1" },
  { id: "r2", userName: "Vikram S.", userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", rating: 5, comment: "AC fixed perfectly. Professional and punctual.", serviceId: "s3", proId: "p2" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sneha Gupta", location: "Mumbai", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", rating: 5, text: "Insta Help saved my day — booked in seconds, pro arrived within the hour." },
  { id: "t2", name: "Arjun Malhotra", location: "Delhi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 5, text: "Best platform for AC repair and maid services. Clean UI, reliable pros." },
  { id: "t3", name: "Kavya Reddy", location: "Bangalore", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop", rating: 5, text: "Electrician fixed everything in one visit. Premium experience throughout." },
];

export const mockBookings: Booking[] = [
  { id: "b1", service: "Deep Home Cleaning", pro: "Priya Sharma", date: "2026-06-12", time: "10:00 AM", price: 2499, status: "upcoming", address: "Andheri West, Mumbai" },
  { id: "b2", service: "AC Service & Repair", pro: "Suresh Kumar", date: "2026-05-28", time: "4:00 PM", price: 599, status: "completed", address: "Bandra, Mumbai" },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProBySlug(slug: string) {
  return professionals.find((p) => p.slug === slug);
}

export function getPopularServices() {
  return services.filter((s) => s.popular);
}

export function filterServices(opts: { category?: string; search?: string; location?: string; minRating?: number; maxPrice?: number; sort?: string }) {
  let result = [...services];
  if (opts.category) result = result.filter((s) => s.categoryId === opts.category);
  if (opts.search) {
    const q = opts.search.toLowerCase();
    result = result.filter((s) => s.title.toLowerCase().includes(q) || s.categoryName.toLowerCase().includes(q));
  }
  if (opts.minRating != null && opts.minRating > 0) result = result.filter((s) => s.rating >= opts.minRating!);
  if (opts.maxPrice != null) result = result.filter((s) => s.price <= opts.maxPrice!);
  switch (opts.sort) {
    case "price-asc": result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "rating": result.sort((a, b) => b.rating - a.rating); break;
    default: result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }
  return result;
}
