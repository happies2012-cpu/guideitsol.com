import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Code, 
  Palette, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Cloud, 
  Brain,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";
import { aiTools, aiToolCategories, getToolsByCategory, getPopularTools } from "@/data/ai-tools";

const iconMap: Record<string, any> = {
  Code,
  Palette,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Cloud,
  Brain,
  Sparkles,
};

const AIToolsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleTools, setVisibleTools] = useState(8);

  const filteredTools = activeCategory === "all" 
    ? aiTools 
    : getToolsByCategory(activeCategory);

  const displayedTools = searchQuery
    ? filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTools.slice(0, visibleTools);

  const popularTools = getPopularTools().slice(0, 4);

  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-primary inline-flex mb-4"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            AI Tools
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Powerful AI Tools for{" "}
            <span className="gradient-text">Every Workflow</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Boost productivity with our suite of AI-powered tools. From code generation 
            to content creation, we've got you covered.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {aiToolCategories.slice(0, 6).map((category) => {
                const Icon = iconMap[category.icon] || Sparkles;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Popular Tools Highlight */}
        {activeCategory === "all" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Most Popular
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTools.map((tool, index) => {
                const Icon = iconMap[tool.icon] || Sparkles;
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-elevated p-6 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h4>
                      {tool.new && (
                        <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.shortDescription}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTools.map((tool, index) => {
            const Icon = iconMap[tool.icon] || Sparkles;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-elevated p-6 group hover:border-primary/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tool.pricing === 'free' ? 'bg-green-500/20 text-green-500' :
                    tool.pricing === 'freemium' ? 'bg-blue-500/20 text-blue-500' :
                    tool.pricing === 'paid' ? 'bg-purple-500/20 text-purple-500' :
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {tool.pricing === 'free' ? 'Free' :
                     tool.pricing === 'freemium' ? 'Freemium' :
                     tool.pricing === 'paid' ? tool.price : 'Custom'}
                  </span>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tool.shortDescription}
                </p>

                {/* Features Preview */}
                <div className="space-y-1 mb-4">
                  {tool.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                  {tool.features.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{tool.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Integrations */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.integrations.slice(0, 3).map((integration, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      {integration}
                    </span>
                  ))}
                  {tool.integrations.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      +{tool.integrations.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 btn-outline text-xs h-8">
                    <Link to={`/ai-tools/${tool.slug}`} className="flex items-center gap-1">
                      Learn More
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 btn-primary text-xs h-8">
                    Try Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleTools < filteredTools.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setVisibleTools(prev => prev + 8)}
              className="btn-outline"
            >
              Load More Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/ai-tools">
            <Button size="lg" className="btn-primary">
              View All AI Tools
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AIToolsSection;