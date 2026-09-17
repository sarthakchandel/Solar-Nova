export interface SubServiceItem {
  id: string;
  name: string;
  time?: string;
  icon: string;
  href: string;
}

export interface ServiceSection {
  title: string;
  items: SubServiceItem[];
}

export interface CategoryData {
  id: string;
  title: string;
  sections: ServiceSection[];
}

export const AC_APPLIANCE_CATEGORY: CategoryData = {
  id: "ac-appliance-repair",
  title: "AC & Appliance Repair",
  sections: [
    {
      title: "Large appliances",
      items: [
        { id: "ac", name: "AC", time: "47 mins", icon: "❄️", href: "/services/ac" },
        { id: "washing-machine", name: "Washing Machine", time: "44 mins", icon: "🧺", href: "/services/washing-machine" },
        { id: "refrigerator", name: "Refrigerator", time: "44 mins", icon: "🧊", href: "/services/refrigerator" },
        { id: "television", name: "Television", time: "44 mins", icon: "📺", href: "/services/television" },
      ],
    },
    {
      title: "Other appliances",
      items: [
        { id: "chimney", name: "Chimney", time: "55 mins", icon: "💨", href: "/services/chimney" },
        { id: "microwave", name: "Microwave", time: "44 mins", icon: "♨️", href: "/services/microwave" },
        { id: "stove", name: "Stove", icon: "🔥", href: "/services/stove" },
        { id: "laptop", name: "Laptop", icon: "💻", href: "/services/laptop" },
        { id: "ro-water-purifier", name: "RO/Water Purifier", icon: "💧", href: "/services/ro-water-purifier" },
        { id: "geyser", name: "Geyser", time: "19 mins", icon: "🌡️", href: "/services/geyser" },
        { id: "air-cooler", name: "Air Cooler", time: "19 mins", icon: "🌬️", href: "/services/air-cooler" },
      ],
    },
    {
      title: "Others",
      items: [
        { id: "protection-plan", name: "Appliance Protection Plan", icon: "🛡️", href: "/services/protection-plan" },
      ],
    },
  ],
};

export const ELECTRICIAN_PLUMBER_CATEGORY: CategoryData = {
  id: "electrician-plumber-carpenter",
  title: "Electrician, Plumber & Carpenter",
  sections: [
    {
      title: "Repairs",
      items: [
        { id: "electrician", name: "Electrician", icon: "🔌", href: "/services/electrician" },
        { id: "plumber", name: "Plumber", icon: "🚰", href: "/services/plumber" },
        { id: "carpenter", name: "Carpenter", time: "25 mins", icon: "🪚", href: "/services/carpenter" },
        { id: "festival-lights", name: "Festival Lights Installation", time: "19 mins", icon: "✨", href: "/services/festival-lights" },
      ],
    },
    {
      title: "Installations & other services",
      items: [
        { id: "fan-installation", name: "Fan Installation", time: "19 mins", icon: "🌀", href: "/services/fan-installation" },
        { id: "furniture-assembly", name: "Furniture Assembly", time: "19 mins", icon: "🪑", href: "/services/furniture-assembly" },
        { id: "geyser-service", name: "Geyser Service & Repair", time: "19 mins", icon: "🌡️", href: "/services/geyser-service" },
        { id: "ikea-assembly", name: "IKEA Furniture Assembly", time: "19 mins", icon: "📦", href: "/services/ikea-assembly" },
        { id: "tile-grouting", name: "Tile Grouting", icon: "🧱", href: "/services/tile-grouting" },
      ],
    },
  ],
};
