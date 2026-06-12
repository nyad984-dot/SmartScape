import { AlertOctagon, CheckCircle2, Clock, FileText } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import { useDashboard } from '../hooks/useDashboard'
import { useReports } from '../hooks/useReports'
import { formatDate, getPriorityColor, getStatusColor } from '../utils/formatters'

const icons = [FileText, Clock, CheckCircle2, AlertOctagon]
const colors = ['#38bdf8', '#f59e0b', '#10b981', '#fb7185', '#818cf8']

export default function DashboardPage() {
  const data = useDashboard()
  const { reports } = useReports()

  return (
    <>
      <PageHeader
        description="Monitor citywide incident volume, response performance, and critical work."
        eyebrow="Admin analytics"
        title="Dashboard"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.summary.map((item, index) => {
          const Icon = icons[index]

          return (
            <Card key={item.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-sky-400/15 text-sky-300">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-emerald-300">{item.trend} this week</p>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-white">Reports Per Day</h2>
          <ResponsiveContainer height={280} width="100%">
            <AreaChart data={data.perDay}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#e2e8f0',
                }}
              />
              <Area
                dataKey="reports"
                fill="#38bdf8"
                fillOpacity={0.2}
                stroke="#38bdf8"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-white">Reports By Status</h2>
          <ResponsiveContainer height={280} width="100%">
            <PieChart>
              <Pie
                data={data.byStatus}
                dataKey="value"
                innerRadius={60}
                outerRadius={96}
                paddingAngle={4}
              >
                {data.byStatus.map((entry, index) => (
                  <Cell fill={colors[index]} key={entry.name} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-white">Reports By Category</h2>
          <ResponsiveContainer height={260} width="100%">
            <BarChart data={data.byCategory}>
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
              <Bar dataKey="value" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-white">Department Performance</h2>
          <div className="space-y-3">
            {data.departments.map((department) => (
              <div className="rounded-lg bg-slate-900/70 p-3" key={department.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-white">{department.name}</span>
                  <span className="text-emerald-300">{department.resolution}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Avg response {department.response}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-white">Critical Incidents</h2>
          <div className="space-y-3">
            {data.critical.map((item) => (
              <div
                className="rounded-lg border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-100"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="py-3 text-white">{report.title}</td>
                  <td>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </td>
                  <td>
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority}
                    </Badge>
                  </td>
                  <td className="text-slate-300">{report.department}</td>
                  <td className="text-slate-400">{formatDate(report.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
