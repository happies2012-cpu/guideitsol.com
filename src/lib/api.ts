import axios from 'axios';

// Use proxy in development, direct URL in production
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Define types for paginated responses
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Define the AI Tool type
interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  url?: string;
  tags: string;
  featured: boolean;
  pricing?: string;
  isPaid?: boolean;
  pros?: string;
  cons?: string;
  fullDescription?: string;
  detailUrl?: string;
  logoUrl?: string;
  applicableTasks?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

// Define the AI Enrollment type
interface AIEnrollment {
  id: string;
  userId?: string;
  toolId: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  aadhar: string;
  pan: string;
  message?: string;
  isVerified: boolean;
  isPaid: boolean;
  transactionId?: string;
  enrolledAt: string;
  tool: AITool;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 seconds timeout
  withCredentials: false, // Don't send cookies
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - backend may be down');
    } else if (error.response.status === 401) {
      console.error('Unauthorized - clearing auth token');
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
  getCurrentUser: () => api.get('/auth/me')
};

export const pagesAPI = {
  getAll: () => api.get('/pages'),
  getBySlug: (slug: string) => api.get(`/pages/${slug}`),
  create: (data: any) => api.post('/pages', data),
  update: (id: string, data: any) => api.put(`/pages/${id}`, data),
  delete: (id: string) => api.delete(`/pages/${id}`)
};

export const aiToolsAPI = {
  getAll: (params?: any) => api.get<PaginatedResponse<AITool>>('/ai-tools', { params }),
  getCategories: () => api.get<string[]>('/ai-tools/categories'),
  create: (data: any) => api.post<AITool>('/ai-tools', data),
  update: (id: string, data: any) => api.put<AITool>(`/ai-tools/${id}`, data),
  delete: (id: string) => api.delete(`/ai-tools/${id}`)
};

export const aiEnrollmentsAPI = {
  create: (data: any) => api.post<AIEnrollment>('/ai-enrollments', data),
  verify: (id: string) => api.post<AIEnrollment>(`/ai-enrollments/${id}/verify`),
  updatePayment: (id: string, transactionId?: string) =>
    api.post<AIEnrollment>(`/ai-enrollments/${id}/payment`, { transactionId }),
  getByUser: (userId: string) => api.get<AIEnrollment[]>(`/ai-enrollments/user/${userId}`),
  getById: (id: string) => api.get<AIEnrollment>(`/ai-enrollments/${id}`)
};

export const navigationAPI = {
  getAll: () => api.get('/navigation'),
  create: (data: any) => api.post('/navigation', data),
  update: (id: string, data: any) => api.put(`/navigation/${id}`, data),
  delete: (id: string) => api.delete(`/navigation/${id}`)
};

export const formsAPI = {
  submit: (formType: string, data: any) =>
    api.post('/forms/submit', { formType, data }),
  getAll: (formType?: string) =>
    api.get('/forms', { params: { formType } })
};

export default api;