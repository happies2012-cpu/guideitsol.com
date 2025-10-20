import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ExternalLink, 
  Star, 
  Zap, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Users, 
  TrendingUp,
  Brain,
  Lightbulb,
  Target,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

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
  originalPrice?: string;
  discountPrice?: string;
  skills?: string[];
}

interface AIToolDetailLightboxProps {
  tool: AITool;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (tool: AITool) => void;
}

const AIToolDetailLightbox: React.FC<AIToolDetailLightboxProps> = ({ 
  tool, 
  isOpen, 
  onClose,
  onEnroll
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'skills'>('overview');

  // Parse skills from the tool data
  const skills = tool.skills || (tool.applicableTasks ? tool.applicableTasks.split(',').map(s => s.trim()) : []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Column - Tool Image and Basic Info */}
          <div className="lg:col-span-1 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-l-lg">
            <div className="sticky top-6">
              <div className="flex flex-col items-center text-center">
                {tool.icon ? (
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-24 h-24 rounded-xl object-cover mb-4 border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/20">
                    <Brain className="w-12 h-12 text-primary" />
                  </div>
                )}
                
                <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Badge variant={tool.isPaid ? 'default' : 'secondary'}>
                    {tool.isPaid ? (
                      <><DollarSign className="w-3 h-3 mr-1" />Paid</>
                    ) : (
                      <><Zap className="w-3 h-3 mr-1" />Free</>
                    )}
                  </Badge>
                  <Badge variant="outline">{tool.category}</Badge>
                  {tool.featured && (
                    <Badge variant="default">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                {tool.originalPrice && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2">
                      {tool.discountPrice ? (
                        <>
                          <span className="text-2xl font-bold text-primary">₹{tool.discountPrice}</span>
                          <span className="text-lg text-muted-foreground line-through">₹{tool.originalPrice}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-primary">₹{tool.originalPrice}</span>
                      )}
                    </div>
                    {tool.discountPrice && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ₹{parseInt(tool.originalPrice) - parseInt(tool.discountPrice)}
                      </div>
                    )}
                  </div>
                )}
                
                <Button 
                  onClick={() => onEnroll(tool)}
                  className="w-full mb-4"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learn This Tool
                </Button>
                
                {tool.url && (
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full"
                  >
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Official Site
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Tool Details */}
          <div className="lg:col-span-2 p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-bold">
                {tool.name} Details
              </DialogTitle>
            </DialogHeader>
            
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'features' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'skills' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                      {tool.fullDescription || tool.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Category
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{tool.category}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Pricing
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{tool.pricing || (tool.isPaid ? 'Paid' : 'Free')}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {tool.pros && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            Key Benefits
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {tool.pros.split(',').map((pro, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{pro.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {tool.cons && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-5 h-5" />
                            Limitations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {tool.cons.split(',').map((con, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{con.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {tool.applicableTasks && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Applicable Tasks
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {tool.applicableTasks.split(',').map((task, index) => (
                              <Badge key={index} variant="secondary">
                                {task.trim()}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          Skills You'll Gain
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {skills.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {skills.map((skill, index) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            No specific skills listed for this tool. Enroll to discover what you can learn!
                          </p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Unlimited Access Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Access to all features of {tool.name}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Regular updates and new features</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Community support and expert guidance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Hands-on projects and real-world applications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Certificate of completion</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIToolDetailLightbox;