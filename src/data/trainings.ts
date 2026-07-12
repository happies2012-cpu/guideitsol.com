export interface Training {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice?: number;
  instructor: string;
  thumbnail?: string;
  rating: number;
  students: number;
  lessons: number;
  featured?: boolean;
  tags: string[];
  outcomes: string[];
}

export interface TrainingCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const trainingCategories: TrainingCategory[] = [
  { id: 'ai-ml', name: 'AI & Machine Learning', icon: 'Brain', count: 8 },
  { id: 'web-dev', name: 'Web Development', icon: 'Code', count: 6 },
  { id: 'mobile', name: 'Mobile Development', icon: 'Smartphone', count: 4 },
  { id: 'cloud', name: 'Cloud & DevOps', icon: 'Cloud', count: 5 },
  { id: 'data', name: 'Data Science', icon: 'BarChart', count: 4 },
  { id: 'design', name: 'UI/UX Design', icon: 'Palette', count: 3 },
];

export const trainings: Training[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Fundamentals',
    slug: 'ai-ml-fundamentals',
    description: 'Master the core concepts of artificial intelligence and machine learning algorithms',
    category: 'ai-ml',
    duration: '12 weeks',
    level: 'Beginner',
    price: 29999,
    originalPrice: 49999,
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    students: 2450,
    lessons: 48,
    featured: true,
    tags: ['Python', 'NumPy', 'Scikit-learn', 'Neural Networks'],
    outcomes: ['Build ML models from scratch', 'Understand deep learning', 'Deploy ML solutions']
  },
  {
    id: '2',
    title: 'LLM & Prompt Engineering',
    slug: 'llm-prompt-engineering',
    description: 'Learn to build and optimize applications with OpenAI, Claude, and open-source LLMs',
    category: 'ai-ml',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 39999,
    originalPrice: 59999,
    instructor: 'Alex Johnson',
    rating: 4.9,
    students: 1890,
    lessons: 36,
    featured: true,
    tags: ['GPT-4', 'LangChain', 'Vector Databases', 'RAG'],
    outcomes: ['Build LLM applications', 'Implement RAG systems', 'Create AI agents']
  },
  {
    id: '3',
    title: 'Data Science & Analytics',
    slug: 'data-science-analytics',
    description: 'Transform data into insights with statistical analysis, visualization, and ML models',
    category: 'data',
    duration: '16 weeks',
    level: 'Intermediate',
    price: 34999,
    originalPrice: 54999,
    instructor: 'Prof. Michael Lee',
    rating: 4.7,
    students: 3200,
    lessons: 64,
    tags: ['Statistics', 'SQL', 'Python', 'Visualization'],
    outcomes: ['Analyze complex datasets', 'Create visualizations', 'Build prediction models']
  },
  {
    id: '4',
    title: 'Computer Vision & Image Processing',
    slug: 'computer-vision',
    description: 'Build applications that see and understand images using deep learning',
    category: 'ai-ml',
    duration: '10 weeks',
    level: 'Advanced',
    price: 44999,
    originalPrice: 69999,
    instructor: 'Dr. Emily Wang',
    rating: 4.8,
    students: 980,
    lessons: 40,
    tags: ['OpenCV', 'TensorFlow', 'PyTorch', 'YOLO'],
    outcomes: ['Build image classifiers', 'Implement object detection', 'Create vision pipelines']
  },
  {
    id: '5',
    title: 'MLOps & Production AI',
    slug: 'mlops-production',
    description: 'Deploy, monitor, and scale machine learning models in production environments',
    category: 'cloud',
    duration: '12 weeks',
    level: 'Advanced',
    price: 49999,
    originalPrice: 79999,
    instructor: 'James Rodriguez',
    rating: 4.9,
    students: 750,
    lessons: 48,
    featured: true,
    tags: ['Docker', 'Kubernetes', 'MLflow', 'AWS'],
    outcomes: ['Deploy ML at scale', 'Monitor model performance', 'Build CI/CD pipelines']
  },
  {
    id: '6',
    title: 'Generative AI & Creative Applications',
    slug: 'generative-ai',
    description: 'Create stunning visuals, text, and audio with cutting-edge generative models',
    category: 'ai-ml',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 37999,
    originalPrice: 57999,
    instructor: 'Lisa Park',
    rating: 4.8,
    students: 2100,
    lessons: 32,
    tags: ['Stable Diffusion', 'DALL-E', 'Midjourney', 'LLMs'],
    outcomes: ['Generate AI art', 'Build creative apps', 'Implement image generation']
  },
  {
    id: '7',
    title: 'Full Stack Web Development',
    slug: 'full-stack-web',
    description: 'Master modern web development with React, Node.js, and cloud deployment',
    category: 'web-dev',
    duration: '16 weeks',
    level: 'Intermediate',
    price: 32999,
    originalPrice: 49999,
    instructor: 'David Kim',
    rating: 4.7,
    students: 4500,
    lessons: 64,
    featured: true,
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    outcomes: ['Build full-stack apps', 'Deploy to cloud', 'Work with databases']
  },
  {
    id: '8',
    title: 'React & Next.js Masterclass',
    slug: 'react-nextjs',
    description: 'Build modern web applications with React and Next.js framework',
    category: 'web-dev',
    duration: '10 weeks',
    level: 'Intermediate',
    price: 24999,
    originalPrice: 39999,
    instructor: 'Emma Wilson',
    rating: 4.8,
    students: 3800,
    lessons: 40,
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    outcomes: ['Build SPAs', 'Create SSR apps', 'Master component design']
  },
];

export function getFeaturedTrainings(): Training[] {
  return trainings.filter(t => t.featured);
}

export function getPopularTrainings(): Training[] {
  return [...trainings].sort((a, b) => b.students - a.students).slice(0, 4);
}

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find(t => t.slug === slug);
}

export function getTrainingsByCategory(category: string): Training[] {
  if (category === 'all') return trainings;
  return trainings.filter(t => t.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
