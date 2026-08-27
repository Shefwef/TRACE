/** TRACE brand foundation: full wordmark variants and evidence-led content for connected routes and section stories. */
const useLocalMedia = import.meta.env.VITE_USE_LOCAL_MEDIA === "true";
const portableMedia = (localPath: string, previewPath: string) => useLocalMedia ? localPath : previewPath;

export const ASSETS = {
  logoNavy: portableMedia("/media/brand/trace-consulting-wordmark-navy.webp", "/manus-storage/trace-consulting-wordmark-navy_c1ce4215.webp"),
  logoWhite: portableMedia("/media/brand/trace-consulting-wordmark-white-header-final.png", "/manus-storage/trace-consulting-wordmark-white-header-final_5ab7b61d.png"),
  teamAbuSaleh: portableMedia("/media/team/abu-saleh-muhammad-saifullah.png", "/manus-storage/abu-saleh-muhammad-saifullah_882d1194.png"),
  teamAhmedNine: portableMedia("/media/team/ahmed-julker-nine.png", "/manus-storage/ahmed-julker-nine_ae2260cf.png"),
  teamFuad: portableMedia("/media/team/fuad-m-khalid-hossen.png", "/manus-storage/fuad-m-khalid-hossen_7bdd58ae.png"),
  teamMimma: portableMedia("/media/team/mimma-afrin.png", "/manus-storage/mimma-afrin_73a2e9c9.png"),
  teamMoudud: portableMedia("/media/team/moudud-ahmmed-sujan.png", "/manus-storage/moudud-ahmmed-sujan_f26b5a4c.png"),
  teamNabeel: portableMedia("/media/team/nabeel-khan.png", "/manus-storage/nabeel-khan_378c5ebe.png"),
  teamRecardo: portableMedia("/media/team/recardo-saurav-antor-halder.png", "/manus-storage/recardo-saurav-antor-halder_783c9964.png"),
  teamRubayat: portableMedia("/media/team/rubayat-e-shams-anik.jpg", "/manus-storage/rubayat-e-shams-anik_3723bdcd.jpg"),
  teamTahsina: portableMedia("/media/team/tahsina-shiva.png", "/manus-storage/tahsina-shiva_f234202c.png"),
  teamTanvir: portableMedia("/media/team/tanvir-kabir.jpg", "/manus-storage/tanvir-kabir_6e765084.jpg"),
  teamUmme: portableMedia("/media/team/umme-mahmuda-tama.jpg", "/manus-storage/umme-mahmuda-tama_cacb8bb3.jpg"),
  teamMasud: portableMedia("/media/team/masud-sadiq.png", "/manus-storage/masud-sadiq_7a059d17.png"),
  teamMahraj: portableMedia("/media/team/mahraj-samrat.jpg", "/manus-storage/mahraj-samrat_c74eafac.jpg"),
  teamFerdous: portableMedia("/media/team/ferdous-alam.jpg", "/manus-storage/ferdous-alam_31932289.jpg"),
  teamSushanta: portableMedia("/media/team/sushanta-sarker.jpg", "/manus-storage/sushanta-sarker_b98ed157.jpg"),
  teamMichael: portableMedia("/media/team/michael-parr.jpg", "/manus-storage/michael-parr_2a74fa09.jpg"),
  teamShafi: portableMedia("/media/team/shafi-uddin.png", "/manus-storage/shafi-uddin_78ac23a4.png"),
  heroPolicy: portableMedia("/media/hero/trace-hero-policy-workshop.jpg", "/manus-storage/trace-hero-policy-workshop_246b77c1.jpg"),
  heroTrade: portableMedia("/media/hero/trace-hero-trade-port.jpg", "/manus-storage/trace-hero-trade-port_7d949111.jpg"),
  heroInteroperability: portableMedia("/media/hero/trace-hero-dhaka-interoperability.jpg", "/manus-storage/trace-hero-dhaka-interoperability_26245c20.jpg"),
  heroLaboratory: portableMedia("/media/hero/trace-hero-laboratory-compliance.jpg", "/manus-storage/trace-hero-laboratory-compliance_104c3d3d.jpg"),
  heroColdChain: portableMedia("/media/hero/trace-hero-cold-chain.jpg", "/manus-storage/trace-hero-cold-chain_2180c702.jpg"),
  heroResearch: portableMedia("/media/hero/trace-hero-applied-research.jpg", "/manus-storage/trace-hero-applied-research_7d663103.jpg"),
  insightReform: portableMedia("/media/insights/sustainable-economic-stability.jpg", "/manus-storage/trace-insight-economic-reform_41cd2a84.jpg"),
  innovationTariff: portableMedia("/media/innovations/tariff-intelligence.jpg", "/manus-storage/trace-innovation-tariff-intelligence_f642b593.jpg"),
  aboutTrace: portableMedia("/media/about/about_us_trace.jpg", "/manus-storage/about_us_trace_2ee9442f.jpg"),
} as const;

