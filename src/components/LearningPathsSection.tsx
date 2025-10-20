import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  contentType: string;
  duration: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  isPublished: boolean;
  steps: LearningPathStep[];
  createdAt: string;
  updatedAt: string;
}

const LearningPathsSection = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/learning-paths');
        const data = await response.json();
        setLearningPaths(data.data);
      } catch (err) {
        setError('Failed to fetch learning paths');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'video':
        return '▶️';
      case 'article':
        return '📝';
      case 'project':
        return '💻';
      case 'quiz':
        return '❓';
      default:
        return '📄';
    }
  };

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground">Error loading learning paths: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Learning Paths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Structured learning journeys to master new skills and technologies
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{path.category}</Badge>
                      <Badge variant="secondary">{path.duration}</Badge>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">What you'll learn:</h4>
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
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {path.steps.length} steps
                    </span>
                    <Button>Start Learning</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && learningPaths.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No learning paths available at the moment.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default LearningPathsSection;