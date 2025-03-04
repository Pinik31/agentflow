
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error(message);
    return Promise.reject(error);
  }
);

export interface LeadResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  metadata?: any;
  businessSize?: string;
  industry?: string;
  website?: string;
  createdAt: string;
}

export interface BusinessNeedResponse {
  id: number;
  assessmentId: number;
  category: string;
  description: string;
  priority: string;
  recommendedSolution?: string;
  estimatedCost?: string;
  createdAt: string;
}

export const ApiService = {
  // Blog
  getBlogPosts: () => api.get('/blog'),
  getBlogPost: (slug: string) => api.get(`/blog/${slug}`),
  
  // Leads
  createLead: (data: any): Promise<LeadResponse> => api.post('/leads', data),
  
  // Newsletter
  subscribeNewsletter: (email: string) => api.post('/newsletter', { email }),
  
  // WhatsApp
  sendWhatsAppMessage: (data: any) => api.post('/whatsapp/send', data),
  
  // Business needs
  createBusinessNeed: (data: any): Promise<BusinessNeedResponse> => api.post('/business-needs', data),
  
  // General method for any endpoint
  get: (url: string, params?: any) => api.get(url, { params }),
  post: (url: string, data: any) => api.post(url, data),
  put: (url: string, data: any) => api.put(url, data),
  delete: (url: string) => api.delete(url)
};

export default ApiService;
