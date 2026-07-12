export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  url?: string;
  pricing: string;
  pricingModel: 'free' | 'freemium' | 'paid' | 'enterprise';
  rating: number;
  reviews: number;
  downloads?: string;
  featured?: boolean;
  tags: string[];
  features: string[];
}

export interface AIToolCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const aiToolCategories: AIToolCategory[] = [
  { id: 'llm', name: 'LLM Models', icon: 'Brain', count: 6 },
  { id: 'embeddings', name: 'Vector Databases', icon: 'Layers', count: 4 },
  { id: 'ml-ops', name: 'MLOps Frameworks', icon: 'Workflow', count: 4 },
  { id: 'infrastructure', name: 'AI Infrastructure', icon: 'Server', count: 6 },
  { id: 'data', name: 'Data Processing', icon: 'Database', count: 2 },
  { id: 'devtools', name: 'Developer Tools', icon: 'Code', count: 2 },
];

export const aiTools: AITool[] = [
  {
    id: '1',
    name: 'OpenAI GPT-4',
    slug: 'openai-gpt4',
    description: 'Most capable GPT model for complex reasoning, coding, and creative tasks',
    category: 'llm',
    icon: 'Brain',
    url: 'https://openai.com',
    pricing: 'Pay-per-token',
    pricingModel: 'paid',
    rating: 4.9,
    reviews: 15420,
    downloads: '2.5M+',
    featured: true,
    tags: ['LLM', 'Code Generation', 'NLP'],
    features: ['Multi-modal input', '128K context', 'Function calling']
  },
  {
    id: '2',
    name: 'Anthropic Claude',
    slug: 'anthropic-claude',
    description: 'Helpful, harmless, and honest AI assistant with extended context',
    category: 'llm',
    icon: 'Sparkles',
    url: 'https://anthropic.com',
    pricing: '$0.025/1K tokens',
    pricingModel: 'paid',
    rating: 4.8,
    reviews: 8932,
    downloads: '1.8M+',
    featured: true,
    tags: ['LLM', 'Safety-focused', 'Long context'],
    features: ['200K context window', 'Constitutional AI', 'Haiku/Sonnet/Opus']
  },
  {
    id: '3',
    name: 'LangChain',
    slug: 'langchain',
    description: 'Framework for developing applications powered by language models',
    category: 'ml-ops',
    icon: 'Code',
    url: 'https://langchain.com',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.6,
    reviews: 5621,
    downloads: '890K+',
    featured: true,
    tags: ['Framework', 'RAG', 'Agents'],
    features: ['Chains', 'Agents', 'Memory', 'Tools']
  },
  {
    id: '4',
    name: 'Hugging Face Transformers',
    slug: 'hugging-face',
    description: 'State-of-the-art machine learning for text, audio, image, and video',
    category: 'llm',
    icon: 'Sparkles',
    url: 'https://huggingface.co',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.9,
    reviews: 12450,
    downloads: '5.2M+',
    featured: true,
    tags: ['NLP', 'PyTorch', 'TensorFlow'],
    features: ['50K+ models', 'Datasets library', 'Spaces']
  },
  {
    id: '5',
    name: 'Pinecone',
    slug: 'pinecone',
    description: 'Vector database for building scalable AI applications with embeddings',
    category: 'embeddings',
    icon: 'Layers',
    url: 'https://pinecone.io',
    pricing: 'Free tier available',
    pricingModel: 'freemium',
    rating: 4.7,
    reviews: 3421,
    downloads: '450K+',
    tags: ['Vector DB', 'Semantic Search', 'RAG'],
    features: ['Serverless', 'Managed', 'Real-time']
  },
  {
    id: '6',
    name: 'Weaviate',
    slug: 'weaviate',
    description: 'Open-source vector search engine with built-in embeddings',
    category: 'embeddings',
    icon: 'Layers',
    url: 'https://weaviate.io',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.5,
    reviews: 2156,
    downloads: '320K+',
    tags: ['Vector DB', 'GraphQL', 'GraphRAG'],
    features: ['Hybrid search', 'Multi-tenancy', 'Modules']
  },
  {
    id: '7',
    name: 'Qdrant',
    slug: 'qdrant',
    description: 'High-performance vector search engine for production AI',
    category: 'embeddings',
    icon: 'Layers',
    url: 'https://qdrant.tech',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.6,
    reviews: 1876,
    downloads: '280K+',
    tags: ['Vector DB', 'Rust', 'Fast'],
    features: ['Rust-based', 'gRPC API', 'Filtering']
  },
  {
    id: '8',
    name: 'Chroma',
    slug: 'chroma',
    description: 'AI-native open-source embedding database',
    category: 'embeddings',
    icon: 'Layers',
    url: 'https://trychroma.com',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.4,
    reviews: 1532,
    downloads: '210K+',
    tags: ['Vector DB', 'Embeddings', 'Python'],
    features: ['Python-first', 'Simple API', 'Notebooks']
  },
  {
    id: '9',
    name: 'LlamaIndex',
    slug: 'llamaindex',
    description: 'Data framework for LLM applications to ingest and query data',
    category: 'ml-ops',
    icon: 'Code',
    url: 'https://llamaindex.ai',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.7,
    reviews: 4231,
    downloads: '650K+',
    featured: true,
    tags: ['RAG', 'Data Loading', 'Indexing'],
    features: ['Data connectors', 'Query engines', 'Agents']
  },
  {
    id: '10',
    name: 'vLLM',
    slug: 'vllm',
    description: 'High-throughput and memory-efficient LLM inference engine',
    category: 'infrastructure',
    icon: 'Zap',
    url: 'https://vllm.ai',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.8,
    reviews: 2876,
    downloads: '420K+',
    tags: ['Inference', 'PagedAttention', 'Tensor Parallel'],
    features: ['PagedAttention', 'Continuous batching', 'Quantization support']
  },
  {
    id: '11',
    name: 'Ollama',
    slug: 'ollama',
    description: 'Run Llama 2, Mistral, and other LLMs locally on your machine',
    category: 'infrastructure',
    icon: 'Zap',
    url: 'https://ollama.ai',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.9,
    reviews: 7654,
    downloads: '1.2M+',
    featured: true,
    tags: ['Local LLM', 'Ollama', 'Mistral'],
    features: ['Local inference', 'Model library', 'REST API']
  },
  {
    id: '12',
    name: 'AutoGen',
    slug: 'autogen',
    description: 'Microsoft framework for building multi-agent AI applications',
    category: 'ml-ops',
    icon: 'Code',
    url: 'https://microsoft.github.io/autogen',
    pricing: 'Open Source',
    pricingModel: 'free',
    rating: 4.5,
    reviews: 2134,
    downloads: '340K+',
    tags: ['Multi-agent', 'Orchestration', 'Microsoft'],
    features: ['Agent collaboration', 'Code execution', 'Human feedback']
  },
];

export function getToolsByCategory(category: string): AITool[] {
  if (category === 'all') return aiTools;
  return aiTools.filter(tool => tool.category === category);
}

export function getPopularTools(): AITool[] {
  return [...aiTools].sort((a, b) => b.rating - a.rating);
}

export function getToolBySlug(slug: string): AITool | undefined {
  return aiTools.find(tool => tool.slug === slug);
}