export const partnerLogos = [
  { name: "Partner organization 01", src: portableMedia("/media/partners/partner-01.png", "/manus-storage/partner-01_585c0c4c.png") },
  { name: "Partner organization 02", src: portableMedia("/media/partners/partner-02.png", "/manus-storage/partner-02_ca82b097.png") },
  { name: "Partner organization 03", src: portableMedia("/media/partners/partner-03.png", "/manus-storage/partner-03_4229128c.png") },
  { name: "Partner organization 04", src: portableMedia("/media/partners/partner-04.png", "/manus-storage/partner-04_fbe137b2.png") },
  { name: "Partner organization 05", src: portableMedia("/media/partners/partner-05.png", "/manus-storage/partner-05_923a7547.png") },
  { name: "Partner organization 06", src: portableMedia("/media/partners/partner-06.png", "/manus-storage/partner-06_7fab28b8.png") },
  { name: "Partner organization 07", src: portableMedia("/media/partners/partner-07.png", "/manus-storage/partner-07_9e587b75.png") },
  { name: "Partner organization 08", src: portableMedia("/media/partners/partner-08.png", "/manus-storage/partner-08_a399173f.png") },
  { name: "Partner organization 09", src: portableMedia("/media/partners/partner-09.png", "/manus-storage/partner-09_6c74a1cb.png") },
  { name: "Partner organization 10", src: portableMedia("/media/partners/partner-10.png", "/manus-storage/partner-10_57fdf72b.png") },
  { name: "Partner organization 11", src: portableMedia("/media/partners/partner-11.png", "/manus-storage/partner-11_f94827de.png") },
  { name: "Partner organization 12", src: portableMedia("/media/partners/partner-12.png", "/manus-storage/partner-12_7eefdc7f.png") },
  { name: "Partner organization 13", src: portableMedia("/media/partners/partner-13.png", "/manus-storage/partner-13_9424233b.png") },
  { name: "Partner organization 14", src: portableMedia("/media/partners/partner-14.png", "/manus-storage/partner-14_9c2d646d.png") },
] as const;

export type Service = {
  slug: string;
  title: string;
  strapline: string;
  description: string;
  solutions: number;
  disciplines: string[];
  color: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  period: string;
  status: "Ongoing" | "Completed";
  serviceSlugs: string[];
  teamSlugs: string[];
  summary: string;
  theme: "navy" | "teal" | "sand";
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  initials: string;
  serviceSlugs: string[];
  projectSlugs: string[];
  bio: string;
  color: string;
  image?: string;
};

export type Insight = {
  slug: string;
  title: string;
  type: "Video" | "Article" | "Publication" | "Meeting" | "Event" | "Brochure" | "Innovation";
  date: string;
  summary: string;
  serviceSlugs: string[];
  projectSlugs: string[];
  teamSlugs: string[];
  image?: string;
  accent: "teal" | "navy" | "orange" | "sand";
  sourceUrl?: string;
  sourceLabel?: string;
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Innovations", href: "/innovations" },
  { label: "Careers", href: "/careers" },
];

