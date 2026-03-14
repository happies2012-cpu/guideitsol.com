// Replaced Firestore with local Express API wrapper
export interface Page {
    id?: string;
    title: string;
    slug: string;
    content?: string;
    description?: string;
    published: boolean;
    createdAt?: any;
    updatedAt?: any;
}

export interface AITool {
    id?: string;
    name: string;
    description: string;
    category: string;
    icon?: string;
    url?: string;
    tags: string;
    featured: boolean;
    pricing?: string;
    createdAt?: any;
    updatedAt?: any;
}

const API_URL = '/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        console.warn(`API call failed: ${endpoint}`);
        return null;
    }

    return response.json();
}

export const pagesDB = {
    getAll: async () => {
        const data = await fetchAPI('/pages');
        return data || [];
    },
    getBySlug: async (slug: string) => {
        const data = await fetchAPI(`/pages/slug/${slug}`);
        return data;
    },
    create: async (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
        const res = await fetchAPI('/admin/pages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return res?.id;
    },
    update: async (id: string, data: Partial<Page>) => {
        await fetchAPI(`/admin/pages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        await fetchAPI(`/admin/pages/${id}`, {
            method: 'DELETE',
        });
    }
};

export const aiToolsDB = {
    getAll: async () => {
        const data = await fetchAPI('/ai-tools');
        return data || [];
    },
    create: async (data: Omit<AITool, 'id' | 'createdAt' | 'updatedAt'>) => {
        const res = await fetchAPI('/admin/ai-tools', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return res?.id;
    },
    update: async (id: string, data: Partial<AITool>) => {
        await fetchAPI(`/admin/ai-tools/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        await fetchAPI(`/admin/ai-tools/${id}`, {
            method: 'DELETE',
        });
    }
};
