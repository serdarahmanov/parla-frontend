export type ServiceItem = {
  slug: string;
  title: string;
  text: string;
  description?: string;
  offerings?: string[];
  process?: {
    title: string;
    number: string;
    description: string;
  }[];
  image?: string;
  icon?: string;
};

export const slugifyOffering = (offering: string) =>
  offering
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const serviceSummaries: ServiceItem[] = [
  {
    slug: "brand-strategy",
    title: "Marketing & Creative Direction",
    text: "Positioning, creative vision, and direction that give a brand a clear reason to be chosen and remembered.",
  },
  {
    slug: "production-management",
    title: "Production Management",
    text: "Scripting, scheduling, and logistics through to crew, timeline, and execution on the day — handled end to end.",
  },
  {
    slug: "ai-generated-content",
    title: "AI Generated Content",
    text: "Distinctive content created with AI and shaped by strategy, creativity, and human judgment.",
  },
  {
    slug: "interior-exterior-architecture-design",
    title: "Interior/Exterior Architecture Design",
    text: "Thoughtful interior and exterior spaces shaped around how people live, work, and experience them.",
  },
  {
    slug: "web-mobile-applications",
    title: "Web & Mobile Applications",
    text: "Custom applications that work the way a brand actually operates, on any device.",
  },
  {
    slug: "ecommerce",
    title: "eCommerce",
    text: "Online stores built to convert, from product pages through to checkout.",
    image: "/services/ecommerce/4b2d1f94-5d38-412b-b423-34f0018f9cbe.webp",
  },
  {
    slug: "saas-platforms",
    title: "SAAS Platforms",
    text: "Scalable software platforms built to support real workflows, users, and growth.",
  },
  {
    slug: "music-distribution",
    title: "Music Distribution",
    text: "Getting music onto the right platforms, in front of the right listeners, and ready to grow.",
  },
];

const buildProcess = (steps: [string, string][]) =>
  steps.map(([title, description], index) => ({
    title,
    number: String(index + 1).padStart(2, "0"),
    description,
  }));

const servicePageDetails: Record<
  string,
  Pick<ServiceItem, "description" | "offerings" | "process">
> = {
  "brand-strategy": {
    description: "We combine clear market positioning with a distinctive creative point of view to make brands easier to choose and remember.",
    offerings: ["Positioning & Messaging", "Creative Concepts", "Brand Identity Systems", "Campaign Direction"],
    process: buildProcess([
      ["Discover", "Understand the business, audience, category, and opportunity before defining a direction."],
      ["Position", "Find the sharpest reason for the brand to be chosen and turn it into a clear market position."],
      ["Create", "Develop the visual world, voice, and creative direction that make the position recognizable everywhere."],
      ["Activate", "Create a practical rollout plan that helps the team use the brand with confidence."],
    ]),
  },
  "production-management": {
    description: "We keep complex productions moving with clear planning, reliable coordination, and calm execution from start to finish.",
    offerings: ["Production Planning", "Crew & Vendor Coordination", "Shoot Management", "Post-Production Supervision"],
    process: buildProcess([
      ["Plan", "Turn the creative brief into a realistic schedule, budget, crew plan, and production roadmap."],
      ["Prepare", "Lock locations, suppliers, talent, call sheets, logistics, and every detail required for the day."],
      ["Produce", "Coordinate the moving parts on set and protect the quality, timing, and budget of the work."],
      ["Finish", "Manage post-production, approvals, delivery formats, and the final handoff."],
    ]),
  },
  "music-distribution": {
    description: "We help artists release music smoothly, reach the right platforms, and build momentum around every release.",
    offerings: ["Digital Release Setup", "Platform Distribution", "Release Rollout Planning", "Catalog Management"],
    process: buildProcess([
      ["Prepare", "Organize masters, artwork, metadata, credits, and rights information for a clean release."],
      ["Schedule", "Choose the release timeline and coordinate platform delivery, pitching, and promotional beats."],
      ["Launch", "Deliver the release across platforms and make sure every artist profile and link is ready."],
      ["Grow", "Review performance and use the learnings to strengthen the next release and the wider catalog."],
    ]),
  },
  "web-mobile-applications": {
    description: "We design and build fast, dependable digital products that work beautifully across web and mobile.",
    offerings: ["Web Applications", "Mobile Applications", "Product Design", "Technical Builds"],
    process: buildProcess([
      ["Map", "Clarify users, workflows, requirements, and the product priorities that matter most."],
      ["Design", "Create an intuitive interface and prototype the key journeys before development begins."],
      ["Build", "Develop a robust, responsive product with performance, accessibility, and maintainability in mind."],
      ["Launch", "Test, release, monitor, and improve the product as real users begin to use it."],
    ]),
  },
  ecommerce: {
    description: "We create online stores that showcase products, drive conversions, and build lasting customer relationships.",
    offerings: ["Shopify Stores", "Custom eCommerce", "Platform Migration & Scaling", "Conversion Rate Optimization"],
    process: buildProcess([
      ["Discover", "Map your products, customers, sales goals, and the platform capabilities the business needs."],
      ["Design", "Shape a clear storefront experience with intuitive navigation, compelling product pages, and a frictionless checkout."],
      ["Develop", "Build the store with performance, accessibility, payment security, and future growth at the core."],
      ["Launch", "Test every customer flow, go live confidently, and keep improving the store from real performance data."],
    ]),
  },
  "saas-platforms": {
    description: "We create scalable SaaS platforms that simplify complex operations and give teams better ways to work.",
    offerings: ["SaaS Product Strategy", "Multi-Tenant Platforms", "Dashboards & Portals", "Integrations & Automation"],
    process: buildProcess([
      ["Understand", "Map the business model, user roles, workflows, and platform requirements."],
      ["Architect", "Define the product structure, technical foundation, data model, and integration strategy."],
      ["Develop", "Build the core experience with secure access, reliable infrastructure, and room to scale."],
      ["Evolve", "Launch with measurement in place and continuously improve the platform from user feedback."],
    ]),
  },
  "ai-generated-content": {
    description: "We combine AI speed with human taste to produce original content that feels useful, distinctive, and on-brand.",
    offerings: ["AI Content Systems", "Image & Video Concepts", "Copy Generation", "Content Workflows"],
    process: buildProcess([
      ["Define", "Set the brand voice, audience, goals, guardrails, and the content formats required."],
      ["Generate", "Use the right AI tools and creative prompts to explore a broad range of directions quickly."],
      ["Refine", "Edit, art-direct, fact-check, and shape the strongest outputs with human judgment."],
      ["Scale", "Turn the winning approach into a repeatable workflow for consistent ongoing production."],
    ]),
  },
  "interior-exterior-architecture-design": {
    description: "We design considered interior and exterior environments that connect architecture, atmosphere, and everyday experience.",
    offerings: ["Spatial Concepts", "Interior Design", "Exterior Design", "Materials & Visualization"],
    process: buildProcess([
      ["Read", "Study the site, context, brief, constraints, and the people who will experience the space."],
      ["Imagine", "Develop spatial concepts, material directions, and a clear architectural atmosphere."],
      ["Detail", "Resolve layouts, finishes, lighting, landscape, and the details that make the concept real."],
      ["Realize", "Support documentation, coordination, and delivery through the final built environment."],
    ]),
  },
};

export const services: ServiceItem[] = serviceSummaries.map((service) => ({
  ...service,
  ...servicePageDetails[service.slug],
}));

export const servicesBySlug = services.reduce<Record<string, ServiceItem>>(
  (acc, service) => {
    acc[service.slug] = service;
    return acc;
  },
  {},
);
