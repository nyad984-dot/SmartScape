import { reports } from '../utils/mockData'

export const reportService = {
  async list() {
    return reports
  },
  async getById(id) {
    return reports.find((report) => report.id === id)
  },
  async create(payload) {
    return {
      id: `RPT-${Math.floor(Math.random() * 9000) + 1000}`,
      ...payload,
      status: 'Open',
      priority: 'High',
      department: 'Transport Department',
      date: new Date().toISOString(),
    }
  },
}
