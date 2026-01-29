import { pagesDB, aiToolsDB } from './firebase-db';

export const seedData = async () => {
    console.log('Starting seed...');

    // Seed Pages
    const pages = [
        {
            title: 'Home',
            slug: 'home',
            description: 'Welcome to GuideSoft IT Solutions',
            published: true,
            content: '<h1>Welcome</h1><p>This is the home page content.</p>'
        },
        {
            title: 'About Us',
            slug: 'about',
            description: 'Learn more about our company',
            published: true,
            content: '<h1>About Us</h1><p>We are a leading IT solutions provider.</p>'
        },
        {
            title: 'Services',
            slug: 'services',
            description: 'Our professional services',
            published: true,
            content: '<h1>Our Services</h1><p>We offer web development, AI integration, and more.</p>'
        }
    ];

    for (const page of pages) {
        const existing = await pagesDB.getBySlug(page.slug);
        if (!existing) {
            await pagesDB.create(page);
            console.log(`Created page: ${page.title}`);
        } else {
            console.log(`Page already exists: ${page.title}`);
        }
    }

    // Seed AI Tools
    const aiTools = [
        {
            name: 'ChatGPT',
            description: 'OpenAI\'s conversational AI model capable of understanding and generating natural language.',
            category: 'Chatbot',
            tags: 'chat, nlp, writing, coding',
            featured: true,
            pricing: 'Freemium',
            url: 'https://chat.openai.com',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
        },
        {
            name: 'Midjourney',
            description: 'Generative AI program that creates images from natural language descriptions.',
            category: 'Image Generation',
            tags: 'image, art, design',
            featured: true,
            pricing: 'Paid',
            url: 'https://www.midjourney.com',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png'
        },
        {
            name: 'GitHub Copilot',
            description: 'AI pair programmer that helps you write code faster.',
            category: 'Coding',
            tags: 'code, developer, productivity',
            featured: true,
            pricing: 'Paid',
            url: 'https://github.com/features/copilot',
            icon: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png'
        },
        {
            name: 'Jasper',
            description: 'AI content generator marketing copy, blog posts, and more.',
            category: 'Writing',
            tags: 'marketing, copywriting, content',
            featured: false,
            pricing: 'Paid',
            url: 'https://www.jasper.ai',
            icon: 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b865533c30ddb_Jasper%20Logo%20(1).png'
        },
        {
            name: 'Stable Diffusion',
            description: 'Latent text-to-image diffusion model capable of generating photo-realistic images.',
            category: 'Image Generation',
            tags: 'image, open-source, art',
            featured: false,
            pricing: 'Free',
            url: 'https://stability.ai',
            icon: 'https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/0715034d-f603-43eb-9da2-2632515b13d2/Stability+AI+Logo.png'
        },
        {
            name: 'Claude 3',
            description: 'Anthropic\'s next-generation AI assistant for tasks requiring high intelligence.',
            category: 'Chatbot',
            tags: 'chat, nlp, reasoning',
            featured: true,
            pricing: 'Paid',
            url: 'https://anthropic.com/claude',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg'
        },
        {
            name: 'Synthesia',
            description: 'AI video creation platform to create videos from plain text in minutes.',
            category: 'Video',
            tags: 'video, avatar, presentation',
            featured: false,
            pricing: 'Paid',
            url: 'https://www.synthesia.io',
            icon: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/61dc0796f359b6690ac06eb3_Synthesia%20Logo.svg'
        },
        {
            name: 'Notion AI',
            description: 'Access the limitless power of AI, right inside Notion.',
            category: 'Productivity',
            tags: 'writing, organization, notes',
            featured: true,
            pricing: 'Paid',
            url: 'https://www.notion.so/product/ai',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
        },
        {
            name: 'Runway Gen-2',
            description: 'A multi-modal AI system that can generate novel videos with text, images, or video clips.',
            category: 'Video',
            tags: 'video, creative, filmmaking',
            featured: false,
            pricing: 'Paid',
            url: 'https://runwayml.com',
            icon: 'https://yt3.googleusercontent.com/ytc/AIdro_k2_-n9_T8_q_n9_n9_n9_n9_n9_n9_n9_n9=s900-c-k-c0x00ffffff-no-rj'
        },
        {
            name: 'Perplexity AI',
            description: 'AI-powered answer engine that provides accurate, trusted, and real-time answers.',
            category: 'Search',
            tags: 'search, research, knowledge',
            featured: false,
            pricing: 'Freemium',
            url: 'https://www.perplexity.ai',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.jpg'
        }
    ];

    // For AI tools, we might checking existence by name or just add if empty
    const existingTools = await aiToolsDB.getAll();
    if (existingTools.length === 0) {
        for (const tool of aiTools) {
            await aiToolsDB.create(tool);
            console.log(`Created tool: ${tool.name}`);
        }
    } else {
        console.log(`Skipping tools seed, ${existingTools.length} tools found.`);
    }

    console.log('Seed completed!');
};
