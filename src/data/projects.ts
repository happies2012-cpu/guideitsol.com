export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  year: string;
  thumbnail?: string;
  featured?: boolean;
  tags: string[];
  challenge: string;
  solution: string;
  results: string[];
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const projectCategories: ProjectCategory[] = [
  { id: 'web', name: 'Web Applications', icon: 'Globe', count: 12 },
  { id: 'mobile', name: 'Mobile Apps', icon: 'Smartphone', count: 8 },
  { id: 'ai', name: 'AI & ML', icon: 'Brain', count: 10 },
  { id: 'enterprise', name: 'Enterprise', icon: 'Building', count: 6 },
  { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart', count: 5 },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Customer Support Platform',
    slug: 'ai-support-platform',
    description: 'Built an intelligent chatbot system handling 10,000+ daily conversations with 95% resolution rate',
    category: 'ai',
    client: 'TechCorp Inc.',
    year: '2024',
    featured: true,
    tags: ['NLP', 'Chatbot', 'LLM', 'Customer Service'],
    challenge: 'Traditional support was overwhelmed with repetitive queries, leading to long wait times.',
    solution: 'Deployed a multi-layer AI system with intent recognition, context management, and seamless human handoff.',
    results: ['60% reduction in support costs', '95% query resolution rate', '24/7 availability']
  },
  {
    id: '2',
    title: 'Real Estate Marketplace Platform',
    slug: 'real-estate-platform',
    description: 'Full-featured property marketplace with virtual tours and AI-powered recommendations',
    category: 'web',
    client: 'PropTech Solutions',
    year: '2024',
    featured: true,
    tags: ['React', 'Node.js', 'MongoDB', 'Three.js'],
    challenge: 'Need to create an immersive property browsing experience with advanced search capabilities.',
    solution: 'Built a modern marketplace with 3D virtual tours, map-based search, and ML recommendations.',
    results: ['200% increase in user engagement', '50% faster property discovery', '35% higher conversion']
  },
  {
    id: '3',
    title: 'Healthcare Appointment Booking App',
    slug: 'healthcare-booking',
    description: 'Mobile app for seamless doctor appointments with insurance verification and telemedicine',
    category: 'mobile',
    client: 'HealthFirst',
    year: '2023',
    featured: true,
    tags: ['React Native', 'Firebase', 'Telemedicine', 'HIPAA'],
    challenge: 'Patients struggled with complex appointment scheduling and insurance verification.',
    solution: 'Created an intuitive mobile experience with one-tap booking and integrated insurance checks.',
    results: ['500K+ downloads', '4.8 app store rating', '70% reduction in no-shows']
  },
  {
    id: '4',
    title: 'E-Learning Platform with AI Tutor',
    slug: 'elearning-platform',
    description: 'Interactive learning platform with personalized AI tutoring and adaptive assessments',
    category: 'ai',
    client: 'EduTech Startup',
    year: '2024',
    featured: true,
    tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'WebRTC'],
    challenge: 'Students needed personalized attention that scaled cost-effectively.',
    solution: 'Built an AI-powered learning system with adaptive content and intelligent tutoring.',
    results: ['40% improvement in completion rates', 'Personalized learning paths', 'Real-time progress tracking']
  },
  {
    id: '5',
    title: 'Supply Chain Analytics Dashboard',
    slug: 'supply-chain-analytics',
    description: 'Real-time analytics platform for logistics optimization and demand forecasting',
    category: 'enterprise',
    client: 'Global Logistics Co.',
    year: '2023',
    featured: true,
    tags: ['Python', 'TensorFlow', 'Tableau', 'AWS'],
    challenge: 'Manual forecasting led to inventory imbalances and increased costs.',
    solution: 'Implemented ML models for demand prediction and integrated real-time tracking dashboards.',
    results: ['25% reduction in inventory costs', '30% faster decision-making', '$2M annual savings']
  },
  {
    id: '6',
    title: 'Multi-Vendor E-Commerce Platform',
    slug: 'multi-vendor-ecommerce',
    description: 'Scalable marketplace with vendor management, analytics, and seamless payments',
    category: 'ecommerce',
    client: 'RetailGroup',
    year: '2024',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Elasticsearch'],
    challenge: 'Needed to support hundreds of vendors with varying needs and complex commission structures.',
    solution: 'Built a comprehensive platform with vendor portals, automated payouts, and smart search.',
    results: ['1000+ active vendors', '$5M GMV in first quarter', '99.9% uptime']
  },
  {
    id: '7',
    title: 'Fitness Tracking Mobile App',
    slug: 'fitness-app',
    description: 'Social fitness app with workout tracking, nutrition planning, and community features',
    category: 'mobile',
    client: 'FitLife',
    year: '2023',
    tags: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit'],
    challenge: 'Users needed motivation and accountability in their fitness journeys.',
    solution: 'Created an engaging app with social features, AI workout suggestions, and progress sharing.',
    results: ['1M+ downloads', 'Daily active users doubled', '4.7 rating']
  },
  {
    id: '8',
    title: 'Document Intelligence System',
    slug: 'document-intelligence',
    description: 'AI-powered document processing with OCR, extraction, and classification',
    category: 'ai',
    client: 'LegalTech Corp',
    year: '2024',
    tags: ['Python', 'OpenCV', 'LLM', 'FastAPI'],
    challenge: 'Manual document review was time-consuming and error-prone.',
    solution: 'Implemented computer vision and NLP for automatic document classification and data extraction.',
    results: ['80% reduction in processing time', '99% accuracy rate', '1000+ documents/day']
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
}
