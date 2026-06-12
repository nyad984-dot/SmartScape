import { MessageSquare, Paperclip } from 'lucide-react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useReports } from '../hooks/useReports'
import { formatDate, getPriorityColor, getStatusColor } from '../utils/formatters'

export default function ReportDetailsPage() {
  const { id } = useParams()
  const { findReport } = useReports()
  const report = findReport(id)

  if (!report) {
    return (
      <Card>
        <h1 className="text-2xl font-semibold text-white">Report not found</h1>
        <Button className="mt-4" to="/reports">Back to reports</Button>
      </Card>
    )
  }

  return (
    <>
      <PageHeader
        action={<Button to="/reports" variant="secondary">Back to reports</Button>}
        description={`${report.location} • ${formatDate(report.date)}`}
        eyebrow={report.id}
        title={report.title}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
              <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
              <Badge className="border-slate-600 bg-slate-800 text-slate-200">{report.department}</Badge>
            </div>
            <p className="leading-7 text-slate-300">{report.description}</p>
          </Card>
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-white">Timeline</h2>
            <div className="space-y-4">
              {report.timeline.map((item, index) => (
                <div className="flex gap-3" key={item}>
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-400 text-xs font-bold text-slate-950">{index + 1}</span>
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><MessageSquare className="h-5 w-5 text-sky-300" /> Comments</h2>
            {report.comments.map((comment) => (
              <p className="rounded-lg bg-slate-900/70 p-3 text-sm text-slate-300" key={comment}>{comment}</p>
            ))}
          </Card>
        </div>
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Paperclip className="h-5 w-5 text-sky-300" /> Attached image</h2>
          <img alt="" className="aspect-[4/3] w-full rounded-lg object-cover" src={report.image} />
        </Card>
      </div>
    </>
  )
}
