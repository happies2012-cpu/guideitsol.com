import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting dummy data generation...');

  // 1. Create a Super Admin
  const adminEmail = process.env.GUIDESOFT_SUPERADMIN_EMAIL || 'pranu21m@gmail.com';
  const rawPass = process.env.GUIDESOFT_SUPERADMIN_PASS || 'SecurePassword123!';
  const hashedPassword = await bcrypt.hash(rawPass, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
    create: {
      email: adminEmail,
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Super Admin created: ${admin.email}`);

  // 2. Sample Case Studies (from TASK_LIST.md)
  const caseStudies = [
    { title: 'AI Personalization Engine', summary: 'Increased engagement by 35% for retail client', metricsJson: '{}' },
    { title: 'Teleconsult Mobile App', summary: 'Built secure telemedicine app serving 10k patients daily', metricsJson: '{}' },
    { title: 'Global Logistics Portal', summary: 'Optimized supply chain routing with predictive ML', metricsJson: '{}' }
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { title: cs.title },
      update: {},
      create: cs,
    });
  }
  console.log('✅ Added 3 Case Studies');

  // 3. Sample Clients (from TASK_LIST.md)
  const clients = [
    { name: 'Acme Retail Ltd', industry: 'Retail', country: 'USA', shortDesc: 'Leading retail chain' },
    { name: 'Orbit Health', industry: 'Healthcare', country: 'UK', shortDesc: 'Innovative telemedicine' },
    { name: 'Finova Pay', industry: 'FinTech', country: 'India', shortDesc: 'Digital payment gateway' },
    { name: 'GreenGrid Energy', industry: 'Energy', country: 'Germany', shortDesc: 'Renewable energy tech' },
    { name: 'EduNext', industry: 'Education', country: 'Australia', shortDesc: 'EdTech platform' },
    { name: 'MarketPulse', industry: 'Marketing', country: 'USA', shortDesc: 'Analytics tool' },
    { name: 'LogiShip', industry: 'Logistics', country: 'Canada', shortDesc: 'Supply chain management' },
    { name: 'FarmSense', industry: 'Agriculture', country: 'Netherlands', shortDesc: 'Smart farming' },
    { name: 'TravelMate', industry: 'Travel', country: 'UAE', shortDesc: 'Travel booking platform' },
    { name: 'CareBridge', industry: 'Healthcare', country: 'USA', shortDesc: 'Patient management system' }
  ];

  for (const c of clients) {
    await prisma.client.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }
  console.log(`✅ Added ${clients.length} Clients`);

  // 4. Sample AI Tools
  const aiTools = [
    { name: 'GuideBot', description: 'Internal customer support assistant', category: 'Chatbot', tags: 'NLP,Support', authorId: admin.id },
    { name: 'VisionAI', description: 'Automated defect detection', category: 'Computer Vision', tags: 'CV,Object Detection', authorId: admin.id }
  ];

  for (const tool of aiTools) {
    const existing = await prisma.aITool.findFirst({ where: { name: tool.name } });
    if (!existing) {
      await prisma.aITool.create({ data: tool });
    }
  }
  console.log('✅ Added AI Tools');

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
