"use client";

import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { useModalEvents } from "@/hooks/use-modal-events";
import { useResourceHints } from "@/hooks/use-performance";
import { useSecurity } from "@/hooks/useSecurity";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import VerticalSocialDock from "./components/VerticalSocialDock";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import BackToTopButton from "./components/BackToTopButton";
import AnimatedRoutes from "./components/AnimatedRoutes";
import LoadingScreen from "@/components/ui/loading-screen";
import { LeadMagnetPopup } from "@/components/LeadMagnetPopup";
// Removed FireworksOverlay import

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const HomeInsurance = lazy(() => import("./pages/HomeInsurance"));
const HomeBusiness = lazy(() => import("./pages/HomeBusiness"));
const HomeInvestment = lazy(() => import("./pages/HomeInvestment"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Pages = lazy(() => import("./pages/Pages"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
// Lazy load service pages
const WebDevelopment = lazy(() => import("./pages/services/web-development"));
const SoftwareDevelopment = lazy(() => import("./pages/services/software-development"));
const UiUxDesignDevelopment = lazy(() => import("./pages/services/ui-ux-design-development"));
const EcommerceDevelopment = lazy(() => import("./pages/services/ecommerce-development"));
const FullStackDevelopment = lazy(() => import("./pages/services/full-stack-development"));
const CrossPlatformDevelopment = lazy(() => import("./pages/services/cross-platform-development"));
const DataEngineering = lazy(() => import("./pages/services/data-engineering"));
const AppDevelopment = lazy(() => import("./pages/services/app-development"));
const TravelTechSolutions = lazy(() => import("./pages/services/travel-tech-solutions"));
const HireElectronJsDevelopers = lazy(() => import("./pages/services/hire-electron-js-developers"));
const HireReactJsDevelopers = lazy(() => import("./pages/services/hire-reactjs-developers"));
const HireNextJsDevelopers = lazy(() => import("./pages/services/hire-nextjs-developers"));
const HireHtmlDevelopers = lazy(() => import("./pages/services/hire-html-developers"));
const HireAngularDevelopers = lazy(() => import("./pages/services/hire-angular-developers"));
const HireMagentoDevelopers = lazy(() => import("./pages/services/hire-magento-developers"));
const HireGatsbyJsDevelopers = lazy(() => import("./pages/services/hire-gatsbyjs-developers"));
const HireExtJsDevelopers = lazy(() => import("./pages/services/hire-extjs-developers"));
const ProgressiveWebApps = lazy(() => import("./pages/services/progressive-web-apps"));
const NativeAppDevelopment = lazy(() => import("./pages/services/native-app-development"));
const ITConsultingServices = lazy(() => import("./pages/services/it-consulting-services"));
const IoTAppDevelopment = lazy(() => import("./pages/services/iot-app-development"));
const IOSAppDevelopment = lazy(() => import("./pages/services/ios-app-development"));
const FlutterAppDevelopment = lazy(() => import("./pages/services/flutter-app-development"));
const EnterpriseAppDevelopment = lazy(() => import("./pages/services/enterprise-app-development"));
const EcommerceAppDevelopment = lazy(() => import("./pages/services/ecommerce-app-development"));
const AndroidAppDevelopment = lazy(() => import("./pages/services/android-app-development"));

// Lazy load company pages
const AboutCompany = lazy(() => import("./pages/company/about-company"));
const Careers = lazy(() => import("./pages/company/careers"));
const PrivacyPolicy = lazy(() => import("./pages/company/privacy-policy"));
const TermsConditions = lazy(() => import("./pages/company/terms-conditions"));
const RefundCancellationPolicy = lazy(() => import("./pages/company/refund-and-cancellation-policy"));
const HrConsultancy = lazy(() => import("./pages/company/hr-consultancy"));
const CaseStudies = lazy(() => import("./pages/company/case-studies"));
const CenterOfExcellence = lazy(() => import("./pages/company/center-of-excellence"));
const Glossary = lazy(() => import("./pages/company/glossary"));
const Insight = lazy(() => import("./pages/company/insight"));
const Videos = lazy(() => import("./pages/company/videos"));
const BannedRestrictedBusinesses = lazy(() => import("./pages/company/banned-restricted-businesses"));
const PayuMobileSdk = lazy(() => import("./pages/company/payu-mobile-sdk"));

// Lazy load solution pages
const OnDemandSolutions = lazy(() => import("./pages/solutions/on-demand-solutions"));
const SchedulingApp = lazy(() => import("./pages/solutions/scheduling-app"));
const EventManagementApp = lazy(() => import("./pages/solutions/event-management-app"));
const FlightBookingApp = lazy(() => import("./pages/solutions/flight-booking-app"));
const VideoConferencing = lazy(() => import("./pages/solutions/video-conferencing"));
const ELearningSolution = lazy(() => import("./pages/solutions/elearning-solution"));
const DataAnalytics = lazy(() => import("./pages/solutions/data-analytics"));
const DevOpsConsulting = lazy(() => import("./pages/solutions/devops-consulting"));
const DataVisualization = lazy(() => import("./pages/solutions/data-visualization"));
const DataWarehousing = lazy(() => import("./pages/solutions/data-warehousing"));
const SnowflakeSolution = lazy(() => import("./pages/solutions/snowflake-solution"));
const ITSupportServices = lazy(() => import("./pages/solutions/it-support-services"));
const ITOutsourcingServices = lazy(() => import("./pages/solutions/it-outsourcing-services"));
const OffshoreDevelopment = lazy(() => import("./pages/solutions/offshore-development"));
const EmergingTechSolutions = lazy(() => import("./pages/solutions/emerging-tech-solutions"));
const TrendingTechnology = lazy(() => import("./pages/solutions/trending-technology"));
const TravelApp = lazy(() => import("./pages/solutions/travel-app"));
const SocialMediaApp = lazy(() => import("./pages/solutions/social-media-app"));
const HealthApp = lazy(() => import("./pages/solutions/health-app"));
const GamingApp = lazy(() => import("./pages/solutions/gaming-app"));
const FoodDeliveryApp = lazy(() => import("./pages/solutions/food-delivery-app"));
const FitnessApp = lazy(() => import("./pages/solutions/fitness-app"));
const FinanceApp = lazy(() => import("./pages/solutions/finance-app"));
const EducationApp = lazy(() => import("./pages/solutions/education-app"));
const ChatbotApp = lazy(() => import("./pages/solutions/chatbot-app"));
const BookingApp = lazy(() => import("./pages/solutions/booking-app"));
const WeatherApp = lazy(() => import("./pages/solutions/weather-app"));
const VideoStreamingApp = lazy(() => import("./pages/solutions/video-streaming-app"));
const UtilityApp = lazy(() => import("./pages/solutions/utility-app"));
const ShoppingApp = lazy(() => import("./pages/solutions/shopping-app"));
const RealEstateApp = lazy(() => import("./pages/solutions/real-estate-app"));
const QuestionAnswerApp = lazy(() => import("./pages/solutions/question-answer-app"));
const ProductivityApp = lazy(() => import("./pages/solutions/productivity-app"));
const NewsApp = lazy(() => import("./pages/solutions/news-app"));
const MusicApp = lazy(() => import("./pages/solutions/music-app"));
const DatingApp = lazy(() => import("./pages/solutions/dating-app"));
const SolutionsOverview = lazy(() => import("./pages/solutions/index"));

// Lazy load other pages
const TravelOverview = lazy(() => import("./pages/travel/index"));
const HireUsOverview = lazy(() => import("./pages/hire-us/index"));
const HireAndroidAppDeveloper = lazy(() => import("./pages/hire-us/hire-android-app-developer"));
const HireReactNativeDevelopers = lazy(() => import("./pages/hire-us/hire-react-native-developers"));
const HireSwiftDevelopers = lazy(() => import("./pages/hire-us/hire-swift-developers"));
const HireIosDevelopers = lazy(() => import("./pages/hire-us/hire-ios-developers"));
const HireUsTrendingTechnology = lazy(() => import("./pages/hire-us/trending-technology"));
const HireDedicatedDevelopers = lazy(() => import("./pages/hire-us/hire-dedicated-developers"));
const HireFullStackDeveloper = lazy(() => import("./pages/hire-us/hire-full-stack-developer"));
const HireDevOpsEngineers = lazy(() => import("./pages/hire-us/hire-devops-engineers"));
const HireQaEngineers = lazy(() => import("./pages/hire-us/hire-qa-engineers"));
const HireFrontEndDeveloper = lazy(() => import("./pages/hire-us/hire-front-end-developer"));
const HirePayloadCmsDevelopers = lazy(() => import("./pages/hire-us/hire-payload-cms-developers"));
const HireDevOpsAutomationEngineers = lazy(() => import("./pages/hire-us/hire-devops-automation-engineers"));
const HireTypescriptDevelopers = lazy(() => import("./pages/hire-us/hire-typescript-developers"));
const DynamicContentPage = lazy(() => import("./pages/DynamicContentPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AILearning = lazy(() => import("./pages/AILearning"));
const SplashCursorDemo = lazy(() => import("./pages/SplashCursorDemo"));
const APITest = lazy(() => import("./pages/APITest"));
const RobotCursorDemo = lazy(() => import("./pages/RobotCursorDemo"));
const Fireworks = lazy(() => import("./pages/Fireworks"));
const BentoDemoPage = lazy(() => import("./pages/BentoDemoPage"));
// Removed DiwaliGreeting import

// Lazy load portfolio pages - Travel
const TravelBookingEnginePortfolio = lazy(() => import("./pages/portfolio/TravelBookingEngine"));
const HotelBookingEnginePortfolio = lazy(() => import("./pages/portfolio/HotelBookingEngine"));
const FlightBookingEnginePortfolio = lazy(() => import("./pages/portfolio/FlightBookingEngine"));
const B2BTravelPortalPortfolio = lazy(() => import("./pages/portfolio/B2BTravelPortal"));
const B2CTravelPortalPortfolio = lazy(() => import("./pages/portfolio/B2CTravelPortal"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimationProvider>
          <TooltipProvider>
            <AuthProvider>
              <ModalProvider>
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </ModalProvider>
            </AuthProvider>
          </TooltipProvider>
        </AnimationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Hook to listen for modal events
  useModalEvents();

  // Add resource hints for better performance
  useResourceHints();

  // Initialize security measures
  useSecurity();

  // Update canonical tag based on current route and environment/site URL
  useEffect(() => {
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const siteUrl = (import.meta.env.VITE_SITE_URL as string) || window.location.origin;
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `${siteUrl}${location.pathname}`);
    }
  }, [location]);


  return (
    <>
      <Toaster />
      <Sonner />
      {/* <LeadMagnetPopup /> */}
      {/* Removed FireworksOverlay */}
      <div className="min-h-screen flex flex-col">
        <Header />
        <VerticalSocialDock />
        <main className="flex-1">
          <Suspense fallback={<LoadingScreen message="Loading content..." />}>
            <AnimatedRoutes>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/home-insurance" element={<HomeInsurance />} />
                <Route path="/home-business" element={<HomeBusiness />} />
                <Route path="/home-investment" element={<HomeInvestment />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/contact" element={<Contact />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* AI Learning */}
                <Route path="/ai-learning" element={<AILearning />} />
                <Route path="/splash-cursor-demo" element={<SplashCursorDemo />} />
                <Route path="/api-test" element={<APITest />} />
                <Route path="/robot-cursor-demo" element={<RobotCursorDemo />} />
                <Route path="/fireworks" element={<Fireworks />} />
                <Route path="/bento-demo" element={<BentoDemoPage />} />
                {/* Removed DiwaliGreeting route */}

                {/* New overview pages */}
                <Route path="/solutions" element={<SolutionsOverview />} />
                <Route path="/travel" element={<TravelOverview />} />
                <Route path="/hire-us" element={<HireUsOverview />} />

                {/* Specific routes for services (overrides dynamic) */}
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/software-development" element={<SoftwareDevelopment />} />
                <Route path="/services/ui-ux-design-development" element={<UiUxDesignDevelopment />} />
                <Route path="/services/ecommerce-development" element={<EcommerceDevelopment />} />
                <Route path="/services/full-stack-development" element={<FullStackDevelopment />} />
                <Route path="/services/cross-platform-development" element={<CrossPlatformDevelopment />} />
                <Route path="/services/data-engineering" element={<DataEngineering />} />
                <Route path="/services/app-development" element={<AppDevelopment />} />
                <Route path="/services/travel-tech-solutions" element={<TravelTechSolutions />} />
                <Route path="/services/hire-electron-js-developers" element={<HireElectronJsDevelopers />} />
                <Route path="/services/hire-reactjs-developers" element={<HireReactJsDevelopers />} />
                <Route path="/services/hire-nextjs-developers" element={<HireNextJsDevelopers />} />
                <Route path="/services/hire-html-developers" element={<HireHtmlDevelopers />} />
                <Route path="/services/hire-angular-developers" element={<HireAngularDevelopers />} />
                <Route path="/services/hire-magento-developers" element={<HireMagentoDevelopers />} />
                <Route path="/services/hire-gatsbyjs-developers" element={<HireGatsbyJsDevelopers />} />
                <Route path="/services/hire-extjs-developers" element={<HireExtJsDevelopers />} />
                <Route path="/services/progressive-web-apps" element={<ProgressiveWebApps />} />
                <Route path="/services/native-app-development" element={<NativeAppDevelopment />} />
                <Route path="/services/it-consulting-services" element={<ITConsultingServices />} />
                <Route path="/services/iot-app-development" element={<IoTAppDevelopment />} />
                <Route path="/services/ios-app-development" element={<IOSAppDevelopment />} />
                <Route path="/services/flutter-app-development" element={<FlutterAppDevelopment />} />
                <Route path="/services/enterprise-app-development" element={<EnterpriseAppDevelopment />} />
                <Route path="/services/ecommerce-app-development" element={<EcommerceAppDevelopment />} />
                <Route path="/services/android-app-development" element={<AndroidAppDevelopment />} />

                {/* Specific routes for solutions (overrides dynamic) */}
                <Route path="/solutions/on-demand-solutions" element={<OnDemandSolutions />} />
                <Route path="/solutions/scheduling-app" element={<SchedulingApp />} />
                <Route path="/solutions/event-management-app" element={<EventManagementApp />} />
                <Route path="/solutions/flight-booking-app" element={<FlightBookingApp />} />
                <Route path="/solutions/video-conferencing" element={<VideoConferencing />} />
                <Route path="/solutions/elearning-solution" element={<ELearningSolution />} />
                <Route path="/solutions/data-analytics" element={<DataAnalytics />} />
                <Route path="/solutions/devops-consulting" element={<DevOpsConsulting />} />
                <Route path="/solutions/data-visualization" element={<DataVisualization />} />
                <Route path="/solutions/data-warehousing" element={<DataWarehousing />} />
                <Route path="/solutions/snowflake-solution" element={<SnowflakeSolution />} />
                <Route path="/solutions/it-support-services" element={<ITSupportServices />} />
                <Route path="/solutions/it-outsourcing-services" element={<ITOutsourcingServices />} />
                <Route path="/solutions/offshore-development" element={<OffshoreDevelopment />} />
                <Route path="/solutions/emerging-tech-solutions" element={<EmergingTechSolutions />} />
                <Route path="/solutions/trending-technology" element={<TrendingTechnology />} />
                <Route path="/solutions/travel-app" element={<TravelApp />} />
                <Route path="/solutions/social-media-app" element={<SocialMediaApp />} />
                <Route path="/solutions/health-app" element={<HealthApp />} />
                <Route path="/solutions/gaming-app" element={<GamingApp />} />
                <Route path="/solutions/food-delivery-app" element={<FoodDeliveryApp />} />
                <Route path="/solutions/fitness-app" element={<FitnessApp />} />
                <Route path="/solutions/finance-app" element={<FinanceApp />} />
                <Route path="/solutions/education-app" element={<EducationApp />} />
                <Route path="/solutions/chatbot-app" element={<ChatbotApp />} />
                <Route path="/solutions/booking-app" element={<BookingApp />} />
                <Route path="/solutions/weather-app" element={<WeatherApp />} />
                <Route path="/solutions/video-streaming-app" element={<VideoStreamingApp />} />
                <Route path="/solutions/utility-app" element={<UtilityApp />} />
                <Route path="/solutions/shopping-app" element={<ShoppingApp />} />
                <Route path="/solutions/real-estate-app" element={<RealEstateApp />} />
                <Route path="/solutions/question-answer-app" element={<QuestionAnswerApp />} />
                <Route path="/solutions/productivity-app" element={<ProductivityApp />} />
                <Route path="/solutions/news-app" element={<NewsApp />} />
                <Route path="/solutions/music-app" element={<MusicApp />} />
                <Route path="/solutions/dating-app" element={<DatingApp />} />

                {/* Specific routes for hire-us (overrides dynamic) */}
                <Route path="/hire-us/hire-android-app-developer" element={<HireAndroidAppDeveloper />} />
                <Route path="/hire-us/hire-react-native-developers" element={<HireReactNativeDevelopers />} />
                <Route path="/hire-us/hire-swift-developers" element={<HireSwiftDevelopers />} />
                <Route path="/hire-us/hire-ios-developers" element={<HireIosDevelopers />} />
                <Route path="/hire-us/trending-technology" element={<HireUsTrendingTechnology />} />
                <Route path="/hire-us/hire-dedicated-developers" element={<HireDedicatedDevelopers />} />
                <Route path="/hire-us/hire-full-stack-developer" element={<HireFullStackDeveloper />} />
                <Route path="/hire-us/hire-devops-engineers" element={<HireDevOpsEngineers />} />
                <Route path="/hire-us/hire-qa-engineers" element={<HireQaEngineers />} />
                <Route path="/hire-us/hire-front-end-developer" element={<HireFrontEndDeveloper />} />
                <Route path="/hire-us/hire-payload-cms-developers" element={<HirePayloadCmsDevelopers />} />
                <Route path="/hire-us/hire-devops-automation-engineers" element={<HireDevOpsAutomationEngineers />} />
                <Route path="/hire-us/hire-typescript-developers" element={<HireTypescriptDevelopers />} />

                {/* Portfolio Routes */}
                <Route path="/portfolio/travel-booking-engine" element={<TravelBookingEnginePortfolio />} />
                <Route path="/portfolio/hotel-booking-engine" element={<HotelBookingEnginePortfolio />} />
                <Route path="/portfolio/flight-booking-engine" element={<FlightBookingEnginePortfolio />} />
                <Route path="/portfolio/b2b-travel-portal" element={<B2BTravelPortalPortfolio />} />
                <Route path="/portfolio/b2c-travel-portal" element={<B2CTravelPortalPortfolio />} />

                {/* Company Routes */}
                <Route path="/company/about-company" element={<AboutCompany />} />
                <Route path="/company/careers" element={<Careers />} />
                <Route path="/company/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/company/terms-conditions" element={<TermsConditions />} />
                <Route path="/company/refund-and-cancellation-policy" element={<RefundCancellationPolicy />} />
                <Route path="/company/hr-consultancy" element={<HrConsultancy />} />
                <Route path="/company/case-studies" element={<CaseStudies />} />
                <Route path="/company/center-of-excellence" element={<CenterOfExcellence />} />
                <Route path="/company/glossary" element={<Glossary />} />
                <Route path="/company/insight" element={<Insight />} />
                <Route path="/company/videos" element={<Videos />} />
                <Route path="/company/banned-restricted-businesses" element={<BannedRestrictedBusinesses />} />
                <Route path="/company/payu-mobile-sdk" element={<PayuMobileSdk />} />

                {/* Dynamic routes for all sub-pages (after specific routes) */}
                <Route path="/services/*" element={<DynamicContentPage />} />
                <Route path="/solutions/*" element={<DynamicContentPage />} />
                <Route path="/travel/*" element={<DynamicContentPage />} />
                <Route path="/hire-us/*" element={<DynamicContentPage />} />
                <Route path="/company/*" element={<DynamicContentPage />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatedRoutes>
          </Suspense>
        </main>
        <Footer />
        <BackToTopButton />
        <Chatbot />
      </div>
    </>
  );
};

export default App;
