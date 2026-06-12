import { useContext } from 'react'
import { ReportsContext } from '../context/reportsContextValue'

export const useReports = () => useContext(ReportsContext)
