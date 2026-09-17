export interface BookingItem {
  id: string;
  title: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  time: string;
  inclusions: string[];
  image?: string;
  isBestseller?: boolean;
}

export interface BookingCategory {
  id: string;
  title: string;
  items: BookingItem[];
}

export interface ServiceDetails {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  totalReviews: string;
  categories: BookingCategory[];
}

export const SERVICE_DETAILS_DATA: Record<string, ServiceDetails> = {
  ac: {
    id: "ac",
    title: "AC Repair & Service",
    subtitle: "Expert AC servicing and repairs by verified professionals",
    rating: 4.8,
    totalReviews: "124K+ reviews",
    categories: [
      {
        id: "service",
        title: "Service",
        items: [
          {
            id: "power-jet",
            title: "Power Jet AC Service (Split)",
            rating: 4.8,
            reviews: "45K+",
            price: 599,
            originalPrice: 899,
            time: "45 mins",
            isBestseller: true,
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400",
            inclusions: ["Deep cleaning of indoor & outdoor units with pressure jet", "Cooling coil chemical wash", "Gas pressure check & leak detection"],
          },
          {
            id: "anti-rust",
            title: "Anti-rust Deep Clean AC Service",
            rating: 4.9,
            reviews: "12K+",
            price: 799,
            originalPrice: 1199,
            time: "60 mins",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400",
            inclusions: ["Includes power jet cleaning", "Anti-rust coating applied to coils", "Prevents gas leakages and extends AC life"],
          },
        ],
      },
      {
        id: "repair",
        title: "Repair & Gas Refill",
        items: [
          {
            id: "ac-repair",
            title: "AC Repair / Inspection",
            rating: 4.7,
            reviews: "89K+",
            price: 299,
            time: "45 mins",
            image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400",
            inclusions: ["Detailed inspection to identify issues", "Inspection fee adjusted in final repair bill"],
          },
        ],
      },
    ],
  },
  plumber: {
    id: "plumber",
    title: "Plumber Services",
    subtitle: "Fast and reliable plumbing solutions",
    rating: 4.7,
    totalReviews: "89K+ reviews",
    categories: [
      {
        id: "bath-fittings",
        title: "Bath Fittings",
        items: [
          {
            id: "tap-repair",
            title: "Tap/Mixer Repair",
            rating: 4.8,
            reviews: "15K+",
            price: 149,
            time: "30 mins",
            isBestseller: true,
            image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=400",
            inclusions: ["Repair of leaking taps or mixers", "Spindle replacement if required (spare parts extra)"],
          },
        ],
      },
      {
        id: "blockage",
        title: "Blockage & Leakages",
        items: [
          {
            id: "drain-blockage",
            title: "Drain Blockage Removal",
            rating: 4.8,
            reviews: "22K+",
            price: 349,
            time: "60 mins",
            image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=400",
            inclusions: ["Clearing blockages in sink or bathroom drains", "Basic cleaning of the affected area"],
          },
        ],
      },
    ],
  },
  "washing-machine": {
    id: "washing-machine",
    title: "Washing Machine Repair",
    subtitle: "Expert repairs for Top Load, Front Load, and Semi-Automatic",
    rating: 4.8,
    totalReviews: "54K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "top-load", title: "Top Load Repair", rating: 4.8, reviews: "20K+", price: 299, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400", inclusions: ["Detailed inspection", "Spare parts at standard rates"] },
          { id: "front-load", title: "Front Load Repair", rating: 4.7, reviews: "15K+", price: 349, time: "60 mins", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400", inclusions: ["Motor and drum inspection", "Advanced leak detection"] },
        ]
      },
      {
        id: "install",
        title: "Installation",
        items: [
          { id: "wm-install", title: "Washing Machine Installation", rating: 4.9, reviews: "8K+", price: 399, time: "30 mins", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400", inclusions: ["Unboxing and setup", "Inlet/outlet pipe connection", "Demo"] }
        ]
      }
    ]
  },
  refrigerator: {
    id: "refrigerator",
    title: "Refrigerator Repair",
    subtitle: "Cooling issues, gas refill, and compressor repairs",
    rating: 4.7,
    totalReviews: "42K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Inspection & Repair",
        items: [
          { id: "single-door", title: "Single Door Repair", rating: 4.8, reviews: "18K+", price: 249, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=400", inclusions: ["Diagnosis of cooling issue", "Thermostat check"] },
          { id: "double-door", title: "Double/Multi Door Repair", rating: 4.7, reviews: "12K+", price: 299, time: "60 mins", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=400", inclusions: ["Frost-free system check", "PCB inspection"] }
        ]
      },
      {
        id: "gas",
        title: "Gas Refill",
        items: [
          { id: "gas-charge", title: "Gas Charging", rating: 4.8, reviews: "10K+", price: 1499, time: "90 mins", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=400", inclusions: ["Leak fixing", "Vacuuming", "Compressor gas recharge"] }
        ]
      }
    ]
  },
  television: {
    id: "television",
    title: "Television Repair & Install",
    subtitle: "LED, LCD, Smart TV repairs and wall-mounting",
    rating: 4.8,
    totalReviews: "38K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "tv-repair", title: "TV Repair / Inspection", rating: 4.7, reviews: "15K+", price: 349, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400", inclusions: ["Panel inspection", "Motherboard and sound check"] }
        ]
      },
      {
        id: "install",
        title: "Installation",
        items: [
          { id: "tv-mount", title: "TV Wall Mounting (Up to 55\")", rating: 4.9, reviews: "22K+", price: 449, time: "45 mins", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400", inclusions: ["Drilling and bracket installation", "Wire concealment"] }
        ]
      }
    ]
  },
  chimney: {
    id: "chimney",
    title: "Chimney Repair & Service",
    subtitle: "Deep cleaning and motor repairs for kitchen chimneys",
    rating: 4.6,
    totalReviews: "25K+ reviews",
    categories: [
      {
        id: "cleaning",
        title: "Cleaning",
        items: [
          { id: "deep-clean", title: "Chimney Deep Cleaning", rating: 4.8, reviews: "12K+", price: 999, originalPrice: 1299, time: "90 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400", inclusions: ["Filter descaling", "Motor housing wipe down", "Exterior polishing"] }
        ]
      },
      {
        id: "repair",
        title: "Repair",
        items: [
          { id: "chimney-repair", title: "Chimney Repair", rating: 4.5, reviews: "5K+", price: 299, time: "45 mins", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400", inclusions: ["Motor inspection", "Switch and light check"] }
        ]
      }
    ]
  },
  microwave: {
    id: "microwave",
    title: "Microwave Repair",
    subtitle: "Heating issues and panel repairs",
    rating: 4.7,
    totalReviews: "18K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "mw-repair", title: "Microwave Repair", rating: 4.7, reviews: "18K+", price: 249, time: "40 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1585832770570-349079a4fc53?q=80&w=400", inclusions: ["Magnetron check", "Keypad and board inspection"] }
        ]
      }
    ]
  },
  stove: {
    id: "stove",
    title: "Stove & Hob Repair",
    subtitle: "Gas stove repairs and deep cleaning",
    rating: 4.8,
    totalReviews: "30K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "stove-repair", title: "2-3 Burner Stove Repair", rating: 4.8, reviews: "15K+", price: 249, time: "30 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1556910103-1c02745a8050?q=80&w=400", inclusions: ["Burner unblocking", "Knob replacement check", "Gas leak check"] },
          { id: "hob-repair", title: "Hob Repair", rating: 4.7, reviews: "8K+", price: 349, time: "45 mins", image: "https://images.unsplash.com/photo-1556910103-1c02745a8050?q=80&w=400", inclusions: ["Auto-ignition fix", "Deep internal check"] }
        ]
      }
    ]
  },
  laptop: {
    id: "laptop",
    title: "Laptop Repair",
    subtitle: "Software, hardware, and screen repairs",
    rating: 4.8,
    totalReviews: "45K+ reviews",
    categories: [
      {
        id: "software",
        title: "Software & OS",
        items: [
          { id: "os-install", title: "OS Installation (Windows/Mac)", rating: 4.9, reviews: "10K+", price: 599, time: "60 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1593642081468-171415eb90d2?q=80&w=400", inclusions: ["Genuine OS installation", "Basic drivers setup"] }
        ]
      },
      {
        id: "hardware",
        title: "Hardware Repair",
        items: [
          { id: "laptop-repair", title: "Hardware Inspection", rating: 4.7, reviews: "20K+", price: 349, time: "45 mins", image: "https://images.unsplash.com/photo-1593642081468-171415eb90d2?q=80&w=400", inclusions: ["Physical diagnosis", "Motherboard and screen check"] }
        ]
      }
    ]
  },
  "ro-water-purifier": {
    id: "ro-water-purifier",
    title: "RO/Water Purifier Service",
    subtitle: "Filter replacements and motor repairs",
    rating: 4.7,
    totalReviews: "60K+ reviews",
    categories: [
      {
        id: "service",
        title: "Service & Filter Change",
        items: [
          { id: "ro-service", title: "RO Regular Service", rating: 4.8, reviews: "30K+", price: 399, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=400", inclusions: ["Pre-filter cleaning", "TDS level check", "Machine wipe down"] },
          { id: "filter-change", title: "Complete Filter Change", rating: 4.9, reviews: "15K+", price: 1499, time: "60 mins", image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=400", inclusions: ["Sediment & Carbon filter replacement", "RO membrane check"] }
        ]
      },
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "ro-repair", title: "RO Repair / Inspection", rating: 4.6, reviews: "10K+", price: 249, time: "30 mins", image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=400", inclusions: ["Motor diagnosis", "Leakage fix"] }
        ]
      }
    ]
  },
  geyser: {
    id: "geyser",
    title: "Geyser Repair & Service",
    subtitle: "Heating issues and tank cleaning",
    rating: 4.7,
    totalReviews: "35K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "geyser-repair", title: "Geyser Repair", rating: 4.7, reviews: "20K+", price: 299, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400", inclusions: ["Heating element check", "Thermostat testing"] }
        ]
      },
      {
        id: "install",
        title: "Install / Uninstall",
        items: [
          { id: "geyser-install", title: "Geyser Installation", rating: 4.8, reviews: "10K+", price: 399, time: "45 mins", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400", inclusions: ["Wall mounting", "Pipe connections"] }
        ]
      }
    ]
  },
  "geyser-service": {
    id: "geyser-service",
    title: "Geyser Repair & Service",
    subtitle: "Heating issues and tank cleaning",
    rating: 4.7,
    totalReviews: "35K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "geyser-repair", title: "Geyser Repair", rating: 4.7, reviews: "20K+", price: 299, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400", inclusions: ["Heating element check", "Thermostat testing"] }
        ]
      }
    ]
  },
  "air-cooler": {
    id: "air-cooler",
    title: "Air Cooler Repair",
    subtitle: "Motor repairs and pad replacement",
    rating: 4.6,
    totalReviews: "15K+ reviews",
    categories: [
      {
        id: "repair",
        title: "Repairs",
        items: [
          { id: "cooler-repair", title: "Cooler Repair", rating: 4.6, reviews: "10K+", price: 249, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1527664557558-a2b352fec204?q=80&w=400", inclusions: ["Pump check", "Motor oiling", "Wiring fix"] },
          { id: "pad-change", title: "Cooler Pad Replacement", rating: 4.8, reviews: "5K+", price: 199, time: "30 mins", image: "https://images.unsplash.com/photo-1527664557558-a2b352fec204?q=80&w=400", inclusions: ["Old pad removal", "New pad installation (cost of pads extra)"] }
        ]
      }
    ]
  },
  "protection-plan": {
    id: "protection-plan",
    title: "Appliance Protection Plan",
    subtitle: "Complete peace of mind for all your appliances",
    rating: 4.9,
    totalReviews: "8K+ reviews",
    categories: [
      {
        id: "plans",
        title: "Protection Plans",
        items: [
          { id: "1-year", title: "1-Year Coverage", rating: 4.9, reviews: "5K+", price: 1999, originalPrice: 2999, time: "Instant", isBestseller: true, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400", inclusions: ["Unlimited free repairs", "Zero visit charges", "Genuine spare parts coverage"] },
          { id: "2-year", title: "2-Year Extended Coverage", rating: 4.8, reviews: "3K+", price: 3499, originalPrice: 4999, time: "Instant", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400", inclusions: ["All 1-Year benefits", "Priority support"] }
        ]
      }
    ]
  },
  electrician: {
    id: "electrician",
    title: "Electrician Services",
    subtitle: "Switches, wiring, MCB, and more",
    rating: 4.8,
    totalReviews: "110K+ reviews",
    categories: [
      {
        id: "switch",
        title: "Switch & Socket",
        items: [
          { id: "switch-replace", title: "Switch/Socket Replacement", rating: 4.8, reviews: "30K+", price: 149, time: "30 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400", inclusions: ["Replacement of up to 2 switches/sockets", "Wiring check"] },
          { id: "switchboard", title: "Switchboard Installation", rating: 4.7, reviews: "12K+", price: 249, time: "45 mins", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400", inclusions: ["Wall cutting and box fitting", "Wiring connections"] }
        ]
      },
      {
        id: "mcb",
        title: "MCB & Wiring",
        items: [
          { id: "mcb-replace", title: "MCB Replacement", rating: 4.9, reviews: "15K+", price: 199, time: "30 mins", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400", inclusions: ["Safe removal of old MCB", "New MCB installation"] },
          { id: "wiring", title: "Wiring Fault Repair", rating: 4.8, reviews: "22K+", price: 299, time: "60 mins", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400", inclusions: ["Tracing short circuits", "Repairing burnt wires"] }
        ]
      }
    ]
  },
  carpenter: {
    id: "carpenter",
    title: "Carpenter Services",
    subtitle: "Drill, hang, repair, and install",
    rating: 4.7,
    totalReviews: "75K+ reviews",
    categories: [
      {
        id: "drill",
        title: "Drill & Hang",
        items: [
          { id: "drill-hole", title: "Drill & Hang (Up to 2 items)", rating: 4.8, reviews: "25K+", price: 149, time: "30 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=400", inclusions: ["Drilling holes in concrete/wood", "Hanging frames, mirrors, or shelves"] }
        ]
      },
      {
        id: "door",
        title: "Door & Locks",
        items: [
          { id: "lock-install", title: "Lock Replacement/Installation", rating: 4.7, reviews: "18K+", price: 249, time: "45 mins", image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=400", inclusions: ["Removal of old lock", "Precise installation of new lock"] },
          { id: "door-repair", title: "Door Alignment & Repair", rating: 4.6, reviews: "10K+", price: 299, time: "60 mins", image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=400", inclusions: ["Hinge adjustment", "Planing edges for smooth closing"] }
        ]
      }
    ]
  },
  "festival-lights": {
    id: "festival-lights",
    title: "Festival Lights Installation",
    subtitle: "Safe and beautiful light decorations",
    rating: 4.9,
    totalReviews: "12K+ reviews",
    categories: [
      {
        id: "install",
        title: "Installations",
        items: [
          { id: "balcony-lights", title: "Balcony Light Installation", rating: 4.9, reviews: "8K+", price: 399, time: "45 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=400", inclusions: ["Safe wiring extension", "Hanging lights securely"] },
          { id: "full-house", title: "Full House Exterior Lights", rating: 4.8, reviews: "4K+", price: 1499, time: "180 mins", image: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=400", inclusions: ["Complete roof and balcony coverage", "Multi-point power management"] }
        ]
      }
    ]
  },
  "fan-installation": {
    id: "fan-installation",
    title: "Fan Installation",
    subtitle: "Ceiling, exhaust, and wall fans",
    rating: 4.8,
    totalReviews: "40K+ reviews",
    categories: [
      {
        id: "install",
        title: "Installation & Repair",
        items: [
          { id: "ceiling-fan", title: "Ceiling Fan Installation", rating: 4.8, reviews: "25K+", price: 199, time: "30 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1565514652251-c068305c48b2?q=80&w=400", inclusions: ["Assembly and ceiling mounting", "Regulator connection"] },
          { id: "exhaust-fan", title: "Exhaust Fan Installation", rating: 4.7, reviews: "10K+", price: 149, time: "30 mins", image: "https://images.unsplash.com/photo-1565514652251-c068305c48b2?q=80&w=400", inclusions: ["Wall or window mounting", "Wiring check"] }
        ]
      }
    ]
  },
  "furniture-assembly": {
    id: "furniture-assembly",
    title: "Furniture Assembly",
    subtitle: "Beds, wardrobes, and tables",
    rating: 4.7,
    totalReviews: "30K+ reviews",
    categories: [
      {
        id: "assembly",
        title: "Assembly Services",
        items: [
          { id: "bed-assembly", title: "Bed Assembly (Any size)", rating: 4.8, reviews: "15K+", price: 499, time: "60 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400", inclusions: ["Complete frame assembly", "Hydraulic check (if applicable)"] },
          { id: "wardrobe", title: "Wardrobe Assembly (2 Door)", rating: 4.7, reviews: "8K+", price: 699, time: "90 mins", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400", inclusions: ["Panel alignment", "Hinge and sliding track fixing"] }
        ]
      }
    ]
  },
  "ikea-assembly": {
    id: "ikea-assembly",
    title: "IKEA Furniture Assembly",
    subtitle: "Specialized IKEA assembly by experts",
    rating: 4.9,
    totalReviews: "22K+ reviews",
    categories: [
      {
        id: "assembly",
        title: "IKEA Assembly",
        items: [
          { id: "ikea-small", title: "Small Item Assembly", rating: 4.9, reviews: "10K+", price: 349, time: "45 mins", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=400", inclusions: ["Assembly of chairs, small tables, or racks", "Strict adherence to IKEA manual"] },
          { id: "ikea-large", title: "Large Item Assembly", rating: 4.8, reviews: "12K+", price: 899, time: "120 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=400", inclusions: ["Assembly of PAX wardrobes or bed frames", "Wall anchoring for safety"] }
        ]
      }
    ]
  },
  "tile-grouting": {
    id: "tile-grouting",
    title: "Tile Grouting",
    subtitle: "Fill gaps and waterproof tiles",
    rating: 4.7,
    totalReviews: "18K+ reviews",
    categories: [
      {
        id: "grouting",
        title: "Grouting Services",
        items: [
          { id: "bathroom-grout", title: "Bathroom Tile Grouting", rating: 4.8, reviews: "12K+", price: 799, time: "90 mins", isBestseller: true, image: "https://images.unsplash.com/photo-1523413651479-59cb1f1f6d9e?q=80&w=400", inclusions: ["Scraping out old grout", "Application of waterproof epoxy grout"] },
          { id: "kitchen-grout", title: "Kitchen Sink/Slab Grouting", rating: 4.7, reviews: "6K+", price: 499, time: "60 mins", image: "https://images.unsplash.com/photo-1523413651479-59cb1f1f6d9e?q=80&w=400", inclusions: ["Sealing slab joints", "Water leak prevention"] }
        ]
      }
    ]
  },
  "maid-help": {
    id: "maid-help",
    title: "Maid Help",
    subtitle: "Trusted maid services for your daily chores and deep cleaning",
    rating: 4.8,
    totalReviews: "1.2M+ bookings",
    categories: [
      {
        id: "daily",
        title: "Daily Tasks",
        items: [
          {
            id: "utensils-cleaning",
            title: "Utensils Cleaning",
            rating: 4.8,
            reviews: "500K+",
            price: 199,
            time: "30 mins",
            isBestseller: true,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400", // Kitchen/bathroom cleaning
            inclusions: ["Complete cleaning of all dishes", "Kitchen slab wipe down"],
          },
          {
            id: "house-cleaning",
            title: "House Sweeping & Mopping",
            rating: 4.7,
            reviews: "450K+",
            price: 249,
            time: "45 mins",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400", // Sweeping/mopping
            inclusions: ["Sweeping of all rooms", "Mopping with floor cleaner"],
          }
        ]
      },
      {
        id: "deep-cleaning",
        title: "Deep Cleaning",
        items: [
          {
            id: "deep-home-cleaning",
            title: "Deep Home Cleaning (2BHK)",
            rating: 4.9,
            reviews: "150K+",
            price: 2499,
            originalPrice: 3499,
            time: "4 hrs",
            isBestseller: true,
            image: "/images/insta-help-maids.png", // Using the beautiful new image I generated
            inclusions: ["Kitchen deep cleaning", "Bathroom deep cleaning", "Living room and bedroom cleaning"],
          }
        ]
      }
    ]
  },
  "insta-help": {
    id: "insta-help",
    title: "InstaHelp",
    subtitle: "Instant help for your home cleaning needs",
    rating: 4.72,
    totalReviews: "7.6M bookings",
    categories: [
      {
        id: "instant",
        title: "Instant",
        items: [
          {
            id: "insta-help-instant",
            title: "Insta help",
            rating: 4.71,
            reviews: "4.4M reviews",
            price: 79,
            originalPrice: 245,
            time: "14 mins",
            isBestseller: true,
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
            inclusions: ["Instant arrival in 14 mins", "Basic home cleaning and organizing", "Kitchen and bathroom surface wipe down"],
          },
          {
            id: "super-saver-instant",
            title: "Super saver pack",
            rating: 4.71,
            reviews: "4.4M reviews",
            price: 79,
            originalPrice: 249,
            time: "60 mins",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400",
            inclusions: ["60 minutes of dedicated cleaning time", "Deep cleaning for selected rooms", "Professional cleaning supplies included"],
          }
        ]
      },
      {
        id: "later",
        title: "Later",
        items: [
          {
            id: "insta-help-later",
            title: "Insta help",
            rating: 4.71,
            reviews: "4.4M reviews",
            price: 79,
            originalPrice: 249,
            time: "60 mins",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
            inclusions: ["Scheduled arrival at your preferred time", "Basic home cleaning and organizing", "Kitchen and bathroom surface wipe down"],
          },
          {
            id: "super-saver-later",
            title: "Super saver pack",
            rating: 4.71,
            reviews: "4.4M reviews",
            price: 79,
            originalPrice: 249,
            time: "60 mins",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400",
            inclusions: ["Scheduled arrival at your preferred time", "60 minutes of dedicated cleaning time", "Professional cleaning supplies included"],
          }
        ]
      }
    ]
  }
};

// Fallback data generator for services that don't have detailed data yet
export function getServiceDetails(id: string): ServiceDetails {
  if (SERVICE_DETAILS_DATA[id]) {
    return SERVICE_DETAILS_DATA[id];
  }

  // Format ID to Title (e.g. "washing-machine" -> "Washing Machine")
  const title = id.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    id,
    title: `${title} Service`,
    subtitle: `Expert ${title.toLowerCase()} repairs by verified professionals`,
    rating: 4.8,
    totalReviews: "10K+ reviews",
    categories: [
      {
        id: "general",
        title: "General Services",
        items: [
          {
            id: "inspection",
            title: `Detailed Inspection & Repair`,
            rating: 4.8,
            reviews: "5K+",
            price: 299,
            time: "45 mins",
            isBestseller: true,
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
            inclusions: [
              "Complete diagnosis of the issue",
              "Expert recommendation and repair",
              "30-day service guarantee",
            ],
          },
        ],
      },
    ],
  };
}
