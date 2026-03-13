import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Award, Users, CheckCircle } from "lucide-react";
import { motion, Easing } from "framer-motion";

const HomeInsurance = () => {
  const features = [
    {
      icon: Shield,
      title: "Life Insurance",
      subtitle: "Driving growth through innovation"
    },
    {
      icon: TrendingUp,
      title: "Security & Save", 
      subtitle: "Driving growth through innovation"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "3x Award winning",
      description: "Dedicated support team available 24/7 to ensure your systems run smoothly and efficiently."
    },
    {
      icon: CheckCircle,
      title: "FCA Regulated", 
      description: "Dedicated support team available 24/7 to ensure your systems run smoothly and efficiently."
    },
    {
      icon: Users,
      title: "100K+ Customers",
      description: "Dedicated support team available 24/7 to ensure your systems run smoothly and efficiently."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-muted/30 to-primary/10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-primary/20">
                  → Insurance Solutions
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  We're Building
                  <br />
                  the <span className="text-primary">future insurance</span>
                  <br />
                  just for you.
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Providing enterprise-grade IT solutions, custom software development, and AI integration services to transform your business.
                </p>
                <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg">
                  Get Started →
                </Button>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-background/40 rounded-2xl p-8 shadow-2xl backdrop-blur-xl border border-primary/20">
                <div className="grid gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-lg flex items-center justify-center shadow-md">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                      </div>
                    </div>
                  ))}

                  {/* Success Rate */}
                  <div className="bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 to-gradient-primary-end/20 opacity-30 blur-xl" />
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">89%</span>
                      </div>
                      <p className="font-semibold">Success Rate</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                transition={{ delay: index * 0.1, ease: "easeOut" as Easing }}
                className="text-center p-6 rounded-lg border border-primary/20 backdrop-blur-sm bg-background/40 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CEO Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as Easing }}
            >
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto blur-2xl opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 bg-background/40 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-xl border border-primary/20">
                    <Users className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as Easing }}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-2">Raymond F. Minich</h3>
              <p className="text-primary font-medium mb-6">CEO & Founder</p>
              <Button variant="outline" className="mb-8 px-8 py-6 text-lg border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
                Learn More
              </Button>

              <div className="space-y-6">
                <div className="p-6 bg-background/40 rounded-lg shadow-md backdrop-blur-xl border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Global Transaction Advisory</h4>
                  <p className="text-muted-foreground mb-4">Our core mission is to empower businesses through innovative technology and technical excellence.</p>
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">Learn More</Button>
                </div>

                <div className="p-6 bg-background/40 rounded-lg shadow-md backdrop-blur-xl border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Insurance consulting for family life</h4>
                  <p className="text-muted-foreground mb-4">Our core mission is to empower businesses through innovative technology and technical excellence.</p>
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">Learn More</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomeInsurance;