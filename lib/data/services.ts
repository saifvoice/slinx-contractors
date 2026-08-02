export type ServiceCategory = "ict" | "renewable-energy";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: string; // lucide-react icon name
  summary: string;
  description: string;
  capabilities: string[];
}

export const services: Service[] = [
  // ICT
  {
    slug: "networking",
    title: "Networking",
    category: "ict",
    icon: "Network",
    summary: "Enterprise LAN/WAN design, switching and routing that scales with you.",
    description:
      "We design, install and support wired and wireless networks for offices, campuses and industrial sites — built for uptime, not just day-one performance.",
    capabilities: ["Structured network design", "Switching & routing", "Wireless site surveys", "SD-WAN"],
  },
  {
    slug: "structured-cabling",
    title: "Structured Cabling",
    category: "ict",
    icon: "Cable",
    summary: "Certified copper and fiber cabling infrastructure for any building.",
    description:
      "From single-floor offices to multi-building campuses, our certified installers deliver cabling that passes certification the first time.",
    capabilities: ["Cat6/6A copper", "Fiber backbone", "Cable management", "Certification & testing"],
  },
  {
    slug: "fiber-optics",
    title: "Fiber Optics",
    category: "ict",
    icon: "Zap",
    summary: "Long-haul and last-mile fiber deployment and splicing.",
    description:
      "Fusion splicing, OTDR testing and fiber route design for carriers, campuses and data centre interconnects.",
    capabilities: ["Fusion splicing", "OTDR testing", "Route engineering", "FTTH/FTTB"],
  },
  {
    slug: "data-centres",
    title: "Data Centres",
    category: "ict",
    icon: "Server",
    summary: "Design and fit-out of resilient, energy-efficient data centre space.",
    description:
      "Rack layout, hot/cold aisle containment, power redundancy and cooling design for facilities from server rooms to Tier III halls.",
    capabilities: ["Rack & containment design", "Power redundancy (N+1)", "Cooling design", "DCIM integration"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "ict",
    icon: "ShieldCheck",
    summary: "Network hardening, monitoring and incident response.",
    description:
      "Firewall architecture, endpoint protection, vulnerability management and 24/7 monitoring to keep critical systems defensible.",
    capabilities: ["Firewall & segmentation", "Vulnerability management", "SOC monitoring", "Incident response"],
  },
  {
    slug: "cloud",
    title: "Cloud",
    category: "ict",
    icon: "Cloud",
    summary: "Migration, architecture and management across major cloud platforms.",
    description:
      "We plan and execute cloud migrations, right-size infrastructure spend, and manage ongoing cloud operations for reliability and cost control.",
    capabilities: ["Migration planning", "Cost optimization", "Infrastructure as code", "Managed cloud ops"],
  },
  {
    slug: "software-development",
    title: "Software Development",
    category: "ict",
    icon: "Code2",
    summary: "Custom software built around real operational workflows.",
    description:
      "Full-stack teams building internal tools, customer platforms and integrations tailored to how your business actually runs.",
    capabilities: ["Custom platforms", "API integrations", "Legacy modernization", "QA & testing"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "ict",
    icon: "Globe",
    summary: "Fast, accessible websites and web applications.",
    description:
      "Marketing sites, client portals and internal dashboards built on modern frameworks with performance and accessibility as defaults.",
    capabilities: ["Marketing sites", "Web portals", "CMS integration", "Performance tuning"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    category: "ict",
    icon: "Smartphone",
    summary: "Native and cross-platform mobile applications.",
    description:
      "iOS, Android and cross-platform apps for field teams, customers and internal operations, backed by cloud infrastructure.",
    capabilities: ["iOS & Android", "Cross-platform", "Offline-first design", "App store deployment"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    category: "ict",
    icon: "Bot",
    summary: "Practical automation for operations, support and reporting.",
    description:
      "We identify repetitive workflows and automate them — from document processing to customer support triage — with measurable ROI.",
    capabilities: ["Workflow automation", "Document processing", "Support triage", "Reporting pipelines"],
  },
  {
    slug: "voip",
    title: "VoIP",
    category: "ict",
    icon: "Phone",
    summary: "Business phone systems that run over your existing network.",
    description:
      "Cloud and on-premise VoIP deployment, number porting and call routing for teams of any size.",
    capabilities: ["Cloud PBX", "Number porting", "Call routing", "Contact centre integration"],
  },
  {
    slug: "it-support",
    title: "IT Support",
    category: "ict",
    icon: "Headset",
    summary: "Responsive helpdesk and managed IT services.",
    description:
      "Remote and on-site support, patching, backups and asset management under clear SLAs.",
    capabilities: ["Helpdesk", "Patch management", "Backup & recovery", "Asset management"],
  },

  // Renewable Energy
  {
    slug: "solar-installations",
    title: "Solar Installations",
    category: "renewable-energy",
    icon: "Sun",
    summary: "End-to-end solar system design, supply and installation.",
    description:
      "From feasibility study to commissioning, we deliver grid-tied and off-grid solar systems sized correctly for real load profiles.",
    capabilities: ["Site assessment", "System design", "Installation", "Commissioning"],
  },
  {
    slug: "commercial-solar",
    title: "Commercial Solar",
    category: "renewable-energy",
    icon: "Building2",
    summary: "Rooftop and ground-mount solar for offices and retail sites.",
    description:
      "Solar systems sized to offset daytime commercial load, with financing and monitoring options for facility managers.",
    capabilities: ["Rooftop arrays", "Ground-mount", "Load offset modeling", "Remote monitoring"],
  },
  {
    slug: "industrial-solar",
    title: "Industrial Solar",
    category: "renewable-energy",
    icon: "Factory",
    summary: "High-capacity solar for manufacturing and industrial loads.",
    description:
      "Large-scale solar and hybrid systems engineered for continuous industrial operation and integration with existing power infrastructure.",
    capabilities: ["MW-scale design", "Grid integration", "Load balancing", "SCADA integration"],
  },
  {
    slug: "residential-solar",
    title: "Residential Solar",
    category: "renewable-energy",
    icon: "Home",
    summary: "Rooftop solar and storage for homes.",
    description:
      "Clean, permitted residential solar installs with clear payback projections and optional battery backup.",
    capabilities: ["Rooftop design", "Battery backup", "Net metering", "Warranty support"],
  },
  {
    slug: "battery-storage",
    title: "Battery Storage",
    category: "renewable-energy",
    icon: "BatteryCharging",
    summary: "Battery systems for backup power and peak shaving.",
    description:
      "Lithium battery storage sized for backup, load shifting or peak-demand reduction, integrated with solar or grid supply.",
    capabilities: ["Backup power sizing", "Peak shaving", "Hybrid inverter integration", "Monitoring"],
  },
  {
    slug: "hybrid-systems",
    title: "Hybrid Systems",
    category: "renewable-energy",
    icon: "Zap",
    summary: "Solar, battery and generator systems working together.",
    description:
      "Hybrid power systems that automatically balance solar, storage and backup generation for continuous, cost-optimized supply.",
    capabilities: ["Multi-source design", "Automatic transfer switching", "Fuel savings modeling", "Remote control"],
  },
  {
    slug: "solar-street-lighting",
    title: "Solar Street Lighting",
    category: "renewable-energy",
    icon: "Lamp",
    summary: "Off-grid solar lighting for roads, estates and campuses.",
    description:
      "Standalone solar street lights with motion-sensing and remote monitoring, sized for local sun-hour data.",
    capabilities: ["Pole & fixture sourcing", "Standalone design", "Motion sensing", "Fleet monitoring"],
  },
  {
    slug: "energy-audits",
    title: "Energy Audits",
    category: "renewable-energy",
    icon: "ClipboardCheck",
    summary: "Load analysis and efficiency recommendations.",
    description:
      "We measure actual consumption patterns and identify the highest-return efficiency and renewable investments before you spend.",
    capabilities: ["Load profiling", "Efficiency audit", "ROI modeling", "Retrofit recommendations"],
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    category: "renewable-energy",
    icon: "Wrench",
    summary: "Preventive and reactive maintenance for solar assets.",
    description:
      "Scheduled cleaning, inspection and performance monitoring to keep installed systems producing at rated capacity.",
    capabilities: ["Scheduled inspection", "Panel cleaning", "Performance monitoring", "Fault response"],
  },
  {
    slug: "ev-charging",
    title: "EV Charging",
    category: "renewable-energy",
    icon: "Plug",
    summary: "EV charging infrastructure for fleets and facilities.",
    description:
      "Level 2 and DC fast-charging installation for commercial fleets, workplaces and residential garages.",
    capabilities: ["Fleet charging design", "DC fast charging", "Load management", "Billing integration"],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getServicesByCategory = (category: ServiceCategory) =>
  services.filter((s) => s.category === category);
