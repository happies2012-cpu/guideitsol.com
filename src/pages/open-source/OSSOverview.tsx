import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Layers, Server, Code, Database, FileText,
  ChevronRight, Star, Github, ExternalLink, Sparkles,
  Cpu, GitBranch, Container, Shield, Users
} from 'lucide-react';

export default function OSSOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
              <Github className="w-4 h-4" />
              Open Source • Self-hostable • Community-driven
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Open Source Platforms
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                & CMS Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Discover and explore the best open-source content management systems, 
              backend platforms, and development tools. Self-host or deploy to cloud.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/open-source/cms"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Explore CMS Platforms
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Get Implementation Help
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Headless CMS', description: 'API-first content management for modern web and mobile apps', href: '/open-source/cms?category=headless', color: '#8B5CF6', count: 12 },
              { icon: Server, title: 'Backend as a Service', description: 'Ready-to-use backend infrastructure with auth, database, and storage', href: '/open-source/cms?category=baas', color: '#3ECF8E', count: 6 },
              { icon: Code, title: 'Low-code Platforms', description: 'Build internal tools and apps visually with minimal coding', href: '/open-source/cms?category=lowcode', color: '#3B82F6', count: 5 },
              { icon: Database, title: 'Spreadsheet Databases', description: 'Excel-like interfaces backed by powerful databases', href: '/open-source/cms?category=spreadsheet', color: '#F97316', count: 3 },
              { icon: FileText, title: 'Wikis & Documentation', description: 'Team knowledge bases and documentation platforms', href: '/open-source/cms?category=wiki', color: '#2D3748', count: 4 },
              { icon: Box, title: 'Traditional CMS', description: 'Full-featured content management with built-in frontends', href: '/open-source/cms?category=traditional', color: '#21759B', count: 5 },
            ].map((category, index) => (
              <motion.a
                key={category.title}
                href={category.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${category.color}20` }}>
                  <category.icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">{category.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{category.count} platforms</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Most Popular Platforms</h2>
            <p className="text-slate-400">Top open-source projects by GitHub stars</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Supabase', stars: '64K', category: 'BaaS', color: '#3ECF8E' },
              { name: 'Strapi', stars: '62K', category: 'Headless CMS', color: '#8B5CF6' },
              { name: 'NocoDB', stars: '45K', category: 'Spreadsheet', color: '#2A2A2A' },
              { name: 'Appwrite', stars: '40K', category: 'BaaS', color: '#FF6B6B' },
              { name: 'Ghost', stars: '44K', category: 'Blogging', color: '#22C55E' },
              { name: 'ToolJet', stars: '27K', category: 'Low-code', color: '#22C55E' },
              { name: 'AppSmith', stars: '28K', category: 'Low-code', color: '#FF6B6B' },
              { name: 'Refine', stars: '18K', category: 'Headless CMS', color: '#6366F1' },
            ].map((platform, index) => (
              <motion.a
                key={platform.name}
                href="/open-source/cms"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: platform.color }}>
                  {platform.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{platform.name}</div>
                  <div className="text-xs text-slate-500">{platform.category}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-medium">{platform.stars}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-3xl p-12"
          >
            <Code className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Need Help with Open Source?</h2>
            <p className="text-slate-300 mb-8">
              We provide consulting, implementation, and custom development 
              services for all open-source platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                Contact Us
              </a>
              <a href="/services" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
