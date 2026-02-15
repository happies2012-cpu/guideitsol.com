import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Code, Server, Shield, Database, Palette, BarChart3, Smartphone, Network, Cloud, Zap } from 'lucide-react';

const AIEmployeesSection = () => {
  // Job roles data with detailed information
  const employeesData = [
    {
      id: 1,
      role: "Software Developer",
      image: "/gsai/1e3d8ee8-9f68-400d-a36e-cd6be12025fe.png",
      icon: Code,
      tasks: [
        "Develop custom software applications tailored to business needs",
        "Implement and maintain RESTful APIs for seamless integration",
        "Debug and optimize existing code for better performance",
        "Automate repetitive tasks through scripting and tools",
        "Collaborate with cross-functional teams for project delivery",
        "Write clean, maintainable, and well-documented code"
      ],
      details: "Our AI Software Developer can rapidly prototype, code, and deploy applications across multiple platforms with 99.2% accuracy in bug-free code."
    },
    {
      id: 2,
      role: "Network Administrator",
      image: "/gsai/4ec809ac-6881-482b-99aa-6e2a18c68bd2.png",
      icon: Network,
      tasks: [
        "Monitor network performance and resolve connectivity issues",
        "Configure and maintain routers, switches, and firewalls",
        "Implement network security measures and access controls",
        "Optimize network infrastructure for maximum efficiency",
        "Perform regular network audits and vulnerability assessments",
        "Ensure network uptime and disaster recovery planning"
      ],
      details: "AI Network Administrator provides 24/7 monitoring with predictive failure detection, reducing downtime by 95%."
    },
    {
      id: 3,
      role: "Cloud Architect",
      image: "/gsai/15bd96e9-e506-4e5c-ae95-21b451745f66.png",
      icon: Cloud,
      tasks: [
        "Design and implement scalable cloud infrastructure solutions",
        "Optimize cloud costs and resource allocation",
        "Ensure cloud security and compliance with industry standards",
        "Migrate on-premises systems to cloud environments",
        "Implement disaster recovery and backup strategies",
        "Monitor and maintain cloud service performance"
      ],
      details: "AI Cloud Architect reduces cloud costs by up to 40% while ensuring 99.99% availability and auto-scaling capabilities."
    },
    {
      id: 4,
      role: "Data Scientist",
      image: "/gsai/015fcb38-3160-4562-a72b-388873f85a78.png",
      icon: BarChart3,
      tasks: [
        "Analyze large datasets to extract meaningful insights",
        "Build predictive models for business forecasting",
        "Create data visualizations for stakeholder presentations",
        "Clean and preprocess raw data for analysis",
        "Implement machine learning algorithms for pattern recognition",
        "Develop automated reporting systems for real-time analytics"
      ],
      details: "AI Data Scientist processes 10TB of data in under 2 minutes, delivering actionable insights with 98.7% accuracy."
    },
    {
      id: 5,
      role: "AI/ML Engineer",
      image: "/gsai/43a41f06-f1b3-4f47-8112-8dd4d609cd66.png",
      icon: Zap,
      tasks: [
        "Design and deploy machine learning models",
        "Optimize algorithms for performance and accuracy",
        "Integrate AI capabilities into existing applications",
        "Perform model training and validation",
        "Implement natural language processing solutions",
        "Develop computer vision applications for image recognition"
      ],
      details: "AI/ML Engineer creates custom models with 96.5% accuracy, reducing development time by 80% compared to traditional methods."
    },
    {
      id: 6,
      role: "Cybersecurity Specialist",
      image: "/gsai/55fae7d4-ed9d-4916-8e89-e3b0ec4b82d4_1.png",
      icon: Shield,
      tasks: [
        "Monitor systems for security breaches and threats",
        "Implement encryption and data protection measures",
        "Conduct vulnerability assessments and penetration testing",
        "Respond to security incidents and breaches",
        "Develop security policies and procedures",
        "Ensure compliance with data protection regulations"
      ],
      details: "AI Cybersecurity Specialist detects 99.9% of threats in real-time, preventing potential data breaches with zero false positives."
    },
    {
      id: 7,
      role: "DevOps Engineer",
      image: "/gsai/55fae7d4-ed9d-4916-8e89-e3b0ec4b82d4.png",
      icon: Server,
      tasks: [
        "Automate deployment pipelines and CI/CD processes",
        "Manage containerized applications with Docker and Kubernetes",
        "Monitor application performance and system health",
        "Implement infrastructure as code solutions",
        "Optimize system configurations for scalability",
        "Troubleshoot production issues and system failures"
      ],
      details: "AI DevOps Engineer reduces deployment time by 75% and increases system reliability by 92% through automated processes."
    },
    {
      id: 8,
      role: "UI/UX Designer",
      image: "/gsai/85bab06b-b7e2-494b-a9ac-ed30fb137b9e.png",
      icon: Palette,
      tasks: [
        "Create intuitive user interfaces for web and mobile apps",
        "Conduct user research and usability testing",
        "Design wireframes and interactive prototypes",
        "Develop design systems and component libraries",
        "Optimize user experience for accessibility standards",
        "Create engaging visual designs that align with brand identity"
      ],
      details: "AI UI/UX Designer increases user engagement by 65% through data-driven design decisions and A/B testing."
    },
    {
      id: 9,
      role: "Project Manager",
      image: "/gsai/347e52a4-4c9f-4fe6-bcf3-86f9078715a9.png",
      icon: BarChart3,
      tasks: [
        "Plan and execute projects within scope and budget",
        "Coordinate cross-functional teams and stakeholders",
        "Track project progress and manage timelines",
        "Identify and mitigate project risks",
        "Generate detailed project reports and documentation",
        "Ensure quality deliverables meet client requirements"
      ],
      details: "AI Project Manager delivers 95% of projects on time and within budget, with real-time progress tracking and risk mitigation."
    },
    {
      id: 10,
      role: "IT Support Specialist",
      image: "/gsai/386e17ed-ad4a-43a7-a39b-5596344d04ee.png",
      icon: Phone,
      tasks: [
        "Provide technical support for hardware and software issues",
        "Troubleshoot network and connectivity problems",
        "Manage user accounts and permissions",
        "Install and configure software applications",
        "Maintain inventory of IT equipment and licenses",
        "Create knowledge base articles for common issues"
      ],
      details: "AI IT Support Specialist resolves 90% of issues within 5 minutes, providing 24/7 support with multilingual capabilities."
    },
    {
      id: 11,
      role: "Database Administrator",
      image: "/gsai/414af05d-e7ef-4686-bc28-eb07c3663689.png",
      icon: Database,
      tasks: [
        "Design and maintain database structures and schemas",
        "Optimize database performance and query execution",
        "Implement backup and recovery procedures",
        "Ensure data security and access controls",
        "Monitor database health and capacity",
        "Plan and execute database migrations"
      ],
      details: "AI Database Administrator ensures 99.99% data availability with automated backups and zero data loss recovery."
    },
    {
      id: 12,
      role: "Business Analyst",
      image: "/gsai/2353e7ff-ba5e-4267-b582-29ec15ab02ac.png",
      icon: BarChart3,
      tasks: [
        "Analyze business processes and identify improvement opportunities",
        "Create detailed requirements documentation",
        "Develop data models and process flow diagrams",
        "Conduct stakeholder interviews and workshops",
        "Evaluate ROI for proposed solutions",
        "Prepare business cases and project proposals"
      ],
      details: "AI Business Analyst increases operational efficiency by 40% through data-driven insights and process optimization recommendations."
    },
    {
      id: 13,
      role: "Web Developer",
      image: "/gsai/a001e6d4-ec11-4e34-a9e9-2df69c027513.png",
      icon: Code,
      tasks: [
        "Build responsive websites using modern frameworks",
        "Optimize websites for performance and SEO",
        "Integrate third-party APIs and services",
        "Implement security best practices for web applications",
        "Ensure cross-browser compatibility and accessibility",
        "Maintain and update existing websites"
      ],
      details: "AI Web Developer creates pixel-perfect websites with 50% faster load times and 100% mobile responsiveness."
    },
    {
      id: 14,
      role: "Mobile Application Developer",
      image: "/gsai/a9b9a34a-bd72-4f6d-b422-03709a4413a3.png",
      icon: Smartphone,
      tasks: [
        "Develop native and cross-platform mobile applications",
        "Integrate mobile apps with backend services",
        "Optimize apps for performance and battery efficiency",
        "Implement push notifications and offline capabilities",
        "Ensure app store compliance and guidelines",
        "Debug and resolve mobile-specific issues"
      ],
      details: "AI Mobile Developer reduces app development time by 60% while ensuring 5-star app store ratings through rigorous testing."
    },
    {
      id: 15,
      role: "Site Reliability Engineer",
      image: "/gsai/a265dd34-f9b4-471c-9ca3-f864cbf74a6b.png",
      icon: Server,
      tasks: [
        "Ensure high availability and reliability of systems",
        "Implement monitoring and alerting solutions",
        "Automate routine operational tasks",
        "Analyze system performance and scalability",
        "Respond to incidents and outages",
        "Develop disaster recovery procedures"
      ],
      details: "AI SRE maintains 99.99% uptime with predictive failure detection and automated remediation."
    },
    {
      id: 16,
      role: "Blockchain Engineer",
      image: "/gsai/ae3b6e34-8b8f-4916-8694-33f75552fb67.png",
      icon: Database,
      tasks: [
        "Design and implement blockchain solutions",
        "Develop smart contracts for various use cases",
        "Integrate blockchain with existing systems",
        "Ensure security and immutability of transactions",
        "Optimize blockchain performance and scalability",
        "Conduct audits of blockchain implementations"
      ],
      details: "AI Blockchain Engineer creates secure, scalable solutions with 99.9% transaction accuracy and reduced gas costs."
    },
    {
      id: 17,
      role: "Digital Marketing Manager",
      image: "/gsai/astrologer.png",
      icon: BarChart3,
      tasks: [
        "Create and execute digital marketing campaigns",
        "Analyze marketing data and generate performance reports",
        "Optimize SEO and SEM strategies for better visibility",
        "Manage social media accounts and content calendars",
        "Implement marketing automation workflows",
        "Track ROI and conversion metrics across channels"
      ],
      details: "AI Marketing Manager increases conversion rates by 70% through personalized campaigns and real-time optimization."
    }
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            The GS <span className="italic">Elite</span> Workforce
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Deploy high-performance, GS-certified autonomous AI agents to revolutionize your operational efficiency and scale your digital capabilities instantly.
          </p>
        </motion.div>

        <div className="relative">
          {/* Scrolling cards carousel */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {employeesData.map((employee, index) => (
                <motion.div
                  key={`${employee.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block mx-4"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all w-64 h-[360px] flex flex-col cursor-pointer">
                        <CardContent className="p-6 text-center flex flex-col flex-grow">
                          <div className="relative mb-4 mx-auto w-24 h-32 rounded-lg overflow-hidden border-2 border-primary/20">
                            <img
                              src={employee.image}
                              alt={employee.role}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2 flex-grow">
                            {employee.role}
                          </h3>
                          <div className="inline-block px-3 py-1 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end text-white text-xs rounded-full mb-3">
                            GS Autonomous Expert
                          </div>
                          <Button className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                          <employee.icon className="w-8 h-8 text-primary" />
                          {employee.role}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-foreground">{employee.details}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            Key Tasks
                          </h3>
                          <ul className="space-y-2">
                            {employee.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-foreground">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity text-white py-6 text-lg"
                            onClick={() => window.open('https://wa.me/918500647979', '_blank')}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            Hire Me - Connect on WhatsApp
                          </Button>
                          <p className="text-center text-sm text-muted-foreground mt-2">
                            Click to discuss your project requirements
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}

              {/* Duplicate for seamless scrolling */}
              {employeesData.map((employee, index) => (
                <motion.div
                  key={`duplicate-${employee.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block mx-4"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all w-64 h-[360px] flex flex-col cursor-pointer">
                        <CardContent className="p-6 text-center flex flex-col flex-grow">
                          <div className="relative mb-4 mx-auto w-24 h-32 rounded-lg overflow-hidden border-2 border-primary/20">
                            <img
                              src={employee.image}
                              alt={employee.role}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2 flex-grow">
                            {employee.role}
                          </h3>
                          <div className="inline-block px-3 py-1 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end text-white text-xs rounded-full mb-3">
                            GS Autonomous Expert
                          </div>
                          <Button className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                          <employee.icon className="w-8 h-8 text-primary" />
                          {employee.role}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-foreground">{employee.details}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            Key Tasks
                          </h3>
                          <ul className="space-y-2">
                            {employee.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-foreground">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity text-white py-6 text-lg"
                            onClick={() => window.open('https://wa.me/918500647979', '_blank')}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            Hire Me - Connect on WhatsApp
                          </Button>
                          <p className="text-center text-sm text-muted-foreground mt-2">
                            Click to discuss your project requirements
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default AIEmployeesSection;
