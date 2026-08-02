export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  industry: "ict" | "renewable-energy";
  category: string;
  summary: string;
  description: string;
  timeline: string;
  technologies: string[];
  results: string[];
  relatedServices: string[]; // service slugs
  coverGradient: string; // tailwind gradient classes for placeholder cover
}

export const projects: Project[] = [
  {
    slug: "lagos-logistics-hq-network-upgrade",
    title: "Lagos Logistics HQ Network Upgrade",
    client: "Meridian Logistics",
    location: "Lagos, Nigeria",
    industry: "ict",
    category: "Networking",
    summary: "Full network refresh across a 6-floor logistics headquarters serving 400+ staff.",
    description:
      "Meridian Logistics was running on aging switches with no redundancy, causing recurring outages during peak dispatch hours. We replaced the core and distribution layers, deployed structured cabling to every floor, and added wireless coverage across the warehouse floor.",
    timeline: "14 weeks",
    technologies: ["Cat6A structured cabling", "Layer 3 switching", "Enterprise Wi-Fi 6", "Redundant core"],
    results: [
      "Zero unplanned network downtime since go-live",
      "40% reduction in support tickets",
      "Wireless coverage extended to full warehouse floor",
    ],
    relatedServices: ["networking", "structured-cabling", "it-support"],
    coverGradient: "from-primary via-primary to-accent",
  },
  {
    slug: "portharcourt-manufacturing-solar-hybrid",
    title: "Port Harcourt Manufacturing Solar Hybrid System",
    client: "Delta Fabrication Ltd",
    location: "Port Harcourt, Nigeria",
    industry: "renewable-energy",
    category: "Industrial Solar",
    summary: "850kW solar-diesel hybrid system cutting generator fuel spend for a 24/7 plant.",
    description:
      "A continuous manufacturing operation was spending heavily on diesel generation. We designed and installed an 850kW rooftop and ground-mount solar array with hybrid controllers that automatically prioritize solar and battery before falling back to generators.",
    timeline: "22 weeks",
    technologies: ["850kW solar array", "Hybrid inverters", "SCADA monitoring", "Automatic transfer switching"],
    results: [
      "62% reduction in diesel consumption",
      "Payback projected within 4.5 years",
      "Real-time generation monitoring dashboard",
    ],
    relatedServices: ["industrial-solar", "hybrid-systems", "energy-audits"],
    coverGradient: "from-secondary via-secondary to-accent",
  },
  {
    slug: "abuja-fintech-data-centre-fitout",
    title: "Abuja Fintech Data Centre Fit-Out",
    client: "Novapay Technologies",
    location: "Abuja, Nigeria",
    industry: "ict",
    category: "Data Centres",
    summary: "Tier III-aligned data hall fit-out for a growing payments platform.",
    description:
      "Novapay needed a compliant, redundant data hall to support its scaling transaction volumes. We delivered rack layout, hot/cold aisle containment, N+1 power distribution and structured cabling ready for compliance audit.",
    timeline: "18 weeks",
    technologies: ["Hot/cold aisle containment", "N+1 power distribution", "Fiber backbone", "Environmental monitoring"],
    results: [
      "Passed compliance audit on first submission",
      "99.98% uptime in first year of operation",
      "30% improvement in cooling efficiency",
    ],
    relatedServices: ["data-centres", "fiber-optics", "cybersecurity"],
    coverGradient: "from-primary via-accent to-primary",
  },
  {
    slug: "kano-estate-solar-street-lighting",
    title: "Kano Residential Estate Solar Street Lighting",
    client: "Greenview Estate Developers",
    location: "Kano, Nigeria",
    industry: "renewable-energy",
    category: "Solar Street Lighting",
    summary: "120 standalone solar street lights across a new residential estate.",
    description:
      "A newly developed estate had no grid lighting infrastructure. We deployed 120 standalone solar street lights with motion-sensing and centralized fleet monitoring, avoiding the cost of trenching grid power to every pole.",
    timeline: "8 weeks",
    technologies: ["Standalone solar poles", "Motion sensors", "Lithium battery packs", "Remote fleet monitoring"],
    results: [
      "120 poles commissioned across 4.2km of road",
      "Zero grid connection cost",
      "Centralized fault alerting for facilities team",
    ],
    relatedServices: ["solar-street-lighting", "maintenance"],
    coverGradient: "from-secondary via-primary to-secondary",
  },
  {
    slug: "ibadan-retail-chain-pos-cloud-migration",
    title: "Ibadan Retail Chain POS & Cloud Migration",
    client: "ShopRight Retail Group",
    location: "Ibadan, Nigeria",
    industry: "ict",
    category: "Cloud",
    summary: "Migrated 24-store POS and inventory system to a resilient cloud architecture.",
    description:
      "ShopRight's on-premise POS servers were a single point of failure across 24 stores. We migrated the platform to cloud infrastructure with store-level failover, cutting both downtime and hosting costs.",
    timeline: "10 weeks",
    technologies: ["Cloud infrastructure migration", "Store-level failover", "API integrations", "Cost optimization"],
    results: [
      "35% reduction in monthly infrastructure cost",
      "Store failover time cut from hours to minutes",
      "Centralized inventory visibility across all locations",
    ],
    relatedServices: ["cloud", "software-development", "it-support"],
    coverGradient: "from-accent via-primary to-accent",
  },
  {
    slug: "enugu-hospital-battery-backup",
    title: "Enugu Hospital Critical Load Battery Backup",
    client: "St. Augustine Medical Centre",
    location: "Enugu, Nigeria",
    industry: "renewable-energy",
    category: "Battery Storage",
    summary: "Battery backup system protecting critical care equipment from grid outages.",
    description:
      "Frequent grid outages put critical care equipment at risk during generator start-up delays. We installed a battery storage system providing instant, silent backup power that bridges the gap until generators come online.",
    timeline: "6 weeks",
    technologies: ["Lithium battery bank", "Automatic transfer switching", "UPS integration", "Load prioritization"],
    results: [
      "Zero interruption to critical care equipment during outages",
      "Bridges 100% of generator start-up delay",
      "Remote monitoring for facilities engineering team",
    ],
    relatedServices: ["battery-storage", "energy-audits", "maintenance"],
    coverGradient: "from-secondary via-accent to-primary",
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
