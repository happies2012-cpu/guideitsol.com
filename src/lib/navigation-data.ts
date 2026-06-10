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
    href: "/ai-tools",
  },
  {
    title: "Skills",
    href: "/skills",
  },
  {
    title: "Trainings",
    href: "/trainings",
    children: [
      { title: "AI & Machine Learning", href: generatePath("trainings", "ai-ml") },
      { title: "Web Development", href: generatePath("trainings", "web-dev") },
      { title: "Mobile Development", href: generatePath("trainings", "mobile") },
      { title: "Cloud & DevOps", href: generatePath("trainings", "cloud") },
      { title: "Data Science", href: generatePath("trainings", "data") },
      { title: "UI/UX Design", href: generatePath("trainings", "design") },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    children: [
      { title: "Web Applications", href: generatePath("projects", "web") },
      { title: "Mobile Apps", href: generatePath("projects", "mobile") },
      { title: "AI & ML", href: generatePath("projects", "ai") },
      { title: "Enterprise", href: generatePath("projects", "enterprise") },
      { title: "E-Commerce", href: generatePath("projects", "ecommerce") },
      { title: "SaaS Products", href: generatePath("projects", "saas") },
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
    title: "Services",
    children: [
      {
        title: "Web Development",
        href: generatePath("services", "web-development"),
        children: [
          { title: "Software Development", href: generatePath("services", "software-development") },
          { title: "UI/UX Design & Development", href: generatePath("services", "ui-ux-design-development") },
          { title: "eCommerce Development", href: generatePath("services", "ecommerce-development") },
          { title: "Full Stack Development", href: generatePath("services", "full-stack-development") },
        ],
      },
      {
        title: "App Development",
        href: generatePath("services", "app-development"),
        children: [
          { title: "Android App Development", href: generatePath("services", "android-app-development") },
          { title: "iOS App Development", href: generatePath("services", "ios-app-development") },
          { title: "Flutter App Development", href: generatePath("services", "flutter-app-development") },
        ],
      },
      {
        title: "AI Development",
        href: generatePath("services", "ai-development"),
        children: [
          { title: "Machine Learning Solutions", href: generatePath("services", "ml-solutions") },
          { title: "NLP & Chatbots", href: generatePath("services", "nlp-chatbots") },
          { title: "Computer Vision", href: generatePath("services", "computer-vision") },
        ],
      },
    ],
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