export const heroSlides = [
  {
    headline: <>Transforming Economies<br />Empowering Futures</>,
    image: ASSETS.heroPolicy,
    route: "/projects",
    label: "Transforming Economies Empowering Futures",
  },
  {
    headline: <>Driving Efficiency Through<br />Trade Facilitation</>,
    image: ASSETS.heroTrade,
    route: "/services/trade-facilitation",
    label: "Driving Efficiency Through Trade Facilitation",
  },
  {
    headline: <>Technology Solutions for<br />Interoperable Systems</>,
    image: ASSETS.heroInteroperability,
    route: "/services/technology-solutions",
    label: "Technology Solutions for Interoperable Systems",
  },
  {
    headline: <>Laboratory Excellence<br />for Compliance</>,
    image: ASSETS.heroLaboratory,
    route: "/services/laboratory-improvement",
    label: "Laboratory Excellence for Compliance",
  },
  {
    headline: <>Cold-Chain System for<br />Global Competitiveness</>,
    image: ASSETS.heroColdChain,
    route: "/services/market-access-sps",
    label: "Cold-Chain System for Global Competitiveness",
  },
  {
    headline: <>Advancing Innovation Through<br />Applied Research</>,
    image: ASSETS.heroResearch,
    route: "/services/research-innovation",
    label: "Advancing Innovation Through Applied Research",
  },
] as const;

export const services: Service[] = [
  { slug: "trade-facilitation", title: "Trade Facilitation", strapline: "Advance cross-border trade.", description: "Technology-driven trade facilitation, customs modernization, trade policy reform, and institutional strengthening.", solutions: 8, disciplines: ["Customs", "Border systems", "Trade policy"], color: "teal" },
  { slug: "policy-regulatory-reform", title: "Policy & Regulatory Reform", strapline: "Turn reform into practice.", description: "Evidence-based policy, legislative reform, and institutional modernisation aligned with international practice.", solutions: 6, disciplines: ["Legislation", "Governance", "Implementation"], color: "navy" },
  { slug: "laboratory-improvement", title: "Laboratory Improvement", strapline: "Build trust in every result.", description: "LIMS, ISO accreditation, GLP compliance, technical advisory, and capacity building for quality systems.", solutions: 9, disciplines: ["ISO", "LIMS", "Quality systems"], color: "orange" },
  { slug: "market-access-sps", title: "Market Access & SPS", strapline: "Open markets with confidence.", description: "Compliance, traceability, quality assurance, and resilient supply chains for agricultural trade.", solutions: 12, disciplines: ["SPS", "Traceability", "Export readiness"], color: "sand" },
  { slug: "technology-solutions", title: "Technology Solutions", strapline: "Make systems work smarter.", description: "Digital platforms and automation systems that translate institutional reform into reliable workflows.", solutions: 8, disciplines: ["Platforms", "Automation", "Data"], color: "teal" },
  { slug: "research-innovation", title: "Research & Innovation", strapline: "Turn insight into advantage.", description: "Trade, economic and development research with technology-enabled innovation and applied learning.", solutions: 5, disciplines: ["Research", "Foresight", "Innovation"], color: "navy" },
];

export const projects: Project[] = [
  { slug: "national-tariff-modernization", title: "National Tariff Modernization and Trade Systems Integration", client: "National Board of Revenue (NBR)", period: "2026", status: "Ongoing", serviceSlugs: ["trade-facilitation", "technology-solutions"], teamSlugs: ["fuad-khalid", "mahraj-samrat", "tahsina-shiva"], summary: "Supporting a major tariff and trade-systems modernization effort with the National Board of Revenue.", theme: "navy" },
  { slug: "bsti-textile-testing", title: "Strengthening Export-Oriented Textile Testing Capacity at BSTI", client: "Bangladesh Standards and Testing Institution", period: "2025–2026", status: "Completed", serviceSlugs: ["laboratory-improvement", "research-innovation"], teamSlugs: ["mimma-afrin", "sushanta-sarker"], summary: "A strategic assessment to strengthen textile testing capacity and alignment with export standards.", theme: "teal" },
  { slug: "animal-health-reform", title: "Trade Policy and Regulatory Reform for the Animal Health Sector", client: "AHCAB", period: "2026", status: "Completed", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], teamSlugs: ["fuad-khalid", "bushra-haque", "rubayat-anik"], summary: "Technical and policy advisory support for the animal health sector’s trade and regulatory systems.", theme: "sand" },
  { slug: "bafisa-intelligence", title: "HS Code-Based Import Intelligence Database and Digital Platform", client: "BAFISA", period: "2025", status: "Completed", serviceSlugs: ["trade-facilitation", "technology-solutions"], teamSlugs: ["mahraj-samrat", "tahsina-shiva", "ahmed-nine"], summary: "Digital modernization through an HS-code-based import intelligence system and trade platform.", theme: "navy" },
  { slug: "prtc-accreditation", title: "ISO/IEC 17025:2017 Accreditation and Laboratory Systems Strengthening", client: "PRTC, CVASU", period: "2025–2026", status: "Completed", serviceSlugs: ["laboratory-improvement"], teamSlugs: ["mimma-afrin", "mahmudur-rahman"], summary: "Technical assistance for laboratory strengthening and ISO/IEC 17025:2017 accreditation readiness.", theme: "teal" },
  { slug: "export-compliance", title: "Strengthening Export Compliance and International Market Readiness", client: "Department of Agricultural Marketing", period: "2026", status: "Completed", serviceSlugs: ["market-access-sps", "research-innovation"], teamSlugs: ["nabeel-khan", "tanjum-tushi"], summary: "Export-readiness capacity building for agricultural entrepreneurs and processors.", theme: "sand" },
];

const allTeamProfiles: TeamMember[] = [
  { slug: "fuad-khalid", name: "Fuad M Khalid Hossen", role: "Chief Executive Officer", specialty: "Trade facilitation & policy reform", initials: "FK", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization", "animal-health-reform"], bio: "A trade facilitation and trade policy reform expert with more than 14 years in system modernization, export-led growth, and regulatory reform.", color: "teal", image: ASSETS.teamFuad },
  { slug: "masud-sadiq", name: "Md. Masud Sadiq", role: "Senior Public Finance, Trade Policy & Trade Facilitation Lead", specialty: "Customs administration", initials: "MS", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization"], bio: "Former Grade-1 NBR member and senior customs modernization, multi-agency coordination, and trade facilitation expert.", color: "navy", image: ASSETS.teamMasud },
  { slug: "mahraj-samrat", name: "Mohammed Mahraj-ul-Alam Samrat", role: "Head of Trade Facilitation and Regulatory Compliance", specialty: "Customs modernization", initials: "MS", serviceSlugs: ["trade-facilitation", "technology-solutions"], projectSlugs: ["national-tariff-modernization", "bafisa-intelligence"], bio: "Customs modernization and regulatory compliance leader with border-management, multimodal logistics, and trade facilitation experience.", color: "orange", image: ASSETS.teamMahraj },
  { slug: "mimma-afrin", name: "Mimma Afrin", role: "Technical Lead, Laboratory Operations", specialty: "Laboratory systems & accreditation", initials: "MA", serviceSlugs: ["laboratory-improvement"], projectSlugs: ["bsti-textile-testing", "prtc-accreditation"], bio: "Laboratory and quality-management specialist with experience in ISO accreditation, food safety, LIMS, and international standards.", color: "teal", image: ASSETS.teamMimma },
  { slug: "nahrin-swarna", name: "Nahrin Rahman Swarna", role: "Technical Director", specialty: "Trade policy & automation", initials: "NS", serviceSlugs: ["trade-facilitation", "technology-solutions"], projectSlugs: ["national-tariff-modernization"], bio: "Development professional leading trade facilitation, automation systems, policy analysis, and cross-sector collaboration.", color: "navy" },
  { slug: "nabeel-khan", name: "Nabeel Khan", role: "Head of Partnerships & Strategic Growth", specialty: "Cold-chain & private-sector development", initials: "NK", serviceSlugs: ["market-access-sps"], projectSlugs: ["export-compliance"], bio: "Partnership and strategic-growth leader with experience across trade, logistics, investment, and private-sector development.", color: "orange", image: ASSETS.teamNabeel },
  { slug: "abu-saleh-saifullah", name: "Abu Saleh Muhammad Saifullah", role: "Director & Chief Operating Officer", specialty: "Strategic leadership & digital transformation", initials: "AS", serviceSlugs: ["policy-regulatory-reform", "technology-solutions"], projectSlugs: [], bio: "Director and Chief Operating Officer with over 20 years of experience in strategic leadership, digital transformation, and complex development delivery for government agencies and international stakeholders.", color: "navy", image: ASSETS.teamAbuSaleh },
  { slug: "rubayat-anik", name: "Rubayat E Shams Anik", role: "Policy, Research, and Business Development Specialist", specialty: "Policy research & analysis", initials: "RA", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: ["animal-health-reform"], bio: "Experienced researcher and project manager specializing in applied policy analysis, multi-country stakeholder engagement, and international event coordination.", color: "teal", image: ASSETS.teamRubayat },
  { slug: "tahsina-shiva", name: "Tahsina Shiva", role: "IT Project Manager", specialty: "Digital systems delivery", initials: "TS", serviceSlugs: ["technology-solutions"], projectSlugs: ["national-tariff-modernization", "bafisa-intelligence"], bio: "IT project manager supporting the design and delivery of practical digital systems for TRACE programmes.", color: "orange", image: ASSETS.teamTahsina },
  { slug: "ahmed-nine", name: "Ahmed Julker Nine", role: "Research and Policy Analyst", specialty: "Trade facilitation reforms", initials: "AJ", serviceSlugs: ["trade-facilitation", "research-innovation"], projectSlugs: ["bafisa-intelligence"], bio: "Research and policy analyst supporting trade facilitation reform and evidence-led programme delivery.", color: "navy", image: ASSETS.teamAhmedNine },
  { slug: "moudud-sujan", name: "Moudud Ahmmed Sujan", role: "Head of External Affairs", specialty: "Content development & external affairs", initials: "MS", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "External-affairs lead supporting TRACE communications, content development, and institutional engagement.", color: "teal", image: ASSETS.teamMoudud },
  { slug: "recardo-halder", name: "Recardo Saurav Antor Halder", role: "Manager, Business Development", specialty: "Business development & stakeholder engagement", initials: "RH", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: [], bio: "Business-development professional combining policy insight, research, programme operations, strategic communication, and stakeholder engagement.", color: "orange", image: ASSETS.teamRecardo },
  { slug: "tanvir-kabir", name: "Tanvir Kabir", role: "Digital Content and Multimedia Specialist", specialty: "Graphic design & motion graphics", initials: "TK", serviceSlugs: ["technology-solutions", "research-innovation"], projectSlugs: [], bio: "Digital-content and multimedia specialist supporting TRACE storytelling, graphic design, and motion-led communication.", color: "navy", image: ASSETS.teamTanvir },
  { slug: "umme-tama", name: "Umme Mahbuba Tama", role: "Research Associate", specialty: "Research & analysis", initials: "UT", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "Research associate supporting TRACE’s evidence-led analysis and programme delivery.", color: "teal", image: ASSETS.teamUmme },
  { slug: "mobarak-uddin", name: "A.S. Mobarak Uddin Ahmed", role: "Chief Financial Officer", specialty: "Financial stewardship", initials: "MU", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "Chief Financial Officer supporting TRACE financial stewardship and organizational operations.", color: "navy" },
  { slug: "mahmudur-rahman", name: "Md. Mahmudur Rahman", role: "Laboratory Specialist", specialty: "Laboratory quality systems", initials: "MR", serviceSlugs: ["laboratory-improvement"], projectSlugs: ["prtc-accreditation"], bio: "Laboratory specialist supporting quality systems, operational readiness, and technical delivery.", color: "teal" },
  { slug: "sushanta-sarker", name: "Sushanta Kumer Sarker", role: "Director & Head of MREL", specialty: "Monitoring, research, evaluation & learning", initials: "SS", serviceSlugs: ["research-innovation"], projectSlugs: ["bsti-textile-testing"], bio: "Results-management and private-sector development specialist with research, programme supervision, and economic analysis experience.", color: "orange", image: ASSETS.teamSushanta },
  { slug: "ferdous-alam", name: "S.M. Ferdous Alam", role: "Head of Government Engagement", specialty: "Government engagement", initials: "FA", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "Government-engagement leader with executive experience in quality infrastructure, institutional modernization, and public-sector governance.", color: "navy", image: ASSETS.teamFerdous },
  { slug: "shafi-uddin", name: "Dr. Md. Shafi Uddin", role: "Technical Expert — Plant Quarantine and SPS Compliance Systems", specialty: "SPS compliance", initials: "SU", serviceSlugs: ["market-access-sps"], projectSlugs: [], bio: "Plant health, quarantine, and SPS compliance expert with senior agricultural-extension and phytosanitary experience.", color: "teal", image: ASSETS.teamShafi },
  { slug: "michael-parr", name: "Michael J. Parr", role: "Strategic Advisor", specialty: "Project management & finance", initials: "MP", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: [], bio: "International development leader with programme, policy, finance, internal-audit, and institutional-strengthening experience.", color: "navy", image: ASSETS.teamMichael },
  { slug: "tabassum-munira", name: "Tabassum Sirajam Munira", role: "Pharmaceutical Quality & Regulatory Affairs Specialist", specialty: "Regulatory affairs", initials: "TM", serviceSlugs: ["laboratory-improvement", "policy-regulatory-reform"], projectSlugs: [], bio: "Quality and regulatory-affairs specialist supporting technical compliance and institutional practice.", color: "orange" },
  { slug: "bushra-haque", name: "Bushra Haque", role: "Legislative Specialist", specialty: "Legislative reform", initials: "BH", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: ["animal-health-reform"], bio: "Legislative specialist supporting policy design, regulatory reform, and implementation alignment.", color: "navy" },
  { slug: "tanjum-tushi", name: "Tanjum Tushi", role: "Research Associate", specialty: "Research & analysis", initials: "TT", serviceSlugs: ["research-innovation"], projectSlugs: ["export-compliance"], bio: "Research associate supporting evidence development, policy analysis, and programme delivery.", color: "teal" },
];

// Public team directory: show only people whose approved portraits have been supplied.
export const team: TeamMember[] = allTeamProfiles.filter((member) => Boolean(member.image));

export const insights: Insight[] = [
  { slug: "somoy-structural-economic-reform", title: "Sustainable economic stability requires structural reform", type: "Video", date: "Jul 21, 2026", summary: "A SOMOY TV business-bulletin discussion connected by TRACE’s Insights index to structural reform, foreign-exchange resilience, export competitiveness, and trade facilitation.", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization"], teamSlugs: ["fuad-khalid"], image: ASSETS.insightReform, accent: "teal", sourceUrl: "https://www.youtube.com/watch?v=bFoY0vfBQfw", sourceLabel: "Watch on YouTube" },
  { slug: "beyond-tariffs", title: "Beyond Tariffs Lies Bangladesh’s Biggest Trade Opportunity", type: "Article", date: "Jul 16, 2026", summary: "Originally published in The Business Standard, this feature examines how the U.S.–Bangladesh Agreement on Reciprocal Trade can extend gains beyond tariffs and market access.", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization"], teamSlugs: ["mahraj-samrat"], image: ASSETS.heroTrade, accent: "navy", sourceUrl: "https://traceconsultingltd.com/article-details/35", sourceLabel: "Read original article" },
  { slug: "electronic-trade-facilitation-act", title: "Why Bangladesh urgently needs an Electronic Trade Facilitation Act", type: "Article", date: "Jul 29, 2025", summary: "An argument for an electronic-by-design legal framework that can coordinate border agencies, support the Bangladesh Single Window, and strengthen predictable trade processes.", serviceSlugs: ["trade-facilitation", "technology-solutions"], projectSlugs: ["national-tariff-modernization"], teamSlugs: ["fuad-khalid"], image: ASSETS.heroInteroperability, accent: "teal", sourceUrl: "https://traceconsultingltd.com/article-details/23", sourceLabel: "Read original article" },
  { slug: "import-policy-order-fast-lanes", title: "From Red Tape to Fast Lanes: New import policy order could turbo-charge Bangladesh trade", type: "Article", date: "Jun 17, 2025", summary: "A Business Standard article on using risk-based import controls, modern policy rules, and digital trade procedures to reduce friction and support competitiveness.", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization"], teamSlugs: ["fuad-khalid"], image: ASSETS.heroTrade, accent: "navy", sourceUrl: "https://traceconsultingltd.com/article-details/21", sourceLabel: "Read original article" },
  { slug: "animal-health-nutrition-growth", title: "Unlocking Animal Health & Nutrition Ecosystems to Power National Growth", type: "Publication", date: "Jan 2026", summary: "A TRACE key note paper on the trade, regulatory, and supply-chain systems that support Bangladesh’s livestock, poultry, and fisheries economy.", serviceSlugs: ["market-access-sps", "policy-regulatory-reform"], projectSlugs: ["animal-health-reform"], teamSlugs: ["fuad-khalid", "rubayat-anik"], image: ASSETS.heroColdChain, accent: "sand", sourceUrl: "https://traceconsultingltd.com/article-details/24", sourceLabel: "Read publication" },
  { slug: "animal-health-quality-customs-brochure", title: "Strategic Quality, Customs, and Trade-related Consultancy for the Animal Health and Nutrition Sector", type: "Brochure", date: "Brochure", summary: "A TRACE brochure outlining quality, customs, and trade-related consultancy support for the animal health and nutrition sector.", serviceSlugs: ["market-access-sps", "laboratory-improvement"], projectSlugs: ["animal-health-reform"], teamSlugs: ["fuad-khalid", "mimma-afrin"], image: ASSETS.heroColdChain, accent: "orange", sourceUrl: "https://traceconsultingltd.com/storage/499/TRACE-Consulting.pdf", sourceLabel: "Open brochure PDF" },
  { slug: "fuel-lpg-cost-of-living", title: "Fuel and LPG price rises: a special discussion on cost of living", type: "Video", date: "Video", summary: "A Star News discussion on fuel, LPG prices, and cost-of-living pressures, supplied for TRACE’s Featured Insights selection.", serviceSlugs: ["research-innovation", "policy-regulatory-reform"], projectSlugs: [], teamSlugs: [], image: ASSETS.insightReform, accent: "orange", sourceUrl: "https://www.youtube.com/watch?v=gZZif7fqc9E", sourceLabel: "Watch on YouTube" },
  { slug: "trace-lab-brochure", title: "Precision in Every Lab Solution", type: "Brochure", date: "Brochure", summary: "TRACE laboratory modernization, ISO accreditation, LIMS, and technical-consultancy brochure for quality-driven laboratory systems.", serviceSlugs: ["laboratory-improvement"], projectSlugs: ["prtc-accreditation", "bsti-textile-testing"], teamSlugs: ["mimma-afrin"], image: ASSETS.heroLaboratory, accent: "teal", sourceUrl: "https://traceconsultingltd.com/storage/454/Trace-Lab-Brochure.pdf", sourceLabel: "Open brochure PDF" },
  { slug: "animal-health-nutrition-bangla-brochure", title: "Animal Health, Nutrition & Compliance Services", type: "Brochure", date: "Brochure", summary: "A Bangla-language TRACE brochure for animal health, nutrition, and compliance-related consultancy services.", serviceSlugs: ["market-access-sps", "laboratory-improvement"], projectSlugs: ["animal-health-reform"], teamSlugs: ["fuad-khalid"], image: ASSETS.heroColdChain, accent: "sand", sourceUrl: "https://traceconsultingltd.com/storage/492/Brochure.pdf", sourceLabel: "Open brochure PDF" },
];

export const innovations = [
  {
    slug: "tariff-trade-intelligence-platform",
    title: "Bangladesh Tariff & Trade Intelligence Platform",
    description: "A digital platform that turns fragmented tariff, duty, tax, regulatory, legal, and trade-benefit information into actionable intelligence by HS code.",
    url: "https://tariffintel.traceconsultingltd.com/",
    image: ASSETS.innovationTariff,
    tags: ["Tariffs", "HS codes", "Trade intelligence"],
  },
  {
    slug: "national-export-intelligence-hub",
    title: "National Export Intelligence Hub",
    description: "A decision-support platform envisioned to support export policy, priority products and markets, implementation tracking, and trade negotiations.",
    url: "https://www.exportintel.org/",
    image: ASSETS.heroTrade,
    tags: ["Export policy", "Market access", "Decision support"],
  },
];

export const metrics = [
  { value: "30+", label: "national policy & regulatory reforms" },
  { value: "14", label: "government digital platforms" },
  { value: "10", label: "trade-related laboratories strengthened" },
  { value: "50+", label: "public & private institutions supported" },
];

export const contact = {
  phone: "+88-02-224415545",
  email: "contact@traceconsultingltd.com",
  address: "Level 2, Plot 285, Road 19/C, Mohakhali New DOHS, Dhaka-1206, Bangladesh",
  hours: "Sunday–Thursday, 9:00 AM–5:00 PM BST",
};
