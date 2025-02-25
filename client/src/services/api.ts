
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error(message);
    return Promise.reject(error);
  }
);

export const ApiService = {
  getBlogPosts: () => api.get('/blog'),
  getBlogPost: (slug: string) => api.get(`/blog/${slug}`),
  createLead: (data: any) => api.post('/leads', data),
  subscribeNewsletter: (email: string) => api.post('/newsletter', { email }),
  sendWhatsAppMessage: (data: any) => api.post('/whatsapp/send', data)
};

export default ApiService;
