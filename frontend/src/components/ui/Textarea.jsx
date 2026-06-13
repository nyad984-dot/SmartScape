export default function Textarea({ label, className = '', ...props }) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-600">
      <span>{label}</span>
      <textarea
        className={`min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 ${className}`}
        {...props}
      />
    </label>
  )
}
