-- =========================================================
-- S-LINx Contractors — Seed Data
-- Run after schema.sql and rls-policies.sql
-- Mirrors the mock content in lib/data/ so the DB and the
-- frontend agree once Phase 4 swaps mock data for live queries.
-- =========================================================

-- ---------- services ----------
insert into services (slug, title, category, icon, summary, description, capabilities) values
('networking', 'Networking', 'ict', 'Network', 'Enterprise LAN/WAN design, switching and routing that scales with you.', 'We design, install and support wired and wireless networks for offices, campuses and industrial sites — built for uptime, not just day-one performance.', array['Structured network design','Switching & routing','Wireless site surveys','SD-WAN']),
('structured-cabling', 'Structured Cabling', 'ict', 'Cable', 'Certified copper and fiber cabling infrastructure for any building.', 'From single-floor offices to multi-building campuses, our certified installers deliver cabling that passes certification the first time.', array['Cat6/6A copper','Fiber backbone','Cable management','Certification & testing']),
('fiber-optics', 'Fiber Optics', 'ict', 'Zap', 'Long-haul and last-mile fiber deployment and splicing.', 'Fusion splicing, OTDR testing and fiber route design for carriers, campuses and data centre interconnects.', array['Fusion splicing','OTDR testing','Route engineering','FTTH/FTTB']),
('data-centres', 'Data Centres', 'ict', 'Server', 'Design and fit-out of resilient, energy-efficient data centre space.', 'Rack layout, hot/cold aisle containment, power redundancy and cooling design for facilities from server rooms to Tier III halls.', array['Rack & containment design','Power redundancy (N+1)','Cooling design','DCIM integration']),
('cybersecurity', 'Cybersecurity', 'ict', 'ShieldCheck', 'Network hardening, monitoring and incident response.', 'Firewall architecture, endpoint protection, vulnerability management and 24/7 monitoring to keep critical systems defensible.', array['Firewall & segmentation','Vulnerability management','SOC monitoring','Incident response']),
('cloud', 'Cloud', 'ict', 'Cloud', 'Migration, architecture and management across major cloud platforms.', 'We plan and execute cloud migrations, right-size infrastructure spend, and manage ongoing cloud operations for reliability and cost control.', array['Migration planning','Cost optimization','Infrastructure as code','Managed cloud ops']),
('software-development', 'Software Development', 'ict', 'Code2', 'Custom software built around real operational workflows.', 'Full-stack teams building internal tools, customer platforms and integrations tailored to how your business actually runs.', array['Custom platforms','API integrations','Legacy modernization','QA & testing']),
('web-development', 'Web Development', 'ict', 'Globe', 'Fast, accessible websites and web applications.', 'Marketing sites, client portals and internal dashboards built on modern frameworks with performance and accessibility as defaults.', array['Marketing sites','Web portals','CMS integration','Performance tuning']),
('mobile-apps', 'Mobile Apps', 'ict', 'Smartphone', 'Native and cross-platform mobile applications.', 'iOS, Android and cross-platform apps for field teams, customers and internal operations, backed by cloud infrastructure.', array['iOS & Android','Cross-platform','Offline-first design','App store deployment']),
('ai-automation', 'AI Automation', 'ict', 'Bot', 'Practical automation for operations, support and reporting.', 'We identify repetitive workflows and automate them — from document processing to customer support triage — with measurable ROI.', array['Workflow automation','Document processing','Support triage','Reporting pipelines']),
('voip', 'VoIP', 'ict', 'Phone', 'Business phone systems that run over your existing network.', 'Cloud and on-premise VoIP deployment, number porting and call routing for teams of any size.', array['Cloud PBX','Number porting','Call routing','Contact centre integration']),
('it-support', 'IT Support', 'ict', 'Headset', 'Responsive helpdesk and managed IT services.', 'Remote and on-site support, patching, backups and asset management under clear SLAs.', array['Helpdesk','Patch management','Backup & recovery','Asset management']),
('solar-installations', 'Solar Installations', 'renewable_energy', 'Sun', 'End-to-end solar system design, supply and installation.', 'From feasibility study to commissioning, we deliver grid-tied and off-grid solar systems sized correctly for real load profiles.', array['Site assessment','System design','Installation','Commissioning']),
('commercial-solar', 'Commercial Solar', 'renewable_energy', 'Building2', 'Rooftop and ground-mount solar for offices and retail sites.', 'Solar systems sized to offset daytime commercial load, with financing and monitoring options for facility managers.', array['Rooftop arrays','Ground-mount','Load offset modeling','Remote monitoring']),
('industrial-solar', 'Industrial Solar', 'renewable_energy', 'Factory', 'High-capacity solar for manufacturing and industrial loads.', 'Large-scale solar and hybrid systems engineered for continuous industrial operation and integration with existing power infrastructure.', array['MW-scale design','Grid integration','Load balancing','SCADA integration']),
('residential-solar', 'Residential Solar', 'renewable_energy', 'Home', 'Rooftop solar and storage for homes.', 'Clean, permitted residential solar installs with clear payback projections and optional battery backup.', array['Rooftop design','Battery backup','Net metering','Warranty support']),
('battery-storage', 'Battery Storage', 'renewable_energy', 'BatteryCharging', 'Battery systems for backup power and peak shaving.', 'Lithium battery storage sized for backup, load shifting or peak-demand reduction, integrated with solar or grid supply.', array['Backup power sizing','Peak shaving','Hybrid inverter integration','Monitoring']),
('hybrid-systems', 'Hybrid Systems', 'renewable_energy', 'Zap', 'Solar, battery and generator systems working together.', 'Hybrid power systems that automatically balance solar, storage and backup generation for continuous, cost-optimized supply.', array['Multi-source design','Automatic transfer switching','Fuel savings modeling','Remote control']),
('solar-street-lighting', 'Solar Street Lighting', 'renewable_energy', 'Lamp', 'Off-grid solar lighting for roads, estates and campuses.', 'Standalone solar street lights with motion-sensing and remote monitoring, sized for local sun-hour data.', array['Pole & fixture sourcing','Standalone design','Motion sensing','Fleet monitoring']),
('energy-audits', 'Energy Audits', 'renewable_energy', 'ClipboardCheck', 'Load analysis and efficiency recommendations.', 'We measure actual consumption patterns and identify the highest-return efficiency and renewable investments before you spend.', array['Load profiling','Efficiency audit','ROI modeling','Retrofit recommendations']),
('maintenance', 'Maintenance', 'renewable_energy', 'Wrench', 'Preventive and reactive maintenance for solar assets.', 'Scheduled cleaning, inspection and performance monitoring to keep installed systems producing at rated capacity.', array['Scheduled inspection','Panel cleaning','Performance monitoring','Fault response']),
('ev-charging', 'EV Charging', 'renewable_energy', 'Plug', 'EV charging infrastructure for fleets and facilities.', 'Level 2 and DC fast-charging installation for commercial fleets, workplaces and residential garages.', array['Fleet charging design','DC fast charging','Load management','Billing integration']);

