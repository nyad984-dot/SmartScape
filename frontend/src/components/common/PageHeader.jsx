export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-300">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  )
}
