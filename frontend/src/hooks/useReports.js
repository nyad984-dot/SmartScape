import { useContext } from 'react'
import { ReportsContext } from '../context/reportsContextValue.js'

export const useReports = () => useContext(ReportsContext)