-- ---------- projects ----------
insert into projects (slug, title, client_name, location, industry, category, summary, description, timeline, technologies, results) values
('lagos-logistics-hq-network-upgrade', 'Lagos Logistics HQ Network Upgrade', 'Meridian Logistics', 'Lagos, Nigeria', 'ict', 'Networking', 'Full network refresh across a 6-floor logistics headquarters serving 400+ staff.', 'Meridian Logistics was running on aging switches with no redundancy, causing recurring outages during peak dispatch hours. We replaced the core and distribution layers, deployed structured cabling to every floor, and added wireless coverage across the warehouse floor.', '14 weeks', array['Cat6A structured cabling','Layer 3 switching','Enterprise Wi-Fi 6','Redundant core'], array['Zero unplanned network downtime since go-live','40% reduction in support tickets','Wireless coverage extended to full warehouse floor']),
('portharcourt-manufacturing-solar-hybrid', 'Port Harcourt Manufacturing Solar Hybrid System', 'Delta Fabrication Ltd', 'Port Harcourt, Nigeria', 'renewable_energy', 'Industrial Solar', '850kW solar-diesel hybrid system cutting generator fuel spend for a 24/7 plant.', 'A continuous manufacturing operation was spending heavily on diesel generation. We designed and installed an 850kW rooftop and ground-mount solar array with hybrid controllers that automatically prioritize solar and battery before falling back to generators.', '22 weeks', array['850kW solar array','Hybrid inverters','SCADA monitoring','Automatic transfer switching'], array['62% reduction in diesel consumption','Payback projected within 4.5 years','Real-time generation monitoring dashboard']),
('abuja-fintech-data-centre-fitout', 'Abuja Fintech Data Centre Fit-Out', 'Novapay Technologies', 'Abuja, Nigeria', 'ict', 'Data Centres', 'Tier III-aligned data hall fit-out for a growing payments platform.', 'Novapay needed a compliant, redundant data hall to support its scaling transaction volumes. We delivered rack layout, hot/cold aisle containment, N+1 power distribution and structured cabling ready for compliance audit.', '18 weeks', array['Hot/cold aisle containment','N+1 power distribution','Fiber backbone','Environmental monitoring'], array['Passed compliance audit on first submission','99.98% uptime in first year of operation','30% improvement in cooling efficiency']),
('kano-estate-solar-street-lighting', 'Kano Residential Estate Solar Street Lighting', 'Greenview Estate Developers', 'Kano, Nigeria', 'renewable_energy', 'Solar Street Lighting', '120 standalone solar street lights across a new residential estate.', 'A newly developed estate had no grid lighting infrastructure. We deployed 120 standalone solar street lights with motion-sensing and centralized fleet monitoring, avoiding the cost of trenching grid power to every pole.', '8 weeks', array['Standalone solar poles','Motion sensors','Lithium battery packs','Remote fleet monitoring'], array['120 poles commissioned across 4.2km of road','Zero grid connection cost','Centralized fault alerting for facilities team']),
('ibadan-retail-chain-pos-cloud-migration', 'Ibadan Retail Chain POS & Cloud Migration', 'ShopRight Retail Group', 'Ibadan, Nigeria', 'ict', 'Cloud', 'Migrated 24-store POS and inventory system to a resilient cloud architecture.', 'ShopRight''s on-premise POS servers were a single point of failure across 24 stores. We migrated the platform to cloud infrastructure with store-level failover, cutting both downtime and hosting costs.', '10 weeks', array['Cloud infrastructure migration','Store-level failover','API integrations','Cost optimization'], array['35% reduction in monthly infrastructure cost','Store failover time cut from hours to minutes','Centralized inventory visibility across all locations']),
('enugu-hospital-battery-backup', 'Enugu Hospital Critical Load Battery Backup', 'St. Augustine Medical Centre', 'Enugu, Nigeria', 'renewable_energy', 'Battery Storage', 'Battery backup system protecting critical care equipment from grid outages.', 'Frequent grid outages put critical care equipment at risk during generator start-up delays. We installed a battery storage system providing instant, silent backup power that bridges the gap until generators come online.', '6 weeks', array['Lithium battery bank','Automatic transfer switching','UPS integration','Load prioritization'], array['Zero interruption to critical care equipment during outages','Bridges 100% of generator start-up delay','Remote monitoring for facilities engineering team']);

