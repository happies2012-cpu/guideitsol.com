import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Brain, Rocket, GraduationCap, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const learningPaths = [
  {
    id: '1',
    title: 'AI & Machine Learning Fundamentals',
    description: 'Master the foundations of artificial intelligence and machine learning from scratch.',
    category: 'AI & ML',
    difficulty: 'beginner',
    duration: '8 weeks',
    icon: Brain,
    steps: [
      { id: 's1', title: 'Introduction to AI Concepts', contentType: 'video' },
      { id: 's2', title: 'Python for Data Science', contentType: 'project' },
      { id: 's3', title: 'Supervised Learning Models', contentType: 'article' },
      { id: 's4', title: 'Neural Networks Basics', contentType: 'quiz' },
    ],
  },
  {
    id: '2',
    title: 'Full-Stack Web Development',
    description: 'Build modern, scalable web applications with React, Node.js, and cloud technologies.',
    category: 'Development',
    difficulty: 'intermediate',
    duration: '12 weeks',
    icon: Code,
    steps: [
      { id: 's1', title: 'React & TypeScript Masterclass', contentType: 'video' },
      { id: 's2', title: 'RESTful API Design', contentType: 'project' },
      { id: 's3', title: 'Database Architecture', contentType: 'article' },
      { id: 's4', title: 'CI/CD & Deployment', contentType: 'project' },
      { id: 's5', title: 'Performance Optimization', contentType: 'quiz' },
    ],
  },
  {
    id: '3',
    title: 'Cloud & DevOps Engineering',
    description: 'Design, deploy, and manage cloud infrastructure using AWS, Docker, and Kubernetes.',
    category: 'Cloud',
    difficulty: 'advanced',
    duration: '10 weeks',
    icon: Rocket,
    steps: [
      { id: 's1', title: 'Cloud Architecture Patterns', contentType: 'video' },
      { id: 's2', title: 'Docker & Containerization', contentType: 'project' },
      { id: 's3', title: 'Kubernetes Orchestration', contentType: 'project' },
      { id: 's4', title: 'Infrastructure as Code', contentType: 'article' },
    ],
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 'intermediate':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 'advanced':
      return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    default:
      return 'bg-gray-500/15 text-gray-400 border-gray-500/30';
  }
};

const getContentTypeIcon = (contentType: string) => {
  switch (contentType) {
    case 'video': return '▶️';
    case 'article': return '📝';
    case 'project': return '💻';
    case 'quiz': return '❓';
    default: return '📄';
  }
};

const LearningPathsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Structured Learning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Learning Paths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Structured learning journeys to master new skills and technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="flex flex-col h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <path.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className={`${getDifficultyColor(path.difficulty)} border text-xs font-medium`}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <CardDescription className="text-sm">{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">{path.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{path.duration}</Badge>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground">What you'll learn:</h4>
                    <ul className="space-y-2">
                      {path.steps.slice(0, 3).map((step) => (
                        <li key={step.id} className="flex items-start text-sm">
                          <span className="mr-2">{getContentTypeIcon(step.contentType)}</span>
                          <span>{step.title}</span>
                        </li>
                      ))}
                      {path.steps.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          + {path.steps.length - 3} more steps
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t border-border/30">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {path.steps.length} steps
                  </span>
                  <Link to="/ai-learning">
                    <Button size="sm" className="gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Start Learning
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LearningPathsSection;