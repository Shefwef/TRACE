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

export type ServiceProduct = {
  name: string;
  innovationSlug?: string;
};

export type Service = {
  slug: string;
  title: string;
  strapline: string;
  description: string;
  solutions: number;
  disciplines: string[];
  color: string;
  overview?: string[];
  serviceItems?: string[];
  products?: ServiceProduct[];
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

export type Department =
  | "Executive Leadership & Business Development"
  | "Trade Facilitation & Customs Modernization"
  | "Quality Infrastructure & SPS"
  | "Policy, Research & Operations"
  | "Digital Systems & Technology Delivery"
  | "Markets, Compliance & Sector Development";

export const departmentOrder: Department[] = [
  "Executive Leadership & Business Development",
  "Trade Facilitation & Customs Modernization",
  "Quality Infrastructure & SPS",
  "Policy, Research & Operations",
  "Digital Systems & Technology Delivery",
  "Markets, Compliance & Sector Development",
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  initials: string;
  department: Department;
  serviceSlugs: string[];
  projectSlugs: string[];
  bio: string;
  color: string;
  image?: string;
  tags?: string[]; // specialty chips for photoless info cards
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
  {
    slug: "trade-facilitation",
    title: "Trade Facilitation",
    strapline: "Advancing Cross-Border Trade and Customs Modernization",
    description: "TRACE delivers technology-driven trade facilitation, trade policy reform, digital transformation, and institutional strengthening to modernize cross-border trade, accelerate border clearance, reduce the time and cost of trade, and strengthen regulatory transparency, export competitiveness, and investment.",
    solutions: 8,
    disciplines: ["Customs", "Border systems", "Trade policy"],
    color: "teal",
    overview: [
      "TRACE delivers technology-driven trade facilitation, WTO Trade Facilitation Agreement (TFA) implementation, trade policy reform, customs modernization, sanitary and phytosanitary (SPS) systems, border regulatory reform, and digital trade.",
      "TRACE partners with governments, development partners, and the private sector to design and implement practical reforms that modernize cross-border trade, strengthen regulatory systems, and improve trade competitiveness. Our expertise spans policy and legal reform, risk-based border management, trade information systems, digital trade solutions, investment facilitation, process simplification and automation, and implementation of the WTO-TFA, with particular expertise in advancing Category C measures.",
      "Our multidisciplinary team combines policy expertise with technology-enabled solutions to reduce the time and cost of trade, accelerate border clearance, improve regulatory transparency, strengthen institutional capacity, and create more efficient, predictable, and business-friendly border management systems. We work across the full reform cycle—from policy design and regulatory modernization to digital system development, stakeholder engagement, institutional capacity building, and implementation support.",
      "TRACE professionals bring extensive experience in designing and implementing trade facilitation reforms in Bangladesh. In different capacities, they have supported the implementation of 15 WTO-TFA measures, including publication and availability of information, advance rulings, pre-arrival processing, risk management, post-clearance audit, test procedures, and the expedited release of perishable goods.",
      "Working closely with government agencies, our experts have translated international commitments into practical institutional, regulatory, procedural, and digital reforms. They have also contributed to the development of the National Trade Facilitation Roadmap, comprising agency-specific, action-oriented implementation plans, and designed the National Trade Facilitation Implementation Tracker for the Ministry of Commerce and the National Trade Facilitation Committee to strengthen implementation monitoring, inter-agency coordination, and accountability.",
      "By combining international best practices with deep local implementation experience, TRACE delivers sustainable, technology-driven solutions that strengthen institutions, modernize trade procedures, improve regulatory coordination, and enable Bangladesh to build a more competitive, transparent, and resilient trading environment.",
    ],
    serviceItems: [
      "Trade facilitation policy and regulatory reform, including trade laws, e-TFA, rules, and regulatory modernization",
      "Implementation of WTO trade facilitation agreement (TFA) category C measures",
      "Customs modernization and risk-based border management",
      "Private sector support to access trade facilitation measures, including AEO, advance rulings, and trusted trader programs",
      "Sanitary and Phytosanitary (SPS) modernization and agricultural trade facilitation",
      "Trade process simplification and business process reengineering",
      "Time Release Studies (TRS), trade diagnostics, and border performance measurement",
      "Trade finance, investment facilitation, and trade infrastructure advisory",
      "Trade information portals, regulatory transparency, and digital knowledge platforms",
    ],
    products: [
      { name: "Automated Risk Management System (ARMS)" },
      { name: "Electronic Pre-Arrival Processing System (e-PAPS)" },
      { name: "Time Release Study (TRS) Toolkit" },
      { name: "Bangladesh Single Window Integration Framework" },
      { name: "Electronic Document Repository System (EDRS)" },
      { name: "Trade Facilitation Performance Dashboard" },
      { name: "National Import-Export Information Management System" },
      { name: "National Trade Information Portal" },
    ],
  },
  {
    slug: "policy-regulatory-reform",
    title: "Policy & Regulatory Reform",
    strapline: "Evidence-Based Policy & Legislative Reform",
    description: "TRACE advances evidence-based policy and regulatory reform, helping governments modernize legislation, strengthen institutions, and align national frameworks with international best practices.",
    solutions: 6,
    disciplines: ["Legislation", "Governance", "Implementation"],
    color: "navy",
    overview: [
      "TRACE provides evidence-based policy and regulatory advisory services that help governments strengthen governance, improve competitiveness, modernize regulatory systems, and deliver sustainable reforms. We partner with public institutions, development partners, the private sector, and civil society to identify policy gaps, modernize legislation, simplify regulations, support HS code classification and SROs amendments, and align national frameworks with international standards and global commitments.",
      "Our multidisciplinary approach combines policy research, legal and regulatory analysis, stakeholder engagement, and implementation experience to transform policy recommendations into practical, results-oriented reforms. From legislative drafting and regulatory impact assessments to public–private dialogue and institutional strengthening, TRACE supports informed decision-making that enhances transparency, accountability, and long-term economic development.",
      "TRACE brings together experts with extensive experience leading large-scale national trade facilitation and regulatory reform initiatives in Bangladesh. Collectively, they have contributed to the development, amendment, and implementation of more than 30 policy and regulatory reforms for various Government of Bangladesh agencies. Key reforms include the upcoming Import Policy Order (2026–2029), the draft Electronic Trade Facilitation Act (e-TFA), Customs Inspection and Sample Management Rules, Risk Management Rules for SPS agencies, the Electronic Governance of Safe Food Import Regulations, the Veterinary Drug Act, the Animal and Animal Products Inspection and Quality Control Act, and amendments to key plant, animal, and fisheries quarantine laws and regulations.",
      "By combining international best practices with local implementation expertise, TRACE develops practical policy solutions that improve the business environment, strengthen regulatory institutions, and support evidence-based governance.",
    ],
    serviceItems: [
      "Policy and Regulatory Gap Analysis",
      "Legislative Drafting and Regulatory Reform",
      "Private Sector Advisory on HS Code Classification, SRO Amendments",
      "Trade, Investment, and Economic Policy Advisory",
      "Regulatory Impact Assessment (RIA) and Good Regulatory Practices (GRP)",
      "Business Environment and Regulatory Simplification",
      "Policy Research and Evidence-Based Decision Support",
      "Policy Briefs, White Papers, and Strategic Communications",
      "Public–Private Dialogue and Stakeholder Engagement",
      "Reform Implementation, Monitoring, and Evaluation",
    ],
    products: [
      { name: "Electronic Trade Facilitation (e-TFA) Framework" },
      { name: "Trade Regulatory Advisory Solution" },
      { name: "Legislative Drafting and Alignment with Global Standards" },
      { name: "Institutional Reform Assessment Toolkit" },
      { name: "Advocacy & Communications" },
      { name: "Capacity Building & Training" },
    ],
  },
  {
    slug: "laboratory-improvement",
    title: "Laboratory Improvement",
    strapline: "Precision in Every LAB Solution",
    description: "TRACE modernizes laboratory systems through technical advisory, LIMS implementation, ISO accreditation, GLP compliance, and capacity building, enabling quality assurance, regulatory compliance, and trusted data for global trade.",
    solutions: 9,
    disciplines: ["ISO", "LIMS", "Quality systems"],
    color: "orange",
    overview: [
      "TRACE designs and executes comprehensive strategies to modernize laboratory infrastructure and strengthen quality management frameworks. We navigate the complex web of global regulatory requirements, including ISO/IEC 17025 and ISO/IEC 15189, to ensure public and private laboratories achieve strict compliance and global acceptance.",
      "TRACE's experts have strategically modernized Bangladesh's quality infrastructure, delivering end-to-end accreditation support and capacity upgrades that elevate the testing, validation, digital automation, and operational capabilities of dozens of public and private laboratories. Key strategic milestones include facilitating ISO/IEC 17025:2017 accreditation for 12 major laboratories (including regional BSTI facilities, BAEC, CDIL, Akij, and PRAN); deploying 7 automated Laboratory Information Management Systems (LIMS) to digitize workflows; and fully operationalizing the National Halal Laboratory. Additional standardization efforts include the development of the BFSA Online Lab Information Repository, which contains accreditation status, testing capabilities, and parameters for 47 laboratories, as well as ISO 17043 proficiency testing enablement for reference institutions such as BRiCM, INARS-BCSIR, and Intertek.",
      "TRACE partners with stakeholders to modernize/validate testing protocols, strengthen technical SOPs, and deploy specialized improved laboratory facilities, such as specialized customs lab design. Our solutions are designed to maximize laboratory competitiveness by accelerating result turnaround times, implementing automated workflows, and reducing compliance gaps. By combining technical expertise with digital integration, advanced equipment understanding, and comprehensive capacity building, TRACE empowers testing facilities, analysts, and government bodies to build resilient laboratory ecosystems and secure long-term international acceptance.",
    ],
    serviceItems: [
      "Designing high-efficiency, compliant laboratory spaces and state-of-the-art facilities tailored to diverse testing and research environments",
      "Providing end-to-end advisory for international accreditations (ISO/IEC 17025 & ISO/IEC 15189) to ensure operations fulfill stringent global quality standards and foster market trust",
      "Leading testing facilities through digital modernization via automated Laboratory Information Management Systems (LIMS) that integrate instrument data, sample tracking, and audit-readiness",
      "Developing and validating customized analytical methods and testing protocols to seamlessly align capabilities with shifting global export regulations and market demands",
      "Embedding structured Good Laboratory Practice (GLP) frameworks across operational workflows, including inventory control, robust documentation, and preventive calibration management",
      "Delivering hands-on, highly specialized training programs in advanced testing methodologies to strengthen core technical competencies and operational excellence",
      "Facilitating the strategic sourcing of ISO/IEC 17043-accredited proficiency testing (PT) programs across diverse matrices to independently verify and validate performance",
      "Providing strategic procurement guidance and rigorous technical evaluations of advanced analytical instrumentation customized to specific regulatory criteria",
      "Strategically aligning laboratory capabilities with national quality policies, international trade frameworks, and global buyer compliance standards",
    ],
    products: [
      { name: "Laboratory Design & Modernization" },
      { name: "ISO/IEC 17025 & 15189 Accreditation Consultancy" },
      { name: "LIMS Development & Implementation" },
      { name: "Method Development & Validation" },
      { name: "Good Laboratory Practice (GLP) Integration" },
      { name: "Analytical & Microbiological Capacity Building" },
      { name: "PT Sample Procurement & Consultancy Support" },
      { name: "Equipment Sourcing & Technical Evaluation" },
      { name: "Regulatory & Trade Advisory" },
    ],
  },
  {
    slug: "market-access-sps",
    title: "Market Access & SPS Compliance Service",
    strapline: "Expanding Market Access Worldwide",
    description: "TRACE helps agricultural businesses and exporters navigate complex international regulatory requirements, successfully ensuring seamless global market access through compliance, quality assurance, traceability, and resilient supply chains.",
    solutions: 12,
    disciplines: ["SPS", "Traceability", "Export readiness"],
    color: "sand",
    overview: [
      "TRACE helps exporters, importers, producers, processors, and agribusinesses expand market access by navigating complex international regulatory requirements and overcoming non-tariff barriers that affect cross-border trade. Our expertise spans import and export compliance, sanitary and phytosanitary (SPS) requirements, quality infrastructure, traceability, customs procedures, and destination market regulations to ensure products move efficiently across borders and reach global markets with confidence.",
      "We provide end-to-end market access solutions covering production, contract farming, quality assurance, laboratory testing, certification, traceability, temperature-controlled logistics, customs documentation, and destination market compliance. By aligning products and supply chains with international standards, including Codex Alimentarius, WOAH, IPPC, EU regulations, U.S. FDA requirements, and WTO SPS and Trade Facilitation Agreement (TFA) provisions, we help clients reduce compliance risks, minimize border delays, avoid unnecessary testing and product rejections, and accelerate access to international markets.",
      "TRACE brings together experts with extensive experience supporting market access through SPS modernization and trade compliance initiatives. Our experts have implemented more than 10 SPS and trade compliance initiatives, including risk-based approaches to eliminate unnecessary and duplicative testing requirements; automated contract farming and traceability systems; electronic certification and e-health certification platforms; National Residue Control Plans (NRCP); Good Agricultural Practices (GAP); Good Aquaculture Practices (GAQP); and Good Hygienic Practices (GHP). These initiatives strengthen regulatory compliance, improve product quality and traceability, and facilitate market access for agricultural and food products.",
      "By combining technical expertise, regulatory knowledge, and practical implementation experience, TRACE enables businesses to access new markets, strengthen buyer confidence, improve export competitiveness, and build resilient, compliant supply chains that support sustainable international trade.",
    ],
    serviceItems: [
      "International Market Access Strategy and Export Development",
      "Import Documentation, HS Classification, and Customs Compliance",
      "Product Registration, Certification, and Market Authorization",
      "Non-Tariff Barrier (NTB) Assessment and Resolution",
      "SPS Compliance and Food Safety Management",
      "Buyer Requirement Mapping and Destination Market Compliance",
      "Export Documentation, Certification, and Border Readiness",
      "Risk-Based Import Inspection and Border Clearance Optimization",
      "Quality Infrastructure, Laboratory Testing, and Accreditation Support",
      "Digital Traceability, Supply Chain Visibility, and Product Authentication",
      "Contract Farming, Supply Chain Compliance, and Export Readiness",
      "Maximum Residue Limit (MRL), Chemical, and Contaminant Compliance",
    ],
    products: [
      { name: "Trade Compliance and Non-Tariff Barrier (NTB) Assessment System" },
      { name: "Digital Market Access Management System" },
      { name: "Product & Country Market Access Requirements Portal" },
      { name: "National Residue Control Plan (NRCP) Management System" },
      { name: "Digital Traceability and Product Authentication System" },
      { name: "Contract Farming and Supply Chain Management System" },
      { name: "SPS Compliance Management System" },
      { name: "Inspection and Compliance Management System" },
      { name: "Laboratory Testing and Sample Management System" },
      { name: "Maximum Residue Limit (MRL) Compliance Monitoring Dashboard" },
      { name: "Import Documentation, HS Classification, and Customs Compliance Platform" },
      { name: "Product Registration and Market Authorization Management System" },
    ],
  },
  {
    slug: "technology-solutions",
    title: "Technology Solutions",
    strapline: "Transforming Systems through Smart Technology Solutions",
    description: "TRACE deploys advanced digital platforms and automation systems, seamlessly integrating technology with institutional reform to streamline workflows, strengthen regulatory performance, and accelerate cross-border trade.",
    solutions: 8,
    disciplines: ["Platforms", "Automation", "Data"],
    color: "teal",
    overview: [
      "TRACE designs, develops, and deploys innovative digital platforms and automation solutions that modernize government services, strengthen institutional performance, and support the implementation of trade facilitation and regulatory reforms. By integrating technology with business process reengineering and institutional reform, we help clients transition from paper-based operations to agile, data-driven digital ecosystems.",
      "Our solutions streamline workflows, strengthen inter-agency coordination, and enable evidence-based decision-making through secure, interoperable platforms. We develop digital trade facilitation tools, regulatory information systems, electronic licensing and certification platforms, laboratory information management systems (LIMS), risk management systems, electronic pre-arrival processing, workflow automation, and enterprise data management solutions that improve efficiency, transparency, and regulatory compliance.",
      "TRACE's experts designed and deployed 14 digital platforms and automation solutions that support the digital issuance of more than one million certificates, licenses, permits, and regulatory approvals annually for Government of Bangladesh agencies. Key systems include the BSTI e-Application Management System, the Online Licensing Module (OLM) of the CCI&E, Ministry of Commerce, the DLS e-Trade Portal, the National Food Import Information Management System (NFIIMS), the DoF e-Certification System, the BFSA e-Health Certification System, the Digital Contract Farming and Traceability System, and interoperability solutions supporting the integration of SPS agencies with the Bangladesh Single Window (BSW).",
      "Designed for scalability and sustainability, our platforms enable secure data exchange, real-time monitoring, and seamless interoperability with national and international systems, including Bangladesh Customs, the BSW, and other government information systems. Every solution is tailored to each institution's operational needs, ensuring ease of use, long-term sustainability, and alignment with international best practices in digital government and regulatory modernization.",
    ],
    serviceItems: [
      "Enterprise Digital Transformation and e-Government Solutions",
      "Electronic Licensing, Certification, and Permit System Development",
      "Risk Management, Inspection, and Compliance Automation",
      "Business Process Reengineering (BPR) and Workflow Automation",
      "Digital Trade Systems and Regulatory Information Platforms",
      "System Integration and National Single Window (NSW) Interoperability",
      "Digital Strategy, Change Management, and Capacity Building",
      "ICT Project Design, Enterprise Architecture, and Technical Advisory",
    ],
    products: [
      { name: "Laboratory Information Management System (LIMS)" },
      { name: "Government e-Licensing & Certification Platform" },
      { name: "Import-Export Information Management System" },
      { name: "Trade Traceability Management System" },
      { name: "Inspection and Compliance Management System" },
      { name: "Trade Intelligence & Analytics Dashboard", innovationSlug: "tariff-trade-intelligence-platform" },
      { name: "Enterprise Workflow Management System" },
      { name: "Digital Case Management System" },
    ],
  },
  {
    slug: "research-innovation",
    title: "Research & Innovation",
    strapline: "In-Depth Trade, Economic & Development Research & Innovation",
    description: "TRACE strengthens institutional capacity through targeted training, policy research, and technology-driven innovation, enabling public and private stakeholders to adopt sustainable international best practices.",
    solutions: 5,
    disciplines: ["Research", "Foresight", "Innovation"],
    color: "navy",
    overview: [
      "TRACE delivers evidence-based research, diagnostics, and policy analysis to support informed decision-making and practical reform across the trade ecosystem. We work with governments, development partners, and the private sector to assess regulatory frameworks, institutional capacities, trade procedures, and sector-specific constraints and to develop practical, context-responsive recommendations aligned with international best practices.",
      "Our work includes tariff and trade policy analysis, time release studies, assessments of sanitary and phytosanitary policies and systems, laboratory capacity assessments, sector-specific policy and regulatory reviews, and reform assessments of national trade legislation and instruments, conducted for the government, national, and international partners. TRACE also supports the development of analytical frameworks, implementation of roadmaps, monitoring tools, and technology-enabled solutions that help institutions translate research findings into measurable reform actions.",
      "The TRACE team also has expertise in assessing the potential benefits, costs, and broader implications of trade facilitation reforms. Their work includes quantifying the benefits of risk-based clearance for agricultural products, benchmarking international best practices, analyzing the trade implications of LDC graduation, conducting cost-benefit and regulatory impact assessments, and evaluating the institutional, procedural, and economic implications of proposed reforms.",
      "We deliver evidence-based recommendations and tailored solutions that support effective policymaking, stronger institutional performance, and sustainable trade reform, drawing on robust analysis, sector expertise, stakeholder engagement, and practical implementation experience.",
    ],
    serviceItems: [
      "Conducting tariff, trade policy, market access, logistics, and competitiveness analysis",
      "Undertaking Time Release Studies and assessments of border clearance procedures",
      "Assessing SPS policies, regulatory systems, laboratory capacities, and institutional performance",
      "Conducting sector-specific policy, legal, and regulatory reform assessments",
      "Reviewing national trade legislation and policy instruments",
      "Quantifying the costs, benefits, and economic impacts of trade facilitation measures",
      "Assessing international best practices and developing context-specific reform recommendations",
      "Analyzing the trade and competitiveness implications of LDC graduation",
      "Designing surveys, analytical frameworks, implementation roadmaps, and monitoring tools",
      "Producing research papers, briefs, and knowledge products to inform policy and practice",
      "Engaging with academia, think tanks, and industry partners to promote collaborative innovation",
      "Building institutional capacity for research, data analysis, and innovation management",
      "Developing technology-enabled analytical and decision-support solutions for public institutions",
      "Facilitating stakeholder consultations to validate findings and build consensus around reform priorities",
    ],
    products: [
      { name: "Trade and Tariff Analysis", innovationSlug: "tariff-trade-intelligence-platform" },
      { name: "Time Release Studies" },
      { name: "Policy and Regulatory Assessments" },
      { name: "Impact and Cost-Benefit Studies" },
      { name: "Reform Roadmaps and Tracking Tools" },
    ],
  },
  {
    slug: "training-capacity-building",
    title: "Training & Capacity Building",
    strapline: "Capacity Building for Resilient Trade Systems",
    description: "TRACE delivers evidence-based training and capacity-building programs, equipping public and private stakeholders with technical expertise to enhance operational efficiency and global compliance.",
    solutions: 4,
    disciplines: ["Training", "e-Learning", "Institutional development"],
    color: "teal",
    overview: [
      "TRACE designs and delivers targeted, evidence-based training programs that strengthen both institutional performance and human capital across the trade ecosystem. Our tailored programs equip government agencies, private sector stakeholders, and service providers with the technical expertise, managerial capabilities, and analytical tools required to thrive in an increasingly complex, technology-driven business environment.",
      "By convening industry leaders, policy specialists, and experienced practitioners, TRACE fosters a dynamic learning environment that bridges the gap between policy, practice, and innovation. Our approach emphasizes practical application, ensuring that knowledge gained translates into improved operational efficiency and measurable institutional outcomes.",
      "Our capacity-building initiatives span a wide range of critical areas, including trade facilitation procedures, quality infrastructure, risk management, digital systems, laboratory operations, and alignment with international frameworks such as WTO standards. Through this comprehensive approach, TRACE enables organizations to build resilient systems, enhance compliance, and drive sustainable, long-term impact.",
    ],
    serviceItems: [
      "Conducting training for government officials and private stakeholders on export-import procedures and regulatory compliance",
      "Delivering IT and system user training on digital trade platforms",
      "Providing laboratory and quality-management training to strengthen technical and accreditation capacities",
      "Designing customized modules on risk management, SPS and TBT measures, and WTO trade facilitation provisions",
      "Organizing workshops and simulations to build skills in data analysis, process simplification, and performance monitoring",
      "Supporting train-the-trainer programs to institutionalize knowledge within government agencies and trade associations",
      "Developing e-learning materials, manuals, and toolkits for sustainable capacity development",
    ],
    products: [
      { name: "Digital Trade Platform Training Solutions" },
      { name: "E-Learning & Compliance Knowledge Products" },
      { name: "Institutional Sustainability Tools" },
      { name: "Technical Laboratory & Quality Management Solutions" },
    ],
  },
  {
    slug: "technical-assistance-project-management",
    title: "Technical Assistance & Project Management",
    strapline: "Managing Change through Strategic Project Execution",
    description: "TRACE translates complex development priorities into practical, results-oriented solutions that enhance competitiveness, efficiency, and regulatory compliance across sectors.",
    solutions: 7,
    disciplines: ["Project management", "Advisory", "Delivery"],
    color: "navy",
    overview: [
      "TRACE provides end-to-end technical assistance and project management services to governments, development partners, and private sector institutions. We support the design and implementation of projects focused on trade facilitation, customs modernization, SPS and TBT systems, regulatory reform, digital transformation, institutional strengthening, and private sector competitiveness.",
      "Our services cover the full project cycle, from needs assessment, stakeholder consultation, and project design to implementation planning, technical delivery, monitoring, reporting, and close-out. TRACE mobilizes multidisciplinary experts, coordinates with government and private sector stakeholders, and ensures that activities remain aligned with project objectives, timelines, budgets, and expected results.",
      "TRACE professionals bring practical experience in managing and implementing donor-funded technical assistance projects, working with multiple government agencies and diverse stakeholder groups. Their experience includes policy and regulatory reform, institutional assessments, development of digital systems, laboratory modernization, risk management, process simplification, training, communications, and public-private dialogue.",
      "Through structured project governance, adaptive management, and close coordination with implementing partners, TRACE helps translate project objectives into practical and measurable results. Our approach places strong emphasis on local ownership, institutional capacity, knowledge transfer, and the sustainability of reforms beyond project completion.",
    ],
    serviceItems: [
      "Project design and management across trade, economic development, governance, agriculture, social development, and public service delivery",
      "Needs assessments, feasibility studies, socioeconomic research, and institutional diagnostics",
      "Technical proposals, work plans, budgets, results frameworks, and sustainability strategies",
      "Technical assistance on policy reform, institutional strengthening, digital transformation, and service delivery",
      "Mobilization and management of national and international experts",
      "Coordination with government, development partners, civil society, academia, and the private sector",
      "Management of implementation, timelines, budgets, risks, deliverables, and quality",
      "Monitoring, evaluation, learning, reporting, and impact tracking",
      "Stakeholder consultations, training, workshops, and policy dialogues",
      "Knowledge products, operational tools, communications, and capacity transfer",
    ],
    products: [
      { name: "Project Design and Planning" },
      { name: "Proposal Development" },
      { name: "Business Plan Development" },
      { name: "Work Plans and Budget Preparation" },
      { name: "Project Implementation Support" },
      { name: "Monitoring and Reporting" },
      { name: "Expert and Stakeholder Coordination" },
    ],
  },
  {
    slug: "temperature-controlled-logistics",
    title: "Temperature-Controlled Logistics Solutions",
    strapline: "Cold chain Solutions for Sustainable Trade",
    description: "TRACE takes a holistic approach to the management of the cold chain ecosystem, covering activities including production, aggregation, processing, storage, transportation, and distribution; providing technical assistance and advisories to ensure that systems deliver consistent temperature and quality maintenance throughout the supply chain.",
    solutions: 7,
    disciplines: ["Cold chain", "Logistics", "Infrastructure planning"],
    color: "orange",
    overview: [
      "TRACE provides specialized advisory and implementation support for the design, development, and optimization of temperature-controlled logistics (TCL) and cold-chain systems. We help governments, development partners, and the private sector strengthen cold-chain infrastructure, improve food safety, reduce post-harvest losses, and enhance the competitiveness of high-value agricultural, fisheries, livestock, and other perishable products in domestic and international markets.",
      "Our multidisciplinary approach integrates technical engineering, infrastructure planning, supply chain optimization, regulatory advisory, investment planning, and digital technologies to develop efficient, climate-resilient, and commercially sustainable cold-chain ecosystems. From production and aggregation to storage, transportation, processing, distribution, and export logistics, TRACE delivers end-to-end solutions that preserve product quality, maintain temperature integrity, and improve operational performance across the value chain.",
      "TRACE brings together specialists with extensive experience leading technical assessments, investment planning, and implementation of international-standard temperature-controlled logistics systems across Bangladesh. Collectively, our experts have supported government agencies, development partners, and more than 30 private sector enterprises in designing and implementing integrated cold-chain solutions, facilitating TCL investments exceeding US$2.5 million and establishing more than 5,560 cubic meters (approximately 1,120 MT) of cold-chain infrastructure. Our team has also pioneered renewable energy-powered cold rooms, supporting climate-smart agricultural value chains while improving market access and reducing food loss.",
      "By combining international best practices with practical implementation experience, TRACE develops scalable temperature-controlled logistics solutions that strengthen supply chain resilience, improve food safety and regulatory compliance, increase export competitiveness, and promote sustainable economic growth.",
    ],
    serviceItems: [
      "Technical assessments and cold-chain gap analysis across value chains",
      "Technical and financial feasibility studies for TCL infrastructure development",
      "Investment planning for temperature-controlled storage and logistics projects",
      "Technical assistance on the design, operation, and management of cold chain projects",
      "Review, analysis, and formulation of regulatory frameworks and legal codes governing cold chain operations",
      "Guidance and advisory for food safety standards, trade requirements, and certification compliance",
      "Support for integration of digital traceability tools for temperature-controlled logistics",
      "Capacity development and awareness building for public and private operators and stakeholders in areas of cold chain management and maintenance",
    ],
    products: [
      { name: "Technical and Investment Feasibility Assessment" },
      { name: "Investment and Partnership Management Support" },
      { name: "Business Management and Capacity Development Support" },
      { name: "Technical Capacity Development and Awareness Building Programs" },
      { name: "Cold/Temperature-Controlled Storage Set-Up Design and Planning Advisory" },
      { name: "Cold/Temperature-Controlled Storage and Transportation Operations Support" },
      { name: "Cold/Temperature-Controlled Storage and Transportation Project Development Advisory" },
    ],
  },
];

export const projects: Project[] = [
  { slug: "trs-customs-reform", title: "Time Release Study at Key Custom Houses: Strengthening Evidence-Based Customs Modernization in Bangladesh (SD-13)", client: "National Board of Revenue (NBR), The World Bank", period: "Oct 2026 – Jul 2028", status: "Ongoing", serviceSlugs: ["trade-facilitation", "research-innovation"], teamSlugs: ["masud-sadiq", "fuad-khalid", "mahraj-samrat"], summary: "A 21-month, six-location Time Release Study measuring clearance times and benchmarking reform progress against the 2022 TRS baseline across Chattogram Seaport, Dhaka Airport, Benapole, Bhomra, Burimari and ICD Kamalapur.", theme: "navy" },
  { slug: "taraps-policy-reform", title: "Repurposing Agricultural Public Support for a Sustainable Food System: Policy Reform Consultancy for TARAPS (SD/TARAPS-C2-MoA/03)", client: "Ministry of Agriculture, Department of Agricultural Extension, The World Bank", period: "Oct 2026 – Jan 2028", status: "Ongoing", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], teamSlugs: ["fuad-khalid", "nahrin-swarna", "rubayat-anik"], summary: "Policy reform, institutional strengthening, and public expenditure monitoring to redirect agricultural subsidies toward more sustainable, equitable, and climate-responsive outcomes.", theme: "teal" },
  { slug: "national-tariff-modernization", title: "National Tariff Modernization and Trade Systems Integration", client: "National Board of Revenue (NBR)", period: "2026", status: "Ongoing", serviceSlugs: ["trade-facilitation", "technology-solutions"], teamSlugs: ["fuad-khalid", "mahraj-samrat", "tahsina-shiva"], summary: "TRACE Consulting, as a sub-consultant to AARC Ltd., is supporting the National Board of Revenue (NBR) in implementing a major tariff and trade-systems modernization effort.", theme: "navy" },
  { slug: "btp-elearning-platform", title: "Strengthening Trade Facilitation Capacity through the Bangladesh Trade Portal e-Learning Platform (SD-59)", client: "Ministry of Commerce, The World Bank", period: "2026", status: "Ongoing", serviceSlugs: ["technology-solutions", "trade-facilitation", "technical-assistance-project-management"], teamSlugs: ["fuad-khalid", "tahsina-shiva"], summary: "Developing 20+ bilingual interactive e-learning modules through the Bangladesh Trade Portal (BTP) to build trade literacy on WTO agreements, import-export procedures, risk-based compliance, and AEO certification.", theme: "navy" },
  { slug: "bsti-textile-testing", title: "Strengthening Export-Oriented Textile Testing Capacity at BSTI Laboratory", client: "Bangladesh Standards and Testing Institution (BSTI)", period: "2025–2026", status: "Completed", serviceSlugs: ["laboratory-improvement", "research-innovation", "training-capacity-building"], teamSlugs: ["mimma-afrin", "sushanta-sarker"], summary: "Strategic assessment to strengthen the export-oriented textile testing capacity of the BSTI laboratory and improve alignment with international buyer requirements.", theme: "teal" },
  { slug: "animal-health-reform", title: "Trade Policy and Regulatory Reform for the Animal Health Sector", client: "Animal Health Companies Association of Bangladesh (AHCAB)", period: "2026", status: "Completed", serviceSlugs: ["policy-regulatory-reform", "research-innovation", "trade-facilitation"], teamSlugs: ["fuad-khalid", "rubayat-anik"], summary: "Technical and policy advisory support to AHCAB to strengthen the animal health sector's trade and regulatory systems.", theme: "sand" },
  { slug: "bafisa-intelligence", title: "Development of an HS Code-Based Import Intelligence Database and Digital Platform for BAFISA", client: "Bangladesh Foodstuff Importers and Suppliers Association (BAFISA)", period: "2025", status: "Completed", serviceSlugs: ["technology-solutions", "trade-facilitation"], teamSlugs: ["mahraj-samrat", "tahsina-shiva", "ahmed-nine"], summary: "Supported BAFISA's digital modernization through an HS code-based import intelligence system and enhanced trade data platform.", theme: "navy" },
  { slug: "prtc-accreditation", title: "ISO/IEC 17025:2017 Accreditation and Laboratory Systems Strengthening for PRTC, CVASU", client: "Poultry Research & Training Centre, CVASU", period: "2025–2026", status: "Completed", serviceSlugs: ["laboratory-improvement"], teamSlugs: ["mimma-afrin", "mahmudur-rahman"], summary: "Technical assistance to strengthen laboratory systems and support ISO/IEC 17025:2017 accreditation readiness for PRTC, CVASU.", theme: "teal" },
  { slug: "export-compliance", title: "Strengthening Export Compliance and International Market Readiness for Agricultural Enterprises", client: "Department of Agricultural Marketing (DAM)", period: "2026", status: "Completed", serviceSlugs: ["market-access-sps", "training-capacity-building"], teamSlugs: ["nabeel-khan", "tanjum-tushi"], summary: "Capacity-building program for agricultural entrepreneurs and processors aimed at unlocking international markets for Bangladesh's agricultural products.", theme: "sand" },
];

