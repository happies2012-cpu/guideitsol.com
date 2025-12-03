import fs from 'fs';
import path from 'path';

// AI search index keywords for Guidesoft IT Solutions
const aiSearchKeywords = {
  "company_name": "Guidesoft IT Solutions",
  "primary_keywords": [
    "web development",
    "mobile app development",
    "AI solutions",
    "cloud services",
    "software development",
    "technology consulting",
    "IT services",
    "digital transformation",
    "custom software",
    "enterprise solutions"
  ],
  "secondary_keywords": [
    "React development",
    "Node.js development",
    "Python development",
    "Angular development",
    "Vue.js development",
    "iOS development",
    "Android development",
    "machine learning",
    "data analytics",
    "cybersecurity",
    "DevOps",
    "UI/UX design",
    "blockchain development",
    "IoT solutions",
    "fintech solutions",
    "healthcare technology",
    "e-commerce development",
    "SaaS development",
    "API development",
    "microservices",
    "cloud migration",
    "AWS services",
    "Azure services",
    "Google Cloud services"
  ],
  "industries": [
    "healthcare",
    "finance",
    "retail",
    "education",
    "manufacturing",
    "logistics",
    "travel",
    "media",
    "real estate",
    "automotive"
  ],
  "technologies": [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin"
  ],
  "services": [
    "web application development",
    "mobile application development",
    "AI and machine learning",
    "cloud infrastructure",
    "data analytics",
    "cybersecurity",
    "DevOps consulting",
    "UI/UX design",
    "blockchain development",
    "IoT solutions",
    "API development",
    "quality assurance",
    "technical support",
    "project management",
    "staff augmentation"
  ]
};

// Create .well-known directory if it doesn't exist
const wellKnownDir = path.join(process.cwd(), '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}

// Write AI search index file
const aiSearchFile = path.join(wellKnownDir, 'ai-search.jsonld');
fs.writeFileSync(aiSearchFile, JSON.stringify(aiSearchKeywords, null, 2));

console.log('AI search index file generated successfully!');
console.log(`File location: ${aiSearchFile}`);