-- Link projects to related services
insert into project_services (project_id, service_id)
select p.id, s.id from projects p, services s
where (p.slug, s.slug) in (
  ('lagos-logistics-hq-network-upgrade', 'networking'),
  ('lagos-logistics-hq-network-upgrade', 'structured-cabling'),
  ('lagos-logistics-hq-network-upgrade', 'it-support'),
  ('portharcourt-manufacturing-solar-hybrid', 'industrial-solar'),
  ('portharcourt-manufacturing-solar-hybrid', 'hybrid-systems'),
  ('portharcourt-manufacturing-solar-hybrid', 'energy-audits'),
  ('abuja-fintech-data-centre-fitout', 'data-centres'),
  ('abuja-fintech-data-centre-fitout', 'fiber-optics'),
  ('abuja-fintech-data-centre-fitout', 'cybersecurity'),
  ('kano-estate-solar-street-lighting', 'solar-street-lighting'),
  ('kano-estate-solar-street-lighting', 'maintenance'),
  ('ibadan-retail-chain-pos-cloud-migration', 'cloud'),
  ('ibadan-retail-chain-pos-cloud-migration', 'software-development'),
  ('ibadan-retail-chain-pos-cloud-migration', 'it-support'),
  ('enugu-hospital-battery-backup', 'battery-storage'),
  ('enugu-hospital-battery-backup', 'energy-audits'),
  ('enugu-hospital-battery-backup', 'maintenance')
);

