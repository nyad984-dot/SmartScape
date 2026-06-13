import { Edit3 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useReports } from '../hooks/useReports.js'
import { formatDate, getStatusColor } from '../utils/formatters.js'

export default function ProfilePage() {
  const { user } = useAuth()
  const { reports } = useReports()

  return (
    <>
      <PageHeader
        action={<Button icon={Edit3} variant="secondary">Edit profile</Button>}
        description="Your activity, impact, and recent city reports."
        eyebrow="Resident profile"
        title="Profile"
      />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-sky-400 text-3xl font-bold text-slate-950">
              {user.avatar}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-100">{user.name}</h2>
            <p className="mt-1 text-slate-400">{user.email}</p>
            <p className="mt-1 text-sm text-sky-300 font-semibold">{user.district}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {user.stats.map((stat) => (
              <div className="rounded-lg bg-slate-800 p-3 text-center border border-slate-700/30" key={stat.label}>
                <p className="text-xl font-bold text-slate-50">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Recent reports</h2>
          <div className="space-y-3">
            {reports.slice(0, 4).map((report) => (
              <div className="flex flex-col gap-2 rounded-lg bg-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between border border-slate-700/30" key={report.id}>
                <div>
                  <p className="font-semibold text-slate-100">{report.title}</p>
                  <p className="text-sm text-slate-500">{formatDate(report.date)}</p>
                </div>
                <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
