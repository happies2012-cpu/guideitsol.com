export default function handler(req, res) {
    // Mock learning paths data
    const mockLearningPaths = [
        {
            id: '1',
            title: 'AI & Machine Learning Fundamentals',
            description: 'Master the basics of AI and ML with hands-on projects',
            category: 'AI/ML',
            difficulty: 'Beginner',
            duration: '8 weeks',
            thumbnail: '/assets/learning/ai-ml.jpg',
            isPublished: true,
            steps: [
                {
                    id: '1-1',
                    title: 'Introduction to AI',
                    description: 'Understanding artificial intelligence basics',
                    order: 1,
                    contentType: 'video',
                    duration: 30
                },
                {
                    id: '1-2',
                    title: 'Python for AI',
                    description: 'Learn Python programming for AI applications',
                    order: 2,
                    contentType: 'article',
                    duration: 45
                }
            ]
        },
        {
            id: '2',
            title: 'Full-Stack Web Development',
            description: 'Build modern web applications from scratch',
            category: 'Development',
            difficulty: 'Intermediate',
            duration: '12 weeks',
            thumbnail: '/assets/learning/web-dev.jpg',
            isPublished: true,
            steps: [
                {
                    id: '2-1',
                    title: 'HTML & CSS Basics',
                    description: 'Learn the fundamentals of web design',
                    order: 1,
                    contentType: 'video',
                    duration: 40
                },
                {
                    id: '2-2',
                    title: 'JavaScript Essentials',
                    description: 'Master JavaScript programming',
                    order: 2,
                    contentType: 'article',
                    duration: 60
                }
            ]
        },
        {
            id: '3',
            title: 'Data Science with Python',
            description: 'Analyze and visualize data using Python',
            category: 'Data Science',
            difficulty: 'Intermediate',
            duration: '10 weeks',
            thumbnail: '/assets/learning/data-science.jpg',
            isPublished: true,
            steps: [
                {
                    id: '3-1',
                    title: 'Data Analysis Basics',
                    description: 'Introduction to data analysis concepts',
                    order: 1,
                    contentType: 'video',
                    duration: 35
                }
            ]
        },
        {
            id: '4',
            title: 'Cloud Computing Essentials',
            description: 'Learn cloud platforms and deployment',
            category: 'Cloud',
            difficulty: 'Beginner',
            duration: '6 weeks',
            thumbnail: '/assets/learning/cloud.jpg',
            isPublished: true,
            steps: [
                {
                    id: '4-1',
                    title: 'Cloud Fundamentals',
                    description: 'Understanding cloud computing',
                    order: 1,
                    contentType: 'article',
                    duration: 30
                }
            ]
        }
    ];

    const { limit } = req.query;
    const limitNum = limit ? parseInt(limit) : mockLearningPaths.length;

    const data = mockLearningPaths.slice(0, limitNum);

    res.status(200).json({
        data,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalCount: data.length,
            hasNext: false,
            hasPrev: false
        }
    });
}
