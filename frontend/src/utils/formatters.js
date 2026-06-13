import { PRIORITY_STYLES, STATUS_STYLES } from './constants.js'

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

export const formatPriority = (priority) => priority || 'Medium'

export const getStatusColor = (status) =>
  STATUS_STYLES[status] || 'bg-slate-500/15 text-slate-200 border-slate-400/30'

export const getPriorityColor = (priority) =>
  PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium
