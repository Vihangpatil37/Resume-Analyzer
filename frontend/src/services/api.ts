import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied via Vite to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  uploadResume: (fd: FormData) => api.post('/resume/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  runAnalysis: (resumeId: string, jdData: any) => api.post(`/analysis/${resumeId}/run`, jdData),
  getAnalysis: (resumeId: string) => api.get(`/analysis/${resumeId}`),
  getRecommendations: (resumeId: string) => api.get(`/analysis/${resumeId}/recommendations`)
};