-- ---------- blog ----------
insert into blog_categories (name, slug) values
('Renewable Energy', 'renewable-energy'),
('ICT Solutions', 'ict-solutions');

insert into blog_tags (name, slug) values
('solar', 'solar'), ('industrial', 'industrial'), ('battery storage', 'battery-storage'),
('cabling', 'cabling'), ('networking', 'networking'), ('best practices', 'best-practices'),
('backup power', 'backup-power'), ('facilities', 'facilities');

insert into blog_posts (slug, title, excerpt, content, category_id, status, read_time, published_at) values
(
  'sizing-solar-for-industrial-loads',
  'How to Size a Solar System for a 24/7 Industrial Load',
  'Continuous manufacturing loads need a different sizing approach than daytime-only offices. Here''s how we model it.',
  E'Sizing solar for a facility that never stops running is a different problem from sizing it for a nine-to-five office. The load doesn''t disappear at night, so the design has to account for storage, hybrid dispatch and realistic diesel offset rather than simple daytime generation.\n\nWe start every industrial project with at least two weeks of interval load data, not a single utility bill. That data reveals the load shape — baseline draw, peak shifts during shift changes, and any seasonal variation — which is what actually determines array size and battery capacity.\n\nFrom there, the array is sized to cover average daytime draw plus battery charging headroom, while the battery bank is sized against the highest-priority loads that must never lose power, not the full facility load. Getting this split wrong is the most common reason industrial solar underperforms its business case.',
  (select id from blog_categories where slug = 'renewable-energy'),
  'published', '6 min read', '2026-06-12'
),
(
  'structured-cabling-mistakes',
  'Five Structured Cabling Mistakes We Still See on Site',
  'Certification failures are almost always avoidable. These are the issues that keep showing up during cabling audits.',
  E'Structured cabling looks simple until it''s certified against standard, and a surprising number of installs fail on details that have nothing to do with the cable itself.\n\nThe most common issue is bend radius violations at patch panels — cables pulled too tight around corners degrade performance in ways that don''t show up until the link is under real load. Close behind is inconsistent labeling, which turns a routine fault into an hours-long troubleshooting exercise.\n\nWe also see untested runs signed off as complete, mixed cable categories on the same run, and cable trays shared with power lines without adequate separation. Each one is preventable with a proper commissioning checklist before handover.',
  (select id from blog_categories where slug = 'ict-solutions'),
  'published', '5 min read', '2026-05-28'
),
(
  'battery-storage-vs-generator-backup',
  'Battery Storage vs. Generator Backup: What Actually Fits Your Facility',
  'They''re not competitors — but knowing when to use which (or both) changes your total cost of ownership significantly.',
  E'The question we get most often from facility managers isn''t ''battery or generator'' for backup power, and the honest answer is that it depends on your outage profile.\n\nBatteries excel at short, frequent interruptions: they respond instantly, run silently, and need no fuel logistics. Generators excel at long-duration outages where a battery bank would need to be uneconomically large. Most facilities we work with end up with both — battery for the first stretch of an outage, generator kicking in automatically if it runs longer.\n\nThe sizing conversation should start with your actual outage log, not a worst-case assumption. Facilities that model this properly typically end up with a smaller, cheaper battery bank than they expected.',
  (select id from blog_categories where slug = 'renewable-energy'),
  'published', '7 min read', '2026-04-15'
);

insert into blog_post_tags (post_id, tag_id)
select p.id, t.id from blog_posts p, blog_tags t
where (p.slug, t.slug) in (
  ('sizing-solar-for-industrial-loads', 'solar'),
  ('sizing-solar-for-industrial-loads', 'industrial'),
  ('sizing-solar-for-industrial-loads', 'battery-storage'),
  ('structured-cabling-mistakes', 'cabling'),
  ('structured-cabling-mistakes', 'networking'),
  ('structured-cabling-mistakes', 'best-practices'),
  ('battery-storage-vs-generator-backup', 'battery-storage'),
  ('battery-storage-vs-generator-backup', 'backup-power'),
  ('battery-storage-vs-generator-backup', 'facilities')
);

-- ---------- testimonials ----------
insert into testimonials (quote, author_name, author_role, company, is_featured) values
('S-LINx rebuilt our entire network over a weekend with zero disruption to dispatch operations. That kind of execution is rare.', 'Chidinma Okafor', 'Operations Director', 'Meridian Logistics', true),
('The hybrid solar system paid for the engineering fee in avoided diesel costs within the first two quarters.', 'Ibrahim Musa', 'Plant Manager', 'Delta Fabrication Ltd', true),
('They treated our compliance requirements as a design input from day one, not an afterthought. The audit was painless.', 'Grace Adeyemi', 'Head of Infrastructure', 'Novapay Technologies', true);

-- ---------- careers ----------
insert into jobs (slug, title, department, location, type, summary, responsibilities, requirements, posted_at) values
('senior-network-engineer', 'Senior Network Engineer', 'ICT', 'Lagos, Nigeria', 'Full-time', 'Lead network design and deployment for enterprise client sites.', array['Design and deploy LAN/WAN infrastructure for enterprise clients','Lead structured cabling and wireless site surveys','Mentor junior network technicians','Own client-facing network documentation'], array['5+ years enterprise networking experience','CCNP or equivalent certification','Experience with SD-WAN deployments','Comfortable leading on-site installation teams'], '2026-07-10'),
('solar-installation-supervisor', 'Solar Installation Supervisor', 'Renewable Energy', 'Port Harcourt, Nigeria', 'Full-time', 'Supervise commercial and industrial solar installation crews.', array['Supervise on-site solar and battery installation crews','Ensure installations meet design specification and safety standards','Coordinate with engineering team on site-specific adjustments','Sign off on commissioning checklists'], array['4+ years solar installation experience','Working knowledge of hybrid inverter systems','Valid electrical safety certification','Willing to travel to industrial sites'], '2026-07-02'),
('cybersecurity-analyst', 'Cybersecurity Analyst', 'ICT', 'Remote (Nigeria)', 'Full-time', 'Monitor and respond to security events across client networks.', array['Monitor client networks for security events','Conduct vulnerability assessments','Support incident response engagements','Produce clear client-facing security reports'], array['3+ years in a SOC or security analyst role','Familiarity with SIEM tooling','Security+ or equivalent certification','Strong written communication skills'], '2026-06-20');

-- ---------- site settings ----------
insert into site_settings (key, value) values
('contact_info', '{"phone": "+234 000 000 0000", "email": "hello@slinxcontractors.com", "whatsapp": "https://wa.me/2340000000000", "address": "Lagos, Nigeria"}'),
('company_stats', '{"projects_delivered": "180+", "mw_installed": "42", "years_in_operation": "12", "client_retention_rate": "94%"}');
