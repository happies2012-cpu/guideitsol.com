import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Play,
  Brain,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Palette,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { trainings, trainingCategories, getFeaturedTrainings, getPopularTrainings, formatPrice } from "@/data/trainings";

const iconMap: Record<string, any> = {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Palette,
  TrendingUp,
  GraduationCap,
};

const typeColors = {
  course: "bg-blue-500/20 text-blue-500",
  path: "bg-purple-500/20 text-purple-500",
  workshop: "bg-amber-500/20 text-amber-500",
  certification: "bg-green-500/20 text-green-500",
};

const levelColors = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-blue-500/20 text-blue-500",
  advanced: "bg-purple-500/20 text-purple-500",
};

const TrainingsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const featuredTrainings = getFeaturedTrainings();
  const popularTrainings = getPopularTrainings().slice(0, 4);

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
            <GraduationCap className="w-3 h-3 mr-2" />
            Learning Hub
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Master New Skills with{" "}
            <span className="gradient-text">Expert Training</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            From beginner to expert, our comprehensive courses and learning paths 
            will help you master the skills that matter.
          </motion.p>
        </div>

        {/* Featured Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-semibold">Featured Courses</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredTrainings.map((training, index) => {
              const Icon = iconMap[training.category] || GraduationCap;
              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated overflow-hidden group"
                >
                  <div className="relative p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={typeColors[training.type]}>
                        {training.type.charAt(0).toUpperCase() + training.type.slice(1)}
                      </Badge>
                      <Badge className={levelColors[training.level]}>
                        {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
                      </Badge>
                      {training.badge && (
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {training.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {training.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {training.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {training.stats.students.toLocaleString()} students
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        {training.stats.rating} ({training.stats.reviews.toLocaleString()})
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {training.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {training.stats.lessons} lessons
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {training.features.slice(0, 4).map((feature, i) => (
                        <span key={i} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-2xl font-bold">{formatPrice(training.price)}</span>
                        {training.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {formatPrice(training.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Button className="btn-primary">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Popular Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Popular Courses</h3>
            </div>
            <Link to="/trainings" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTrainings.map((training, index) => {
              const Icon = iconMap[training.category] || GraduationCap;
              return (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {training.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="w-3 h-3 text-amber-500" />
                      {training.stats.rating}
                    </div>
                    <div className="font-semibold text-primary">
                      {formatPrice(training.price)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-semibold">Learning Paths</h3>
          </div>
          <div className="card-elevated p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="font-semibold text-lg mb-2">AI Engineer Career Path</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete path from Python basics to deploying production AI applications.
                  Includes 8 courses, 300+ lessons, and 50+ projects.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-secondary rounded">24 weeks</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded">200 hours</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded">50+ projects</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">
                  {formatPrice(799)} <span className="text-sm text-muted-foreground line-through">{formatPrice(1299)}</span>
                </div>
                <Button className="w-full btn-primary">
                  Start Learning Path
                </Button>
              </div>
              <div className="md:w-2/3">
                <div className="space-y-4">
                  {[
                    { title: "Python & Fundamentals", lessons: "20 hours" },
                    { title: "Machine Learning", lessons: "30 hours" },
                    { title: "Deep Learning", lessons: "35 hours" },
                    { title: "Production AI", lessons: "25 hours" },
                  ].map((module, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{module.title}</div>
                        <div className="text-sm text-muted-foreground">{module.lessons}</div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/trainings">
            <Button size="lg" className="btn-primary">
              Explore All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingsSection;