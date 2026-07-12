export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const generatePath = (base: string, title: string) => {
  return `/${base}/${slugify(title)}`;
};

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "AI Training",
    href: "/ai-training",
    children: [
      { title: "AI & Machine Learning", href: generatePath("ai-training", "ai-ml-fundamentals") },
      { title: "LLM & Prompt Engineering", href: generatePath("ai-training", "llm-prompt-engineering") },
      { title: "Data Science & Analytics", href: generatePath("ai-training", "data-science-analytics") },
      { title: "Computer Vision", href: generatePath("ai-training", "computer-vision") },
      { title: "MLOps & Production AI", href: generatePath("ai-training", "mlops-production") },
      { title: "Generative AI", href: generatePath("ai-training", "generative-ai") },
      { title: "All Courses", href: "/ai-training" },
    ],
  },
  {
    title: "AI Tools",
    href: "/ai-tools",
    children: [
      { title: "AI Models & LLMs", href: "/ai-tools?category=llm" },
      { title: "Vector Databases", href: "/ai-tools?category=embeddings" },
      { title: "MLOps Frameworks", href: "/ai-tools?category=ml-ops" },
      { title: "AI Infrastructure", href: "/ai-tools?category=infrastructure" },
      { title: "Data Processing", href: "/ai-tools?category=data" },
      { title: "Developer Tools", href: "/ai-tools?category=devtools" },
    ],
  },
  {
    title: "Open Source",
    href: "/open-source",
    children: [
      { title: "CMS Platforms", href: "/open-source/cms" },
      { title: "Backend as a Service", href: "/open-source/baas" },
      { title: "Low-code Platforms", href: "/open-source/lowcode" },
      { title: "Spreadsheet Databases", href: "/open-source/spreadsheet" },
      { title: "Wikis & Documentation", href: "/open-source/wiki" },
      { title: "Survey Tools", href: "/open-source/survey" },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    children: [
      { title: "AI & ML Projects", href: generatePath("projects", "ai-ml") },
      { title: "Web Applications", href: generatePath("projects", "web") },
      { title: "Mobile Apps", href: generatePath("projects", "mobile") },
      { title: "Enterprise Solutions", href: generatePath("projects", "enterprise") },
      { title: "SaaS Products", href: generatePath("projects", "saas") },
    ],
  },
  {
    title: "Services",
    children: [
      {
        title: "AI & Consulting",
        href: "/services/ai-consulting",
        children: [
          { title: "AI Strategy", href: "/services/ai-strategy" },
          { title: "LLM Integration", href: "/services/llm-integration" },
          { title: "ML Model Development", href: "/services/ml-development" },
          { title: "AI Automation", href: "/services/ai-automation" },
        ],
      },
      {
        title: "Development",
        href: "/services",
        children: [
          { title: "Web Development", href: "/services/web-development" },
          { title: "Mobile Development", href: "/services/mobile-development" },
          { title: "Software Development", href: "/services/software-development" },
          { title: "UI/UX Design", href: "/services/ui-ux-design" },
        ],
      },
    ],
  },
  {
    title: "Company",
    children: [
      { title: "About Us", href: "/company/about" },
      { title: "Contact", href: "/contact" },
      { title: "Careers", href: "/company/careers" },
      { title: "Privacy Policy", href: "/company/privacy-policy" },
      { title: "Terms of Service", href: "/company/terms-conditions" },
    ],
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];