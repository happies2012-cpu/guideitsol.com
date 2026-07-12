import React from 'react';

interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export function OrganizationSchema({ 
  name = 'GuideIT Solutions',
  description = 'Premium AI training, consulting, and digital transformation services for enterprises and professionals.',
  url = 'https://guideitsol.com',
  logo = 'https://guideitsol.com/logo.png',
  sameAs = [
    'https://linkedin.com/company/guideitsol',
    'https://twitter.com/guideitsol',
    'https://github.com/guideitsol'
  ],
  contactPoint = {
    telephone: '+91-9876543210',
    contactType: 'customer service',
    availableLanguage: 'English'
  }
}: Partial<OrganizationSchema>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      ...contactPoint,
    },
  };
}

export function WebSiteSchema(name = 'GuideIT Solutions', searchUrl = 'https://guideitsol.com/search?q={search_term_string}') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: 'https://guideitsol.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function BreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://guideitsol.com${item.url}`,
    })),
  };
}

export function CourseSchema({
  name,
  description,
  provider = 'GuideIT Solutions',
  offers = '29999',
}: {
  name: string;
  description: string;
  provider?: string;
  offers?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    offers: {
      '@type': 'Offer',
      price: offers,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function FAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function ProductSchema({
  name,
  description,
  price = '0',
  image = '/og-image.png',
}: ProductSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://guideitsol.com${image}`,
    brand: {
      '@type': 'Brand',
      name: 'GuideIT Solutions',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumbs' | 'course' | 'faq' | 'product';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: object = {};

  switch (type) {
    case 'organization':
      schema = OrganizationSchema(data as Partial<OrganizationSchema>);
      break;
    case 'website':
      schema = WebSiteSchema();
      break;
    case 'breadcrumbs':
      schema = BreadcrumbSchema(data.items as BreadcrumbItem[]);
      break;
    case 'course':
      schema = CourseSchema(data as { name: string; description: string });
      break;
    case 'faq':
      schema = FAQSchema(data.questions as { question: string; answer: string }[]);
      break;
    case 'product':
      schema = ProductSchema(data as ProductSchema);
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
