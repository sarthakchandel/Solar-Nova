import { Hero } from "@/components/home/hero";
import { SpotlightSection } from "@/components/home/spotlight-section";
import { ServiceCarousel } from "@/components/home/service-carousel";
import { NativePromo } from "@/components/home/native-promo";
import { Categories } from "@/components/home/categories";
import { PopularServices } from "@/components/home/popular-services";
import { FeaturedPros } from "@/components/home/featured-pros";
import { Testimonials } from "@/components/home/testimonials";

const MOST_BOOKED_ITEMS = [
  { id: "deep-home-cleaning", title: "Deep Home Cleaning (2BHK)", rating: 4.9, reviews: "150K", price: 2499, originalPrice: 3499, href: "/services/maid-help", image: "/images/insta-help-maids.png" },
  { id: "foam-jet", title: "Power Jet AC Service", rating: 4.8, reviews: "45K", price: 599, originalPrice: 899, href: "/services/ac", image: "/images/ac-cleaning.png" },
  { id: "tap-repair", title: "Tap/Mixer Repair", rating: 4.8, reviews: "15K", price: 149, originalPrice: null, href: "/services/plumber", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=400" },
  { id: "tv-mount", title: "TV Wall Mounting (Up to 55\")", rating: 4.9, reviews: "22K", price: 449, originalPrice: null, href: "/services/television", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400" },
  { id: "switch-replace", title: "Switch/Socket Replacement", rating: 4.8, reviews: "30K", price: 149, originalPrice: null, href: "/services/electrician", image: "/images/electrician-expert.png" }
];

const CLEANING_ESSENTIALS = [
  { id: "utensils", title: "Utensils Cleaning", rating: 4.80, reviews: "500K", price: 199, originalPrice: null, href: "/services/maid-help", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400" },
  { id: "house-clean", title: "House Sweeping & Mopping", rating: 4.70, reviews: "450K", price: 249, originalPrice: null, href: "/services/maid-help", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400" },
  { id: "chimney-clean", title: "Chimney deep cleaning", rating: 4.84, reviews: "208K", price: 999, originalPrice: 1299, href: "/services/chimney", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400" },
  { id: "fridge-clean", title: "Single Door Repair", rating: 4.83, reviews: "18K", price: 249, originalPrice: null, href: "/services/refrigerator", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=400" },
  { id: "stove-repair", title: "2-3 Burner Stove Repair", rating: 4.79, reviews: "15K", price: 249, originalPrice: null, href: "/services/stove", image: "https://images.unsplash.com/photo-1556910103-1c02745a8050?q=80&w=400" }
];

const APPLIANCE_REPAIR = [
  { id: "foam-ac", title: "Power Jet AC Service", rating: 4.8, reviews: "45K", price: 599, originalPrice: null, href: "/services/ac", image: "/images/ac-cleaning.png" },
  { id: "ac-repair-2", title: "AC repair & inspection", rating: 4.7, reviews: "89K", price: 299, originalPrice: null, href: "/services/ac", image: "https://images.unsplash.com/photo-1631545806609-65c90e1f2f52?q=80&w=400" },
  { id: "anti-rust", title: "Anti-rust AC Service", rating: 4.9, reviews: "12K", price: 799, originalPrice: 1199, href: "/services/ac", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400" },
  { id: "wm-check", title: "Top Load Repair", rating: 4.8, reviews: "20K", price: 299, originalPrice: null, href: "/services/washing-machine", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400" },
  { id: "tv-check", title: "TV Repair / Inspection", rating: 4.7, reviews: "15K", price: 349, originalPrice: null, href: "/services/television", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400" }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpotlightSection />
      <Categories />
      <ServiceCarousel title="Most booked services" items={MOST_BOOKED_ITEMS} />
      <ServiceCarousel title="Cleaning essentials" subtitle="Monthly cleaning essential services" items={CLEANING_ESSENTIALS} />
      <NativePromo />
      <ServiceCarousel title="Appliance repair & service" items={APPLIANCE_REPAIR} />
      <PopularServices />
      <FeaturedPros />
      <Testimonials />
    </>
  );
}
