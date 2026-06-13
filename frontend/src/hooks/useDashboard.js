import { useState, useEffect, useCallback } from 'react'
import { dashboardService } from '../services/dashboardService'

export function useDashboard() {
  const [data, setData] = useState({
    stats: null,
    categories: [],
    statuses: [],
    daily: [],
    recentReports: [],
    criticalIncidents: [],
    departments: [],
    aiInsights: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) {
      setLoading(true)
    }
    setError(null)
    try {
      const [
        stats,
        categories,
        statuses,
        daily,
        recentReports,
        criticalIncidents,
        departments,
        aiInsights
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getCategories(),
        dashboardService.getStatuses(),
        dashboardService.getDaily(),
        dashboardService.getRecentReports(),
        dashboardService.getCriticalIncidents(),
        dashboardService.getDepartments(),
        dashboardService.getAiInsights()
      ])

      setData({
        stats,
        categories,
        statuses,
        daily,
        recentReports,
        criticalIncidents,
        departments,
        aiInsights
      })
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(() => {
      fetchData(true)
    }, 60000)

    return () => clearInterval(intervalId)
  }, [fetchData])

  const refresh = useCallback(() => {
    return fetchData()
  }, [fetchData])

  return {
    ...data,
    loading,
    error,
    refresh
  }
}
