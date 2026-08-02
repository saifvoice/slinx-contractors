export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: { name: string; role: string };
  publishedAt: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sizing-solar-for-industrial-loads",
    title: "How to Size a Solar System for a 24/7 Industrial Load",
    excerpt:
      "Continuous manufacturing loads need a different sizing approach than daytime-only offices. Here's how we model it.",
    content: [
      "Sizing solar for a facility that never stops running is a different problem from sizing it for a nine-to-five office. The load doesn't disappear at night, so the design has to account for storage, hybrid dispatch and realistic diesel offset rather than simple daytime generation.",
      "We start every industrial project with at least two weeks of interval load data, not a single utility bill. That data reveals the load shape — baseline draw, peak shifts during shift changes, and any seasonal variation — which is what actually determines array size and battery capacity.",
      "From there, the array is sized to cover average daytime draw plus battery charging headroom, while the battery bank is sized against the highest-priority loads that must never lose power, not the full facility load. Getting this split wrong is the most common reason industrial solar underperforms its business case.",
    ],
    category: "Renewable Energy",
    tags: ["solar", "industrial", "battery storage"],
    author: { name: "Amaka Eze", role: "Head of Renewable Energy Engineering" },
    publishedAt: "2026-06-12",
    readTime: "6 min read",
  },
  {
    slug: "structured-cabling-mistakes",
    title: "Five Structured Cabling Mistakes We Still See on Site",
    excerpt:
      "Certification failures are almost always avoidable. These are the issues that keep showing up during cabling audits.",
    content: [
      "Structured cabling looks simple until it's certified against standard, and a surprising number of installs fail on details that have nothing to do with the cable itself.",
      "The most common issue is bend radius violations at patch panels — cables pulled too tight around corners degrade performance in ways that don't show up until the link is under real load. Close behind is inconsistent labeling, which turns a routine fault into an hours-long troubleshooting exercise.",
      "We also see untested runs signed off as complete, mixed cable categories on the same run, and cable trays shared with power lines without adequate separation. Each one is preventable with a proper commissioning checklist before handover.",
    ],
    category: "ICT Solutions",
    tags: ["cabling", "networking", "best practices"],
    author: { name: "Tunde Bakare", role: "Head of ICT Infrastructure" },
    publishedAt: "2026-05-28",
    readTime: "5 min read",
  },
  {
    slug: "battery-storage-vs-generator-backup",
    title: "Battery Storage vs. Generator Backup: What Actually Fits Your Facility",
    excerpt:
      "They're not competitors — but knowing when to use which (or both) changes your total cost of ownership significantly.",
    content: [
      "The question we get most often from facility managers isn't 'solar or generator' — it's 'battery or generator' for backup power, and the honest answer is that it depends on your outage profile.",
      "Batteries excel at short, frequent interruptions: they respond instantly, run silently, and need no fuel logistics. Generators excel at long-duration outages where a battery bank would need to be uneconomically large. Most facilities we work with end up with both — battery for the first stretch of an outage, generator kicking in automatically if it runs longer.",
      "The sizing conversation should start with your actual outage log, not a worst-case assumption. Facilities that model this properly typically end up with a smaller, cheaper battery bank than they expected.",
    ],
    category: "Renewable Energy",
    tags: ["battery storage", "backup power", "facilities"],
    author: { name: "Amaka Eze", role: "Head of Renewable Energy Engineering" },
    publishedAt: "2026-04-15",
    readTime: "7 min read",
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
