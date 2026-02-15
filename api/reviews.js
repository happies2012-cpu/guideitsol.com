export default function handler(req, res) {
    // Mock reviews data
    const mockReviews = [
        {
            id: '1',
            name: 'Rajesh Kumar',
            role: 'CEO, TechStart India',
            rating: 5,
            comment: 'GS Intelligence transformed our business operations. The AI workforce integration was seamless and results exceeded expectations.',
            avatar: '/assets/gsai/student.png',
            date: '2024-01-15',
            verified: true
        },
        {
            id: '2',
            name: 'Priya Sharma',
            role: 'Marketing Director, Digital Solutions',
            rating: 5,
            comment: 'Outstanding service! The GS Elite Workforce helped us scale our marketing campaigns efficiently. Highly recommended!',
            avatar: '/assets/gsai/teacher2.png',
            date: '2024-01-20',
            verified: true
        },
        {
            id: '3',
            name: 'Amit Patel',
            role: 'Founder, StartupHub',
            rating: 5,
            comment: 'The AI-powered solutions from GS Intelligence are game-changing. Our productivity increased by 300% in just 3 months.',
            avatar: '/assets/gsai/it.png',
            date: '2024-02-01',
            verified: true
        },
        {
            id: '4',
            name: 'Sneha Reddy',
            role: 'HR Manager, Global Corp',
            rating: 5,
            comment: 'Excellent platform for automating HR processes. The GS HR Expert has been invaluable for our recruitment and onboarding.',
            avatar: '/assets/gsai/gym.png',
            date: '2024-02-10',
            verified: true
        },
        {
            id: '5',
            name: 'Vikram Singh',
            role: 'CTO, FinTech Innovations',
            rating: 5,
            comment: 'Impressive technology stack and exceptional support. GS Intelligence is our go-to partner for AI integration.',
            avatar: '/assets/gsai/finance_bg.png',
            date: '2024-02-15',
            verified: true
        },
        {
            id: '6',
            name: 'Ananya Desai',
            role: 'Product Manager, E-commerce Plus',
            rating: 5,
            comment: 'The GS Marketing Expert revolutionized our campaigns. ROI improved significantly with intelligent automation.',
            avatar: '/assets/gsai/retail.png',
            date: '2024-02-20',
            verified: true
        },
        {
            id: '7',
            name: 'Karthik Menon',
            role: 'Operations Head, Logistics Pro',
            rating: 5,
            comment: 'Streamlined our entire operations workflow. The AI solutions are intuitive and deliver real business value.',
            avatar: '/assets/gsai/sports.png',
            date: '2024-02-25',
            verified: true
        },
        {
            id: '8',
            name: 'Meera Iyer',
            role: 'Finance Director, Investment Group',
            rating: 5,
            comment: 'GS Finance Expert provides accurate insights and forecasting. A must-have tool for financial planning.',
            avatar: '/assets/gsai/law.png',
            date: '2024-03-01',
            verified: true
        },
        {
            id: '9',
            name: 'Arjun Nair',
            role: 'Creative Director, Media House',
            rating: 5,
            comment: 'The creative AI tools helped us produce high-quality content faster. Exceptional quality and support!',
            avatar: '/assets/gsai/medical.png',
            date: '2024-03-05',
            verified: true
        },
        {
            id: '10',
            name: 'Divya Kapoor',
            role: 'Business Analyst, Consulting Firm',
            rating: 5,
            comment: 'Data-driven insights from GS Intelligence helped us make better strategic decisions. Truly transformative!',
            avatar: '/assets/gsai/astrologer.png',
            date: '2024-03-10',
            verified: true
        }
    ];

    const { limit } = req.query;
    const limitNum = limit ? parseInt(limit) : mockReviews.length;

    const data = mockReviews.slice(0, limitNum);

    res.status(200).json({
        data,
        total: data.length,
        averageRating: 5.0
    });
}
