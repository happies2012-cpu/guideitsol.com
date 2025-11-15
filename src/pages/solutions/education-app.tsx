const EducationApp = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as Easing } },
    hover: { y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engaging multimedia content including videos, quizzes, and interactive exercises for effective learning.",
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description: "Discussion forums, group projects, and peer-to-peer learning capabilities to enhance collaboration.",
    },
    {
      icon: Play,
      title: "Video Streaming",
      description: "High-quality video streaming with adaptive bitrate for seamless learning experiences on any device.",
    },
    {
      icon: FileText,
      title: "Resource Library",
      description: "Comprehensive digital library with documents, presentations, and learning materials organized by topic.",
    },
    {
      icon: Award,
      title: "Gamification",
      description: "Achievement badges, leaderboards, and rewards to motivate learners and track progress.",
    },
    {
      icon: Calendar,
      title: "Scheduling & Reminders",
      description: "Class schedules, assignment deadlines, and personalized reminders to keep learners on track.",
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Detailed analytics and reporting to monitor learner progress and identify areas for improvement.",
    },
    {
      icon: MessageCircle,
      title: "Communication Tools",
      description: "Instant messaging, video calls, and discussion boards for seamless communication between students and instructors.",
    }
  ];

  const learningFeatures = [
    {
      title: "Personalized Learning Paths",
      description: "Adaptive learning algorithms that customize content based on individual progress and preferences.",
      icon: User
    },
    {
      title: "Offline Access",
      description: "Download content for offline learning to accommodate various connectivity situations.",
      icon: Download
    },
    {
      title: "Assessment Tools",
      description: "Automated grading, quizzes, and exams with detailed performance analytics.",
      icon: Clipboard
    },
    {
      title: "Mobile Learning",
      description: "Responsive design that works seamlessly across all devices for learning on the go.",
      icon: Smartphone
    }
  ];

  const benefits = [
    "Improve learning outcomes by 35%",
    "Increase student engagement and retention",
    "Reduce administrative overhead by 50%",
    "Enable remote and hybrid learning models",
    "Scale education to unlimited learners",
    "Enhance accessibility for diverse learners"
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      {/* Hero Section with unique background */}
      <PageHero
        title="Education App Solutions"
        subtitle="Transform learning experiences with our comprehensive education technology solutions. Create engaging, accessible, and effective digital learning platforms for institutions and learners."
        ctaText="Build Your Education Platform"
        pageType="education-app"
      />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Learning Platform Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything needed to create engaging and effective digital education experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enhanced Learning Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed to maximize learning effectiveness and user engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
              >
                <Card className="h-full border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Educational Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measurable improvements in learning outcomes and institutional efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg"
              >
                <BarChart className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Revolutionize Education?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create a cutting-edge education platform that engages learners and delivers exceptional results.
          </p>
          <Button 
            size="lg" 
            className="px-8 text-lg bg-white text-primary hover:bg-gray-100"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Education Project
          </Button>
        </div>
      </section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Education App Solutions Inquiry"
        serviceType="Education App Solutions"
      />
    </motion.div>
  );
};

export default EducationApp;