import api from './api';

export const resumeService = {
  /** Fetch all resumes for the logged-in user */
  getAll: () => api.get('/resumes').then((r) => r.data),

  /** Fetch a single resume by ID */
  getById: (id) => api.get(`/resumes/${id}`).then((r) => r.data),

  /** Create a new resume */
  create: (data) => api.post('/resumes', data).then((r) => r.data),

  /** Update an existing resume */
  update: (id, data) => api.put(`/resumes/${id}`, data).then((r) => r.data),

  /** Delete a resume */
  delete: (id) => api.delete(`/resumes/${id}`).then((r) => r.data),
};
