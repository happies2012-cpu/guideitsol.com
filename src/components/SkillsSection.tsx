import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Code,
  Monitor,
  Server,
  Smartphone,
  Cloud,
  Brain,
  Database,
  Palette,
  Wrench,
  TrendingUp,
  ArrowRight,
  Award,
  ChevronRight
} from "lucide-react";
import { skills, skillCategories, getSkillsByCategory, getTrendingSkills, levelLabels } from "@/data/skills";

const iconMap: Record<string, any> = {
  Atom: Code,
  Monitor,
  Server,
  Smartphone,
  Cloud,
  Brain,
  Database,
  Palette,
  Hexagon: Code,
  Shield: Code,
  FileCode: Code,
  Zap: Code,
  Settings: Server,
  Coffee: Server,
  Container: Cloud,
  GitBranch: Code,
  Flame: Brain,
  MessageSquare: Brain,
  Pen: Palette,
  Layout: Palette,
  Play: Palette,
  BarChart3: Brain,
};

const levelProgress = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
};

const levelColors = {
  beginner: "bg-green-500",
  intermediate: "bg-blue-500",
  advanced: "bg-purple-500",
  expert: "bg-amber-500",
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = getSkillsByCategory(activeCategory);
  const trendingSkills = getTrendingSkills().slice(0, 8);

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-primary inline-flex mb-4"
          >
            <Award className="w-3 h-3 mr-2" />
            Our Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our team masters cutting-edge technologies to deliver exceptional results.
            From frontend to AI, we've got you covered.
          </motion.p>
        </div>

        {/* Trending Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Trending Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {skillCategories.map((category) => {
              const Icon = iconMap[category.icon] || Wrench;
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
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-elevated p-6 group hover:border-primary/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      skill.level === 'expert' ? 'bg-amber-500/20 text-amber-500' :
                      skill.level === 'advanced' ? 'bg-purple-500/20 text-purple-500' :
                      skill.level === 'intermediate' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-green-500/20 text-green-500'
                    }`}
                  >
                    {levelLabels[skill.level]}
                  </Badge>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {skill.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {skill.years} {skill.years === 1 ? 'year' : 'years'} experience
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Proficiency</span>
                    <span>{levelProgress[skill.level]}%</span>
                  </div>
                  <Progress 
                    value={levelProgress[skill.level]} 
                    className="h-2"
                  />
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {skill.tools.slice(0, 3).map((tool, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      {tool}
                    </span>
                  ))}
                  {skill.tools.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      +{skill.tools.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{skill.projects}</span> projects
                  </span>
                  {skill.certifications && skill.certifications.length > 0 && (
                    <span className="text-primary text-xs">Certified</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/skills">
            <Button size="lg" variant="outline" className="btn-outline">
              View All Skills
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;