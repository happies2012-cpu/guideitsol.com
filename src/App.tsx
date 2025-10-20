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
import Header from "./components/Header";
import VerticalSocialDock from "./components/VerticalSocialDock";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import BackToTopButton from "./components/BackToTopButton";
import RobotCursor from "./components/RobotCursor";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const HomeInsurance = lazy(() => import("./pages/HomeInsurance"));
const HomeBusiness = lazy(() => import("./pages/HomeBusiness"));
const HomeInvestment = lazy(() => import("./pages/HomeInvestment"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
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
        <TooltipProvider>
          <AuthProvider>
            <ModalProvider>
              <AppContent />
            </ModalProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  // Hook to listen for modal events
  useModalEvents();
  
  // Add resource hints for better performance
  useResourceHints();
  
  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RobotCursor />
        <div className="min-h-screen flex flex-col">
          <Header />
          <VerticalSocialDock />
          <main className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home-insurance" element={<HomeInsurance />} />
              <Route path="/home-business" element={<HomeBusiness />} />
              <Route path="/home-investment" element={<HomeInvestment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
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

              {/* Dynamic routes for all sub-pages (after specific routes) */}
              <Route path="/services/*" element={<DynamicContentPage />} />
              <Route path="/solutions/*" element={<DynamicContentPage />} />
              <Route path="/travel/*" element={<DynamicContentPage />} />
              <Route path="/hire-us/*" element={<DynamicContentPage />} />
              <Route path="/company/*" element={<DynamicContentPage />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BackToTopButton />
          <Chatbot />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;