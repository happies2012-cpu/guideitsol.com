import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Star, Download, ExternalLink, 
  Grid, List, Github, Globe, Server, Database,
  Box, Layers, Code, Zap, Shield, Users,
  FileText, GitBranch, Container, Terminal, 
  Cloud, Lock, Accessibility, Palette
} from 'lucide-react';

// Real Open Source CMS Data
const cmsList = [
  {
    id: 1,
    name: 'Strapi',
    category: 'headless',
    description: 'Open-source headless CMS for building APIs quickly with a customizable admin panel',
    pricing: 'Open Source',
    language: 'Node.js',
    githubStars: 62000,
    npmWeeklyDownloads: 185000,
    lastCommit: '2 days ago',
    icon: 'S',
    color: '#8B5CF6',
    featured: true,
    tags: ['Headless', 'REST API', 'GraphQL', 'Plugin system'],
    features: ['Customizable content types', 'Role-based access', 'Media library', 'Internationalization'],
    website: 'https://strapi.io'
  },
  {
    id: 2,
    name: 'Ghost',
    category: 'blogging',
    description: 'Professional publishing platform for creating a blog or publication',
    pricing: 'Open Source',
    language: 'Node.js',
    githubStars: 44000,
    npmWeeklyDownloads: 42000,
    lastCommit: '1 day ago',
    icon: '👻',
    color: '#22C55E',
    featured: true,
    tags: ['Blogging', 'Membership', 'Newsletter'],
    features: ['Built-in membership', 'Newsletter system', 'SEO optimized', 'Markdown editor'],
    website: 'https://ghost.org'
  },
  {
    id: 3,
    name: 'Sanity',
    category: 'headless',
    description: 'Structured content platform with real-time collaboration and customizable schemas',
    pricing: 'Free tier',
    language: 'TypeScript',
    githubStars: 24000,
    npmWeeklyDownloads: 98000,
    lastCommit: 'Today',
    icon: 'S',
    color: '#F74368',
    featured: true,
    tags: ['Headless', 'Real-time', 'Portable Text', 'GROQ'],
    features: ['Real-time collaboration', 'Customizable studio', 'Portable Text', 'Image transformations'],
    website: 'https://sanity.io'
  },
  {
    id: 4,
    name: 'Payload',
    category: 'headless',
    description: 'Self-hosted headless CMS and application framework built with TypeScript',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 18000,
    npmWeeklyDownloads: 25000,
    lastCommit: '1 day ago',
    icon: 'P',
    color: '#1DA1F2',
    featured: true,
    tags: ['Headless', 'TypeScript', 'Self-hosted', 'Authentication'],
    features: ['Built-in authentication', 'Access control', 'GraphQL + REST', 'Custom hooks'],
    website: 'https://payloadcms.com'
  },
  {
    id: 5,
    name: 'WordPress',
    category: 'traditional',
    description: 'World\'s most popular CMS powering 40% of websites',
    pricing: 'Open Source',
    language: 'PHP',
    githubStars: 19000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 day ago',
    icon: 'W',
    color: '#21759B',
    featured: true,
    tags: ['CMS', 'PHP', 'Plugins', 'Themes'],
    features: ['Massive ecosystem', 'Themes & plugins', 'SEO friendly', 'REST API'],
    website: 'https://wordpress.org'
  },
  {
    id: 6,
    name: 'Directus',
    category: 'headless',
    description: 'Instant REST & GraphQL API for any SQL database with a beautiful admin panel',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 23000,
    npmWeeklyDownloads: 45000,
    lastCommit: '2 days ago',
    icon: 'D',
    color: '#6366F1',
    featured: false,
    tags: ['Headless', 'SQL', 'REST API', 'GraphQL'],
    features: ['Any SQL database', 'Auto-generated API', 'File assets', 'Permissions'],
    website: 'https://directus.io'
  },
  {
    id: 7,
    name: 'Cockpit',
    category: 'headless',
    description: 'Simple API-driven content manager with a minimalist approach',
    pricing: 'Open Source',
    language: 'PHP',
    githubStars: 6000,
    npmWeeklyDownloads: 0,
    lastCommit: '3 months ago',
    icon: 'C',
    color: '#F59E0B',
    featured: false,
    tags: ['Headless', 'Minimal', 'JSON API', 'PHP'],
    features: ['Lightweight', 'Simple API', 'Collections', 'Regions'],
    website: 'https://getcockpit.com'
  },
  {
    id: 8,
    name: 'Hygraph',
    category: 'headless',
    description: 'GraphQL-first content management with powerful API and Studio',
    pricing: 'Free tier',
    language: 'TypeScript',
    githubStars: 9000,
    npmWeeklyDownloads: 12000,
    lastCommit: '1 week ago',
    icon: 'H',
    color: '#EC4899',
    featured: false,
    tags: ['Headless', 'GraphQL', 'Multi-language', 'Components'],
    features: ['GraphQL API', 'Component system', 'Localization', 'Webhooks'],
    website: 'https://hygraph.com'
  },
  {
    id: 9,
    name: 'Django CMS',
    category: 'traditional',
    description: 'Enterprise-grade CMS built on Django framework',
    pricing: 'Open Source',
    language: 'Python',
    githubStars: 9000,
    npmWeeklyDownloads: 0,
    lastCommit: '2 days ago',
    icon: 'D',
    color: '#092E20',
    featured: false,
    tags: ['CMS', 'Django', 'Python', 'Enterprise'],
    features: ['Multi-site', 'Page drafts', 'SEO tools', 'Permission system'],
    website: 'https://django-cms.org'
  },
  {
    id: 10,
    name: 'Keystone',
    category: 'headless',
    description: 'GraphQL API and Admin UI for Node.js with Prisma',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 7000,
    npmWeeklyDownloads: 8000,
    lastCommit: '1 week ago',
    icon: 'K',
    color: '#3B82F6',
    featured: false,
    tags: ['Headless', 'GraphQL', 'Prisma', 'Schema-first'],
    features: ['Auto GraphQL', 'Prisma integration', 'Custom admin UI', 'Access control'],
    website: 'https://keystonejs.com'
  },
  {
    id: 11,
    name: 'AppSmith',
    category: 'lowcode',
    description: 'Open-source low-code platform for building internal tools',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 28000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 day ago',
    icon: 'A',
    color: '#FF6B6B',
    featured: false,
    tags: ['Low-code', 'Internal tools', 'Dashboards', 'Forms'],
    features: ['Drag-and-drop', 'Connect to APIs', 'Custom widgets', 'Team collaboration'],
    website: 'https://appsmith.com'
  },
  {
    id: 12,
    name: 'ToolJet',
    category: 'lowcode',
    description: 'Open-source low-code platform for building business applications',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 27000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 day ago',
    icon: 'T',
    color: '#22C55E',
    featured: false,
    tags: ['Low-code', 'Business apps', 'SaaS', 'Database'],
    features: ['Visual builder', 'Data queries', 'Custom plugins', 'SSO support'],
    website: 'https://tooljet.com'
  },
  {
    id: 13,
    name: 'Refine',
    category: 'headless',
    description: 'React-based framework for building data-intensive applications',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 18000,
    npmWeeklyDownloads: 35000,
    lastCommit: '1 day ago',
    icon: 'R',
    color: '#6366F1',
    featured: true,
    tags: ['React', 'Admin panel', 'Ant Design', 'Material UI'],
    features: ['SSR support', 'Providers', 'Access control', 'i18n'],
    website: 'https://refine.dev'
  },
  {
    id: 14,
    name: 'NocoDB',
    category: 'spreadsheet',
    description: 'Turn any database into a smart spreadsheet with API',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 45000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 day ago',
    icon: 'N',
    color: '#2A2A2A',
    featured: true,
    tags: ['Spreadsheet', 'MySQL', 'PostgreSQL', 'Airtable alternative'],
    features: ['Spreadsheet UI', 'REST & GraphQL', 'Automation', 'API templates'],
    website: 'https://nocodb.com'
  },
  {
    id: 15,
    name: 'Baserow',
    category: 'spreadsheet',
    description: 'Open-source Airtable alternative with self-hosting option',
    pricing: 'Open Source',
    language: 'Python',
    githubStars: 19000,
    npmWeeklyDownloads: 0,
    lastCommit: '2 days ago',
    icon: 'B',
    color: '#F97316',
    featured: false,
    tags: ['Spreadsheet', 'Database', 'Self-hosted', 'Airtable'],
    features: ['No-code database', 'API access', 'Formulas', 'Views'],
    website: 'https://baserow.io'
  },
  {
    id: 16,
    name: 'Supabase',
    category: 'baas',
    description: 'Open-source Firebase alternative with PostgreSQL',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 64000,
    npmWeeklyDownloads: 120000,
    lastCommit: 'Today',
    icon: 'S',
    color: '#3ECF8E',
    featured: true,
    tags: ['BaaS', 'PostgreSQL', 'Auth', 'Realtime'],
    features: ['Auth included', 'Database', 'Storage', 'Realtime subscriptions'],
    website: 'https://supabase.com'
  },
  {
    id: 17,
    name: 'Appwrite',
    category: 'baas',
    description: 'Secure open-source backend server for web and mobile apps',
    pricing: 'Open Source',
    language: 'PHP',
    githubStars: 40000,
    npmWeeklyDownloads: 25000,
    lastCommit: '1 day ago',
    icon: 'A',
    color: '#FF6B6B',
    featured: false,
    tags: ['BaaS', 'Auth', 'Database', 'Functions'],
    features: ['Auth system', 'Database', 'Storage', 'Cloud functions'],
    website: 'https://appwrite.io'
  },
  {
    id: 18,
    name: 'Convex',
    category: 'baas',
    description: 'The reactive backend for TypeScript applications',
    pricing: 'Free tier',
    language: 'TypeScript',
    githubStars: 8000,
    npmWeeklyDownloads: 15000,
    lastCommit: '1 day ago',
    icon: 'C',
    color: '#00D4AA',
    featured: false,
    tags: ['BaaS', 'Realtime', 'TypeScript', 'Database'],
    features: ['Reactive queries', 'Full-stack TypeScript', 'Schema validation', 'File storage'],
    website: 'https://convex.dev'
  },
  {
    id: 19,
    name: 'Budibase',
    category: 'lowcode',
    description: 'Open-source low-code platform for creating internal tools in minutes',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 19000,
    npmWeeklyDownloads: 0,
    lastCommit: '2 days ago',
    icon: 'B',
    color: '#3B82F6',
    featured: false,
    tags: ['Low-code', 'Internal tools', 'Automation', 'Self-hosted'],
    features: ['Visual builder', 'Svelte/Vue/React', 'Data sources', 'Automation'],
    website: 'https://budibase.com'
  },
  {
    id: 20,
    name: 'Outline',
    category: 'wiki',
    description: 'Modern wiki and knowledge base for teams',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 22000,
    npmWeeklyDownloads: 0,
    lastCommit: '2 days ago',
    icon: 'O',
    color: '#2D3748',
    featured: false,
    tags: ['Wiki', 'Knowledge base', 'Collaboration', 'Slack integration'],
    features: ['Rich editor', 'Team spaces', 'Templates', 'Search'],
    website: 'https://www.getoutline.com'
  },
  {
    id: 21,
    name: 'Formbricks',
    category: 'survey',
    description: 'Open-source survey infrastructure for growing companies',
    pricing: 'Open Source',
    language: 'TypeScript',
    githubStars: 8000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 day ago',
    icon: 'F',
    color: '#6366F1',
    featured: false,
    tags: ['Survey', 'In-app surveys', 'NPS', 'User research'],
    features: ['Multiple question types', 'Targeting', 'Webhooks', 'Analytics'],
    website: 'https://formbricks.com'
  },
  {
    id: 22,
    name: 'Umbraco',
    category: 'traditional',
    description: 'Flexible ASP.NET Core CMS for web and content editors',
    pricing: 'Open Source',
    language: 'C#',
    githubStars: 4000,
    npmWeeklyDownloads: 0,
    lastCommit: '1 week ago',
    icon: 'U',
    color: '#3544B1',
    featured: false,
    tags: ['CMS', 'ASP.NET', 'Enterprise', '.NET'],
    features: ['Customizable', 'Media management', 'Multi-language', 'Workflow'],
    website: 'https://umbraco.com'
  },
  {
    id: 23,
    name: 'Prismic',
    category: 'headless',
    description: 'Headless CMS with custom types and Slice Machine',
    pricing: 'Free tier',
    language: 'JavaScript',
    githubStars: 5000,
    npmWeeklyDownloads: 8000,
    lastCommit: '1 week ago',
    icon: 'P',
    color: '#F9742E',
    featured: false,
    tags: ['Headless', 'Slices', 'Custom types', 'Preview'],
    features: ['Slice Machine', 'Content relationships', 'Localization', 'Preview mode'],
    website: 'https://prismic.io'
  },
  {
    id: 24,
    name: 'Storyblok',
    category: 'headless',
    description: 'Headless CMS with Visual Editor for better content management',
    pricing: 'Free tier',
    language: 'JavaScript',
    githubStars: 7000,
    npmWeeklyDownloads: 15000,
    lastCommit: '2 days ago',
    icon: 'S',
    color: '#2D2D2D',
    featured: false,
    tags: ['Headless', 'Visual editor', 'Components', 'CDN'],
    features: ['Visual editor', 'Component-based', 'CDN included', 'Multi-language'],
    website: 'https://storyblok.com'
  }
];

