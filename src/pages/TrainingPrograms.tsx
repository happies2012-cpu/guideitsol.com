import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, CloudCog, Code2, Cpu, Megaphone, PenTool, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trainingCategories = [
  {
    title: 'Coding & Development',
    description: 'Master modern coding, full-stack development, APIs, and deployment workflows.',
    icon: Code2,
    href: '/trainings/coding-development',
    badge: 'Popular',
  },
  {
    title: 'UI/UX & Design',
    description: 'Design polished products with Figma, product thinking, and user-centered principles.',
    icon: PenTool,
    href: '/trainings/ui-ux-design',
    badge: 'Creative',
  },
  {
    title: 'AI & Generative AI',
    description: 'Build intelligent assistants, prompt systems, and AI-powered automations.',
    icon: BrainCircuit,
    href: '/trainings/ai-generative-ai',
    badge: 'Trending',
  },
  {
    title: 'AI/ML & Data Science',
    description: 'Learn machine learning pipelines, analytics, model evaluation, and data storytelling.',
    icon: Cpu,
    href: '/trainings/ai-ml-data-science',
    badge: 'Advanced',
  },
  {
    title: 'IoT & Embedded Systems',
    description: 'Create connected devices, sensors, edge logic, and smart automation products.',
    icon: Sparkles,
    href: '/trainings/iot-embedded-systems',
    badge: 'Emerging',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deploy reliable platforms with Docker, Kubernetes, CI/CD, and cloud architecture.',
    icon: CloudCog,
    href: '/trainings/cloud-devops',
    badge: 'In Demand',
  },
  {
    title: 'Cybersecurity',
    description: 'Strengthen systems with secure coding, compliance practices, and threat awareness.',
    icon: ShieldCheck,
    href: '/trainings/cybersecurity',
    badge: 'Critical',
  },
  {
    title: 'Digital Marketing & Automation',
    description: 'Use AI copilots, campaign automation, and analytics to grow faster.',
    icon: Megaphone,
    href: '/trainings/digital-marketing-automation',
    badge: 'Growth',
  },
];

const highlights = [
  'Live mentor-led sessions',
  'Projects aligned with real business use cases',
  'Career-ready portfolios and certification support',
];

const TrainingPrograms = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-primary/10 text-primary">IT & AI Training Program</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Learn the skills that power modern AI, software, and digital business.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              From coding and design to AI/ML, cloud, IoT, and digital marketing, our training tracks help learners build practical expertise with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/ai-tools">Explore AI Tools</Link>
              </Button>
            </div>
          </motion.div>

          <div className="grid gap-4 rounded-3xl border border-primary/10 bg-background/70 p-6 shadow-sm md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Training Tracks</p>
            <h2 className="text-3xl font-semibold">Choose a path that matches your next goal</h2>
          </div>
          <p className="max-w-2xl text-muted-foreground">
            Every track includes hands-on practice, real-world projects, and support for portfolio building and career growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trainingCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full border-border/70 bg-card/70 transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">{category.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <Button asChild variant="ghost" className="px-0 text-primary hover:bg-transparent hover:text-primary/80">
                      <Link to={category.href} className="inline-flex items-center gap-2">
                        View track
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TrainingPrograms;
