import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useReports } from '../hooks/useReports'
import { REPORT_STATUSES } from '../utils/constants'
import { formatDate, getPriorityColor, getStatusColor } from '../utils/formatters'

export default function ReportsPage() {
  const { reports } = useReports()
  const [status, setStatus] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      reports.filter((report) => {
        const matchesStatus = status === 'All' || report.status === status
        const matchesQuery = `${report.title} ${report.location} ${report.category}`.toLowerCase().includes(query.toLowerCase())
        return matchesStatus && matchesQuery
      }),
    [query, reports, status],
  )

  return (
    <>
      <PageHeader
        action={<Button to="/report/create">Create report</Button>}
        description="Search active incidents, filter by workflow state, and inspect department ownership."
        eyebrow="Operations"
        title="Reports"
      />
      <Card className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950/60 py-2.5 pl-10 pr-3 text-slate-100 outline-none focus:border-sky-300"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reports"
              value={query}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {REPORT_STATUSES.map((item) => (
              <button
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${status === item ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                key={item}
                onClick={() => setStatus(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid gap-4">
        {filtered.map((report) => (
          <Link key={report.id} to={`/reports/${report.id}`}>
            <Card className="transition hover:-translate-y-0.5 hover:border-sky-300/40">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{report.id}</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{report.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{report.location} • {formatDate(report.date)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
