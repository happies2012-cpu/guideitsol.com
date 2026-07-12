import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Folder,
  Globe,
  Smartphone,
  Brain,
  Building,
  ShoppingCart,
  Cloud,
  ExternalLink,
  Github,
  Star,
  ArrowRight,
  ChevronRight,
  Layers,
  Zap
} from "lucide-react";
import { projects, projectCategories, getFeaturedProjects } from "@/data/projects";

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Brain,
  Building,
  ShoppingCart,
  Cloud,
  Folder,
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);
  
  const featuredProjects = getFeaturedProjects().slice(0, 3);

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
            <Folder className="w-3 h-3 mr-2" />
            Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Explore our portfolio of successful projects. From AI platforms to 
            enterprise solutions, see how we've helped businesses transform.
          </motion.p>
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => {
              const Icon = iconMap[project.category] || Folder;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={index === 0 ? "lg:row-span-2 card-elevated overflow-hidden group col-span-1 lg:col-span-1" : "card-elevated overflow-hidden group col-span-1 lg:col-span-1"}
                >
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Image Placeholder */}
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 mb-4 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-primary/50" />
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.category.toUpperCase()}
                      </Badge>
                      {project.award && (
                        <Badge className="bg-amber-500/20 text-amber-500 text-xs">
                          🏆 {project.award}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs bg-secondary rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    {project.stats && (
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        {Object.entries(project.stats).map(([key, value], i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      {project.demo && (
                        <Button size="sm" variant="outline" className="flex-1 btn-outline text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.caseStudy && (
                        <Button size="sm" className="flex-1 btn-primary text-xs">
                          Case Study
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
            {projectCategories.map((category) => {
              const Icon = iconMap[category.icon] || Folder;
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const Icon = iconMap[project.category] || Folder;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-elevated p-6 group hover:border-primary/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-secondary rounded text-secondary-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                {project.stats && (
                  <div className="flex gap-4 mb-4 text-sm">
                    {Object.values(project.stats).map((stat, i) => (
                      <span key={i} className="text-muted-foreground">{stat}</span>
                    ))}
                  </div>
                )}

                {/* Client */}
                <div className="text-xs text-muted-foreground mb-4">
                  Client: {project.client}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  {project.demo && (
                    <Button size="sm" variant="outline" className="flex-1 btn-outline text-xs h-8">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  )}
                  {project.github && (
                    <Button size="sm" variant="outline" className="flex-1 btn-outline text-xs h-8">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  )}
                  <Button size="sm" className="flex-1 btn-primary text-xs h-8">
                    View Details
                  </Button>
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
          <Link to="/portfolio">
            <Button size="lg" variant="outline" className="btn-outline">
              View All Projects
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;