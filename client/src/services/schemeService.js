import { api } from './api';
import { mockSchemes } from '../data/mockSchemes';

export const schemeService = {
  async getSchemes(params = {}) {
    try {
      const { data } = await api.get('/schemes', { params });
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return mockSchemes;
    } catch {
      return mockSchemes;
    }
  },
  async getSchemeById(id) {
    try {
      const { data } = await api.get(`/schemes/${id}`);
      if (data) return data;
      return mockSchemes.find((s) => (s._id || s.id) === id) || null;
    } catch {
      return mockSchemes.find((s) => (s._id || s.id) === id) || null;
    }
  },
  async checkEligibility(profile, scheme) {
    try {
      const { data } = await api.post('/eligibility/check', { profile, scheme });
      return data;
    } catch {
      const matchScore = scheme?.demoMatch || 85;
      return {
        score: matchScore,
        status: matchScore >= 85 ? 'Strong Match' : 'Partial Match',
        eligibleCriteria: scheme?.eligibilityPreview || ['Age profile matched', 'Category requirement met'],
        missingCriteria: []
      };
    }
  }
};
