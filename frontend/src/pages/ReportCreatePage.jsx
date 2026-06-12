import { BrainCircuit, Upload } from 'lucide-react'
import { useState } from 'react'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import PageHeader from '../components/common/PageHeader'
import { useReports } from '../hooks/useReports'

const analysis = {
  Category: 'Traffic Infrastructure',
  Priority: 'High',
  Department: 'Transport Department',
  Summary: 'Traffic light malfunction detected.',
}

export default function ReportCreatePage() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { addReport } = useReports()

  const onSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    addReport({
      id: `RPT-${Date.now().toString().slice(-4)}`,
      title: form.get('title'),
      description: form.get('description'),
      location: form.get('location'),
      category: form.get('category'),
      status: 'Open',
      priority: 'High',
      department: 'Transport Department',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=900&q=80',
      timeline: ['Report submitted', 'AI analysis completed'],
      comments: ['New report awaiting department acknowledgement.'],
    })
    setShowAnalysis(true)
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader
        description="Submit a city issue with location, category, and optional image evidence."
        eyebrow="Resident report"
        title="Create Report"
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input label="Title" name="title" placeholder="Broken traffic light on Abay Avenue" required />
            <Textarea label="Description" name="description" placeholder="Describe what happened, who is affected, and the urgency." required />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Location" name="location" placeholder="Street, intersection, or landmark" required />
              <label className="block space-y-2 text-sm font-medium text-slate-300">
                <span>Category</span>
                <select className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-slate-100 outline-none focus:border-sky-300" name="category">
                  {['Traffic', 'Road Damage', 'Garbage', 'Lighting', 'Emergency'].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center text-slate-400 transition hover:border-sky-300">
              <Upload className="mb-2 h-6 w-6 text-sky-300" />
              Image Upload
              <input className="hidden" name="image" type="file" />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button icon={BrainCircuit} onClick={() => setShowAnalysis(true)} variant="secondary">Analyze with AI</Button>
              <Button type="submit">Submit Report</Button>
            </div>
          </form>
        </Card>
        <div className="space-y-4">
          {submitted && <Alert type="success">Report submitted and routed to Transport Department.</Alert>}
          {showAnalysis && (
            <Card>
              <h2 className="mb-4 text-lg font-semibold text-slate-100">AI Analysis</h2>
              <div className="space-y-3">
                {Object.entries(analysis).map(([key, value]) => (
                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3 last:border-0" key={key}>
                    <span className="text-sm text-slate-400">{key}</span>
                    <span className="text-right text-sm font-semibold text-slate-100">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
