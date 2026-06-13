import { Edit3 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { useReports } from '../hooks/useReports'
import { formatDate, getStatusColor } from '../utils/formatters'

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
            <h2 className="mt-4 text-2xl font-semibold text-slate-800">{user.name}</h2>
            <p className="mt-1 text-slate-500">{user.email}</p>
            <p className="mt-1 text-sm text-sky-600 font-semibold">{user.district}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {user.stats.map((stat) => (
              <div className="rounded-lg bg-white p-3 text-center border border-slate-200/30" key={stat.label}>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Recent reports</h2>
          <div className="space-y-3">
            {reports.slice(0, 4).map((report) => (
              <div className="flex flex-col gap-2 rounded-lg bg-white p-3 sm:flex-row sm:items-center sm:justify-between border border-slate-200/30" key={report.id}>
                <div>
                  <p className="font-semibold text-slate-800">{report.title}</p>
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
