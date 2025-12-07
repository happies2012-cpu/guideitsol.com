import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Super Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@guideitsol.com' },
    update: {},
    create: {
      email: 'admin@guideitsol.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    }
  });

  console.log('Super Admin created:', superAdmin.email);

  // Create sample AI Tools (1000 tools)
  const categories = [
    'Writing & Content',
    'Image Generation',
    'Video Creation',
    'Code Assistant',
    'Data Analysis',
    'Marketing',
    'Design',
    'Productivity',
    'Audio & Music',
    'Research',
    'Education',
    'Healthcare',
    'Finance',
    'Sales',
    'Customer Service',
    'Translation',
    'SEO',
    'Social Media',
    'E-commerce',
    'HR & Recruitment'
  ];

  const toolNames = [
    'ChatGPT', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'GitHub Copilot',
    'Jasper AI', 'Copy.ai', 'Writesonic', 'Grammarly', 'QuillBot',
    'Runway ML', 'Synthesia', 'Descript', 'Pictory', 'Lumen5',
    'CodeWhisperer', 'Tabnine', 'Codeium', 'Replit Ghostwriter', 'Cursor',
    'DataRobot', 'H2O.ai', 'Obviously AI', 'MonkeyLearn', 'Akkio',
    'HubSpot AI', 'Marketo', 'Persado', 'Phrasee', 'MarketMuse',
    'Canva AI', 'Adobe Firefly', 'Figma AI', 'Uizard', 'Fronty',
    'Notion AI', 'Mem', 'Otter.ai', 'Fireflies.ai', 'Superhuman',
    'Murf AI', 'AIVA', 'Soundraw', 'Boomy', 'Amper Music'
  ];

  const descriptions = [
    'AI-powered tool for automated content generation and optimization',
    'Advanced machine learning platform for data analysis',
    'Create stunning visuals with artificial intelligence',
    'Automate your workflow with intelligent automation',
    'Next-generation AI assistant for productivity',
    'Transform your business with cutting-edge AI technology',
    'Innovative solution for creative professionals',
    'Streamline operations with smart AI algorithms',
    'Enterprise-grade AI for scalable solutions',
    'Revolutionary AI technology for modern businesses'
  ];

  const aiTools = [];
  for (let i = 0; i < 1000; i++) {
    const category = categories[i % categories.length];
    const name = `${toolNames[i % toolNames.length]} ${Math.floor(i / toolNames.length) > 0 ? Math.floor(i / toolNames.length) : ''}`.trim();
    const description = descriptions[i % descriptions.length];
    
    aiTools.push({
      name,
      description,
      category,
      icon: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`,
      url: `https://example.com/${name.toLowerCase().replace(/\s+/g, '-')}`,
      tags: `${category}, AI, automation, machine learning`,
      featured: i < 20,
      authorId: superAdmin.id
    });
  }

  // Batch create AI tools
  const createdTools = await prisma.aITool.createMany({
    data: aiTools
  });

  console.log(`Created ${createdTools.count} AI tools`);

  // Create sample pages
  const samplePages = [
    {
      title: 'About Us',
      slug: 'about-us',
      content: '<h1>About Us</h1><p>Welcome to our company. We provide cutting-edge IT solutions.</p>',
      metaTitle: 'About Us - Learn More About Our Company',
      metaDesc: 'Discover our mission, vision, and values',
      published: true,
      authorId: superAdmin.id
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: '<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>',
      metaTitle: 'Privacy Policy',
      metaDesc: 'Read our privacy policy and data protection guidelines',
      published: true,
      authorId: superAdmin.id
    }
  ];

  for (const page of samplePages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page
    });
  }

  console.log('Sample pages created');
  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
