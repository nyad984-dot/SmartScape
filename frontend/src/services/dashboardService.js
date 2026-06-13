import { dashboardData } from '../utils/mockData.js'

export const dashboardService = {
  async getDashboard() {
    return dashboardData
  },
}
