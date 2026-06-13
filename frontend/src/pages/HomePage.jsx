import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  MapPinned,
  RadioTower,
  Route,
  ShieldCheck,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const stats = [
  ['1200', 'Reports Processed'],
  ['92%', 'AI Classification Accuracy'],
  ['4 min', 'Average Response Time'],
  ['25', 'City Districts Covered'],
]

const features = [
  ['AI Analysis', Bot, 'Classify public issues and extract urgency from resident reports.'],
  ['Emergency Detection', AlertTriangle, 'Surface dangerous incidents before they become citywide disruptions.'],
  ['Smart Routing', Route, 'Send reports to the right department with context and priority.'],
  ['Analytics Dashboard', BarChart3, 'Track trends, response times, and department performance.'],
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid min-h-[72vh] items-center gap-10 py-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-600">
            <RadioTower className="h-4 w-4" />
            Smart city incident intelligence
          </div>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
            AI-Powered City Safety Platform
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            Helping cities respond faster to public issues and emergencies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button icon={ShieldCheck} to="/report/create">Report Issue</Button>
            <Button icon={Activity} to="/dashboard" variant="secondary">View Dashboard</Button>
          </div>
        </div>
        <div className="glass relative overflow-hidden rounded-lg p-5">
          <img
            alt="Smart city control room"
            className="aspect-[4/3] w-full rounded-lg object-cover opacity-90"
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1100&q=80"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-slate-200 bg-white/90 p-4 backdrop-blur shadow-lg">
            <p className="text-sm text-slate-500">Live AI routing</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">Traffic signal outage prioritized as High</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <Card className="animate-rise" key={label}>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="mt-2 text-sm text-slate-600">{label}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-slate-900">Built for fast civic response</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, Icon, text]) => (
            <Card className="transition hover:-translate-y-1 hover:border-sky-300/40" key={title}>
              <Icon className="mb-5 h-8 w-8 text-sky-600" />
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {['Submit report', 'AI analyzes issue', 'Department receives request', 'Issue gets resolved'].map((step, index) => (
          <Card key={step}>
            <p className="text-sm font-semibold text-sky-600">Step {index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold text-slate-800">{step}</h3>
          </Card>
        ))}
      </section>

      <section className="glass rounded-lg p-8 text-center">
        <MapPinned className="mx-auto mb-4 h-10 w-10 text-sky-600" />
        <h2 className="text-3xl font-semibold text-slate-900">Turn resident reports into coordinated action</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Give every department a shared operating picture for safer, cleaner, more responsive neighborhoods.
        </p>
        <Button className="mt-6" to="/register">Start now</Button>
      </section>
    </div>
  )
}
