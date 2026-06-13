import { useMemo, useState } from 'react'
import { reports as initialReports } from '../utils/mockData.js'
import { ReportsContext } from './reportsContextValue.js'

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState(initialReports)

  const value = useMemo(
    () => ({
      reports,
      addReport(report) {
        setReports((current) => [report, ...current])
      },
      findReport(id) {
        return reports.find((report) => report.id === id)
      },
    }),
    [reports],
  )

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}
