export interface AppModel {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    price: number;
    previewUrl: string;
    features: string[];
    likes: number;
    isPopular?: boolean;
}

export const appModels: AppModel[] = [
    // On-Demand Solutions
    {
        id: "booking-1",
        name: "Luxury Hotel Booking Pro",
        category: "booking-app",
        description: "High-end hotel reservation system with room management and real-time availability.",
        image: "/assets/products.png",
        price: 499,
        previewUrl: "#",
        features: ["Real-time Booking", "Room Management", "Payment Integration"],
        likes: 124,
        isPopular: true
    },
    {
        id: "booking-2",
        name: "Salon & Spa Scheduler",
        category: "booking-app",
        description: "Appointment booking app for beauty salons and wellness centers.",
        image: "/assets/uxui.png",
        price: 299,
        previewUrl: "#",
        features: ["Calendar Sync", "Service Packages", "Staff Scheduling"],
        likes: 85
    },
    {
        id: "booking-3",
        name: "Healthcare Appointment Hub",
        category: "booking-app",
        description: "Multi-provider clinical booking system with doctor profiles.",
        image: "/assets/dev.png",
        price: 549,
        previewUrl: "#",
        features: ["Patient Portal", "SMS Reminders", "E-Prescriptions"],
        likes: 142
    },
    {
        id: "food-1",
        name: "Gourmet Express Delivery",
        category: "food-delivery-app",
        description: "Full-featured food delivery platform with driver tracking and restaurant dashboard.",
        image: "/assets/Digital Marketing.png",
        price: 599,
        previewUrl: "#",
        features: ["Live Tracking", "Multiple Cuisines", "Reward System"],
        likes: 210,
        isPopular: true
    },
    {
        id: "food-2",
        name: "BakeShop Online",
        category: "food-delivery-app",
        description: "Order-ahead system for bakeries and small cafes.",
        image: "/assets/1.png",
        price: 199,
        previewUrl: "#",
        features: ["Inventory Tracking", "Custom Orders", "Local Pickup"],
        likes: 67
    },
    {
        id: "chatbot-1",
        name: "Enterprise Support AI",
        category: "chatbot-app",
        description: "Advanced AI chatbot for handling complex customer service queries.",
        image: "/assets/robot.png",
        price: 799,
        previewUrl: "#",
        features: ["NLP Engine", "CRM Integration", "Multi-language"],
        likes: 310,
        isPopular: true
    },
    {
        id: "chatbot-2",
        name: "E-commerce Sales Bot",
        category: "chatbot-app",
        description: "Increase conversions with a proactive sales assistant for your store.",
        image: "/assets/3.png",
        price: 399,
        previewUrl: "#",
        features: ["Product Recommendations", "Abandoned Cart", "Order Status"],
        likes: 188
    },
    {
        id: "edu-1",
        name: "EduMaster LMS",
        category: "elearning-solution",
        description: "Comprehensive learning management system for schools and corporate training.",
        image: "/assets/designing.png",
        price: 799,
        previewUrl: "#",
        features: ["Course Builder", "Quiz Engine", "Certification"],
        likes: 156
    },
    {
        id: "edu-2",
        name: "SkillShare Clone",
        category: "elearning-solution",
        description: "A subscription-based learning platform for various creative courses.",
        image: "/assets/4.png",
        price: 699,
        previewUrl: "#",
        features: ["Video Streaming", "Offline Mode", "Instructor Dashboard"],
        likes: 245
    },
    {
        id: "video-1",
        name: "StreamBox Pro",
        category: "video-streaming-app",
        description: "White-label video streaming platform like Netflix for your content.",
        image: "/assets/5.png",
        price: 999,
        previewUrl: "#",
        features: ["DRM Security", "Live Streaming", "Ads Integration"],
        likes: 420,
        isPopular: true
    },
    {
        id: "video-2",
        name: "ZoomClone Video Conferencing",
        category: "video-conferencing",
        description: "High-quality video conferencing solution for remote teams.",
        image: "/assets/6.png",
        price: 599,
        previewUrl: "#",
        features: ["Screen Sharing", "Recording", "Encryption"],
        likes: 112
    },
    {
        id: "news-1",
        name: "Daily Digest Portal",
        category: "news-app",
        description: "Modern news application with personalized feeds and offline reading.",
        image: "/assets/news.png",
        price: 249,
        previewUrl: "#",
        features: ["Ad Management", "Push Notifications", "Categories"],
        likes: 98
    },
    {
        id: "realestate-1",
        name: "PropExpert Listing",
        category: "real-estate-app",
        description: "Real estate marketplace for buying, selling, and renting properties.",
        image: "/assets/7.png",
        price: 499,
        previewUrl: "#",
        features: ["Map Search", "VR Tours", "Mortgage Calculator"],
        likes: 176
    },
    {
        id: "shopping-1",
        name: "QuickShop Multi-vendor",
        category: "shopping-app",
        description: "Amazon-like multi-vendor marketplace with vendor dashboard.",
        image: "/assets/8.png",
        price: 1299,
        previewUrl: "#",
        features: ["Multi-vendor", "Advanced Search", "Order Tracking"],
        likes: 540,
        isPopular: true
    },
    {
        id: "fitness-1",
        name: "FitTrack Personal Coach",
        category: "fitness-app",
        description: "Workout tracking and diet planning app for fitness enthusiasts.",
        image: "/assets/9.png",
        price: 349,
        previewUrl: "#",
        features: ["Activity Tracking", "Diet Plans", "Social Community"],
        likes: 134
    },
    {
        id: "finance-1",
        name: "FinSecure Wallet",
        category: "finance-app",
        description: "Secure digital wallet and expense tracking application.",
        image: "/assets/10.png",
        price: 449,
        previewUrl: "#",
        features: ["Biometric Auth", "Expense Analysis", "Multi-currency"],
        likes: 228
    },
    {
        id: "dating-1",
        name: "LuvMatch Dating App",
        category: "dating-app",
        description: "Modern dating platform with proximity-based matching and chat.",
        image: "/assets/11.png",
        price: 699,
        previewUrl: "#",
        features: ["Swipe Mechanism", "Proximity Match", "Real-time Chat"],
        likes: 312
    },
    {
        id: "travel-1",
        name: "TravelBuddy Planner",
        category: "travel-app",
        description: "Itinerary planning and hotel search for travelers.",
        image: "/assets/12.png",
        price: 399,
        previewUrl: "#",
        features: ["Hotels & Flights", "Itinerary Builder", "Offline Maps"],
        likes: 156
    },
    {
        id: "utility-1",
        name: "TaskFlow Manager",
        category: "utility-app",
        description: "Productivity and task management application for teams.",
        image: "/assets/13.png",
        price: 299,
        previewUrl: "#",
        features: ["Task Boards", "Time Tracking", "Team Collaboration"],
        likes: 89
    },
    {
        id: "social-1",
        name: "VibeSocial Platform",
        category: "social-media-app",
        description: "Instagram-like social media platform with stories and feeds.",
        image: "/assets/14.png",
        price: 899,
        previewUrl: "#",
        features: ["Stories", "Likes & Comments", "Direct Messaging"],
        likes: 456
    },
    {
        id: "hr-1",
        name: "StaffConnect HRMS",
        category: "hrms-app-solution",
        description: "Employee management and HR payroll solution.",
        image: "/assets/15.png",
        price: 749,
        previewUrl: "#",
        features: ["Payroll", "Attendance", "Leave Management"],
        likes: 167
    },
    {
        id: "qa-1",
        name: "AskExpert QA Platform",
        category: "question-answer-app",
        description: "Quora-like platform for community knowledge sharing and expert answers.",
        image: "/assets/uxui.png",
        price: 399,
        previewUrl: "#",
        features: ["Upvote System", "Expert Verification", "Topic Following"],
        likes: 89
    },
    {
        id: "sched-1",
        name: "Appointly Scheduling",
        category: "scheduling-app",
        description: "Professional appointment scheduling system for consultants and service businesses.",
        image: "/assets/robot.png",
        price: 249,
        previewUrl: "#",
        features: ["Google Calendar Sync", "Automated Reminders", "Flexible Time Slots"],
        likes: 112
    },
    {
        id: "event-1",
        name: "EventPro Manager",
        category: "event-management-app",
        description: "Comprehensive event planning and ticketing solution for conferences and gatherings.",
        image: "/assets/1.png",
        price: 599,
        previewUrl: "#",
        features: ["QR Ticketing", "Attendee Management", "Speaker Profiles"],
        likes: 204
    },
    {
        id: "flight-1",
        name: "SkyBound Flight Engine",
        category: "flight-booking-app",
        description: "Powerful flight search and booking engine with GDS integration capabilities.",
        image: "/assets/12.png",
        price: 899,
        previewUrl: "#",
        features: ["Multi-city Search", "Seat Selection", "Real-time Pricing"],
        likes: 342
    },
    {
        id: "game-1",
        name: "PlaySphere Gaming Hub",
        category: "gaming-app",
        description: "Social gaming platform and tournament management app.",
        image: "/assets/3.png",
        price: 699,
        previewUrl: "#",
        features: ["Leaderboards", "Tournament Brackets", "Social Feed"],
        likes: 567
    },
    {
        id: "music-1",
        name: "SonicStream Music",
        category: "music-app",
        description: "Music streaming and discovery app with playlist management.",
        image: "/assets/4.png",
        price: 799,
        previewUrl: "#",
        features: ["Audio Streaming", "Offline Listening", "Playlist Collab"],
        likes: 423
    },
    {
        id: "weather-1",
        name: "SkyCast Weather Pro",
        category: "weather-app",
        description: "Accurate local and global weather forecasting app with alerts.",
        image: "/assets/news.png",
        price: 149,
        previewUrl: "#",
        features: ["Hyperlocal Forecast", "Severe Weather Alerts", "Satellite Maps"],
        likes: 78
    }
];

export const getModelsByCategory = (category: string) => {
    return appModels.filter(model => model.category === category);
};
