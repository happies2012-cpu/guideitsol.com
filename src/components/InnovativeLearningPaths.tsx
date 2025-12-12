import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Trophy, Target, ArrowRight, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Step {
  title: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  steps: Step[];
}

const InnovativeLearningPaths = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/learning-paths?limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch learning paths');
        }
        const data = await response.json();
        setLearningPaths(data.data || []);
      } catch (err) {
        console.error('Error fetching learning paths:', err);
        setError('Failed to load learning paths');
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  const getPathStyles = (index: number) => {
    const styles = [
      { color: 'bg-blue-500', icon: <BookOpen className="w-6 h-6" /> },
      { color: 'bg-purple-500', icon: <Zap className="w-6 h-6" /> },
      { color: 'bg-amber-500', icon: <Target className="w-6 h-6" /> },
      { color: 'bg-emerald-500', icon: <Code className="w-6 h-6" /> },
    ];
    return styles[index % styles.length];
  };

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center bg-muted/30 min-h-[600px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  if (error || learningPaths.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 bg-primary/5 text-primary">
            Structured Learning
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Curated Learning Paths
          </h2>
          <p className="text-xl text-muted-foreground">
            Follow our expert-designed roadmaps to master specific AI domains. From beginner concepts to advanced implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {learningPaths.map((path, index) => {
            const style = getPathStyles(index);
            return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 hover:shadow-lg group overflow-hidden bg-background/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className={`h-2 w-full ${style.color} opacity-80`} />
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${style.color} bg-opacity-10 text-primary ring-1 ring-inset ring-primary/10`}>
                        {React.cloneElement(style.icon, { className: `w-6 h-6 ${style.color.replace('bg-', 'text-')}` })}
                      </div>
                      <Badge variant="secondary" className="font-medium">
                        {path.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {path.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                        <span>Curriculum</span>
                        <span>{path.duration}</span>
                      </div>
                      <div className="space-y-3">
                        {path.steps && path.steps.slice(0, 4).map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary/60" />
                            <span className="text-sm line-clamp-1">{step.title}</span>
                          </div>
                        ))}
                        {(!path.steps || path.steps.length === 0) && (
                          <div className="text-sm text-muted-foreground italic">No steps defined yet</div>
                        )}
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" variant="outline">
                      Start Path <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default InnovativeLearningPaths;
