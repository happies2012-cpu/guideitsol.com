import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ExternalLink, Sparkles, DollarSign, Zap, CheckCircle2, XCircle, Info, Brain, BookOpen, TrendingUp, Users, Bot, MessageCircle, Cpu, Network, ZapIcon, Workflow, Layers, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { aiToolsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { parseAIToolsCSV, AIToolData } from '@/lib/csvParser';
import AIChatbot from '@/components/AIChatbot';
import EnrollForm from '@/components/EnrollForm';
import AIToolDetailLightbox from '@/components/AIToolDetailLightbox';
import { SplashCursor } from '@/components/ui/splash-cursor';

// Import CSV data
import aiToolsCSV from '@/assets/Ai_Tools_Data.csv?raw';

// Import unique hero image for AI Learning page
import heroImage from '@/assets/12.png';

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  url?: string;
  tags: string;
  featured: boolean;
  pricing?: string;
  isPaid?: boolean;
  pros?: string;
  cons?: string;
  fullDescription?: string;
  detailUrl?: string;
  logoUrl?: string;
  applicableTasks?: string;
}

const AILearning = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [csvTools, setCsvTools] = useState<AIToolData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showFeatured, setShowFeatured] = useState(false);
  const [pricingFilter, setPricingFilter] = useState<'all' | 'free' | 'paid'>('all');
  
  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedToolForLightbox, setSelectedToolForLightbox] = useState<AITool | null>(null);
  
  // Enrollment state
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 40; // Show 40 tools per page
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false
  });

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
      fetchTools(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory, showFeatured, pricingFilter]);

  useEffect(() => {
    fetchTools(currentPage);
    fetchCategories();
    loadCSVData();
  }, [currentPage]);

  const loadCSVData = () => {
    try {
      const parsedTools = parseAIToolsCSV(aiToolsCSV);
      setCsvTools(parsedTools);
    } catch (error) {
      console.error('Failed to parse CSV data:', error);
      toast.error('Failed to load additional tool data');
    }
  };

  const fetchTools = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const params: any = {
        page: page,
        limit: toolsPerPage,
        search: searchQuery || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        featured: showFeatured ? 'true' : undefined
      };

      const response = await aiToolsAPI.getAll(params);
      
      // Set tools from the paginated response
      setTools(response.data.data || []);
      
      // Update pagination info from response
      if (response.data.pagination) {
        setPaginationInfo(response.data.pagination);
      }
    } catch (error) {
      toast.error('Failed to load AI tools');
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await aiToolsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  // Handle lightbox
  const handleViewDetails = (tool: AITool) => {
    setSelectedToolForLightbox(tool);
    setIsLightboxOpen(true);
  };

  // Handle enrollment
  const handleEnrollClick = (tool: AITool) => {
    setSelectedTool(tool);
    setIsEnrollOpen(true);
  };

  const handleEnrollSuccess = () => {
    toast.success(`Successfully enrolled in ${selectedTool?.name}!`);
    // In a real implementation, you would update user access here
  };

  // Combine database tools with CSV tools for display
  const combinedTools = useMemo(() => {
    const dbTools: AITool[] = tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      icon: tool.icon,
      url: tool.url,
      tags: tool.tags,
      featured: tool.featured,
      pricing: tool.pricing,
      isPaid: tool.isPaid,
      pros: tool.pros,
      cons: tool.cons,
      fullDescription: tool.fullDescription,
      detailUrl: tool.detailUrl,
      logoUrl: tool.logoUrl,
      applicableTasks: tool.applicableTasks,
    }));

    // Only show CSV tools if we're on the first page and there aren't enough DB tools
    const csvToolsConverted: AITool[] = csvTools.map((csvTool, index) => ({
      id: `csv-${index}`,
      name: csvTool.companyName,
      description: csvTool.shortDescription,
      category: csvTool.category,
      icon: csvTool.logoUrl,
      url: csvTool.visitWebsiteUrl,
      tags: csvTool.applicableTasks,
      featured: false,
      pricing: csvTool.pricing,
      isPaid: csvTool.isPaid,
      pros: csvTool.pros,
      cons: csvTool.cons,
      fullDescription: csvTool.fullDescription,
      detailUrl: csvTool.detailUrl,
      logoUrl: csvTool.logoUrl,
      applicableTasks: csvTool.applicableTasks,
    }));

    // Apply pricing filter
    let filteredTools = [...dbTools, ...csvToolsConverted];
    
    if (pricingFilter === 'free') {
      filteredTools = filteredTools.filter(tool => 
        !tool.isPaid || (tool.pricing && tool.pricing.toLowerCase().includes('free'))
      );
    } else if (pricingFilter === 'paid') {
      filteredTools = filteredTools.filter(tool => 
        tool.isPaid || (tool.pricing && !tool.pricing.toLowerCase().includes('free'))
      );
    }

    return filteredTools;
  }, [tools, csvTools, pricingFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  const renderToolsGrid = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="mt-4 text-muted-foreground">Loading AI tools...</p>
        </div>
      );
    }

    if (combinedTools.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tools found matching your criteria</p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowFeatured(false);
              setPricingFilter('all');
            }}
            className="mt-4"
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      );
    }

    return (
      <>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {combinedTools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <FollowerPointerCard
                title={
                  <div className="flex items-center gap-2">
                    {tool.icon && (
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 rounded" />
                    )}
                    <span>{tool.name}</span>
                  </div>
                }
              >
                <Card className="h-full border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm bg-background/95">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {tool.icon && (
                            <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-lg object-cover" />
                          )}
                          {tool.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={tool.isPaid ? 'default' : 'secondary'} className="text-xs">
                            {tool.isPaid ? (
                              <><DollarSign className="w-3 h-3 mr-1" />{tool.pricing || 'Paid'}</>
                            ) : (
                              <><Zap className="w-3 h-3 mr-1" />Open Source</>
                            )}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>

                      </div>
                    </div>
                    <CardDescription className="line-clamp-3 text-sm">
                      {tool.fullDescription || tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Pros and Cons */}
                    {(tool.pros || tool.cons) && (
                      <div className="space-y-3 mb-4">
                        {tool.pros && (
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold flex items-center gap-1 text-green-600 dark:text-green-400">
                              <CheckCircle2 className="w-3 h-3" />
                              Pros
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tool.pros.split(',').slice(0, 3).join(', ')}
                            </p>
                          </div>
                        )}
                        {tool.cons && (
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold flex items-center gap-1 text-red-600 dark:text-red-400">
                              <XCircle className="w-3 h-3" />
                              Cons
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tool.cons.split(',').slice(0, 3).join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {tool.applicableTasks && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.applicableTasks.split(',').slice(0, 3).map((task, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {task.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEnrollClick(tool)}
                        size="sm"
                        className="flex-1"
                      >
                        Enroll Now
                      </Button>
                      {tool.detailUrl && (
                        <Button
                          onClick={() => handleViewDetails(tool)}
                          size="sm"
                          variant="outline"
                        >
                          <Info className="w-3 h-3 mr-2" />
                          Details
                        </Button>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </FollowerPointerCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {paginationInfo.totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!paginationInfo.hasPrev}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
            </span>
            
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginationInfo.totalPages))}
              disabled={!paginationInfo.hasNext}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Splash Cursor Effect */}
      <SplashCursor />
      
      {/* Enrollment Form Modal */}
      {selectedTool && (
        <EnrollForm 
          toolId={selectedTool.id}
          toolName={selectedTool.name}
          isOpen={isEnrollOpen}
          onClose={() => setIsEnrollOpen(false)}
          onEnrollSuccess={handleEnrollSuccess}
        />
      )}
      
      {/* AI Tool Detail Lightbox */}
      {selectedToolForLightbox && (
        <AIToolDetailLightbox
          tool={selectedToolForLightbox}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onEnroll={handleEnrollClick}
        />
      )}
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Unique background for AI Learning page */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iaHNsKDIzOSA4NCUgNjclIC8gMC4xNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">AI-Powered Learning Revolution</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Master AI Tools for Smarter Work
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover over 12,000 cutting-edge AI tools designed to boost productivity, 
              automate tasks, and accelerate your learning journey. Find the perfect tools 
              for your workflow today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Explore AI Tools
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Learning Resources
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
              <div className="text-3xl font-bold text-primary">12K+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Productivity Boost</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Learning Access</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section with GenAI, Agentic AI, and AI Agents */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Next-Generation AI Technologies</h2>
            <p className="text-lg text-muted-foreground">
              Explore the cutting-edge AI technologies transforming how we work and learn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <Cpu className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Generative AI (GenAI)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create original content including text, images, audio, and video with advanced neural networks. 
                  Transform your creative process with AI-powered generation capabilities.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Content Creation</Badge>
                  <Badge variant="secondary" className="text-xs">Design</Badge>
                  <Badge variant="secondary" className="text-xs">Code Generation</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <Bot className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Agentic AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Autonomous AI systems that can perceive, reason, and act in complex environments. 
                  These agents can complete multi-step tasks with minimal human intervention.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Autonomous Agents</Badge>
                  <Badge variant="secondary" className="text-xs">Task Automation</Badge>
                  <Badge variant="secondary" className="text-xs">Decision Making</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <Network className="w-12 h-12 text-primary mb-4" />
                <CardTitle>AI Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Intelligent virtual assistants that can understand context, maintain conversations, 
                  and perform complex actions across multiple platforms and applications.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Chatbots</Badge>
                  <Badge variant="secondary" className="text-xs">Virtual Assistants</Badge>
                  <Badge variant="secondary" className="text-xs">Workflow Automation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Tools Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized AI Tool Categories</h2>
            <p className="text-lg text-muted-foreground">
              Discover tools tailored for specific AI technologies and applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ZapIcon className="w-8 h-8 text-primary" />
                  <CardTitle>GenAI Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Text, image, audio, and video generation tools
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore GenAI
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Workflow className="w-8 h-8 text-primary" />
                  <CardTitle>Agentic AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Autonomous agents and multi-step task automation
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore Agents
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <CardTitle>AI Chatbots</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Conversational AI and virtual assistants
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore Chatbots
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Layers className="w-8 h-8 text-primary" />
                  <CardTitle>AI Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Tools for integrating AI into existing workflows
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore Integrations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect AI Tool</h2>
            <p className="text-muted-foreground">
              Search through our extensive database to discover tools that match your 
              specific requirements and workflow.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-primary/20 shadow-xl backdrop-blur-lg bg-background/90">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search AI tools by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-64 border-primary/20">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="All Categories" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant={showFeatured ? 'default' : 'outline'}
                    onClick={() => setShowFeatured(!showFeatured)}
                    className="flex items-center gap-2"
                  >
                    <Star className="h-4 w-4" />
                    Featured
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {paginationInfo.totalCount} tools
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recommended AI Tools</h2>
            <div className="text-sm text-muted-foreground">
              Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
            </div>
          </div>
          
          {/* Pricing Filter Tabs */}
          <Tabs defaultValue="all" value={pricingFilter} onValueChange={(value) => setPricingFilter(value as 'all' | 'free' | 'paid')} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                All Tools
              </TabsTrigger>
              <TabsTrigger value="free" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Open Source
              </TabsTrigger>
              <TabsTrigger value="paid" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Paid
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              {renderToolsGrid()}
            </TabsContent>
            <TabsContent value="free" className="mt-8">
              {renderToolsGrid()}
            </TabsContent>
            <TabsContent value="paid" className="mt-8">
              {renderToolsGrid()}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using AI tools to boost their 
              productivity and accelerate their learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <AIChatbot />
    </div>
  );
};

export default AILearning;