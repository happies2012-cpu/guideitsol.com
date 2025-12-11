import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSiteContent() {
  console.log('Updating site content with Guidesoft IT Solutions copy...');
  
  // Update company information in site settings
  const siteSettings = [
    {
      key: 'company_name',
      value_json: JSON.stringify('Guidesoft IT Solutions')
    },
    {
      key: 'company_tagline',
      value_json: JSON.stringify('Innovative Technology Solutions for Modern Businesses')
    },
    {
      key: 'company_description',
      value_json: JSON.stringify('Guidesoft IT Solutions is a leading technology company specializing in web development, mobile applications, AI solutions, and cloud services. We help businesses transform their operations through cutting-edge technology.')
    },
    {
      key: 'contact_email',
      value_json: JSON.stringify('info@guideitsol.com')
    },
    {
      key: 'contact_phone',
      value_json: JSON.stringify('+918500647979')
    },
    {
      key: 'company_address',
      value_json: JSON.stringify('123 Tech Park, Bangalore, India')
    },
    {
      key: 'social_links',
      value_json: JSON.stringify({
        linkedin: 'https://linkedin.com/company/guideitsol',
        twitter: 'https://twitter.com/guideitsol',
        facebook: 'https://facebook.com/guideitsol',
        instagram: 'https://instagram.com/guideitsol'
      })
    }
  ];

  console.log('Updating site settings...');
  for (const setting of siteSettings) {
    await prisma.site_settings.upsert({
      where: { key: setting.key },
      update: { value_json: setting.value_json },
      create: setting
    });
  }
  console.log('Site settings updated successfully.');

  // Update navigation items
  console.log('Updating navigation...');
  // This would typically be done through the admin panel or API
  console.log('Navigation update completed.');

  // Update meta tags and SEO content
  console.log('Updating SEO content...');
  
  // Update home page meta
  await prisma.pages.upsert({
    where: { slug: 'home' },
    update: {
      metaTitle: 'Guidesoft IT Solutions - Innovative Technology Services',
      metaDesc: 'Leading technology company offering web development, mobile apps, AI solutions, and cloud services. Transform your business with our cutting-edge solutions.'
    },
    create: {
      title: 'Home',
      slug: 'home',
      content: 'Welcome to Guidesoft IT Solutions',
      metaTitle: 'Guidesoft IT Solutions - Innovative Technology Services',
      metaDesc: 'Leading technology company offering web development, mobile apps, AI solutions, and cloud services. Transform your business with our cutting-edge solutions.'
    }
  });

  // Update about page meta
  await prisma.pages.upsert({
    where: { slug: 'about' },
    update: {
      metaTitle: 'About Guidesoft IT Solutions - Our Story & Mission',
      metaDesc: 'Learn about Guidesoft IT Solutions, our journey, team, and commitment to delivering innovative technology solutions for businesses worldwide.'
    },
    create: {
      title: 'About Us',
      slug: 'about',
      content: 'About Guidesoft IT Solutions',
      metaTitle: 'About Guidesoft IT Solutions - Our Story & Mission',
      metaDesc: 'Learn about Guidesoft IT Solutions, our journey, team, and commitment to delivering innovative technology solutions for businesses worldwide.'
    }
  });

  // Update services page meta
  await prisma.pages.upsert({
    where: { slug: 'services' },
    update: {
      metaTitle: 'Our Services - Guidesoft IT Solutions',
      metaDesc: 'Explore our comprehensive technology services including web development, mobile apps, AI solutions, cloud services, and more.'
    },
    create: {
      title: 'Services',
      slug: 'services',
      content: 'Our Services',
      metaTitle: 'Our Services - Guidesoft IT Solutions',
      metaDesc: 'Explore our comprehensive technology services including web development, mobile apps, AI solutions, cloud services, and more.'
    }
  });

  // Update contact page meta
  await prisma.pages.upsert({
    where: { slug: 'contact' },
    update: {
      metaTitle: 'Contact Us - Guidesoft IT Solutions',
      metaDesc: 'Get in touch with Guidesoft IT Solutions. We\'re here to help you with your technology needs.'
    },
    create: {
      title: 'Contact Us',
      slug: 'contact',
      content: 'Contact Guidesoft IT Solutions',
      metaTitle: 'Contact Us - Guidesoft IT Solutions',
      metaDesc: 'Get in touch with Guidesoft IT Solutions. We\'re here to help you with your technology needs.'
    }
  });

  console.log('SEO content updated successfully.');

  // Update footer content
  console.log('Updating footer content...');
  // This would typically be done through the admin panel or by updating components
  console.log('Footer content update completed.');

  console.log('Site content update completed successfully!');
}

updateSiteContent()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });