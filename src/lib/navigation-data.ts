export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const generatePath = (base: string, title: string) => {
  return `/${base}/${slugify(title)}`;
};

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "AI Learning",
    href: "/ai-learning",
  },
  {
    title: "Services",
    children: [
      {
        title: "Web Development",
        href: generatePath("services", "web-development"),
        children: [
          { title: "Software Development", href: generatePath("services", "software-development") },
          { title: "UI/UX Design & Development", href: generatePath("services", "ui-ux-design-development") },
          { title: "eCommerce Development", href: generatePath("services", "ecommerce-development") },
          { title: "Full Stack Development", href: generatePath("services", "full-stack-development") },
          { title: "Cross Platform Development", href: generatePath("services", "cross-platform-development") },
          { title: "Data Engineering", href: generatePath("services", "data-engineering") },
          { title: "IT Consulting Services", href: generatePath("services", "it-consulting-services") },
          { title: "Explore More", href: generatePath("services", "web-development-explore-more") },
        ],
      },
      {
        title: "App Development",
        href: generatePath("services", "app-development"),
        children: [
          { title: "Android App Development", href: generatePath("services", "android-app-development") },
          { title: "iOS App Development", href: generatePath("services", "ios-app-development") },
          { title: "IoT App Development", href: generatePath("services", "iot-app-development") },
          { title: "Native App Development", href: generatePath("services", "native-app-development") },
          { title: "Flutter App Development", href: generatePath("services", "flutter-app-development") },
          { title: "Progressive Web Apps", href: generatePath("services", "progressive-web-apps") },
          { title: "Enterprise App Development", href: generatePath("services", "enterprise-app-development") },
          { title: "eCommerce App Development", href: generatePath("services", "ecommerce-app-development") },
          { title: "Explore More", href: generatePath("services", "app-development-explore-more") },
        ],
      },
      {
        title: "Travel Tech Solutions",
        href: generatePath("services", "travel-tech-solutions"),
        children: [
          { title: "Travel Portal Development", href: generatePath("services", "travel-portal-development") },
          { title: "Custom Travel Portal", href: generatePath("services", "custom-travel-portal") },
          { title: "White Label Travel", href: generatePath("services", "white-label-travel") },
          { title: "Travel Booking Software", href: generatePath("services", "travel-booking-software") },
          { title: "Hotel Booking Software", href: generatePath("services", "hotel-booking-software") },
          { title: "Flight Booking Software", href: generatePath("services", "flight-booking-software") },
          { title: "Travel API Integration", href: generatePath("services", "travel-api-integration") },
          { title: "Global Distribution System", href: generatePath("services", "global-distribution-system") },
          { title: "Explore More", href: generatePath("services", "travel-tech-solutions-explore-more") },
        ],
      },
      {
        title: "Hire Dedicated Developers",
        href: generatePath("services", "hire-dedicated-developers"),
        children: [
          { title: "Hire Android App Developers", href: generatePath("services", "hire-android-app-developers") },
          { title: "Hire React Native Developers", href: generatePath("services", "hire-react-native-developers") },
          { title: "Hire Flutter Developers", href: generatePath("services", "hire-flutter-developers") },
          { title: "Hire Kotlin Developers", href: generatePath("services", "hire-kotlin-developers") },
          { title: "Hire Full Stack Developers", href: generatePath("services", "hire-full-stack-developers") },
          { title: "Hire Laravel Developers", href: generatePath("services", "hire-laravel-developers") },
          { title: "Hire Python Developers", href: generatePath("services", "hire-python-developers") },
          { title: "Hire Remote Developers", href: generatePath("services", "hire-remote-developers") },
          { title: "Explore More", href: generatePath("services", "hire-dedicated-developers-explore-more") },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    href: "/solutions", // Points to the new Solutions overview page
    children: [
      {
        title: "On-Demand Solutions",
        href: generatePath("solutions", "on-demand-solutions"),
        children: [
          { title: "Booking App", href: generatePath("solutions", "booking-app") },
          { title: "Chatbot App", href: generatePath("solutions", "chatbot-app") },
          { title: "Food Delivery App", href: generatePath("solutions", "food-delivery-app") },
          { title: "Video Streaming App", href: generatePath("solutions", "video-streaming-app") },
          { title: "Question Answer App", href: generatePath("solutions", "question-answer-app") },
          { title: "Scheduling App", href: generatePath("solutions", "scheduling-app") },
          { title: "Event Management App", href: generatePath("solutions", "event-management-app") },
          { title: "Flight Booking App", href: generatePath("solutions", "flight-booking-app") },
          { title: "Video Conferencing", href: generatePath("solutions", "video-conferencing") },
        ],
      },
      {
        title: "Emerging Tech Solutions",
        href: generatePath("solutions", "emerging-tech-solutions"),
        children: [
          { title: "eLearning Solution", href: generatePath("solutions", "elearning-solution") },
          { title: "HRMS App Solution", href: generatePath("solutions", "hrms-app-solution") },
          { title: "BLE App Solution", href: generatePath("solutions", "ble-app-solution") },
          { title: "Survey App Solution", href: generatePath("solutions", "survey-app-solution") },
          { title: "Employee Management App", href: generatePath("solutions", "employee-management-app") },
          { title: "Reverse Auction App", href: generatePath("solutions", "reverse-auction-app") },
          { title: "React Native App Solution", href: generatePath("solutions", "react-native-app-solution") },
          { title: "AR App Development", href: generatePath("solutions", "ar-app-development") },
          { title: "eCommerce App Development", href: generatePath("solutions", "ecommerce-app-development") },
        ],
      },
      {
        title: "Trending Technology",
        href: generatePath("solutions", "trending-technology"),
        children: [
          { title: "Data Engineering", href: generatePath("solutions", "data-engineering") },
          { title: "Data Analytics", href: generatePath("solutions", "data-analytics") },
          { title: "Data Visualization", href: generatePath("solutions", "data-visualization") },
          { title: "Data Warehousing", href: generatePath("solutions", "data-warehousing") },
          { title: "Snowflake Solution", href: generatePath("solutions", "snowflake-solution") },
          { title: "DevOps Consulting", href: generatePath("solutions", "devops-consulting") },
          { title: "IT Consulting Services", href: generatePath("solutions", "it-consulting-services") },
          { title: "IT Support Services", href: generatePath("solutions", "it-support-services") },
          { title: "IT Outsourcing Services", href: generatePath("solutions", "it-outsourcing-services") },
          { title: "Offshore Development", href: generatePath("solutions", "offshore-development") },
        ],
      },
    ],
  },
  {
    title: "Travel",
    href: "/travel", // Points to the new Travel overview page
    children: [
      {
        title: "Travel Booking Engine",
        href: generatePath("travel", "travel-booking-engine"),
        children: [
          { title: "Hotel Booking Engine", href: generatePath("travel", "hotel-booking-engine") },
          { title: "Car Rental Booking Engine", href: generatePath("travel", "car-rental-booking-engine") },
          { title: "Cruise Booking Engine", href: generatePath("travel", "cruise-booking-engine") },
          { title: "Bus Reservation System", href: generatePath("travel", "bus-reservation-system") },
          { title: "Activities Booking Solution", href: generatePath("travel", "activities-booking-solution") },
          { title: "Vacation Rental Management System", href: generatePath("travel", "vacation-rental-management-system") },
          { title: "Flight Booking Engine", href: generatePath("travel", "flight-booking-engine") },
        ],
      },
      {
        title: "Travel Portal Development",
        href: generatePath("travel", "travel-portal-development"),
        children: [
          { title: "B2B Travel Portal", href: generatePath("travel", "b2b-travel-portal") },
          { title: "B2C Travel Portal", href: generatePath("travel", "b2c-travel-portal") },
          { title: "Custom Travel Portal", href: generatePath("travel", "custom-travel-portal") },
          { title: "Hotel Extranet", href: generatePath("travel", "hotel-extranet") },
          { title: "B2B Flight Booking Portal", href: generatePath("travel", "b2b-flight-booking-portal") },
          { title: "Air Ticket Booking Portal", href: generatePath("travel", "air-ticket-booking-portal") },
        ],
      },
      {
        title: "Travel API Integration",
        href: generatePath("travel", "travel-api-integration"),
        children: [
          { title: "NDC API Integration", href: generatePath("travel", "ndc-api-integration") },
          { title: "Amadeus API Integration", href: generatePath("travel", "amadeus-api-integration") },
          { title: "Sabre API Integration", href: generatePath("travel", "sabre-api-integration") },
          { title: "GDS Integration", href: generatePath("travel", "gds-integration") },
          { title: "Expedia API Integration", href: generatePath("travel", "expedia-api-integration") },
          { title: "Payment Gateway Integration", href: generatePath("travel", "payment-gateway-integration") },
          { title: "Travel Customer Support and Service", href: generatePath("travel", "travel-customer-support-and-service") },
          { title: "Flight Booking API Integration", href: generatePath("travel", "flight-booking-api-integration") },
        ],
      },
      {
        title: "Need Custom Travel Development?",
        href: generatePath("travel", "custom-travel-development"),
      },
    ],
  },
  {
    title: "Hire Us",
    href: "/hire-us", // Points to the new Hire Us overview page
    children: [
      {
        title: "Frontend",
        href: generatePath("hire-us", "frontend"),
        children: [
          { title: "Hire Electron Js Developers", href: generatePath("hire-us", "hire-electron-js-developers") },
          { title: "Hire ReactJS Developers", href: generatePath("hire-us", "hire-reactjs-developers") },
          { title: "Hire NextJS Developers", href: generatePath("hire-us", "hire-nextjs-developers") },
          { title: "Hire HTML Developers", href: generatePath("hire-us", "hire-html-developers") },
          { title: "Hire Angular Developers", href: generatePath("hire-us", "hire-angular-developers") },
          { title: "Hire Magento Developers", href: generatePath("hire-us", "hire-magento-developers") },
          { title: "Hire GatsbyJS Developers", href: generatePath("hire-us", "hire-gatsbyjs-developers") },
          { title: "Hire Extjs Developers", href: generatePath("hire-us", "hire-extjs-developers") },
        ],
      },
      {
        title: "Backend",
        href: generatePath("hire-us", "backend"),
        children: [
          { title: "Hire NodeJS Developers", href: generatePath("hire-us", "hire-nodejs-developers") },
          { title: "Hire Laravel Developers", href: generatePath("hire-us", "hire-laravel-developers") },
          { title: "Hire Python Developers", href: generatePath("hire-us", "hire-python-developers") },
          { title: "Hire NestJS Developers", href: generatePath("hire-us", "hire-nestjs-developers") },
          { title: "Hire ExpressJS Developers", href: generatePath("hire-us", "hire-expressjs-developers") },
          { title: "Hire .Net Developers", href: generatePath("hire-us", "hire-net-developers") },
          { title: "Hire Hapi.js Developers", href: generatePath("hire-us", "hire-hapi-js-developers") },
          { title: "Hire Fastify Developers", href: generatePath("hire-us", "hire-fastify-developers") },
          { title: "Hire Golang Developers", href: generatePath("hire-us", "hire-golang-developers") },
        ],
      },
      {
        title: "Mobile",
        href: generatePath("hire-us", "mobile"),
        children: [
          { title: "Hire Android App Developer", href: generatePath("hire-us", "hire-android-app-developer") },
          { title: "Hire React Native Developers", href: generatePath("hire-us", "hire-react-native-developers") },
          { title: "Hire Flutter Developers", href: generatePath("hire-us", "hire-flutter-developers") },
          { title: "Hire Kotlin Developers", href: generatePath("hire-us", "hire-kotlin-developers") },
          { title: "Hire Swift Developers", href: generatePath("hire-us", "hire-swift-developers") },
          { title: "Hire iOS Developers", href: generatePath("hire-us", "hire-ios-developers") },
        ],
      },
      {
        title: "Trending Technology",
        href: generatePath("hire-us", "trending-technology"),
        children: [
          { title: "Hire Remote Developers", href: generatePath("hire-us", "hire-remote-developers") },
          { title: "Hire Dedicated Developers", href: generatePath("hire-us", "hire-dedicated-developers") },
          { title: "Hire Full Stack Developer", href: generatePath("hire-us", "hire-full-stack-developer") },
          { title: "Hire DevOps Engineers", href: generatePath("hire-us", "hire-devops-engineers") },
          { title: "Hire QA Engineers", href: generatePath("hire-us", "hire-qa-engineers") },
          { title: "Hire Front End Developer", href: generatePath("hire-us", "hire-front-end-developer") },
          { title: "Hire Payload CMS Developers", href: generatePath("hire-us", "hire-payload-cms-developers") },
          { title: "Hire DevOps automation Engineers", href: generatePath("hire-us", "hire-devops-automation-engineers") },
          { title: "Hire TypeScript Developers", href: generatePath("hire-us", "hire-typescript-developers") },
        ],
      },
    ],
  },
  {
    title: "Company",
    children: [
      {
        title: "About Company",
        href: generatePath("company", "about-company"),
        children: [
          { title: "About", href: "/pages" },
          { title: "HR Consultancy", href: generatePath("company", "hr-consultancy") },
          { title: "Careers", href: generatePath("company", "careers") },
          { title: "Privacy Policy", href: generatePath("company", "privacy-policy") },
          { title: "Terms & Conditions", href: generatePath("company", "terms-conditions") },
          { title: "Refund and Cancellation Policy", href: generatePath("company", "refund-and-cancellation-policy") },
          { title: "PayU Merchant Terms (Service Fee)", href: generatePath("company", "merchant-terms-service-fee") },
          { title: "PayU Merchant/Customer Protection Fund", href: generatePath("company", "merchant-customer-protection-fund") },
          { title: "PayU Banned & Restricted Businesses", href: generatePath("company", "banned-restricted-businesses") },
          { title: "PayU List of Issuers", href: generatePath("company", "list-issuers-payment-mechanisms") },
          { title: "PayU Split Pay Terms", href: generatePath("company", "terms-conditions-split-pay") },
          { title: "PayU Merchant Terms (IHC)", href: generatePath("company", "merchant-terms-internet-handling-charge") },
          { title: "PayU UPI Technology Components", href: generatePath("company", "components-optional-technology-services-upi") },
          { title: "PayU Bundled Packages Terms", href: generatePath("company", "terms-conditions-bundled-packages") },
          { title: "PayU Mobile SDK Downloads", href: generatePath("company", "payu-mobile-sdk") },
        ],
      },
      {
        title: "Insight",
        href: generatePath("company", "insight"),
        children: [
          { title: "Blogs", href: "/blog" },
          { title: "Portfolio", href: "/portfolio" },
          { title: "Case Studies", href: generatePath("company", "case-studies") },
          { title: "Videos", href: generatePath("company", "videos") },
          { title: "Center Of Excellence", href: generatePath("company", "center-of-excellence") },
          { title: "Glossary", href: generatePath("company", "glossary") },
        ],
      },
    ],
  },
  {
    title: "Demos",
    children: [
      {
        title: "Splash Cursor",
        href: "/splash-cursor-demo",
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
];