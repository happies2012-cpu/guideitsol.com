import { Brain, Cloud, Smartphone, Database, Code, TrendingUp } from "lucide-react";

export const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Business: Transforming Operations with Machine Learning",
    excerpt: "Discover how neural networks and machine learning algorithms are revolutionizing business operations with predictive analytics and automated decision-making.",
    content: `
      <h2>The AI Revolution is Here</h2>
      <p>Artificial Intelligence (AI) is no longer a futuristic concept—it's a reality that's reshaping the business landscape. From predictive analytics to automated customer service, AI is driving efficiency and innovation across industries.</p>
      
      <h3>1. Predictive Analytics</h3>
      <p>Machine learning algorithms can analyze vast amounts of data to predict market trends, customer behavior, and operational risks. This allows businesses to make data-driven decisions with confidence.</p>
      
      <h3>2. Automated Operations</h3>
      <p>Robotic Process Automation (RPA) combined with AI can handle repetitive tasks, freeing up human employees to focus on strategic initiatives. This leads to significant cost savings and increased productivity.</p>
      
      <h3>3. Personalized Customer Experiences</h3>
      <p>AI-powered recommendation engines and chatbots provide personalized experiences for customers, improving satisfaction and loyalty.</p>
      
      <h2>Conclusion</h2>
      <p>Embracing AI is not just about adopting new technology; it's about transforming your business model to stay competitive in the digital age.</p>
    `,
    author: "Dr. Sarah Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "AI & Automation",
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
    icon: Brain
  },
  {
    id: 2,
    title: "Building Scalable Cloud Infrastructure: Best Practices for Modern Enterprises",
    excerpt: "Essential strategies for designing and implementing robust cloud architectures that support business growth and ensure security compliance.",
    content: `
      <h2>Why Cloud Scalability Matters</h2>
      <p>In today's fast-paced digital economy, the ability to scale your infrastructure on demand is crucial. Cloud computing offers the flexibility and agility needed to respond to changing market conditions.</p>
      
      <h3>Key Principles of Scalable Architecture</h3>
      <ul>
        <li><strong>Microservices:</strong> Breaking down applications into smaller, independent services.</li>
        <li><strong>Containerization:</strong> Using Docker and Kubernetes for consistent deployment.</li>
        <li><strong>Auto-scaling:</strong> Automatically adjusting resources based on traffic load.</li>
      </ul>
    `,
    author: "Michael Zhang",
    date: "March 12, 2024",
    readTime: "10 min read",
    category: "Cloud Computing",
    gradient: "from-purple-500 to-pink-500",
    icon: Cloud
  },
  {
    id: 3,
    title: "Mobile-First Design: Creating Engaging User Experiences for 2024",
    excerpt: "How to design mobile applications that deliver exceptional user experiences with intuitive interfaces and seamless functionality.",
    content: `
      <h2>The Mobile-First Approach</h2>
      <p>With more users accessing the web via mobile devices than desktops, a mobile-first design strategy is essential. It ensures that your application provides a seamless experience across all screen sizes.</p>
    `,
    author: "Dr. Lisa Rodriguez",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Mobile Development",
    gradient: "from-emerald-500 to-teal-500",
    icon: Smartphone
  },
  {
    id: 4,
    title: "Data Engineering Fundamentals: Building Robust Data Pipelines",
    excerpt: "Best practices for creating efficient data pipelines that transform raw data into actionable business insights for decision-making.",
    content: `
      <h2>Data is the New Oil</h2>
      <p>Data engineering is the backbone of modern analytics. Without robust pipelines, data remains siloed and unusable.</p>
    `,
    author: "David Kumar",
    date: "March 8, 2024",
    readTime: "12 min read",
    category: "Data Engineering",
    gradient: "from-orange-500 to-red-500",
    icon: Database
  },
  {
    id: 5,
    title: "Web Development Trends 2024: What's New in Frontend Technologies",
    excerpt: "Exploring the latest frontend frameworks, tools, and techniques that are shaping the future of web development and user experiences.",
    content: `
      <h2>Frontend Trends to Watch</h2>
      <p>From Server Components in React to the rise of AI-assisted coding, the frontend landscape is evolving rapidly.</p>
    `,
    author: "Emma Watson",
    date: "March 5, 2024",
    readTime: "9 min read",
    category: "Web Development",
    gradient: "from-violet-500 to-purple-500",
    icon: Code
  },
  {
    id: 6,
    title: "Digital Transformation: A Strategic Approach to Business Innovation",
    excerpt: "How organizations can successfully navigate digital transformation initiatives to stay competitive and drive sustainable growth.",
    content: `
      <h2>Navigating Digital Transformation</h2>
      <p>Digital transformation is a journey, not a destination. It involves a cultural shift towards innovation and agility.</p>
    `,
    author: "James Wilson",
    date: "March 1, 2024",
    readTime: "11 min read",
    category: "Business Strategy",
    gradient: "from-cyan-500 to-blue-500",
    icon: TrendingUp
  }
];

export const categories = [
  { name: "AI & Automation", count: 12, icon: Brain },
  { name: "Web Development", count: 18, icon: Code },
  { name: "Mobile Development", count: 15, icon: Smartphone },
  { name: "Cloud Computing", count: 9, icon: Cloud },
  { name: "Data Engineering", count: 11, icon: Database },
  { name: "Business Strategy", count: 8, icon: TrendingUp }
];
