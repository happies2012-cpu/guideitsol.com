import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, BookOpen, Users, Award, Clock, Sparkles,
  ChevronRight, Star, Play, TrendingUp, Zap,
  Code, Database, LineChart, Bot, Layers, Cpu
} from 'lucide-react';

const trainingPrograms = [
  {
    id: 1,
    title: 'AI & Machine Learning Fundamentals',
    slug: 'ai-ml-fundamentals',
    description: 'Master the core concepts of artificial intelligence and machine learning algorithms',
    duration: '12 weeks',
    level: 'Beginner',
    price: 29999,
    originalPrice: 49999,
    students: 2450,
    rating: 4.8,
    icon: Brain,
    color: '#8B5CF6',
    gradient: 'from-violet-500/20 to-purple-500/20',
    topics: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Neural Networks', 'Deep Learning'],
    features: ['Live sessions', 'Hands-on projects', 'Certificate', 'Career support'],
    featured: true
  },
  {
    id: 2,
    title: 'Large Language Models & Prompt Engineering',
    slug: 'llm-prompt-engineering',
    description: 'Learn to build and optimize applications with OpenAI, Claude, and open-source LLMs',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 39999,
    originalPrice: 59999,
    students: 1890,
    rating: 4.9,
    icon: Bot,
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-green-500/20',
    topics: ['GPT-4', 'LangChain', 'Vector Databases', 'RAG', 'Fine-tuning', 'Agents'],
    features: ['API access', 'Real projects', 'Certificate', 'Community access'],
    featured: true
  },
  {
    id: 3,
    title: 'Data Science & Analytics',
    slug: 'data-science-analytics',
    description: 'Transform data into insights with statistical analysis, visualization, and ML models',
    duration: '16 weeks',
    level: 'Intermediate',
    price: 34999,
    originalPrice: 54999,
    students: 3200,
    rating: 4.7,
    icon: LineChart,
    color: '#3B82F6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    topics: ['Statistics', 'SQL', 'Tableau', 'Power BI', 'Python', 'Machine Learning'],
    features: ['Case studies', 'Portfolio projects', 'Certificate', 'Job assistance'],
    featured: false
  },
  {
    id: 4,
    title: 'Computer Vision & Image Processing',
    slug: 'computer-vision',
    description: 'Build applications that see and understand images using deep learning',
    duration: '10 weeks',
    level: 'Advanced',
    price: 44999,
    originalPrice: 69999,
    students: 980,
    rating: 4.8,
    icon: Cpu,
    color: '#F97316',
    gradient: 'from-orange-500/20 to-amber-500/20',
    topics: ['OpenCV', 'TensorFlow', 'PyTorch', 'YOLO', 'GANs', 'Image Segmentation'],
    features: ['GPU labs', 'Research papers', 'Certificate', 'Capstone project'],
    featured: false
  },
  {
    id: 5,
    title: 'MLOps & Production AI Systems',
    slug: 'mlops-production',
    description: 'Deploy, monitor, and scale machine learning models in production environments',
    duration: '12 weeks',
    level: 'Advanced',
    price: 49999,
    originalPrice: 79999,
    students: 750,
    rating: 4.9,
    icon: Layers,
    color: '#EF4444',
    gradient: 'from-red-500/20 to-pink-500/20',
    topics: ['Docker', 'Kubernetes', 'MLflow', 'Airflow', 'AWS SageMaker', 'Monitoring'],
    features: ['Cloud labs', 'CI/CD pipelines', 'Certificate', 'Interview prep'],
    featured: true
  },
  {
    id: 6,
    title: 'Generative AI & Creative Applications',
    slug: 'generative-ai',
    description: 'Create stunning visuals, text, and audio with cutting-edge generative models',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 37999,
    originalPrice: 57999,
    students: 2100,
    rating: 4.8,
    icon: Sparkles,
    color: '#EC4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
    topics: ['Stable Diffusion', 'Midjourney', 'DALL-E', 'Voice AI', 'Video Generation', 'LLMs'],
    features: ['Creative projects', 'Tool access', 'Certificate', 'Portfolio'],
    featured: false
  }
];

const stats = [
  { label: 'Students Trained', value: '15,000+', icon: Users },
  { label: 'Courses Available', value: '50+', icon: BookOpen },
  { label: 'Success Rate', value: '94%', icon: TrendingUp },
  { label: 'Avg. Salary Hike', value: '45%', icon: Award },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'ML Engineer at Google',
    avatar: 'PS',
    content: 'The LLM course transformed my career. Within 3 months of completion, I landed my dream role at Google working on AI products.',
    rating: 5
  },
  {
    name: 'Rahul Mehta',
    role: 'Senior Data Scientist at Flipkart',
    avatar: 'RM',
    content: 'The curriculum is exactly what the industry needs. Practical projects and expert mentorship made all the difference.',
    rating: 5
  },
  {
    name: 'Ananya Gupta',
    role: 'AI Consultant',
    avatar: 'AG',
    content: 'Best investment in my career. The MLOps course helped me understand production systems and doubled my consulting rates.',
    rating: 5
  }
];

export default function AITrainingOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Industry-Leading AI Education
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master Artificial Intelligence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                with Expert-Led Training
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              From fundamentals to production-grade AI systems, our comprehensive training 
              programs transform professionals into industry-ready AI engineers and data scientists.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#courses"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Explore Courses
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Request Custom Training
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center backdrop-blur-sm"
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Training Programs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Hands-on, industry-aligned courses designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.filter(p => p.featured).map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${program.color}20` }}
                    >
                      <program.icon className="w-7 h-7" style={{ color: program.color }} />
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                      {program.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-slate-400 mb-4 text-sm">{program.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-white/5 rounded-md text-xs text-slate-300">
                        {topic}
                      </span>
                    ))}
                    {program.topics.length > 4 && (
                      <span className="px-2 py-1 text-slate-500 text-xs">
                        +{program.topics.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {program.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      {program.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <span className="text-slate-500 line-through text-sm">₹{program.originalPrice.toLocaleString()}</span>
                      <span className="text-2xl font-bold text-white ml-2">₹{program.price.toLocaleString()}</span>
                    </div>
                    <button className="px-6 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors flex items-center gap-2">
                      Enroll
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/ai-training/all-courses"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
            >
              View All {trainingPrograms.length} Courses
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All Training Programs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive courses covering every aspect of modern AI and data science
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${program.color}20` }}
                  >
                    <program.icon className="w-6 h-6" style={{ color: program.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{program.title}</h3>
                      <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-slate-400">
                        {program.level}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-4">{program.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {program.duration}
                        </span>
                        <span>{program.students.toLocaleString()} students</span>
                      </div>
                      <span className="text-lg font-bold text-white">
                        ₹{program.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-slate-400">Join thousands of successful AI professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4">{testimonial.content}</p>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 border border-purple-500/20 rounded-3xl p-12"
          >
            <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join our next cohort and transform your career with hands-on AI training 
              from industry experts. Limited seats available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Apply Now
              </a>
              <a
                href="/ai-training/schedule"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                View Schedule
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
