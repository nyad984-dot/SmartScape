import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-sky-500 text-white hover:bg-sky-600',
  secondary: 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-500 text-white hover:bg-rose-600',
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  to,
  icon: Icon,
  ...props
}) {
  const classes = `inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-300 ${variants[variant]} ${className}`
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link className={classes} to={to}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {content}
    </button>
  )
}
