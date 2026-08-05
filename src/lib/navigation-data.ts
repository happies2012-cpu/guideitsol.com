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
    title: "AI Tools",
    href: "/ai-learning",
  },
  {
    title: "IT & AI Training",
    href: "/training-programs",
    children: [
      { title: "Coding & Development", href: "/training-programs" },
      { title: "Design & UI/UX", href: "/training-programs" },
      { title: "AI & Generative AI", href: "/training-programs" },
      { title: "AI/ML & Data Science", href: "/training-programs" },
      { title: "IoT & Embedded Systems", href: "/training-programs" },
      { title: "Cloud & DevOps", href: "/training-programs" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "AI & Automation",
        href: "/services",
        children: [
          { title: "Chatbot & NLP", href: "/services" },
          { title: "Machine Learning", href: "/services" },
          { title: "AI Assistants", href: "/services" },
        ],
      },
      {
        title: "Software & Web",
        href: "/services",
        children: [
          { title: "Web Development", href: "/services/web-development" },
          { title: "UI/UX Design", href: "/services/ui-ux-design-development" },
          { title: "Mobile App Development", href: "/services/app-development" },
        ],
      },
      {
        title: "Cloud & Infrastructure",
        href: "/services",
        children: [
          { title: "Cloud Solutions", href: "/services" },
          { title: "DevOps", href: "/services" },
          { title: "IT Consulting", href: "/services/it-consulting-services" },
        ],
      },
    ],
  },
  {
    title: "Projects",
    href: "/portfolio",
    children: [
      { title: "AI Solutions", href: "/portfolio" },
      { title: "Web Products", href: "/portfolio" },
      { title: "Mobile Apps", href: "/portfolio" },
      { title: "Enterprise Systems", href: "/portfolio" },
    ],
  },
  {
    title: "Marketplace",
    href: "/ads",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Company",
    children: [
      { title: "About Us", href: "/pages" },
      { title: "Contact", href: "/contact" },
      { title: "Careers", href: generatePath("company", "careers") },
      { title: "Privacy Policy", href: generatePath("company", "privacy-policy") },
      { title: "Terms of Service", href: generatePath("company", "terms-conditions") },
    ],
  },
];