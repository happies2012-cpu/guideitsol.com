/**
 * ============================================================
 *  SUITE 2: FRONTEND — Every registered route returns 200
 * ============================================================
 */
import { test, expect } from '@playwright/test';

// ── All routes from App.tsx ──────────────────────────────────
const CORE_PAGES = [
  '/',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
  '/login',
  '/register',
  '/ai-learning',
  '/solutions',
  '/travel',
  '/hire-us',
];

const SERVICE_PAGES = [
  '/services/web-development',
  '/services/software-development',
  '/services/ui-ux-design-development',
  '/services/ecommerce-development',
  '/services/full-stack-development',
  '/services/cross-platform-development',
  '/services/data-engineering',
  '/services/app-development',
  '/services/travel-tech-solutions',
  '/services/progressive-web-apps',
  '/services/native-app-development',
  '/services/it-consulting-services',
  '/services/iot-app-development',
  '/services/ios-app-development',
  '/services/flutter-app-development',
  '/services/enterprise-app-development',
  '/services/ecommerce-app-development',
  '/services/android-app-development',
];

const COMPANY_PAGES = [
  '/company/about-company',
  '/company/careers',
  '/company/privacy-policy',
  '/company/terms-conditions',
  '/company/refund-and-cancellation-policy',
  '/company/hr-consultancy',
  '/company/case-studies',
  '/company/center-of-excellence',
  '/company/glossary',
  '/company/insight',
  '/company/videos',
];

const SOLUTION_PAGES = [
  '/solutions/on-demand-solutions',
  '/solutions/scheduling-app',
  '/solutions/event-management-app',
  '/solutions/flight-booking-app',
  '/solutions/video-conferencing',
  '/solutions/elearning-solution',
  '/solutions/data-analytics',
  '/solutions/devops-consulting',
  '/solutions/data-visualization',
  '/solutions/data-warehousing',
  '/solutions/snowflake-solution',
  '/solutions/it-support-services',
  '/solutions/it-outsourcing-services',
  '/solutions/offshore-development',
  '/solutions/emerging-tech-solutions',
  '/solutions/trending-technology',
  '/solutions/travel-app',
  '/solutions/social-media-app',
  '/solutions/health-app',
  '/solutions/gaming-app',
  '/solutions/food-delivery-app',
  '/solutions/fitness-app',
  '/solutions/finance-app',
  '/solutions/education-app',
  '/solutions/chatbot-app',
  '/solutions/booking-app',
  '/solutions/weather-app',
  '/solutions/video-streaming-app',
  '/solutions/utility-app',
  '/solutions/shopping-app',
  '/solutions/real-estate-app',
  '/solutions/question-answer-app',
  '/solutions/productivity-app',
  '/solutions/news-app',
  '/solutions/music-app',
  '/solutions/dating-app',
  '/solutions/hrms-app-solution',
];

const HIRE_US_PAGES = [
  '/hire-us/hire-android-app-developer',
  '/hire-us/hire-react-native-developers',
  '/hire-us/hire-swift-developers',
  '/hire-us/hire-ios-developers',
  '/hire-us/trending-technology',
  '/hire-us/hire-dedicated-developers',
  '/hire-us/hire-full-stack-developer',
  '/hire-us/hire-devops-engineers',
  '/hire-us/hire-qa-engineers',
  '/hire-us/hire-front-end-developer',
  '/hire-us/hire-payload-cms-developers',
  '/hire-us/hire-devops-automation-engineers',
  '/hire-us/hire-typescript-developers',
];

const PORTFOLIO_PAGES = [
  '/portfolio/travel-booking-engine',
  '/portfolio/hotel-booking-engine',
  '/portfolio/flight-booking-engine',
  '/portfolio/b2b-travel-portal',
  '/portfolio/b2c-travel-portal',
];

// ── Test runner producing a status-200 check per route ──
function createPageTests(suiteName: string, routes: string[]) {
  test.describe(`${suiteName} — Page Load (status 200)`, () => {
    for (const route of routes) {
      test(`${route}`, async ({ page }) => {
        const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
        expect(response?.status()).toBe(200);
        // Verify the page has rendered content (not blank)
        const body = await page.locator('body').textContent();
        expect(body?.length).toBeGreaterThan(0);
      });
    }
  });
}

createPageTests('Core Pages', CORE_PAGES);
createPageTests('Service Pages', SERVICE_PAGES);
createPageTests('Company Pages', COMPANY_PAGES);
createPageTests('Solution Pages', SOLUTION_PAGES);
createPageTests('Hire-Us Pages', HIRE_US_PAGES);
createPageTests('Portfolio Pages', PORTFOLIO_PAGES);