const categories = [
  { id: 'all', name: 'All Platforms', count: cmsList.length, icon: <Box className="w-5 h-5" /> },
  { id: 'headless', name: 'Headless CMS', count: cmsList.filter(c => c.category === 'headless').length, icon: <Layers className="w-5 h-5" /> },
  { id: 'baas', name: 'Backend as a Service', count: cmsList.filter(c => c.category === 'baas').length, icon: <Server className="w-5 h-5" /> },
  { id: 'lowcode', name: 'Low-code Platforms', count: cmsList.filter(c => c.category === 'lowcode').length, icon: <Code className="w-5 h-5" /> },
  { id: 'spreadsheet', name: 'Spreadsheet DB', count: cmsList.filter(c => c.category === 'spreadsheet').length, icon: <Database className="w-5 h-5" /> },
  { id: 'wiki', name: 'Wikis & Docs', count: cmsList.filter(c => c.category === 'wiki').length, icon: <FileText className="w-5 h-5" /> },
  { id: 'traditional', name: 'Traditional CMS', count: cmsList.filter(c => c.category === 'traditional').length, icon: <Globe className="w-5 h-5" /> },
  { id: 'blogging', name: 'Blogging', count: cmsList.filter(c => c.category === 'blogging').length, icon: <FileText className="w-5 h-5" /> },
  { id: 'survey', name: 'Survey Tools', count: cmsList.filter(c => c.category === 'survey').length, icon: <FileText className="w-5 h-5" /> },
];

