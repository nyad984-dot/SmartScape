export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <input
        className={`w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-400/20 ${className}`}
        {...props}
      />
    </label>
  )
}
