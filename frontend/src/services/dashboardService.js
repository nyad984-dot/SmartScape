import api from './api'

export const dashboardService = {
  async getStats() {
    const response = await api.get('/api/dashboard/stats')
    return response.data
  },

  async getCategories() {
    const response = await api.get('/api/dashboard/categories')
    return response.data
  },

  async getStatuses() {
    const response = await api.get('/api/dashboard/statuses')
    return response.data
  },

  async getDaily() {
    const response = await api.get('/api/dashboard/daily')
    return response.data
  },

  async getRecentReports() {
    const response = await api.get('/api/dashboard/recent-reports')
    return response.data
  },

  async getCriticalIncidents() {
    const response = await api.get('/api/dashboard/critical-incidents')
    return response.data
  },

  async getDepartments() {
    const response = await api.get('/api/dashboard/departments')
    return response.data
  },

  async getAiInsights() {
    const response = await api.get('/api/dashboard/ai-insights')
    return response.data
  }
}