const allTeamProfiles: TeamMember[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. EXECUTIVE LEADERSHIP & BUSINESS DEVELOPMENT
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "fuad-khalid", name: "Fuad M Khalid Hossen", role: "Chief Executive Officer", specialty: "Trade facilitation & policy reform", initials: "FK", department: "Executive Leadership & Business Development", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization", "animal-health-reform"], bio: "Widely recognized as Bangladesh's leading expert in trade facilitation and trade policy reform, with more than 14 years of experience in system modernization, export-led growth, and regulatory reform.", color: "teal", image: ASSETS.teamFuad, tags: ["Trade Facilitation", "International Trade Policy Reform", "Digital Trade Systems"] },
  { slug: "ferdous-alam", name: "S.M. Ferdous Alam", role: "Head of Government Engagement", specialty: "Government engagement", initials: "FA", department: "Executive Leadership & Business Development", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "Two-time National Integrity Award recipient and a former Grade-1 Bangladesh Civil Service officer with more than 32 years of leadership in quality infrastructure, institutional modernization, and public-sector governance.", color: "navy", image: ASSETS.teamFerdous, tags: ["Quality Infrastructure", "Institutional Modernization", "Public Sector Governance"] },
  { slug: "abu-saleh-saifullah", name: "Abu Saleh Muhammad Saifullah", role: "Director & Chief Operating Officer", specialty: "Strategic leadership & digital transformation", initials: "AS", department: "Executive Leadership & Business Development", serviceSlugs: ["policy-regulatory-reform", "technology-solutions"], projectSlugs: [], bio: "Director and Chief Operating Officer with over 20 years of experience in strategic leadership, digital transformation, and managing complex, large-scale development projects for government agencies and international stakeholders.", color: "navy", image: ASSETS.teamAbuSaleh, tags: ["Strategic Leadership", "Digital Transformation", "Compliance & Reform"] },
  { slug: "nabeel-khan", name: "Nabeel Khan", role: "Head of Partnerships & Strategic Growth", specialty: "Cold-chain & private-sector development", initials: "NK", department: "Executive Leadership & Business Development", serviceSlugs: ["market-access-sps", "temperature-controlled-logistics"], projectSlugs: ["export-compliance"], bio: "Brings over a decade of comprehensive experience in trade, retail, training, investment, and private-sector development.", color: "orange", image: ASSETS.teamNabeel, tags: ["Temperature Controlled Logistic Solution", "Business Strategy & Management", "Private Sector Development"] },
  { slug: "michael-parr", name: "Michael J. Parr", role: "Strategic Advisor", specialty: "Project management & finance", initials: "MP", department: "Executive Leadership & Business Development", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: [], bio: "Global development leader with 35+ years' experience delivering large-scale programs in agribusiness, trade, and regulatory reform, known for building cross-sector partnerships and driving sustainable economic transformation across multiple regions.", color: "navy", image: ASSETS.teamMichael, tags: ["Project Management", "Finance & Internal Audit"] },
  { slug: "mobarak-uddin", name: "A.S. Mobarak Uddin Ahmed", role: "Chief Financial Officer", specialty: "Financial stewardship", initials: "MU", department: "Executive Leadership & Business Development", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "Accomplished finance and operations leader with 30+ years of experience. Specializes in strategic financial management, regulatory compliance, and organizational operations.", color: "navy", tags: ["Financial Management", "Internal Audit and Compliance", "Procurement & Organizational Operations"] },
  { slug: "sushanta-sarker", name: "Sushanta Kumer Sarker", role: "Director & Head of MREL (Monitoring, Research, Evaluation & Learning)", specialty: "Monitoring, research, evaluation & learning", initials: "SS", department: "Executive Leadership & Business Development", serviceSlugs: ["research-innovation"], projectSlugs: ["bsti-textile-testing"], bio: "Results-management and private-sector development specialist with over 18 years of professional experience in qualitative and quantitative research methods, program supervision, and economic analysis.", color: "orange", image: ASSETS.teamSushanta, tags: ["Qualitative & Quantitative Research", "Program Supervision", "Economic Analysis"] },
  { slug: "recardo-halder", name: "Recardo Saurav Antor Halder", role: "Manager, Business Development", specialty: "Business development & stakeholder engagement", initials: "RH", department: "Executive Leadership & Business Development", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: [], bio: "Possesses extensive expertise in trade policy, research, and program operations, combining policy insight with strategic communication and stakeholder engagement.", color: "orange", image: ASSETS.teamRecardo, tags: ["Business Development", "Program Operations & Procurement", "Stakeholder Engagement"] },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. TRADE FACILITATION & CUSTOMS MODERNIZATION
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "masud-sadiq", name: "Md. Masud Sadiq", role: "Senior Trade Facilitation, Customs & Trade Policy Lead", specialty: "Customs administration", initials: "MS", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["national-tariff-modernization", "trs-customs-reform"], bio: "Accomplished trade facilitation strategist and former Grade-1 Member of the National Board of Revenue (NBR), with more than 30 years of premier leadership in customs administration.", color: "navy", image: ASSETS.teamMasud, tags: ["Customs Administration", "Trade Facilitation", "Multi-agency Coordination"] },
  { slug: "mahraj-samrat", name: "Mohammed Mahraj-ul-Alam Samrat", role: "Head of Trade Facilitation & Regulatory Compliance", specialty: "Customs modernization", initials: "MS", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation", "technology-solutions"], projectSlugs: ["national-tariff-modernization", "bafisa-intelligence"], bio: "Trade facilitation expert with over 12 years of experience in customs modernization and logistics. Formerly with the NBR.", color: "orange", image: ASSETS.teamMahraj, tags: ["Customs Specialist", "Trade Facilitation", "Multimodal Logistics Development"] },
  { slug: "nahrin-swarna", name: "Nahrin Rahman Swarna", role: "Technical Director", specialty: "Trade policy & automation", initials: "NS", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation", "technology-solutions"], projectSlugs: ["national-tariff-modernization", "taraps-policy-reform"], bio: "Senior development professional with ten years of experience, excelling in leading international trade and trade facilitation initiatives.", color: "navy", tags: ["Trade Policy Analysis & Regulatory Reform", "International Trade Compliance", "Risk-Based Clearance"] },
  { slug: "rubayat-anik", name: "Rubayat E Shams Anik", role: "Senior Portfolio Manager - Trade Facilitation", specialty: "Policy research & analysis", initials: "RA", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["policy-regulatory-reform", "research-innovation"], projectSlugs: ["animal-health-reform", "taraps-policy-reform"], bio: "Experienced researcher and project manager specializing in applied policy analysis, multi-country stakeholder engagement, and international event coordination.", color: "teal", image: ASSETS.teamRubayat, tags: ["Policy Research & Analysis", "Stakeholder Engagement", "Project Management"] },
  { slug: "mahanaz-lopa", name: "Mahanaz Akter Lopa", role: "Trade Facilitation Specialist", specialty: "Trade facilitation & investment analysis", initials: "ML", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: ["taraps-policy-reform"], bio: "Serves as a trade facilitation specialist with over four years of experience in trade facilitation and international affairs management.", color: "teal", tags: ["Trade Policy Analysis & Regulatory Reform", "Investment Analysis", "Stakeholder Consultations"] },
  { slug: "satish-reddy", name: "Satish Kumar Reddy", role: "Senior Trade Facilitation & Customs Expert", specialty: "Customs modernization & cross-border architecture", initials: "SR", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation"], projectSlugs: [], bio: "A former Indian Revenue Service commissioner with 32 years of experience, specializing in customs modernization, border systems, and digital trade infrastructure, advising governments and international agencies on efficient, compliant trade ecosystems.", color: "navy", tags: ["Customs Modernization", "Cross-Border Architecture"] },
  { slug: "mohammed-shahabuddin", name: "Mohammed Shahabuddin", role: "Senior Trade Facilitation & Customs Expert", specialty: "Customs administration & tax policy", initials: "MS", department: "Trade Facilitation & Customs Modernization", serviceSlugs: ["trade-facilitation", "policy-regulatory-reform"], projectSlugs: [], bio: "Seasoned Bangladeshi revenue administration expert with extensive experience in customs, value-added tax (VAT), and excise duties, contributing practical insights into tax policy reform, institutional modernization, and trade facilitation.", color: "navy", tags: ["Customs Administration", "SME Budget Engineering"] },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. QUALITY INFRASTRUCTURE & SPS
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "shafi-uddin", name: "Dr. Md. Shafi Uddin", role: "Technical Expert — Plant Quarantine & SPS Compliance Systems", specialty: "SPS compliance", initials: "SU", department: "Quality Infrastructure & SPS", serviceSlugs: ["market-access-sps"], projectSlugs: [], bio: "Bangladeshi agricultural expert with over 32 years of experience in the Department of Agricultural Extension (DAE), specializing in plant health, quarantine, biosecurity, and SPS compliance.", color: "teal", image: ASSETS.teamShafi, tags: ["Plant Health & Biosecurity", "SPS Compliance & International Agricultural Trade", "Training & Capacity Building"] },
  { slug: "mimma-afrin", name: "Mimma Afrin", role: "Technical Lead, Laboratory Operations", specialty: "Laboratory systems & accreditation", initials: "MA", department: "Quality Infrastructure & SPS", serviceSlugs: ["laboratory-improvement"], projectSlugs: ["bsti-textile-testing", "prtc-accreditation"], bio: "Highly regarded quality and laboratory management specialist with over 10 years of experience. Excels in ISO accreditation, food safety, LIMS, and international standards.", color: "teal", image: ASSETS.teamMimma, tags: ["Laboratory Accreditation (ISO/IEC 17025)", "Laboratory QMS", "LIMS Training"] },
  { slug: "mahmudur-rahman", name: "Md. Mahmudur Rahman", role: "Laboratory Specialist", specialty: "Laboratory quality systems", initials: "MR", department: "Quality Infrastructure & SPS", serviceSlugs: ["laboratory-improvement"], projectSlugs: ["prtc-accreditation"], bio: "Laboratory quality and compliance specialist with over 16 years of experience in laboratory operations, ISO accreditation, and food safety management.", color: "teal", tags: ["Laboratory Operations", "ISO Accreditation", "Food Safety Management"] },
  { slug: "tabassum-munira", name: "Tabassum Sirajam Munira", role: "QMS Expert (Medical Laboratory Accreditation)", specialty: "Regulatory & quality affairs", initials: "TM", department: "Quality Infrastructure & SPS", serviceSlugs: ["laboratory-improvement", "policy-regulatory-reform"], projectSlugs: [], bio: "Accomplished pharmaceutical quality and regulatory professional with over 22 years of experience spanning laboratory accreditation, WHO prequalification, and medical laboratory QMS.", color: "orange", tags: ["Laboratory QMS", "WHO Prequalification & Benchmarking Tool", "ISO/IEC 17025 & ISO 15189 Accreditation"] },
  { slug: "sankaran-subramanian", name: "Sankaran Subramanian", role: "Senior Laboratory Quality Systems & Accreditation Expert", specialty: "Calibration & proficiency testing", initials: "SS", department: "Quality Infrastructure & SPS", serviceSlugs: ["laboratory-improvement"], projectSlugs: [], bio: "Recognized for his extensive expertise in laboratory quality management and accreditation. Specializes in calibration, proficiency testing, and helping organizations achieve international standards while ensuring compliance across sectors.", color: "navy", tags: ["ISO Standardization", "Laboratory Auditing"] },
  { slug: "sohel-ahmed", name: "Dr. Sohel Ahmed", role: "Technical Expert — Public Health & Biomedical Research", specialty: "Molecular diagnostics & biomedical labs", initials: "SA", department: "Quality Infrastructure & SPS", serviceSlugs: ["laboratory-improvement", "research-innovation"], projectSlugs: [], bio: "Premier biomedical laboratory authority with 30+ years of experience designing advanced molecular diagnostics, clinical research systems, and global biomedical infrastructure.", color: "teal", tags: ["Molecular Diagnostics", "Laboratory Systems Design"] },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. POLICY, RESEARCH & OPERATIONS
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "ashis-ratan-sen", name: "Dr. Ashis Ratan Sen", role: "National Food Safety & Quality System Management Specialist", specialty: "Food safety & laboratory accreditation", initials: "AS", department: "Policy, Research & Operations", serviceSlugs: ["laboratory-improvement", "market-access-sps"], projectSlugs: [], bio: "An expert in senior laboratory and food safety, with five decades of experience in chemical testing and standards compliance, ensuring operational excellence and adherence to international safety benchmarks.", color: "navy", tags: ["Laboratory Accreditation", "Residue Analysis"] },
  { slug: "mehedi-hossain", name: "Dr. Md. Mehedi Hossain", role: "Technical Expert — Livestock Compliance & Trade", specialty: "Livestock systems & export policy", initials: "MH", department: "Policy, Research & Operations", serviceSlugs: ["market-access-sps", "policy-regulatory-reform"], projectSlugs: [], bio: "Former Director of the Department of Livestock Services (DLS) with 40+ years of experience in livestock systems, focusing on food safety, regulatory compliance, and aligning agricultural practices with international trade requirements.", color: "navy", tags: ["Export Policy Facilitation", "Epidemiological Disease Tracking"] },
  { slug: "nurul-islam", name: "Gazi Md. Nurul Islam", role: "Technical Expert — Laboratory Quality Management", specialty: "BSTI standards & regulatory compliance", initials: "NI", department: "Policy, Research & Operations", serviceSlugs: ["laboratory-improvement", "policy-regulatory-reform"], projectSlugs: [], bio: "A laboratory quality systems specialist with strong experience in BSTI standards, focusing on regulatory compliance, operational quality, and strengthening testing infrastructure.", color: "navy", tags: ["Quality Management", "Standards Compliance"] },
  { slug: "habibur-khondaker", name: "Dr. Habibur Rahman Khondaker", role: "Technical Expert — Aquaculture & Fisheries Development", specialty: "Fisheries & aquaculture systems", initials: "HK", department: "Policy, Research & Operations", serviceSlugs: ["market-access-sps"], projectSlugs: [], bio: "With over four decades of experience, a fisheries and aquaculture expert supporting sustainable production, food safety, and export compliance to improve global market access.", color: "teal", tags: ["Sustainable Aquaculture", "Fisheries Export Compliance"] },
  { slug: "nittya-biswas", name: "Nittya Ranjan Biswas", role: "Technical Expert — Aquaculture & Sanitary Compliance Systems", specialty: "SPS & aquaculture compliance", initials: "NB", department: "Policy, Research & Operations", serviceSlugs: ["market-access-sps"], projectSlugs: [], bio: "A specialist in aquaculture systems and Sanitary and Phytosanitary (SPS) compliance, focusing on quarantine, food safety, and regulatory alignment to meet international export standards.", color: "navy", tags: ["Sanitary Compliance", "Aquaculture Food Safety"] },
  { slug: "muftikhar-ahmed", name: "Dr. Muftikhar Ahmed", role: "Technical Expert — Laboratory Quality Development & Training", specialty: "International laboratory accreditation", initials: "MA", department: "Policy, Research & Operations", serviceSlugs: ["laboratory-improvement", "training-capacity-building"], projectSlugs: [], bio: "With over 2 decades of experience across four countries, an international laboratory accreditation expert specializing in quality development and training.", color: "orange", tags: ["Lab Accreditation", "Technical Training"] },
  { slug: "anamul-hoque", name: "Md. Anamul Hoque", role: "Technical Expert — Laboratory Quality Management & International Compliance Systems", specialty: "Compliance auditing", initials: "AH", department: "Policy, Research & Operations", serviceSlugs: ["laboratory-improvement"], projectSlugs: [], bio: "A laboratory assessor with 16 years of experience in international inspection and certification systems.", color: "navy", tags: ["Compliance Auditing", "Inspection Systems"] },
  { slug: "ahmed-nine", name: "Ahmed Julker Nine", role: "Research & Policy Analyst", specialty: "Trade facilitation reforms", initials: "AN", department: "Policy, Research & Operations", serviceSlugs: ["trade-facilitation", "research-innovation"], projectSlugs: ["bafisa-intelligence"], bio: "Research and policy analyst specializing in logistics, trade facilitation, and regulatory reform, with over five years of experience.", color: "navy", image: ASSETS.teamAhmedNine, tags: ["Policy Reform", "Regulatory Analysis", "Trade Facilitation Reforms"] },
  { slug: "fahmida-akter", name: "Fahmida Akter", role: "Legal & Operations Associate", specialty: "Program & project management", initials: "FA", department: "Policy, Research & Operations", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "Legal and operations associate at TRACE Consulting, bringing over five years of experience across legal support, program execution, and operations management.", color: "teal", tags: ["Program & Project Management", "Legal & Regulatory Compliance", "Operations Management"] },
  { slug: "umme-tama", name: "Umme Mahbuba Tama", role: "Research Associate", specialty: "Research & analysis", initials: "UT", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "Research professional with five years of experience in administrative logistics, human resources, and research coordination.", color: "teal", image: ASSETS.teamUmme, tags: ["Human Resource & Management", "Research Analysis", "Procurement & Organizational Operations"] },
  { slug: "tanjum-tushi", name: "Tanjum Tushi", role: "Research Associate", specialty: "Research & data analysis", initials: "TT", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation"], projectSlugs: ["export-compliance"], bio: "Research professional with experience in governance, trade facilitation, and social development. Has supported government and private stakeholders through evidence-based research.", color: "teal", tags: ["Research & Data Analysis", "Trade Facilitation", "Technical Proposal Writing"] },
  { slug: "riya-biswas", name: "Riya Biswas", role: "Research Intern", specialty: "Climate & policy research", initials: "RB", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "Research Intern at TRACE Consulting, contributing to evidence-based research and analysis in the areas of climate change, economic policy, and development economics.", color: "navy", tags: ["Data Management", "Project Operations", "Research & Policy Analysis"] },
  { slug: "mahamudul-hasan", name: "Md. Mahamudul Hasan", role: "Research Intern", specialty: "Social research & policy", initials: "MH", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "Research intern at TRACE Consulting with experience in social research, data analysis, and evidence-based policy work in Bangladesh.", color: "teal", tags: ["Data Analysis", "Project Coordination", "Policy Research"] },
  { slug: "naved-afnan", name: "Naved Afnan", role: "Research Intern", specialty: "Strategic research", initials: "NA", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation"], projectSlugs: [], bio: "Research intern at TRACE Consulting and an economics undergraduate at East West University, bringing hands-on experience in strategic research and data assessment.", color: "navy", tags: ["Strategic Research", "Program Coordination", "Data Assessment"] },
  { slug: "mahbubul-shakib", name: "Md. Mahbubul Alam Shakib", role: "Expert — Research & Policy", specialty: "Agricultural research & trade", initials: "MS", department: "Policy, Research & Operations", serviceSlugs: ["research-innovation", "market-access-sps"], projectSlugs: [], bio: "Possessing a strong academic background, specializes in agricultural systems, value chains, and trade facilitation, delivering evidence-based insights to inform policy decisions and advance sustainable agricultural development.", color: "teal", tags: ["Agricultural Research & Development", "Trade Facilitation"] },
  { slug: "bushra-haque", name: "Bushra Haque", role: "Legislative Specialist", specialty: "Legislative reform", initials: "BH", department: "Policy, Research & Operations", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: ["animal-health-reform"], bio: "Legislative specialist supporting policy design, regulatory reform, and implementation alignment.", color: "navy" },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. DIGITAL SYSTEMS & TECHNOLOGY DELIVERY
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "tahsina-shiva", name: "Tahsina Shiva", role: "Senior IT Project Manager", specialty: "Business analysis & delivery", initials: "TS", department: "Digital Systems & Technology Delivery", serviceSlugs: ["technology-solutions"], projectSlugs: ["national-tariff-modernization", "bafisa-intelligence", "btp-elearning-platform"], bio: "IT project manager with a strong background in business analysis, technical documentation, and data-driven solution development.", color: "orange", image: ASSETS.teamTahsina, tags: ["Project Management", "Business Analysis", "Requirement Engineering"] },
  { slug: "shefayat-adib", name: "Shefayat E Shams Adib", role: "Full Stack Developer", specialty: "Full-stack engineering & applied AI", initials: "SA", department: "Digital Systems & Technology Delivery", serviceSlugs: ["technology-solutions"], projectSlugs: [], bio: "Full-stack developer at TRACE Consulting, with experience in web engineering, applied AI, and scalable system architecture.", color: "teal", tags: ["Full-Stack Development", "AI & Machine Learning", "Natural Language Processing"] },
  { slug: "tanvir-kabir", name: "Tanvir Kabir", role: "Digital Content & Multimedia Specialist", specialty: "Graphic design & motion graphics", initials: "TK", department: "Digital Systems & Technology Delivery", serviceSlugs: ["technology-solutions", "research-innovation"], projectSlugs: [], bio: "Digital content and multimedia specialist with over 12 years of experience in creative branding, graphic design, and storytelling.", color: "navy", image: ASSETS.teamTanvir, tags: ["Digital Content Creation", "Video Production", "Graphic Design & Motion Graphics"] },
  { slug: "akebul-sarder", name: "Md. Akebul Sarder", role: "Technical Expert — Innovations & Digital Solutions", specialty: "Scalable ICT systems", initials: "AS", department: "Digital Systems & Technology Delivery", serviceSlugs: ["technology-solutions"], projectSlugs: [], bio: "A digital transformation specialist with over 13 years of experience designing scalable ICT systems and platforms to modernize trade, agriculture, and public sector service delivery.", color: "teal", tags: ["ICT Solutions", "System Architecture & Development"] },

  // ───────────────────────────────────────────────────────────────────────────
  // 6. MARKETS, COMPLIANCE & SECTOR DEVELOPMENT
  // ───────────────────────────────────────────────────────────────────────────
  { slug: "faruque-hossain", name: "Mr. Md. Faruque Hossain", role: "Public Procurement Policy & Implementation Expert", specialty: "Procurement reform & e-governance", initials: "FH", department: "Markets, Compliance & Sector Development", serviceSlugs: ["policy-regulatory-reform"], projectSlugs: [], bio: "An accomplished government secretary spearheading public procurement reform, policy design, and regulatory oversight to deliver modern, transparent, and high-performing systems for national public spending.", color: "navy", tags: ["E-Procurement Portal", "Skills Governance"] },
  { slug: "mrinal-sircar", name: "Mrinal Sircar", role: "Senior Private Sector Development & Market Systems Expert", specialty: "SME competitiveness & inclusive growth", initials: "MS", department: "Markets, Compliance & Sector Development", serviceSlugs: ["market-access-sps"], projectSlugs: [], bio: "With over three decades of experience advancing SME competitiveness and inclusive growth through strategic reforms and business ecosystem strengthening, an expert in private sector development.", color: "teal", tags: ["Climate Business Advisory", "Microcredit Framework"] },
];

// Public team directory: show ALL profiles — members without portraits render as text-only info cards.
export const team: TeamMember[] = allTeamProfiles;

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

export type LatestUpdateCategory = "Publication" | "Article" | "Innovation" | "Event" | "Workshop" | "Meeting";

export type UpdateSection = {
  heading?: string;
  paragraphs: string[];
};

export type UpdateBody = {
  sections: UpdateSection[];
  team?: { name: string; role: string }[];
};

export type LatestUpdate = {
  slug: string;
  title: string;
  category: LatestUpdateCategory;
  date: string; // display format e.g. "Sep 02, 2026"
  isoDate: string; // sortable ISO date e.g. "2026-09-02"
  summary: string;
  image: string;
  url: string;
  external: boolean;
  body?: UpdateBody;
};

export const latestUpdates: LatestUpdate[] = [
  {
    slug: "trs-customs-reform-assignment",
    title: "TRACE Signs World Bank-Financed Time Release Study Assignment for Evidence-Based Customs Reform in Bangladesh",
    category: "Event",
    date: "Oct 07, 2026",
    isoDate: "2026-10-07",
    summary: "TRACE Consulting has secured a World Bank-financed contract for the Time Release Study at key Bangladeshi custom houses, measuring clearance times and driving evidence-based customs reform.",
    image: "/media/updates/trs-customs-reform.png",
    url: "/latest-updates/trs-customs-reform-assignment",
    external: false,
    body: {
      sections: [
        {
          heading: "A Milestone for TRACE Consulting",
          paragraphs: [
            "TRACE Consulting has secured a contract for the Time Release Study (TRS) at key Bangladeshi custom houses (Package SD-13) under the Customs Modernization and Infrastructure Development Project, financed by the World Bank. The firm will serve as sub-consultant to a TTT Global-led JV, with Md. Masud Sadiq as Team Leader.",
            "A time-release study is more than a conventional survey. It integrates customs procedure expertise, WCO methodology, extensive data analysis, and engagement with relevant stakeholders. TRACE Consulting brings deep experience in customs modernization, digital trade systems, and regulatory reform to this assignment.",
          ],
        },
        {
          heading: "Why the Study Matters",
          paragraphs: [
            "Previous 2022 data showed import clearance averaged 11 days at Benapole, 12 days at Chattogram, and 8 days at Dhaka Airport. Document preparation consumed 72–78% of total clearance time. This new assignment will measure changes since 2022, assess prior recommendation implementation, and examine modernization initiatives including Bangladesh’s National Single Window system.",
            "The study also supports implementation of the WTO Trade Facilitation Agreement’s Article 7.6 — a key international commitment for Bangladesh’s trade competitiveness.",
          ],
        },
        {
          heading: "Key Deliverables",
          paragraphs: [
            "The 21-month assignment covers six customs locations: Chattogram Seaport, Dhaka Airport, Benapole, Bhomra and Burimari Land Ports, and ICD Kamalapur. Deliverables include measuring release times for diverse products, analyzing system data, identifying bottlenecks, engaging stakeholders, and establishing sustainable measurement frameworks.",
            "The core objective centers on turning measurement into action — providing NBR with evidence-based insights on delays and effective reforms to strengthen Bangladesh’s trade competitiveness.",
          ],
        },
      ],
      team: [
        { name: "Md. Masud Sadiq", role: "Team Leader" },
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
      ],
    },
  },
  {
    slug: "taraps-agriculture-assignment",
    title: "TRACE signed the World Bank–financed TARAPS assignment to help Bangladesh’s Ministry of Agriculture repurpose public support for sustainable food systems",
    category: "Event",
    date: "Oct 05, 2026",
    isoDate: "2026-10-05",
    summary: "TRACE Consulting partnered with TTT Global and BUILD to support Bangladesh’s Ministry of Agriculture in redirecting agricultural public support toward more sustainable, equitable, and climate-responsive outcomes.",
    image: "/media/updates/taraps-agriculture.jpeg",
    url: "/latest-updates/taraps-agriculture-assignment",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "TRACE Consulting partnered with TTT Global and BUILD to secure a consultancy contract for TARAPS (Technical Assistance for Repurposing of Agricultural Public Support Towards a Sustainable Food Systems Transformation in Bangladesh). The agreement became effective on October 5, 2026.",
            "The initiative operates under the Department of Agricultural Extension within Bangladesh’s Ministry of Agriculture, with funding from the World Bank. TRACE’s scope includes reviewing agricultural policies and programs, examining public expenditure and subsidy frameworks, identifying policy and institutional shortcomings, proposing reform strategies, and enhancing systems for policy execution and assessment.",
          ],
        },
        {
          heading: "Redirecting Public Support Towards Sustainability",
          paragraphs: [
            "The engagement emphasizes redirecting agricultural subsidies toward outcomes that are more sustainable, efficient, equitable, and climate-responsive while strengthening ministerial capacity for data-driven decision-making.",
            "Agriculture significantly influences Bangladesh’s economy, food security, and rural communities. TRACE aims to reinforce the policy and institutional infrastructure governing public resource allocation throughout the agricultural sector.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
        { name: "Nahrin Rahman Swarna", role: "Technical Director" },
        { name: "Rubayat E Shams Anik", role: "Senior Portfolio Manager" },
        { name: "Mahanaz Akter Lopa", role: "Trade Facilitation Specialist" },
      ],
    },
  },
  {
    slug: "import-policy-order-2026-29-english",
    title: "Import Policy Order (2026–29) Unofficial English Translation",
    category: "Publication",
    date: "Sep 02, 2026",
    isoDate: "2026-09-02",
    summary: "The Import Policy Order (IPO) 2026–2029 governs virtually every import into Bangladesh. To help address the language gap, TRACE Consulting has prepared a complete, clause-by-clause unofficial English translation.",
    image: "https://traceconsultingltd.com/storage/923/IPO-Eng-SM-Post-%281200-x-800-px%29.jpg",
    url: "/latest-updates/import-policy-order-2026-29-english",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "The Import Policy Order (IPO) 2026–2029 establishes regulatory frameworks governing imports into Bangladesh. This policy document outlines the conditions, procedures, restrictions, exemptions, and other requirements that importers, businesses, foreign investors, and compliance teams need to navigate.",
            "A significant challenge has persisted: the IPO was gazetted in Bangla only, without an English translation released alongside it. This mirrors the previous iteration from 2021–2024, which similarly lacked an official English version.",
          ],
        },
        {
          heading: "Closing the Language Gap",
          paragraphs: [
            "The absence of an authorized translation creates practical difficulties. Businesses frequently resort to independent translators or automated translation tools to interpret intricate regulatory language. This dependency risks misconstruction of HS-code specifications, documentation requirements, conditional provisions, and exemption criteria — potentially causing preventable operational delays and legal uncertainty.",
            "TRACE Consulting responded to this gap by developing a complete, clause-by-clause unofficial English translation of the Import Policy Order 2026–2029, making it accessible to international businesses, investors, and compliance teams.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
        { name: "Mimma Afrin", role: "Technical Lead" },
        { name: "Mohammed Mahraj-ul-Alam Samrat", role: "Head of Trade Facilitation & Regulatory Compliance" },
        { name: "Rubayat E Shams Anik", role: "Senior Portfolio Manager" },
      ],
    },
  },
  {
    slug: "beyond-tariffs-biggest-trade-opportunity",
    title: "Beyond Tariffs Lies Bangladesh’s Biggest Trade Opportunity",
    category: "Article",
    date: "Jul 16, 2026",
    isoDate: "2026-07-16",
    summary: "Analysis exploring how Bangladesh can extend trade gains well beyond tariff considerations by investing in facilitation, regulatory predictability, and private-sector readiness.",
    image: "https://traceconsultingltd.com/storage/676/11-Insights_Beyond-Traiffs-Lies-Bangladesh.jpg",
    url: "/latest-updates/beyond-tariffs-biggest-trade-opportunity",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "Published in The Business Standard by TRACE CEO Fuad M Khalid Hossen, this article argues that modern economic competitiveness depends increasingly on institutional efficiency rather than tariffs alone. Bangladesh faces significant trade challenges despite automation progress, with cargo at Chattogram Port taking approximately 270 hours for release compared to 95 hours in India and 30 hours in Thailand.",
            "The US–Bangladesh Agreement on Reciprocal Trade (ART) provides a framework addressing customs modernization, sanitary measures, digital trade, investment facilitation, and regulatory cooperation. Key provisions include technological solutions for full pre-arrival processing, paperless trade, and digitalized border procedures by 2030.",
          ],
        },
        {
          heading: "Facilitation as Competitive Advantage",
          paragraphs: [
            "The piece highlights Bangladesh’s existing progress through USDA-funded initiatives, where digital pre-arrival processing reduced regulatory clearance times by approximately three to four days. Risk-based regulatory approaches could potentially reduce clearance times by around 50%.",
            "Stronger inter-agency coordination through the Bangladesh Single Window (BSW) initiative reduces duplicate documentation and sequential approvals. Trade facilitation alone proves insufficient; the nation must strengthen compliance with international sanitary and phytosanitary standards to diversify exports beyond ready-made garments.",
          ],
        },
        {
          heading: "The Path Forward",
          paragraphs: [
            "The ART promotes science-based measures consistent with WTO principles and international standards from the Codex Alimentarius Commission and World Organization for Animal Health.",
            "Successful implementation requires capable institutions, effective coordination, technology investment, and private sector partnerships to enhance competitiveness in regional and global markets.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
      ],
    },
  },
  {
    slug: "tariff-trade-intelligence-platform-launch",
    title: "Bangladesh Tariff & Trade Intelligence Platform",
    category: "Innovation",
    date: "Jul 30, 2026",
    isoDate: "2026-07-30",
    summary: "A new TRACE-built digital platform that turns fragmented tariff, duty, regulatory, and trade-benefit information into decision-ready intelligence by HS code.",
    image: "https://traceconsultingltd.com/storage/904/WhatsApp-Image-2026-07-30-at-3.44.57-PM.jpeg",
    url: "https://tariffintel.traceconsultingltd.com/",
    external: true,
  },
  {
    slug: "mocom-trade-portal-e-learning-inception",
    title: "Inception Event for Bangladesh Trade Portal E-Learning Modules",
    category: "Event",
    date: "Jul 20, 2026",
    isoDate: "2026-07-20",
    summary: "TRACE organised the launch event for the Ministry of Commerce’s e-learning modules supporting the Bangladesh Trade Portal initiative.",
    image: "https://traceconsultingltd.com/storage/997/inception.jpg",
    url: "/latest-updates/mocom-trade-portal-e-learning-inception",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "An Inception Workshop titled ‘Developing E-Learning Modules through the Bangladesh Trade Portal (BTP)’ took place at the ATM Shamsul Haque Auditorium, CIRDAP. TRACE Consulting’s CEO Fuad M. Khalid Hossen presented the keynote address.",
            "The initiative operates under Package SD-59, funded by the World Bank’s Bangladesh Regional Connectivity Project-1 (BRCP-1) under the Ministry of Commerce, with Orangebd as the lead firm and TRACE Consulting as sub-consultant.",
          ],
        },
        {
          heading: "Building Trade Literacy",
          paragraphs: [
            "The project will develop over 20 bilingual interactive e-learning modules addressing WTO agreements, trade policies and laws, import-export procedures, trade compliance, and good practices such as risk-based compliance. The platform targets awareness gaps, noting that approximately 20 Bangladeshi companies hold Authorized Economic Operator (AEO) status compared to 4,500 in India.",
            "The CEO emphasized that many trade facilitation reforms already exist but go unused because businesses are not aware of them. The modules will guide traders through risk-based clearance, AEO certification, Advance Rulings, SPS and TBT compliance, and export diversification as Bangladesh approaches LDC graduation.",
          ],
        },
        {
          heading: "A Long-Standing Commitment",
          paragraphs: [
            "This assignment carries special significance, as the CEO previously helped establish the Bangladesh Trade Portal in 2014 under an IFC–World Bank Group initiative.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
      ],
    },
  },
  {
    slug: "bfsa-safe-food-import-workshop",
    title: "Finalization Workshop on Electronic Governance of Safe Food Import Guidelines",
    category: "Workshop",
    date: "Jul 09, 2026",
    isoDate: "2026-07-09",
    summary: "TRACE participated as a key discussant in the Bangladesh Food Safety Authority’s workshop on digital governance for safe food imports.",
    image: "https://traceconsultingltd.com/storage/993/Fuad-bhai-BFSA-speech.jpg",
    url: "/latest-updates/bfsa-safe-food-import-workshop",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "TRACE Consulting’s leadership participated in a Bangladesh Food Safety Authority stakeholder meeting to help finalize electronic food import guidelines. CEO Fuad M. Khalid Hossen and Mohammed Mahraj-ul-Alam Samrat, Head of Trade Facilitation and Regulatory Compliance, served as invited discussants.",
            "The guidelines resulted from TRACE’s earlier work on the USDA Bangladesh Trade Facilitation Project. The team designed an electronic framework for safe food imports and collaborated with the Ministry of Commerce to integrate provisions into the Import Policy Order 2026–2029.",
          ],
        },
        {
          heading: "Key Recommendations",
          paragraphs: [
            "Key recommendations included making non-BSTI food item clearance fully digital, covering pre-arrival processing, automated risk assessment, post-clearance oversight, laboratory integration, and customs coordination. TRACE developed the National Food Import Information Management System (NFIIMS) to support execution.",
            "During discussions, the CEO recommended starting with 50 to 100 priority products to establish risk profiles and testing parameters before expanding. He emphasized that stakeholder awareness is essential so the system facilitates rather than burdens trade.",
          ],
        },
        {
          heading: "International Best Practice",
          paragraphs: [
            "The presentation examined BFSA’s Food Safety Act authority, electronic importer registration, No Objection Certificates, and pre-arrival notification processes. It referenced risk-based models from India, Vietnam, Cambodia, Australia, and New Zealand and proposed establishing a dedicated Risk Management Unit.",
            "When fully operational, the system is expected to reduce clearance timelines from approximately 15 days to several days.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
        { name: "Mohammed Mahraj-ul-Alam Samrat", role: "Head of Trade Facilitation & Regulatory Compliance" },
      ],
    },
  },
  {
    slug: "amcham-investment-climate-reforms",
    title: "TRACE Engages AmCham Bangladesh to Drive Investment and Business Climate Reforms",
    category: "Meeting",
    date: "Jul 09, 2026",
    isoDate: "2026-07-09",
    summary: "A working engagement with the American Chamber of Commerce in Bangladesh focused on investment facilitation and regulatory improvements.",
    image: "https://traceconsultingltd.com/storage/645/2_1200-X800.jpg",
    url: "/latest-updates/amcham-investment-climate-reforms",
    external: false,
    body: {
      sections: [
        {
          heading: "Strategic Dialogue with AmCham Bangladesh",
          paragraphs: [
            "TRACE recently held a high-level strategic meeting with the American Chamber of Commerce in Bangladesh (AmCham). The session was a powerful platform for TRACE to drive meaningful dialogue on critical trade and investment framework improvements.",
            "The discussion was guided by Mr. Syed Ershad Ahmed, former AmCham Bangladesh president, and other leadership members. During the session, TRACE collaborated on regulatory reforms aimed at enhancing Bangladesh’s competitiveness in global markets.",
          ],
        },
        {
          paragraphs: [
            "The focus centered on creating business-friendly conditions and attracting both domestic and foreign direct investment (FDI). TRACE’s engagement with AmCham reflects the firm’s commitment to cross-sector dialogue and investment climate reform.",
          ],
        },
      ],
      team: [
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
        { name: "Mohammed Mahraj-ul-Alam Samrat", role: "Head of Trade Facilitation & Regulatory Compliance" },
      ],
    },
  },
  {
    slug: "bsti-textile-testing-modernization",
    title: "Modernizing BSTI’s Textile Testing for Global Export Standards",
    category: "Event",
    date: "Jun 16, 2026",
    isoDate: "2026-06-16",
    summary: "An initiative to upgrade the Bangladesh Standards and Testing Institution’s textile testing capabilities so Bangladeshi exports meet global buyer requirements.",
    image: "https://traceconsultingltd.com/storage/649/BSTI.jpg",
    url: "/latest-updates/bsti-textile-testing-modernization",
    external: false,
    body: {
      sections: [
        {
          paragraphs: [
            "TRACE Consulting organized a stakeholder engagement workshop at the Bangladesh Standards and Testing Institution (BSTI). The event brought together the BSTI Director General and representatives from BGMEA, BKMEA, buying houses, and international brands.",
            "Key focus areas included mapping current barriers to test report acceptance, identifying actionable improvements for service efficiency and reliability, and achieving global compliance standards.",
          ],
        },
        {
          heading: "Empowering National Infrastructure",
          paragraphs: [
            "The objective was to shorten testing lead times, reinforce international buyer trust, and future-proof Bangladesh’s export-oriented RMG sector.",
            "The project — Strengthening Export-Oriented Textile Testing Capacity at BSTI Laboratory — aims to deliver the speed, reliability, and world-class compliance demanded by international buyers.",
          ],
        },
      ],
      team: [
        { name: "Abu Saleh Muhammad Saifullah", role: "Director & Chief Operating Officer" },
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
        { name: "Mimma Afrin", role: "Technical Lead, Laboratory Operations" },
      ],
    },
  },
  {
    slug: "dls-strategic-dialogue-agro-trade",
    title: "Modernizing Agro-Trade: The Department of Livestock Strategic Dialogue",
    category: "Meeting",
    date: "Jun 04, 2026",
    isoDate: "2026-06-04",
    summary: "A strategic dialogue with Bangladesh’s Department of Livestock on modernising agricultural trade systems and inter-agency coordination.",
    image: "https://traceconsultingltd.com/storage/647/1_1200-X800.jpg",
    url: "/latest-updates/dls-strategic-dialogue-agro-trade",
    external: false,
    body: {
      sections: [
        {
          heading: "Strategic Dialogue with DLS Leadership",
          paragraphs: [
            "TRACE Consulting facilitated an executive-level meeting with Department of Livestock Services (DLS) leadership. The session concentrated on actionable strategies to accelerate the digital transformation of livestock trade-related services and implement robust, risk-based inspection frameworks.",
            "Key discussion areas included modernizing legislative procedures, advancing laboratory accreditation, and ensuring compliance with international Sanitary and Phytosanitary (SPS) standards.",
          ],
        },
        {
          paragraphs: [
            "The organization aims to help DLS streamline agro-trade facilitation, reduce administrative burdens, and expand international market access for Bangladesh’s livestock sector.",
          ],
        },
      ],
      team: [
        { name: "Michael J. Parr", role: "Strategic Advisor" },
        { name: "Mimma Afrin", role: "Technical Lead, Laboratory Operations" },
        { name: "Fuad M Khalid Hossen", role: "Chief Executive Officer" },
      ],
    },
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
