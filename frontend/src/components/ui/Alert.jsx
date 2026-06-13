import { CircleAlert } from 'lucide-react'

export default function Alert({ children, type = 'info' }) {
  const tone = type === 'success' ? 'border-emerald-400/30 text-emerald-100' : 'border-sky-400/30 text-sky-100'
  return (
    <div className={`flex gap-3 rounded-lg border bg-slate-50/70 p-4 text-sm ${tone}`}>
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
