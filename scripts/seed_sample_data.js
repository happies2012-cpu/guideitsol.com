import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample data...');
  
  // Get an existing user to associate with projects
  const existingUser = await prisma.user.findFirst();
  const userId = existingUser ? existingUser.id : null;
  
  // Get the super admin user for blog posts
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@guideitsol.com' }
  });
  const adminUserId = adminUser ? adminUser.id : userId;
  
  // Create sample clients
  const clients = [
    {
      name: "Acme Retail Ltd",
      industry: "E-commerce",
      country: "US",
      shortDesc: "Omnichannel retail platform",
      logoUrl: "https://placehold.co/100x100?text=Acme"
    },
    {
      name: "Orbit Health",
      industry: "Healthcare",
      country: "UK",
      shortDesc: "Telehealth platform",
      logoUrl: "https://placehold.co/100x100?text=Orbit"
    },
    {
      name: "Finova Pay",
      industry: "Fintech",
      country: "India",
      shortDesc: "Payments & lending platform",
      logoUrl: "https://placehold.co/100x100?text=Finova"
    },
    {
      name: "GreenGrid Energy",
      industry: "Energy",
      country: "Germany",
      shortDesc: "IoT for energy optimization",
      logoUrl: "https://placehold.co/100x100?text=GreenGrid"
    },
    {
      name: "EduNext",
      industry: "EdTech",
      country: "Singapore",
      shortDesc: "AI tutoring SaaS",
      logoUrl: "https://placehold.co/100x100?text=EduNext"
    },
    {
      name: "MarketPulse",
      industry: "Media",
      country: "US",
      shortDesc: "AI content personalization",
      logoUrl: "https://placehold.co/100x100?text=MarketPulse"
    },
    {
      name: "LogiShip",
      industry: "Logistics",
      country: "UAE",
      shortDesc: "Last-mile optimization",
      logoUrl: "https://placehold.co/100x100?text=LogiShip"
    },
    {
      name: "FarmSense",
      industry: "AgriTech",
      country: "Australia",
      shortDesc: "Precision farming SaaS",
      logoUrl: "https://placehold.co/100x100?text=FarmSense"
    },
    {
      name: "TravelMate",
      industry: "Travel",
      country: "France",
      shortDesc: "Dynamic travel recommendations",
      logoUrl: "https://placehold.co/100x100?text=TravelMate"
    },
    {
      name: "CareBridge",
      industry: "HRTech",
      country: "India",
      shortDesc: "Employee engagement & wellness",
      logoUrl: "https://placehold.co/100x100?text=CareBridge"
    }
  ];

  // Create clients
  console.log('Creating clients...');
  for (const client of clients) {
    await prisma.client.upsert({
      where: { name: client.name },
      update: client,
      create: client
    });
  }
  console.log('Clients created successfully.');

  // Create sample services
  const services = [
    {
      slug: "web-development",
      title: "Web Development",
      description: "Custom web application development with modern technologies",
      seoTitle: "Professional Web Development Services",
      seoDescription: "Build scalable web applications with our expert development team"
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      seoTitle: "Mobile App Development Services",
      seoDescription: "Create engaging mobile experiences for your users"
    },
    {
      slug: "ai-solutions",
      title: "AI Solutions",
      description: "Artificial intelligence and machine learning solutions",
      seoTitle: "AI & Machine Learning Solutions",
      seoDescription: "Leverage AI to transform your business operations"
    },
    {
      slug: "cloud-services",
      title: "Cloud Services",
      description: "Cloud infrastructure and migration services",
      seoTitle: "Cloud Infrastructure Services",
      seoDescription: "Migrate to the cloud with our expert guidance"
    },
    {
      slug: "data-analytics",
      title: "Data Analytics",
      description: "Data analysis and visualization services",
      seoTitle: "Data Analytics & Visualization",
      seoDescription: "Turn your data into actionable insights"
    },
    {
      slug: "cybersecurity",
      title: "Cybersecurity",
      description: "Security assessment and protection services",
      seoTitle: "Cybersecurity Services",
      seoDescription: "Protect your business from cyber threats"
    },
    {
      slug: "devops",
      title: "DevOps",
      description: "DevOps implementation and automation services",
      seoTitle: "DevOps Consulting Services",
      seoDescription: "Streamline your development and deployment processes"
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      description: "User interface and experience design services",
      seoTitle: "UI/UX Design Services",
      seoDescription: "Create intuitive and engaging user experiences"
    },
    {
      slug: "consulting",
      title: "IT Consulting",
      description: "Strategic IT consulting and advisory services",
      seoTitle: "IT Consulting Services",
      seoDescription: "Get expert advice for your technology initiatives"
    },
    {
      slug: "maintenance",
      title: "Maintenance & Support",
      description: "Ongoing maintenance and support services",
      seoTitle: "Application Maintenance & Support",
      seoDescription: "Keep your applications running smoothly"
    }
  ];

  // Create services
  console.log('Creating services...');
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    });
  }
  console.log('Services created successfully.');

  // Create sample projects
  const projects = [
    {
      name: "AI Personalization Engine",
      description: "3x conversion uplift using recommendations",
      status: "live",
      userId: userId
    },
    {
      name: "Teleconsult Mobile App",
      description: "HIPAA compliant telehealth app",
      status: "pilot",
      userId: userId
    },
    {
      name: "E-commerce Platform",
      description: "Scalable online shopping platform",
      status: "live",
      userId: userId
    },
    {
      name: "Fleet Management System",
      description: "Real-time vehicle tracking and analytics",
      status: "live",
      userId: userId
    },
    {
      name: "Learning Management System",
      description: "Enterprise training platform",
      status: "live",
      userId: userId
    },
    {
      name: "Payment Gateway Integration",
      description: "Multi-currency payment processing",
      status: "live",
      userId: userId
    },
    {
      name: "Data Warehouse Migration",
      description: "Migration from legacy to cloud data warehouse",
      status: "completed",
      userId: userId
    },
    {
      name: "Mobile Banking App",
      description: "Secure mobile banking application",
      status: "live",
      userId: userId
    },
    {
      name: "Customer Analytics Dashboard",
      description: "Real-time customer behavior insights",
      status: "live",
      userId: userId
    },
    {
      name: "IoT Sensor Network",
      description: "Industrial IoT monitoring system",
      status: "pilot",
      userId: userId
    }
  ];

  // Create projects
  console.log('Creating projects...');
  for (const project of projects) {
    await prisma.project.upsert({
      where: { name: project.name },
      update: project,
      create: project
    });
  }
  console.log('Projects created successfully.');

  // Create sample case studies
  const caseStudies = [
    {
      title: "Digital Transformation for Retail Giant",
      summary: "Complete overhaul of legacy systems with modern cloud infrastructure",
      metricsJson: JSON.stringify({
        "revenue_increase": "35%",
        "cost_reduction": "28%",
        "deployment_time": "6 months"
      }),
      heroImage: "https://placehold.co/800x400?text=Case+Study+1"
    },
    {
      title: "AI-Powered Healthcare Platform",
      summary: "Machine learning solution for patient diagnosis and treatment recommendations",
      metricsJson: JSON.stringify({
        "accuracy_improvement": "42%",
        "diagnosis_time": "reduced by 60%",
        "patient_satisfaction": "94%"
      }),
      heroImage: "https://placehold.co/800x400?text=Case+Study+2"
    },
    {
      title: "Fintech Mobile App Development",
      summary: "Secure mobile banking application with biometric authentication",
      metricsJson: JSON.stringify({
        "user_adoption": "200K+ users",
        "security_rating": "99.9% uptime",
        "feature_completion": "100%"
      }),
      heroImage: "https://placehold.co/800x400?text=Case+Study+3"
    },
    {
      title: "E-commerce Platform Optimization",
      summary: "Performance optimization and scalability improvements for high-traffic site",
      metricsJson: JSON.stringify({
        "page_load_time": "reduced by 70%",
        "conversion_rate": "increased by 22%",
        "server_costs": "reduced by 40%"
      }),
      heroImage: "https://placehold.co/800x400?text=Case+Study+4"
    },
    {
      title: "Enterprise Data Analytics Solution",
      summary: "Custom analytics platform for business intelligence and reporting",
      metricsJson: JSON.stringify({
        "data_processing": "10TB daily",
        "report_generation": "reduced by 80%",
        "insight_accuracy": "98%"
      }),
      heroImage: "https://placehold.co/800x400?text=Case+Study+5"
    }
  ];

  // Create case studies
  console.log('Creating case studies...');
  for (const caseStudy of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { title: caseStudy.title },
      update: caseStudy,
      create: caseStudy
    });
  }
  console.log('Case studies created successfully.');

  // Create sample blog posts
  const blogPosts = [
    {
      slug: "future-of-ai-in-business",
      title: "The Future of AI in Business: Trends and Predictions",
      content: "Artificial intelligence is transforming how businesses operate...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "cloud-migration-best-practices",
      title: "Cloud Migration Best Practices for Enterprises",
      content: "Migrating to the cloud can be complex, but with the right approach...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "cybersecurity-in-modern-age",
      title: "Cybersecurity in the Modern Age: Challenges and Solutions",
      content: "As cyber threats evolve, so must our security strategies...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "mobile-app-development-trends",
      title: "Top Mobile App Development Trends in 2025",
      content: "The mobile app landscape continues to evolve rapidly...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "devops-transformation-journey",
      title: "DevOps Transformation: A Complete Journey",
      content: "Implementing DevOps requires cultural and technical changes...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "ui-ux-design-principles",
      title: "Essential UI/UX Design Principles for Modern Applications",
      content: "Great design is more than just aesthetics...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "data-analytics-for-decision-making",
      title: "Leveraging Data Analytics for Better Decision Making",
      content: "Data-driven decision making is crucial for business success...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "blockchain-technology-applications",
      title: "Blockchain Technology: Real-World Applications",
      content: "Beyond cryptocurrencies, blockchain has numerous practical applications...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "iot-security-challenges",
      title: "IoT Security: Addressing the Growing Challenges",
      content: "As IoT devices proliferate, security becomes increasingly important...",
      authorId: adminUserId,
      publishedAt: new Date()
    },
    {
      slug: "remote-work-technology-solutions",
      title: "Technology Solutions for Effective Remote Work",
      content: "Remote work requires the right tools and infrastructure...",
      authorId: adminUserId,
      publishedAt: new Date()
    }
  ];

  // Create blog posts
  console.log('Creating blog posts...');
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }
  console.log('Blog posts created successfully.');

  // Create a sample super admin user
  console.log('Creating super admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'pranu21m@gmail.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    }
  });
  console.log('Super admin user created successfully.');

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });