export interface JobListing {
  slug: string;
  title: string;
  department: "ICT" | "Renewable Energy" | "Operations";
  location: string;
  type: "Full-time" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
}

export const jobListings: JobListing[] = [
  {
    slug: "senior-network-engineer",
    title: "Senior Network Engineer",
    department: "ICT",
    location: "Lagos, Nigeria",
    type: "Full-time",
    summary: "Lead network design and deployment for enterprise client sites.",
    responsibilities: [
      "Design and deploy LAN/WAN infrastructure for enterprise clients",
      "Lead structured cabling and wireless site surveys",
      "Mentor junior network technicians",
      "Own client-facing network documentation",
    ],
    requirements: [
      "5+ years enterprise networking experience",
      "CCNP or equivalent certification",
      "Experience with SD-WAN deployments",
      "Comfortable leading on-site installation teams",
    ],
    postedAt: "2026-07-10",
  },
  {
    slug: "solar-installation-supervisor",
    title: "Solar Installation Supervisor",
    department: "Renewable Energy",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    summary: "Supervise commercial and industrial solar installation crews.",
    responsibilities: [
      "Supervise on-site solar and battery installation crews",
      "Ensure installations meet design specification and safety standards",
      "Coordinate with engineering team on site-specific adjustments",
      "Sign off on commissioning checklists",
    ],
    requirements: [
      "4+ years solar installation experience",
      "Working knowledge of hybrid inverter systems",
      "Valid electrical safety certification",
      "Willing to travel to industrial sites",
    ],
    postedAt: "2026-07-02",
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    department: "ICT",
    location: "Remote (Nigeria)",
    type: "Full-time",
    summary: "Monitor and respond to security events across client networks.",
    responsibilities: [
      "Monitor client networks for security events",
      "Conduct vulnerability assessments",
      "Support incident response engagements",
      "Produce clear client-facing security reports",
    ],
    requirements: [
      "3+ years in a SOC or security analyst role",
      "Familiarity with SIEM tooling",
      "Security+ or equivalent certification",
      "Strong written communication skills",
    ],
    postedAt: "2026-06-20",
  },
];

export const getJobBySlug = (slug: string) => jobListings.find((j) => j.slug === slug);
