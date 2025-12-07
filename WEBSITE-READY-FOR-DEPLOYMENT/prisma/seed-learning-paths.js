import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample learning paths
  const learningPaths = [
    {
      title: 'AI Fundamentals',
      description: 'Master the basics of Artificial Intelligence and Machine Learning',
      category: 'AI/ML',
      difficulty: 'beginner',
      duration: '4 weeks',
      isPublished: true,
      steps: [
        {
          title: 'Introduction to AI',
          description: 'Learn what AI is and its various applications',
          contentType: 'article',
          duration: 30
        },
        {
          title: 'Machine Learning Basics',
          description: 'Understand the core concepts of machine learning',
          contentType: 'video',
          duration: 45
        },
        {
          title: 'Neural Networks',
          description: 'Deep dive into neural networks and deep learning',
          contentType: 'video',
          duration: 60
        },
        {
          title: 'AI Ethics',
          description: 'Explore the ethical considerations in AI development',
          contentType: 'article',
          duration: 20
        }
      ]
    },
    {
      title: 'Data Science with Python',
      description: 'Learn data analysis and visualization using Python',
      category: 'Data Science',
      difficulty: 'intermediate',
      duration: '6 weeks',
      isPublished: true,
      steps: [
        {
          title: 'Python for Data Science',
          description: 'Master Python libraries for data science',
          contentType: 'article',
          duration: 40
        },
        {
          title: 'Data Cleaning and Preprocessing',
          description: 'Learn techniques to clean and prepare data',
          contentType: 'video',
          duration: 50
        },
        {
          title: 'Data Visualization',
          description: 'Create compelling visualizations with matplotlib and seaborn',
          contentType: 'project',
          duration: 70
        },
        {
          title: 'Statistical Analysis',
          description: 'Apply statistical methods to data analysis',
          contentType: 'quiz',
          duration: 30
        }
      ]
    },
    {
      title: 'Advanced Machine Learning',
      description: 'Deep dive into advanced ML algorithms and techniques',
      category: 'AI/ML',
      difficulty: 'advanced',
      duration: '8 weeks',
      isPublished: true,
      steps: [
        {
          title: 'Ensemble Methods',
          description: 'Learn about bagging, boosting, and stacking techniques',
          contentType: 'video',
          duration: 55
        },
        {
          title: 'Natural Language Processing',
          description: 'Process and analyze human language data',
          contentType: 'project',
          duration: 90
        },
        {
          title: 'Computer Vision',
          description: 'Build image recognition systems',
          contentType: 'project',
          duration: 100
        },
        {
          title: 'Reinforcement Learning',
          description: 'Train agents to make decisions in complex environments',
          contentType: 'article',
          duration: 60
        }
      ]
    }
  ];

  // Create learning paths in database
  for (const path of learningPaths) {
    const steps = path.steps;
    delete path.steps;
    
    const createdPath = await prisma.learningPath.create({
      data: {
        ...path
      }
    });
    
    // Create steps for this path
    for (let i = 0; i < steps.length; i++) {
      await prisma.learningPathStep.create({
        data: {
          ...steps[i],
          order: i + 1,
          pathId: createdPath.id,
          isMandatory: true
        }
      });
    }
    
    console.log(`Created learning path: ${createdPath.title}`);
  }

  console.log('Learning paths seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });