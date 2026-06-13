import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center soft-grid">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-500">The requested city module does not exist.</p>
        <Button className="mt-6" to="/">Back home</Button>
      </div>
    </div>
  )
}
