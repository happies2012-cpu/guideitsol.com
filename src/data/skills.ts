export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  popularity: number;
  trending?: boolean;
  relatedSkills: string[];
  resources: { name: string; url: string }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const skillCategories: SkillCategory[] = [
  { id: 'frontend', name: 'Frontend', icon: 'Monitor', count: 15 },
  { id: 'backend', name: 'Backend', icon: 'Server', count: 12 },
  { id: 'mobile', name: 'Mobile', icon: 'Smartphone', count: 8 },
  { id: 'cloud', name: 'Cloud & DevOps', icon: 'Cloud', count: 10 },
  { id: 'ai-ml', name: 'AI & ML', icon: 'Brain', count: 14 },
  { id: 'database', name: 'Databases', icon: 'Database', count: 8 },
];

export const skills: Skill[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'Build modern user interfaces with the most popular JavaScript library',
    category: 'frontend',
    icon: 'Code',
    level: 'Intermediate',
    popularity: 98,
    trending: true,
    relatedSkills: ['Next.js', 'TypeScript', 'Redux', 'React Native'],
    resources: [
      { name: 'Official Docs', url: 'https://react.dev' },
      { name: 'React Patterns', url: 'https://reactpatterns.com' },
    ]
  },
  {
    id: '2',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Add type safety to JavaScript for better developer experience and fewer bugs',
    category: 'frontend',
    icon: 'FileCode',
    level: 'Intermediate',
    popularity: 95,
    trending: true,
    relatedSkills: ['React', 'Node.js', 'Next.js'],
    resources: [
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs' },
    ]
  },
  {
    id: '3',
    name: 'Python',
    slug: 'python',
    description: 'Versatile programming language for web, data science, AI, and automation',
    category: 'backend',
    icon: 'Terminal',
    level: 'Beginner',
    popularity: 99,
    trending: true,
    relatedSkills: ['Django', 'FastAPI', 'TensorFlow', 'Pandas'],
    resources: [
      { name: 'Python Docs', url: 'https://docs.python.org' },
      { name: 'Real Python', url: 'https://realpython.com' },
    ]
  },
  {
    id: '4',
    name: 'Machine Learning',
    slug: 'machine-learning',
    description: 'Build intelligent systems that learn from data',
    category: 'ai-ml',
    icon: 'Brain',
    level: 'Advanced',
    popularity: 92,
    trending: true,
    relatedSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
    resources: [
      { name: 'Andrew Ng Course', url: 'https://www.coursera.org' },
      { name: 'Scikit-learn', url: 'https://scikit-learn.org' },
    ]
  },
  {
    id: '5',
    name: 'Node.js',
    slug: 'nodejs',
    description: 'Build scalable server-side applications with JavaScript',
    category: 'backend',
    icon: 'Server',
    level: 'Intermediate',
    popularity: 94,
    relatedSkills: ['Express', 'MongoDB', 'TypeScript', 'GraphQL'],
    resources: [
      { name: 'Node.js Docs', url: 'https://nodejs.org/docs' },
    ]
  },
  {
    id: '6',
    name: 'AWS',
    slug: 'aws',
    description: 'Amazon Web Services for cloud computing and infrastructure',
    category: 'cloud',
    icon: 'Cloud',
    level: 'Advanced',
    popularity: 90,
    trending: true,
    relatedSkills: ['Lambda', 'EC2', 'S3', 'DynamoDB'],
    resources: [
      { name: 'AWS Training', url: 'https://aws.training' },
    ]
  },
  {
    id: '7',
    name: 'Docker',
    slug: 'docker',
    description: 'Containerize applications for consistent development and deployment',
    category: 'cloud',
    icon: 'Container',
    level: 'Intermediate',
    popularity: 93,
    relatedSkills: ['Kubernetes', 'CI/CD', 'AWS ECS'],
    resources: [
      { name: 'Docker Docs', url: 'https://docs.docker.com' },
    ]
  },
  {
    id: '8',
    name: 'PostgreSQL',
    slug: 'postgresql',
    description: 'Advanced open-source relational database with powerful features',
    category: 'database',
    icon: 'Database',
    level: 'Intermediate',
    popularity: 88,
    relatedSkills: ['SQL', 'PostGIS', 'Prisma'],
    resources: [
      { name: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs' },
    ]
  },
  {
    id: '9',
    name: 'MongoDB',
    slug: 'mongodb',
    description: 'Flexible NoSQL database for modern applications',
    category: 'database',
    icon: 'Database',
    level: 'Intermediate',
    popularity: 86,
    relatedSkills: ['Mongoose', 'Atlas', 'Aggregation'],
    resources: [
      { name: 'MongoDB University', url: 'https://learn.mongodb.com' },
    ]
  },
  {
    id: '10',
    name: 'React Native',
    slug: 'react-native',
    description: 'Build cross-platform mobile apps with React',
    category: 'mobile',
    icon: 'Smartphone',
    level: 'Intermediate',
    popularity: 87,
    trending: true,
    relatedSkills: ['React', 'TypeScript', 'Expo'],
    resources: [
      { name: 'React Native Docs', url: 'https://reactnative.dev' },
    ]
  },
  {
    id: '11',
    name: 'LLM & Prompt Engineering',
    slug: 'llm-prompt-engineering',
    description: 'Build applications with large language models',
    category: 'ai-ml',
    icon: 'Sparkles',
    level: 'Intermediate',
    popularity: 96,
    trending: true,
    relatedSkills: ['OpenAI API', 'LangChain', 'Vector Databases', 'RAG'],
    resources: [
      { name: 'OpenAI Docs', url: 'https://platform.openai.com/docs' },
      { name: 'LangChain Academy', url: 'https://academy.langchain.com' },
    ]
  },
  {
    id: '12',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'The React framework for production-grade applications',
    category: 'frontend',
    icon: 'Monitor',
    level: 'Intermediate',
    popularity: 94,
    trending: true,
    relatedSkills: ['React', 'TypeScript', 'Server Components'],
    resources: [
      { name: 'Next.js Docs', url: 'https://nextjs.org/docs' },
    ]
  },
];

export const levelLabels = {
  Beginner: { color: 'text-green-500', bg: 'bg-green-500/10' },
  Intermediate: { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  Advanced: { color: 'text-orange-500', bg: 'bg-orange-500/10' },
  Expert: { color: 'text-red-500', bg: 'bg-red-500/10' },
};

export function getSkillsByCategory(category: string): Skill[] {
  if (category === 'all') return skills;
  return skills.filter(s => s.category === category);
}

export function getTrendingSkills(): Skill[] {
  return skills.filter(s => s.trending);
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find(s => s.slug === slug);
}
