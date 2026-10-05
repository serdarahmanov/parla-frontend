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
  subservices?: {
    slug: string;
    title: string;
    description: string;
  }[];
};

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
    slug: "film-video-production",
    title: "Film & Video Production",
    text: "From concept to final cut, we bring together the creative and technical teams needed to make moving image work with impact.",
  },
  {
    slug: "post-production",
    title: "Post-Production",
    text: "Editing, sound, color, and finishing that turn production material into a polished final piece ready to share.",
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
    slug: "interior-design",
    title: "Interior Design",
    text: "Material, lighting, furniture, and spatial decisions shaped into interiors that feel coherent, useful, and distinctly yours.",
  },
  {
    slug: "exterior-architecture",
    title: "Exterior Architecture",
    text: "Exterior forms, landscapes, and details designed to connect a building with its site and surroundings.",
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
  "film-video-production": {
    description: "We produce films and video content that bring a clear creative idea to life with the right people, process, and pace.",
    offerings: ["Creative Development", "Film & Video Shoots", "Crew & Talent Coordination", "Production Delivery"],
    process: buildProcess([
      ["Shape", "Clarify the idea, audience, treatment, format, and creative plan for the production."],
      ["Prepare", "Build the crew, schedule, locations, equipment, and production plan around the brief."],
      ["Shoot", "Run the shoot with calm coordination and close attention to performance, image, and sound."],
      ["Deliver", "Guide the edit and finishing process through to the final approved masters."],
    ]),
  },
  "post-production": {
    description: "We shape raw footage into finished work through thoughtful editing, sound, color, and delivery.",
    offerings: ["Editing", "Color Grading", "Sound Design", "Mastering & Delivery"],
    process: buildProcess([
      ["Organize", "Review and structure the material so the strongest story and visual direction can emerge."],
      ["Edit", "Build the narrative, pacing, and rhythm through focused editorial decisions."],
      ["Finish", "Refine color, sound, graphics, and details until every part of the piece feels resolved."],
      ["Deliver", "Prepare the final masters and formats for every channel, platform, and audience."],
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
  "interior-design": {
    description: "We create interiors with a clear sense of atmosphere, materiality, and how people will actually use the space.",
    offerings: ["Interior Concepts", "Material & Color Direction", "Furniture & Lighting", "Spatial Coordination"],
    process: buildProcess([
      ["Read", "Understand the brief, people, context, constraints, and daily life of the space."],
      ["Compose", "Develop layouts, materials, lighting, and a coherent interior language."],
      ["Detail", "Resolve the furniture, finishes, fixtures, and details that give the concept character."],
      ["Deliver", "Coordinate the design through documentation, procurement, and installation."],
    ]),
  },
  "exterior-architecture": {
    description: "We design exterior environments that respond to their site, climate, context, and the experience of arriving and moving through them.",
    offerings: ["Facade Concepts", "Landscape & Site Design", "Exterior Materials", "Architectural Visualization"],
    process: buildProcess([
      ["Study", "Read the site, surroundings, climate, access, and the practical requirements of the project."],
      ["Frame", "Develop the architectural form, landscape, and spatial relationships that shape the exterior."],
      ["Resolve", "Refine materials, details, lighting, and connections between building and site."],
      ["Realize", "Support coordination and documentation through delivery of the finished environment."],
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

export type ServiceCategory = Pick<ServiceItem, "slug" | "title" | "text"> &
  Required<Pick<ServiceItem, "description" | "process" | "icon">> & {
  serviceSlugs: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "marketing",
    title: "Marketing",
    icon: "/services/icons/marketing.svg",
    text: "Strategy, creative direction, AI content, and music distribution built to make brands clearer, more distinctive, and easier to grow.",
    description: "We connect brand strategy with creative execution and distribution, giving businesses and artists one coherent path from positioning to audience growth.",
    serviceSlugs: ["brand-strategy", "ai-generated-content", "music-distribution"],
    process: buildProcess([
      ["Discover", "Understand the business, audience, category, and opportunity before choosing a direction."],
      ["Position", "Define a clear market position, message, and creative point of view."],
      ["Create", "Turn the strategy into distinctive campaigns, content, and audience-ready assets."],
      ["Grow", "Distribute the work, measure its response, and improve the system over time."],
    ]),
  },
  {
    slug: "production",
    title: "Production",
    icon: "/services/icons/production.svg",
    text: "End-to-end production planning, coordination, execution, and post-production for work that needs to move smoothly.",
    description: "We manage the moving parts behind complex productions so creative work stays organized, on schedule, and protected from brief through final delivery.",
    serviceSlugs: ["production-management", "film-video-production", "post-production"],
    process: buildProcess([
      ["Plan", "Turn the creative brief into a realistic schedule, budget, crew plan, and production roadmap."],
      ["Prepare", "Lock locations, suppliers, talent, call sheets, logistics, and every detail required for the day."],
      ["Produce", "Coordinate the moving parts on set and protect the quality, timing, and budget of the work."],
      ["Finish", "Manage post-production, approvals, delivery formats, and the final handoff."],
    ]),
  },
  {
    slug: "software-development",
    title: "Software Development",
    icon: "/services/icons/software-development.svg",
    text: "Digital products designed and engineered from early strategy through launch, scale, and continuous improvement.",
    description: "We combine product thinking, experience design, and dependable engineering to build web, mobile, commerce, and SaaS products around real workflows.",
    serviceSlugs: ["web-mobile-applications", "ecommerce", "saas-platforms"],
    process: buildProcess([
      ["Map", "Clarify users, workflows, business goals, and the product priorities that matter most."],
      ["Design", "Shape the product structure, interface, and key journeys before development begins."],
      ["Build", "Engineer a secure, accessible, maintainable product with room to scale."],
      ["Evolve", "Launch with measurement in place and improve the product from real usage and feedback."],
    ]),
  },
  {
    slug: "design",
    title: "Design",
    icon: "/services/icons/design.svg",
    text: "Interior and exterior environments shaped through spatial thinking, material detail, and practical delivery.",
    description: "We design considered environments that connect architecture, atmosphere, and everyday experience while respecting the realities of the site and build.",
    serviceSlugs: ["interior-exterior-architecture-design", "interior-design", "exterior-architecture"],
    process: buildProcess([
      ["Read", "Study the site, context, brief, constraints, and the people who will experience the space."],
      ["Imagine", "Develop spatial concepts, material directions, and a clear architectural atmosphere."],
      ["Detail", "Resolve layouts, finishes, lighting, landscape, and the details that make the concept real."],
      ["Realize", "Support documentation, coordination, and delivery through the final built environment."],
    ]),
  },
];

export const categoryServices: ServiceItem[] = serviceCategories.map((category) => ({
  slug: category.slug,
  title: category.title,
  text: category.text,
  description: category.description,
  process: category.process,
  icon: category.icon,
  subservices: category.serviceSlugs.map((serviceSlug) => {
    const service = servicesBySlug[serviceSlug];

    return {
      slug: service.slug,
      title: service.title,
      description: service.description ?? service.text,
    };
  }),
}));

export const categoryServicesBySlug = categoryServices.reduce<Record<string, ServiceItem>>(
  (acc, category) => {
    acc[category.slug] = category;
    return acc;
  },
  {},
);