export default function OSSMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'stars' | 'downloads' | 'name'>('stars');

  const filteredCMS = cmsList
    .filter(cms => selectedCategory === 'all' || cms.category === selectedCategory)
    .filter(cms => 
      cms.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cms.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cms.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'stars') return b.githubStars - a.githubStars;
      if (sortBy === 'downloads') return b.npmWeeklyDownloads - a.npmWeeklyDownloads;
      return a.name.localeCompare(b.name);
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6"
          >
            <Github className="w-4 h-4" />
            Open Source • Self-hostable • Community-driven
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Open Source CMS &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Platform Marketplace
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            Discover the best open-source content management systems, backend platforms,
            and low-code tools. Self-host or deploy to cloud with full control.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search platforms by name, language, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 backdrop-blur-xl transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-white/10'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CMS Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sort & View Controls */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{filteredCMS.length}</span> platforms
            </p>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                <option value="stars">Sort by GitHub Stars</option>
                <option value="downloads">Sort by Weekly Downloads</option>
                <option value="name">Sort by Name</option>
              </select>
              <div className="flex items-center bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
            }
          >
            {filteredCMS.map((cms) => (
              <motion.div
                key={cms.id}
                variants={itemVariants}
                className={`group relative bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {cms.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white">
                    Featured
                  </div>
                )}
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: cms.color }}
                    >
                      {cms.icon}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{formatNumber(cms.githubStars)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {cms.name}
                  </h3>

                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {cms.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cms.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded-md text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Github className="w-3 h-3" />
                      {formatNumber(cms.githubStars)}
                    </span>
                    {cms.npmWeeklyDownloads > 0 && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {formatNumber(cms.npmWeeklyDownloads)}/wk
                      </span>
                    )}
                    <span className="text-slate-600">•</span>
                    <span>{cms.language}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                      {cms.pricing}
                    </span>
                    <a
                      href={cms.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredCMS.length === 0 && (
            <div className="text-center py-20">
              <Box className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No platforms found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-white/10 rounded-3xl p-12"
          >
            <Code className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing the Right Platform?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Our team can help you evaluate, migrate, and deploy the perfect 
              open-source platform for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Platform Recommendation
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                View Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
